import React from 'react';
import { PixelAvatar } from './PixelAvatar';
import { PixelButton } from '../ui/PixelButton';
import { PixelBadge } from '../ui/PixelBadge';
import { DEVELOPER_INFO } from '../../data/portfolioData';
import { useTypewriter } from '../../hooks/useTypewriter';
import { useAudio } from '../../context/AudioContext';
import { useGame } from '../../context/GameContext';
import { Swords, User, Gamepad2, Sparkles, ChevronRight } from 'lucide-react';

interface HeroProps {
  onNavigateStage: (stageIndex: number) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigateStage }) => {
  const { playTypewriter, playPowerUp } = useAudio();
  const { insertCoin } = useGame();

  const { displayedText, nextDialogue } = useTypewriter({
    texts: DEVELOPER_INFO.dialogueLines,
    typingSpeed: 35,
    pauseTime: 4000,
    onCharTyped: playTypewriter,
  });

  return (
    <section className="h-full flex flex-col justify-center items-center py-6 sm:py-10 px-4 sm:px-6 select-none max-w-5xl mx-auto w-full">
      {/* Top Arcade Marquee Badge */}
      <div className="mb-4 inline-flex items-center space-x-2 bg-black/80 border-2 border-[#ff007f] px-3 py-1 font-press-start text-[9px] sm:text-[10px] text-[#ff007f] shadow-[3px_3px_0_0_#00f3ff] animate-pulse">
        <Sparkles className="w-3.5 h-3.5 text-[#ffe600]" />
        <span>STAGE 00 // PLAYER 1 READY</span>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
        {/* Left / Top: Animated Pixel Avatar */}
        <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
          <PixelAvatar />
        </div>

        {/* Right / Main Content */}
        <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-center lg:text-left order-2 lg:order-1">
          {/* Main Title */}
          <div className="space-y-2">
            <div className="font-press-start text-[10px] sm:text-xs text-[#00f3ff] tracking-widest uppercase flex items-center justify-center lg:justify-start gap-2">
              <span className="w-2 h-2 bg-[#00f3ff] inline-block animate-ping" />
              <span>{DEVELOPER_INFO.classTitle}</span>
            </div>

            <h1 className="font-press-start text-2xl sm:text-4xl text-white tracking-tight leading-tight uppercase drop-shadow-[4px_4px_0_#ff007f]">
              <span className="neon-glow-cyan text-[#00f3ff]">
                {DEVELOPER_INFO.name.split(' ')[0]}
              </span>{' '}
              <span className="text-white">
                {DEVELOPER_INFO.name.split(' ').slice(1).join(' ')}
              </span>
            </h1>

            <p className="font-mono text-xs sm:text-sm text-gray-300 max-w-xl mx-auto lg:mx-0">
              {DEVELOPER_INFO.tagline}
            </p>
          </div>

          {/* Quick Badges */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 pt-0.5">
            <PixelBadge variant="cyan" size="sm" icon={<span className="mr-1">⚛️</span>}>
              REACT 19
            </PixelBadge>
            <PixelBadge variant="pink" size="sm" icon={<span className="mr-1">🌊</span>}>
              TAILWIND V4
            </PixelBadge>
            <PixelBadge variant="yellow" size="sm" icon={<span className="mr-1">⚡</span>}>
              TYPESCRIPT
            </PixelBadge>
            <PixelBadge variant="green" size="sm" icon={<span className="mr-1">▲</span>}>
              NEXT.JS 15
            </PixelBadge>
          </div>

          {/* RPG Dialogue Box */}
          <div className="relative bg-[#140828] border-4 border-[#00f3ff] p-3.5 sm:p-4 shadow-[5px_5px_0_0_#000] text-left">
            <div className="flex items-center justify-between border-b-2 border-white/10 pb-1.5 mb-2 font-press-start text-[8px] sm:text-[9px] text-[#ffe600]">
              <span className="flex items-center gap-1.5">
                <span>💬</span>
                <span>NPC / DEV DIALOGUE</span>
              </span>
              <button
                onClick={() => {
                  playPowerUp();
                  nextDialogue();
                }}
                className="text-[#00f3ff] hover:text-white underline cursor-pointer"
                title="Next dialogue line"
              >
                NEXT ▶
              </button>
            </div>

            <div className="min-h-[45px] flex items-center">
              <p className="font-mono text-xs sm:text-sm text-white leading-relaxed">
                "{displayedText}
                <span className="inline-block w-2 h-3.5 bg-[#00f3ff] ml-1 animate-retro-blink align-middle" />
                "
              </p>
            </div>

            {/* Corner Decorative Dots */}
            <div className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-[#ffe600]" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#ffe600]" />
            <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 bg-[#ffe600]" />
            <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-[#ffe600]" />
          </div>

          {/* Action Buttons Group */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-1">
            <PixelButton
              variant="primary"
              size="md"
              soundType="powerup"
              onClick={() => onNavigateStage(3)}
              icon={<Swords className="w-3.5 h-3.5" />}
            >
              START QUESTS (03)
            </PixelButton>

            <PixelButton
              variant="secondary"
              size="md"
              soundType="click"
              onClick={() => onNavigateStage(1)}
              icon={<User className="w-3.5 h-3.5" />}
            >
              STATS SHEET (01)
            </PixelButton>

            <PixelButton
              variant="accent"
              size="md"
              soundType="jump"
              onClick={() => onNavigateStage(4)}
              icon={<Gamepad2 className="w-3.5 h-3.5" />}
            >
              PLAY ARCADE (04)
            </PixelButton>

            <PixelButton
              variant="green"
              size="md"
              soundType="coin"
              onClick={insertCoin}
            >
              🪙 +1 COIN
            </PixelButton>
          </div>
        </div>
      </div>

      {/* Bottom Stage Progress Quick Prompt */}
      <button
        onClick={() => onNavigateStage(1)}
        className="mt-6 sm:mt-8 flex items-center space-x-2 bg-black/60 border border-[#00f3ff] px-4 py-2 font-press-start text-[9px] text-[#00f3ff] hover:bg-[#00f3ff] hover:text-black transition-all cursor-pointer shadow-[3px_3px_0_0_#ff007f] group"
      >
        <span>ENTER ADVENTURE [ STAGE 01: STATS ]</span>
        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </button>
    </section>
  );
};
