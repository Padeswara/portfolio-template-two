import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useAudio } from '../../context/AudioContext';
import { useGame } from '../../context/GameContext';
import { PixelButton } from '../ui/PixelButton';
import { PixelCard } from '../ui/PixelCard';
import { Gamepad2, RotateCcw, Play, ArrowRight } from 'lucide-react';

interface Bug {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  hp: number;
  maxHp: number;
  type: 'weed' | 'crow' | 'slime' | 'beetle';
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
  type: 'tea' | 'strawberry' | 'corn';
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
    const saved = localStorage.getItem('harvest_smasher_highscore');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [lives, setLives] = useState(3);
  const [wave, setWave] = useState(1);
  const [hasShield, setHasShield] = useState(false);

  // Player position
  const playerRef = useRef({
    x: 184,
    y: 330,
    width: 32,
    height: 32,
    speed: 5.5,
    isShooting: false,
    lastShot: 0,
    shotCooldown: 180,
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
    const types: Bug['type'][] = ['weed', 'crow', 'slime', 'beetle'];
    const randType = types[Math.floor(Math.random() * types.length)];
    const canvasWidth = 380;

    let emoji = '🌿';
    let hp = 1;
    let speed = 1.2 + Math.random() * 1.3 + wave * 0.15;
    let points = 50;

    if (randType === 'crow') {
      emoji = '🐦';
      hp = 2;
      points = 80;
    } else if (randType === 'slime') {
      emoji = '🧪';
      speed *= 1.3;
      points = 100;
    } else if (randType === 'beetle') {
      emoji = '🪲';
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

      // Soft pasture soil background
      ctx.fillStyle = '#4a7536';
      ctx.fillRect(0, 0, width, height);

      // Soil grid lines
      ctx.strokeStyle = 'rgba(74, 46, 24, 0.2)';
      ctx.lineWidth = 1;
      for (let i = 0; i < width; i += 32) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.stroke();
      }

      const player = playerRef.current;
      if (keysRef.current['arrowleft'] || keysRef.current['a']) {
        player.x = Math.max(10, player.x - player.speed);
      }
      if (keysRef.current['arrowright'] || keysRef.current['d']) {
        player.x = Math.min(width - player.width - 10, player.x + player.speed);
      }

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

      const spawnInterval = Math.max(600, 1600 - wave * 150);
      if (timestamp - lastSpawnRef.current > spawnInterval) {
        spawnBug();
        lastSpawnRef.current = timestamp;
      }

      // Bullets (Water droplets / Seeds)
      for (let i = bulletsRef.current.length - 1; i >= 0; i--) {
        const b = bulletsRef.current[i];
        b.y -= b.speed;

        ctx.fillStyle = '#90e0ef';
        ctx.beginPath();
        ctx.arc(b.x, b.y, 4, 0, Math.PI * 2);
        ctx.fill();

        if (b.y < -10) {
          bulletsRef.current.splice(i, 1);
        }
      }

      // Bugs / Weeds
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
          ctx.fillStyle = '#d64545';
          ctx.fillRect(bug.x, bug.y - 6, barWidth * hpPercent, 3);
        }

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
                color: '#e69d24',
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
                  localStorage.setItem('harvest_smasher_highscore', newScore.toString());
                }
                if (newScore >= 500) {
                  unlockAchievement('arcade_champion');
                }
                return newScore;
              });

              addGlobalScore(bug.points);
              addCoins(1);

              for (let p = 0; p < 10; p++) {
                particlesRef.current.push({
                  x: bug.x + bug.width / 2,
                  y: bug.y + bug.height / 2,
                  vx: (Math.random() - 0.5) * 5,
                  vy: (Math.random() - 0.5) * 5,
                  color: '#7cb359',
                  life: 20,
                  maxLife: 20,
                });
              }

              if (Math.random() < 0.15) {
                powerUpsRef.current.push({
                  x: bug.x,
                  y: bug.y,
                  type: Math.random() < 0.5 ? 'tea' : 'strawberry',
                  emoji: Math.random() < 0.5 ? '🍵' : '🍓',
                  speed: 2,
                });
              }

              bugsRef.current.splice(i, 1);
              break;
            }
          }
        }

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

      // Power-ups
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
          if (pup.type === 'tea') {
            player.speed = 8;
            player.shotCooldown = 110;
            setTimeout(() => {
              player.speed = 5.5;
              player.shotCooldown = 180;
            }, 5000);
          } else if (pup.type === 'strawberry') {
            setHasShield(true);
            setTimeout(() => setHasShield(false), 6000);
          }
          powerUpsRef.current.splice(i, 1);
        } else if (pup.y > height) {
          powerUpsRef.current.splice(i, 1);
        }
      }

      // Particles
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

      // Draw Farmer
      ctx.fillStyle = '#e69d24'; // Straw Hat
      ctx.fillRect(player.x + 4, player.y + 4, 24, 6);
      ctx.fillStyle = '#ffd1a9'; // Face
      ctx.fillRect(player.x + 8, player.y + 10, 16, 8);
      ctx.fillStyle = '#4a709c'; // Overalls
      ctx.fillRect(player.x + 6, player.y + 18, 20, 12);
      ctx.fillStyle = '#5c3a21'; // Boots
      ctx.fillRect(player.x + 6, player.y + 30, 8, 3);
      ctx.fillRect(player.x + 18, player.y + 30, 8, 3);

      if (hasShield) {
        ctx.strokeStyle = '#ffe082';
        ctx.lineWidth = 3;
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
    <section className="h-full overflow-y-auto py-6 sm:py-8 px-4 sm:px-8 select-none max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Side: Title & Threat Dossier Panel */}
        <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-2">
          {/* Section Header */}
          <div className="space-y-1.5 border-b-2 border-[#8c5835]/30 pb-3">
            <div className="inline-block bg-[#fff8eb] border-2 border-[#8c5835] px-2.5 py-1 font-press-start text-[8px] sm:text-[9px] text-[#5c3a21] shadow-[2px_2px_0_0_rgba(0,0,0,0.25)]">
              STAGE 04 // HARVEST MINI-GAME
            </div>
            <h2 className="font-press-start text-xl sm:text-2xl text-[#fffdf5] uppercase drop-shadow-[2px_2px_0_#4a2e18] leading-tight">
              HARVEST VALLEY DEFENDER
            </h2>
            <p className="font-mono text-xs text-[#faecd4] leading-relaxed drop-shadow-[1px_1px_0_#2c1808]">
              Protect your crop fields from hungry weeds, crows, and garden bugs!
            </p>
          </div>

          {/* Enemy Pest Types */}
          <PixelCard
            title="PEST & WEED DOSSIER"
            badge="TARGETS"
            headerColor="wood"
            borderColor="wood"
          >
            <div className="grid grid-cols-2 gap-2 font-mono text-xs text-[#362213]">
              <div className="bg-[#faecd4] p-2 border border-[#8c5835]/30 flex items-center space-x-2">
                <span className="text-xl">🌿</span>
                <div>
                  <div className="text-[#5a8740] font-bold">Wild Weed</div>
                  <div className="text-[10px] text-[#785a44]">+50 G</div>
                </div>
              </div>
              <div className="bg-[#faecd4] p-2 border border-[#8c5835]/30 flex items-center space-x-2">
                <span className="text-xl">🐦</span>
                <div>
                  <div className="text-[#8c5835] font-bold">Pasture Crow</div>
                  <div className="text-[10px] text-[#785a44]">+80 G</div>
                </div>
              </div>
              <div className="bg-[#faecd4] p-2 border border-[#8c5835]/30 flex items-center space-x-2">
                <span className="text-xl">🧪</span>
                <div>
                  <div className="text-[#4a709c] font-bold">Acid Slime</div>
                  <div className="text-[10px] text-[#785a44]">+100 G</div>
                </div>
              </div>
              <div className="bg-[#faecd4] p-2 border border-[#8c5835]/30 flex items-center space-x-2">
                <span className="text-xl">🪲</span>
                <div>
                  <div className="text-[#d64545] font-bold">Crop Beetle</div>
                  <div className="text-[10px] text-[#785a44]">+200 G</div>
                </div>
              </div>
            </div>
          </PixelCard>

          {/* Next Stage Navigation CTA */}
          {onNavigateStage && (
            <PixelButton
              variant="primary"
              size="md"
              soundType="jump"
              onClick={() => onNavigateStage(5)}
              icon={<ArrowRight className="w-3.5 h-3.5" />}
              className="w-full justify-between"
            >
              <span>NEXT: TOWN LOGS (05)</span>
            </PixelButton>
          )}
        </div>

        {/* Right Side: Arcade Cabinet Screen */}
        <div className="lg:col-span-7 flex justify-center">
          <div className="relative bg-[#3a2010] border-4 border-[#8c5835] p-3 sm:p-4 shadow-[6px_6px_0_0_rgba(0,0,0,0.45)] max-w-full">
            {/* Top Bar */}
            <div className="flex justify-between items-center bg-[#241308] px-3 py-1.5 border-2 border-[#8c5835] mb-2.5 font-press-start text-[8px] sm:text-[9px] text-[#fff8eb]">
              <div className="flex items-center space-x-3">
                <span className="text-[#ff7b90]">STAMINA: {'🍓'.repeat(Math.max(0, lives))}</span>
                <span className="text-[#ffe082]">SEASON: {wave}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-[#a3c983]">GOLD: {score} G</span>
                <span className="text-gray-400 hidden sm:inline">HI: {highScore}</span>
              </div>
            </div>

            {/* Game Canvas */}
            <div className="relative border-2 border-[#4a2e18] overflow-hidden bg-[#4a7536] mx-auto">
              <canvas
                ref={canvasRef}
                width={380}
                height={360}
                className="w-full max-w-[380px] h-[300px] sm:h-[350px] block"
              />

              {gameState === 'idle' && (
                <div className="absolute inset-0 bg-[#241308]/85 flex flex-col items-center justify-center p-4 text-[#fff8eb] space-y-3">
                  <Gamepad2 className="w-10 h-10 text-[#ffe082] animate-bounce" />
                  <h3 className="font-press-start text-xs sm:text-sm text-[#ffe082]">
                    HARVEST DEFENDER
                  </h3>
                  <p className="font-mono text-[11px] text-[#faecd4] max-w-xs leading-relaxed text-center">
                    Controls: <kbd className="bg-[#4a2e18] px-1 border border-[#8c5835]">←</kbd> <kbd className="bg-[#4a2e18] px-1 border border-[#8c5835]">→</kbd> to Move, <kbd className="bg-[#4a2e18] px-1 border border-[#8c5835]">SPACE</kbd> to Water.
                  </p>
                  <PixelButton
                    variant="primary"
                    size="md"
                    soundType="powerup"
                    onClick={startGame}
                    icon={<Play className="w-3.5 h-3.5" />}
                  >
                    START HARVEST
                  </PixelButton>
                </div>
              )}

              {gameState === 'gameover' && (
                <div className="absolute inset-0 bg-[#241308]/90 flex flex-col items-center justify-center p-4 text-[#fff8eb] space-y-3 animate-in fade-in duration-200">
                  <div className="font-press-start text-base sm:text-lg text-[#ff7b90] animate-pulse">
                    FARM EXHAUSTED
                  </div>
                  <div className="space-y-0.5 font-mono text-xs text-[#faecd4] text-center">
                    <div>FINAL HARVEST: <span className="text-[#ffe082] font-bold">{score} G</span></div>
                    <div>TOP RECORD: <span className="text-[#7cb359] font-bold">{highScore} G</span></div>
                  </div>
                  <PixelButton
                    variant="accent"
                    size="md"
                    soundType="powerup"
                    onClick={startGame}
                    icon={<RotateCcw className="w-3.5 h-3.5" />}
                  >
                    HARVEST AGAIN
                  </PixelButton>
                </div>
              )}
            </div>

            {/* Mobile Touch Controls */}
            <div className="mt-3 flex items-center justify-between sm:hidden px-1">
              <div className="flex space-x-2">
                <button
                  onClick={handleTouchLeft}
                  className="w-10 h-10 bg-[#4a2e18] border-2 border-[#8c5835] text-[#fff8eb] active:bg-[#e69d24] active:text-black font-press-start text-xs flex items-center justify-center shadow-[2px_2px_0_0_#120803]"
                >
                  ◀
                </button>
                <button
                  onClick={handleTouchRight}
                  className="w-10 h-10 bg-[#4a2e18] border-2 border-[#8c5835] text-[#fff8eb] active:bg-[#e69d24] active:text-black font-press-start text-xs flex items-center justify-center shadow-[2px_2px_0_0_#120803]"
                >
                  ▶
                </button>
              </div>
              <button
                onClick={handleTouchShoot}
                className="w-20 h-10 bg-[#e69d24] text-[#2c1808] border-2 border-[#4a2e18] font-press-start text-[9px] flex items-center justify-center shadow-[2px_2px_0_0_#120803] active:translate-y-0.5 font-bold"
              >
                WATER! 💧
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
