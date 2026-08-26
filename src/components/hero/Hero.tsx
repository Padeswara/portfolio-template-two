import React from 'react';
import { PixelAvatar } from './PixelAvatar';
import { PixelButton } from '../ui/PixelButton';
import { PixelBadge } from '../ui/PixelBadge';
import { DEVELOPER_INFO } from '../../data/portfolioData';
import { useTypewriter } from '../../hooks/useTypewriter';
import { useAudio } from '../../context/AudioContext';
import { useGame } from '../../context/GameContext';
import { ChevronRight, Sprout, Sun } from 'lucide-react';

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
    <section className="h-full flex flex-col justify-center items-center py-6 sm:py-8 px-4 sm:px-6 select-none max-w-5xl mx-auto w-full">
      {/* Top Farm Banner */}
      <div className="mb-3 inline-flex items-center space-x-2 bg-[#fff8eb] border-2 border-[#8c5835] px-3 py-1 font-press-start text-[8px] sm:text-[9px] text-[#5c3a21] shadow-[2px_2px_0_0_rgba(0,0,0,0.3)]">
        <Sun className="w-3.5 h-3.5 text-[#e69d24] animate-spin" />
        <span>STAGE 00 // MINERAL VALLEY SANCTUARY</span>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-7 items-center">
        {/* Left: Farmer Avatar */}
        <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
          <PixelAvatar />
        </div>

        {/* Right: Main Content */}
        <div className="lg:col-span-7 space-y-3.5 sm:space-y-4 text-center lg:text-left order-2 lg:order-1">
          <div className="space-y-1.5">
            <div className="font-press-start text-[9px] sm:text-[10px] text-[#fff8eb] tracking-wider uppercase flex items-center justify-center lg:justify-start gap-1.5 drop-shadow-[1px_1px_0_#4a2e18]">
              <Sprout className="w-3.5 h-3.5 text-[#e69d24]" />
              <span>{DEVELOPER_INFO.classTitle}</span>
            </div>

            <h1 className="font-press-start text-2xl sm:text-3xl md:text-4xl text-[#fffdf5] tracking-tight leading-tight uppercase drop-shadow-[3px_3px_0_#4a2e18]">
              <span className="text-[#ffe082]">
                {DEVELOPER_INFO.name.split(' ')[0]}
              </span>{' '}
              <span className="text-[#fff8eb]">
                {DEVELOPER_INFO.name.split(' ').slice(1).join(' ')}
              </span>
            </h1>

            <p className="font-mono text-xs sm:text-sm text-[#faecd4] max-w-xl mx-auto lg:mx-0 drop-shadow-[1px_1px_0_#2c1808]">
              {DEVELOPER_INFO.tagline}
            </p>
          </div>

          {/* Quick Crop Badges */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 pt-0.5">
            <PixelBadge variant="yellow" size="sm" icon={<span className="mr-1">⚛️</span>}>
              REACT 19
            </PixelBadge>
            <PixelBadge variant="green" size="sm" icon={<span className="mr-1">🌿</span>}>
              TAILWIND CSS
            </PixelBadge>
            <PixelBadge variant="cyan" size="sm" icon={<span className="mr-1">📘</span>}>
              TYPESCRIPT
            </PixelBadge>
            <PixelBadge variant="pink" size="sm" icon={<span className="mr-1">▲</span>}>
              NEXT.JS 15
            </PixelBadge>
          </div>

          {/* Harvest Moon Wooden Dialogue Box */}
          <div className="relative bg-[#fff8eb] border-4 border-[#4a2e18] p-3.5 sm:p-4 shadow-[4px_4px_0_0_rgba(0,0,0,0.35)] text-left">
            <div className="flex items-center justify-between border-b border-[#8c5835]/30 pb-1.5 mb-2 font-press-start text-[8px] sm:text-[9px] text-[#8c5835]">
              <span className="flex items-center gap-1.5">
                <span>💬</span>
                <span>FARMER DIALOGUE</span>
              </span>
              <button
                onClick={() => {
                  playPowerUp();
                  nextDialogue();
                }}
                className="text-[#e69d24] hover:text-[#5c3a21] underline cursor-pointer"
                title="Next dialogue line"
              >
                NEXT ▶
              </button>
            </div>

            <div className="min-h-[45px] flex items-center">
              <p className="font-mono text-xs sm:text-sm text-[#362213] leading-relaxed">
                "{displayedText}
                <span className="inline-block w-2 h-3.5 bg-[#e69d24] ml-1 animate-retro-blink align-middle" />
                "
              </p>
            </div>

            {/* Corner Wooden Studs */}
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-[#4a2e18]" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#4a2e18]" />
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#4a2e18]" />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#4a2e18]" />
          </div>

          {/* Action Buttons Group */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-0.5">
            <PixelButton
              variant="primary"
              size="md"
              soundType="powerup"
              onClick={() => onNavigateStage(3)}
            >
              PRODUCE & QUESTS (03)
            </PixelButton>

            <PixelButton
              variant="wood"
              size="md"
              soundType="click"
              onClick={() => onNavigateStage(1)}
            >
              FARMER STATS (01)
            </PixelButton>

            <PixelButton
              variant="accent"
              size="md"
              soundType="jump"
              onClick={() => onNavigateStage(4)}
            >
              HARVEST GAME (04)
            </PixelButton>

            <PixelButton
              variant="green"
              size="md"
              soundType="coin"
              onClick={insertCoin}
            >
              🪙 +100 G
            </PixelButton>
          </div>
        </div>
      </div>

      {/* Bottom Stage Progress Quick Prompt */}
      <button
        onClick={() => onNavigateStage(1)}
        className="mt-5 sm:mt-6 flex items-center space-x-2 bg-[#fff8eb] border-2 border-[#4a2e18] px-3.5 py-1.5 font-press-start text-[8px] sm:text-[9px] text-[#4a2e18] hover:bg-[#ffe082] transition-all cursor-pointer shadow-[2px_2px_0_0_rgba(0,0,0,0.3)] group"
      >
        <span>VISIT PASTURE [ STAGE 01: STATS ]</span>
        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </button>
    </section>
  );
};
