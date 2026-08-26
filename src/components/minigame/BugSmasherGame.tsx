import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useAudio } from '../../context/AudioContext';
import { useGame } from '../../context/GameContext';
import { PixelButton } from '../ui/PixelButton';
import { Gamepad2, RotateCcw, Play, ArrowRight } from 'lucide-react';

interface Bug {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  hp: number;
  maxHp: number;
  type: 'null' | 'overflow' | 'conflict' | 'memory';
  emoji: string;
  points: number;
}

interface Bullet {
  x: number;
  y: number;
  radius: number;
  speed: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  life: number;
  maxLife: number;
}

interface PowerUp {
  x: number;
  y: number;
  type: 'coffee' | 'shield' | 'bomb';
  emoji: string;
  speed: number;
}

interface BugSmasherGameProps {
  onNavigateStage?: (stageIndex: number) => void;
}

export const BugSmasherGame: React.FC<BugSmasherGameProps> = ({ onNavigateStage }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { playLaser, playHit, playExplosion, playPowerUp, playGameOver } = useAudio();
  const { addCoins, addScore: addGlobalScore, unlockAchievement } = useGame();

  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('bug_smasher_highscore');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [lives, setLives] = useState(3);
  const [wave, setWave] = useState(1);
  const [hasShield, setHasShield] = useState(false);

  // Player position
  const playerRef = useRef({
    x: 184,
    y: 340,
    width: 32,
    height: 32,
    speed: 6,
    isShooting: false,
    lastShot: 0,
    shotCooldown: 180, // ms
  });

  const keysRef = useRef<{ [key: string]: boolean }>({});
  const bugsRef = useRef<Bug[]>([]);
  const bulletsRef = useRef<Bullet[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const powerUpsRef = useRef<PowerUp[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const lastSpawnRef = useRef<number>(0);

  // Spawn bug
  const spawnBug = useCallback(() => {
    const types: Bug['type'][] = ['null', 'overflow', 'conflict', 'memory'];
    const randType = types[Math.floor(Math.random() * types.length)];
    const canvasWidth = 380;

    let emoji = '👾';
    let hp = 1;
    let speed = 1.2 + Math.random() * 1.5 + wave * 0.2;
    let points = 50;

    if (randType === 'overflow') {
      emoji = '🐛';
      hp = 2;
      points = 80;
    } else if (randType === 'conflict') {
      emoji = '⚡';
      speed *= 1.4;
      points = 100;
    } else if (randType === 'memory') {
      emoji = '🕷️';
      hp = 4;
      speed *= 0.7;
      points = 200;
    }

    bugsRef.current.push({
      x: 20 + Math.random() * (canvasWidth - 60),
      y: -30,
      width: 28,
      height: 28,
      speed,
      hp,
      maxHp: hp,
      type: randType,
      emoji,
      points,
    });
  }, [wave]);

  // Start game
  const startGame = () => {
    bugsRef.current = [];
    bulletsRef.current = [];
    particlesRef.current = [];
    powerUpsRef.current = [];
    setScore(0);
    setLives(3);
    setWave(1);
    setHasShield(false);
    playerRef.current.x = 174;
    setGameState('playing');
    unlockAchievement('arcade_player');
    playPowerUp();
  };

  // Keyboard listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' ', 'a', 'd', 'w'].includes(e.key)) {
        if (gameState === 'playing') {
          e.preventDefault();
        }
      }
      keysRef.current[e.key.toLowerCase()] = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.key.toLowerCase()] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState]);

  // Game Loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isRunning = true;

    const loop = (timestamp: number) => {
      if (!isRunning) return;

      const width = canvas.width;
      const height = canvas.height;

      // 1. Clear & Background Grid
      ctx.fillStyle = '#0a0314';
      ctx.fillRect(0, 0, width, height);

      // Starfield dots
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      for (let i = 0; i < 20; i++) {
        const sx = (i * 37 + (timestamp * 0.05) % height) % width;
        const sy = (i * 53 + (timestamp * 0.1) % height) % height;
        ctx.fillRect(sx, sy, 2, 2);
      }

      // 2. Handle Player Input
      const player = playerRef.current;
      if (keysRef.current['arrowleft'] || keysRef.current['a']) {
        player.x = Math.max(10, player.x - player.speed);
      }
      if (keysRef.current['arrowright'] || keysRef.current['d']) {
        player.x = Math.min(width - player.width - 10, player.x + player.speed);
      }

      // Shoot
      if (
        (keysRef.current[' '] || keysRef.current['arrowup'] || keysRef.current['w']) &&
        timestamp - player.lastShot > player.shotCooldown
      ) {
        bulletsRef.current.push({
          x: player.x + player.width / 2,
          y: player.y,
          radius: 3,
          speed: 8,
        });
        player.lastShot = timestamp;
        playLaser();
      }

      // 3. Spawn Bugs
      const spawnInterval = Math.max(600, 1600 - wave * 150);
      if (timestamp - lastSpawnRef.current > spawnInterval) {
        spawnBug();
        lastSpawnRef.current = timestamp;
      }

      // 4. Update Bullets
      for (let i = bulletsRef.current.length - 1; i >= 0; i--) {
        const b = bulletsRef.current[i];
        b.y -= b.speed;

        ctx.fillStyle = '#00f3ff';
        ctx.shadowColor = '#00f3ff';
        ctx.shadowBlur = 8;
        ctx.fillRect(b.x - 2, b.y, 4, 10);
        ctx.shadowBlur = 0;

        if (b.y < -10) {
          bulletsRef.current.splice(i, 1);
        }
      }

      // 5. Update Bugs & Collisions
      for (let i = bugsRef.current.length - 1; i >= 0; i--) {
        const bug = bugsRef.current[i];
        bug.y += bug.speed;

        ctx.font = '20px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(bug.emoji, bug.x + bug.width / 2, bug.y + bug.height / 2);

        if (bug.maxHp > 1) {
          const barWidth = 24;
          const hpPercent = bug.hp / bug.maxHp;
          ctx.fillStyle = 'rgba(0,0,0,0.6)';
          ctx.fillRect(bug.x, bug.y - 6, barWidth, 3);
          ctx.fillStyle = '#ff007f';
          ctx.fillRect(bug.x, bug.y - 6, barWidth * hpPercent, 3);
        }

        // Bullet vs Bug collision
        for (let j = bulletsRef.current.length - 1; j >= 0; j--) {
          const bullet = bulletsRef.current[j];
          if (
            bullet.x >= bug.x &&
            bullet.x <= bug.x + bug.width &&
            bullet.y >= bug.y &&
            bullet.y <= bug.y + bug.height
          ) {
            bulletsRef.current.splice(j, 1);
            bug.hp -= 1;
            playHit();

            for (let p = 0; p < 4; p++) {
              particlesRef.current.push({
                x: bullet.x,
                y: bullet.y,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                color: '#ffe600',
                life: 15,
                maxLife: 15,
              });
            }

            if (bug.hp <= 0) {
              playExplosion();
              setScore((prev) => {
                const newScore = prev + bug.points;
                if (newScore > highScore) {
                  setHighScore(newScore);
                  localStorage.setItem('bug_smasher_highscore', newScore.toString());
                }
                if (newScore >= 500) {
                  unlockAchievement('arcade_champion');
                }
                return newScore;
              });

              addGlobalScore(bug.points);
              addCoins(1);

              for (let p = 0; p < 12; p++) {
                particlesRef.current.push({
                  x: bug.x + bug.width / 2,
                  y: bug.y + bug.height / 2,
                  vx: (Math.random() - 0.5) * 6,
                  vy: (Math.random() - 0.5) * 6,
                  color: bug.type === 'memory' ? '#ff3838' : '#39ff14',
                  life: 25,
                  maxLife: 25,
                });
              }

              if (Math.random() < 0.15) {
                powerUpsRef.current.push({
                  x: bug.x,
                  y: bug.y,
                  type: Math.random() < 0.5 ? 'coffee' : 'shield',
                  emoji: Math.random() < 0.5 ? '☕' : '🛡️',
                  speed: 2,
                });
              }

              bugsRef.current.splice(i, 1);
              break;
            }
          }
        }

        // Bug reaches bottom
        if (bug && bug.y > height - 40) {
          bugsRef.current.splice(i, 1);
          setLives((prev) => {
            const next = prev - 1;
            if (next <= 0) {
              setGameState('gameover');
              playGameOver();
            }
            return next;
          });
        }
      }

      // 6. Update PowerUps
      for (let i = powerUpsRef.current.length - 1; i >= 0; i--) {
        const pup = powerUpsRef.current[i];
        pup.y += pup.speed;

        ctx.font = '18px sans-serif';
        ctx.fillText(pup.emoji, pup.x, pup.y);

        if (
          pup.x >= player.x - 15 &&
          pup.x <= player.x + player.width + 15 &&
          pup.y >= player.y - 15 &&
          pup.y <= player.y + player.height
        ) {
          playPowerUp();
          if (pup.type === 'coffee') {
            player.speed = 9;
            player.shotCooldown = 100;
            setTimeout(() => {
              player.speed = 6;
              player.shotCooldown = 180;
            }, 5000);
          } else if (pup.type === 'shield') {
            setHasShield(true);
            setTimeout(() => setHasShield(false), 6000);
          }
          powerUpsRef.current.splice(i, 1);
        } else if (pup.y > height) {
          powerUpsRef.current.splice(i, 1);
        }
      }

      // 7. Update Particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1;

        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, 2, 2);

        if (p.life <= 0) {
          particlesRef.current.splice(i, 1);
        }
      }

      // 8. Draw Player
      ctx.fillStyle = '#ff007f';
      ctx.fillRect(player.x, player.y + 12, player.width, 10);
      ctx.fillStyle = '#00f3ff';
      ctx.fillRect(player.x + 8, player.y + 4, 16, 20);
      ctx.fillStyle = '#ffe600';
      ctx.fillRect(player.x + 12, player.y + 8, 8, 8);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(player.x + 14, player.y - 2, 4, 6);

      if (hasShield) {
        ctx.strokeStyle = '#00f3ff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(player.x + 16, player.y + 16, 24, 0, Math.PI * 2);
        ctx.stroke();
      }

      if (score > wave * 300) {
        setWave((w) => w + 1);
        playPowerUp();
      }

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);

    return () => {
      isRunning = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameState, wave, highScore, hasShield, spawnBug, playLaser, playHit, playExplosion, playPowerUp, playGameOver, addGlobalScore, addCoins, unlockAchievement, score]);

  const handleTouchLeft = () => {
    keysRef.current['arrowleft'] = true;
    setTimeout(() => {
      keysRef.current['arrowleft'] = false;
    }, 120);
  };

  const handleTouchRight = () => {
    keysRef.current['arrowright'] = true;
    setTimeout(() => {
      keysRef.current['arrowright'] = false;
    }, 120);
  };

  const handleTouchShoot = () => {
    keysRef.current[' '] = true;
    setTimeout(() => {
      keysRef.current[' '] = false;
    }, 120);
  };

  return (
    <section className="h-full overflow-y-auto py-6 sm:py-8 px-4 sm:px-6 select-none max-w-4xl mx-auto w-full text-center">
      <div className="space-y-5">
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-block bg-black border-2 border-[#39ff14] px-3 py-1 font-press-start text-[9px] text-[#39ff14] shadow-[2px_2px_0_0_#ff007f]">
            STAGE 04 // PLAYABLE ARCADE ROOM
          </div>
          <h2 className="font-press-start text-xl sm:text-2xl text-white uppercase drop-shadow-[2px_2px_0_#39ff14]">
            BUG SMASHER: CODE DEFENDER
          </h2>
          <p className="font-mono text-xs sm:text-sm text-gray-400 max-w-lg mx-auto">
            Defend your web build from incoming bugs, merge conflicts, and memory leaks!
          </p>
        </div>

        {/* Arcade Cabinet Screen */}
        <div className="relative inline-block bg-[#120625] border-4 border-[#00f3ff] p-3 sm:p-4 shadow-[6px_6px_0_0_#ff007f] max-w-full">
          {/* Top Bar */}
          <div className="flex justify-between items-center bg-black px-3 py-1.5 border-2 border-white/20 mb-2.5 font-press-start text-[8px] sm:text-[9px] text-white">
            <div className="flex items-center space-x-3">
              <span className="text-[#ff007f]">HP: {'❤️'.repeat(Math.max(0, lives))}</span>
              <span className="text-[#ffe600]">WAVE: {wave}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-[#00f3ff]">SCORE: {score}</span>
              <span className="text-gray-400 hidden sm:inline">HI: {highScore}</span>
            </div>
          </div>

          {/* Game Canvas */}
          <div className="relative border-2 border-white/30 overflow-hidden bg-black mx-auto">
            <canvas
              ref={canvasRef}
              width={380}
              height={360}
              className="w-full max-w-[380px] h-[320px] sm:h-[360px] block"
            />

            {/* Overlays */}
            {gameState === 'idle' && (
              <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center p-4 text-white space-y-3">
                <Gamepad2 className="w-10 h-10 text-[#00f3ff] animate-bounce" />
                <h3 className="font-press-start text-xs sm:text-sm text-[#00f3ff]">
                  CODE DEFENDER
                </h3>
                <p className="font-mono text-[11px] text-gray-300 max-w-xs leading-relaxed">
                  Controls: <kbd className="bg-gray-800 px-1">←</kbd> <kbd className="bg-gray-800 px-1">→</kbd> or <kbd className="bg-gray-800 px-1">A</kbd> <kbd className="bg-gray-800 px-1">D</kbd> to Move, <kbd className="bg-gray-800 px-1">SPACE</kbd> to Shoot.
                </p>
                <PixelButton
                  variant="primary"
                  size="md"
                  soundType="powerup"
                  onClick={startGame}
                  icon={<Play className="w-3.5 h-3.5" />}
                >
                  START GAME
                </PixelButton>
              </div>
            )}

            {gameState === 'gameover' && (
              <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center p-4 text-white space-y-3 animate-in fade-in duration-200">
                <div className="font-press-start text-base sm:text-lg text-[#ff3838] animate-pulse">
                  GAME OVER
                </div>
                <div className="space-y-0.5 font-mono text-xs text-gray-300">
                  <div>FINAL SCORE: <span className="text-[#ffe600] font-bold">{score}</span></div>
                  <div>HIGH SCORE: <span className="text-[#00f3ff] font-bold">{highScore}</span></div>
                </div>
                <PixelButton
                  variant="accent"
                  size="md"
                  soundType="powerup"
                  onClick={startGame}
                  icon={<RotateCcw className="w-3.5 h-3.5" />}
                >
                  PLAY AGAIN
                </PixelButton>
              </div>
            )}
          </div>

          {/* On-Screen Mobile Touch Controls */}
          <div className="mt-3 flex items-center justify-between sm:hidden px-1">
            <div className="flex space-x-2">
              <button
                onClick={handleTouchLeft}
                className="w-10 h-10 bg-gray-900 border-2 border-white/40 text-white active:bg-[#00f3ff] active:text-black font-press-start text-xs flex items-center justify-center shadow-[2px_2px_0_0_#000]"
              >
                ◀
              </button>
              <button
                onClick={handleTouchRight}
                className="w-10 h-10 bg-gray-900 border-2 border-white/40 text-white active:bg-[#00f3ff] active:text-black font-press-start text-xs flex items-center justify-center shadow-[2px_2px_0_0_#000]"
              >
                ▶
              </button>
            </div>
            <button
              onClick={handleTouchShoot}
              className="w-18 h-10 bg-[#ff007f] border-2 border-black text-white font-press-start text-[9px] flex items-center justify-center shadow-[2px_2px_0_0_#000] active:translate-y-0.5"
            >
              FIRE! 🔥
            </button>
          </div>
        </div>

        {/* Next Stage Navigation CTA */}
        {onNavigateStage && (
          <div className="flex justify-end pt-1">
            <PixelButton
              variant="primary"
              size="md"
              soundType="jump"
              onClick={() => onNavigateStage(5)}
              icon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              NEXT: QUEST LOGS (STAGE 05) ▶
            </PixelButton>
          </div>
        )}
      </div>
    </section>
  );
};
