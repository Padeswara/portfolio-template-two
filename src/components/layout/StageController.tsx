import React from 'react';
import { useAudio } from '../../context/AudioContext';
import { useGame } from '../../context/GameContext';
import { ChevronLeft, ChevronRight, Home, Sparkles } from 'lucide-react';
import { STAGES } from '../../data/stagesData';

interface StageControllerProps {
  currentStage: number;
  onSelectStage: (index: number) => void;
}

export const StageController: React.FC<StageControllerProps> = ({ currentStage, onSelectStage }) => {
  const { playClick, playJump, playCoin } = useAudio();
  const { insertCoin, coins } = useGame();

  const handlePrev = () => {
    playJump();
    const prev = currentStage > 0 ? currentStage - 1 : STAGES.length - 1;
    onSelectStage(prev);
  };

  const handleNext = () => {
    playJump();
    const next = currentStage < STAGES.length - 1 ? currentStage + 1 : 0;
    onSelectStage(next);
  };

  const handleHome = () => {
    playClick();
    onSelectStage(0);
  };

  const handleCoin = () => {
    playCoin();
    insertCoin();
  };

  const currentInfo = STAGES[currentStage];

  return (
    <div className="bg-[#2d1b0d] border-t-4 border-[#8c5835] text-[#fff8eb] select-none py-2 px-3 sm:px-6 relative z-40 shadow-[0_-5px_15px_rgba(0,0,0,0.4)] shrink-0">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
        {/* Left: Prev Button & Home */}
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          <button
            onClick={handleHome}
            disabled={currentStage === 0}
            className="p-1.5 sm:p-2 bg-[#4a2e18] border-2 border-[#8c5835] hover:border-[#e69d24] text-[#fff8eb] disabled:opacity-40 disabled:hover:border-[#8c5835] transition-all font-press-start text-[9px] flex items-center gap-1 shadow-[2px_2px_0_0_#120803] active:translate-y-0.5 cursor-pointer"
            title="Return to Farm Title (Stage 00)"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="hidden md:inline">TITLE</span>
          </button>

          <button
            onClick={handlePrev}
            className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 bg-[#d64545] text-white border-2 border-[#4a1818] hover:bg-[#e65c5c] font-press-start text-[9px] sm:text-[10px] flex items-center gap-1 shadow-[2px_2px_0_0_#120803] active:translate-y-0.5 cursor-pointer"
            title="Previous Stage [Q or Left Arrow]"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>PREV</span>
            <span className="hidden sm:inline text-[8px] opacity-75 font-mono">(Q)</span>
          </button>
        </div>

        {/* Center: LED Stage Display & Interactive Dots */}
        <div className="flex flex-col items-center justify-center max-w-xs sm:max-w-md w-full px-2">
          {/* LED Banner */}
          <div className="bg-[#120803] border-2 border-[#e69d24] px-3 py-1 text-center shadow-[0_0_10px_rgba(230,157,36,0.3)] w-full flex items-center justify-center space-x-2">
            <span className="text-sm sm:text-base animate-pulse">{currentInfo.icon}</span>
            <span className="font-press-start text-[9px] sm:text-[11px] text-[#ffe082] tracking-wider truncate">
              {currentInfo.stageNum}: {currentInfo.title}
            </span>
          </div>

          {/* Step Indicator Dots */}
          <div className="flex items-center space-x-1.5 mt-1.5">
            {STAGES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => {
                  playClick();
                  onSelectStage(idx);
                }}
                className={`h-2 transition-all cursor-pointer border ${
                  currentStage === idx
                    ? 'w-6 bg-[#e69d24] border-[#e69d24] shadow-[0_0_6px_#e69d24]'
                    : 'w-2 bg-[#4a2e18] border-[#8c5835] hover:bg-[#6e4424]'
                }`}
                title={`Jump to ${s.stageNum}: ${s.title}`}
              />
            ))}
          </div>
        </div>

        {/* Right: Next Button & Gold Button */}
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          <button
            onClick={handleNext}
            className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 bg-[#e69d24] text-[#2c1808] border-2 border-[#4a2e18] hover:bg-[#f5b33d] font-press-start text-[9px] sm:text-[10px] flex items-center gap-1 shadow-[2px_2px_0_0_#120803] active:translate-y-0.5 cursor-pointer font-bold"
            title="Next Stage [E or Right Arrow]"
          >
            <span>NEXT</span>
            <span className="hidden sm:inline text-[8px] opacity-75 font-mono">(E)</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleCoin}
            className="hidden lg:flex items-center space-x-1 bg-[#4a2e18] border border-[#e69d24] px-2 py-1.5 font-press-start text-[8px] text-[#ffe082] hover:bg-[#5c3a21] transition-colors shadow-[2px_2px_0_0_#120803] cursor-pointer"
            title="Harvest for +100 G & EXP"
          >
            <Sparkles className="w-3 h-3 text-[#ffe082]" />
            <span>🪙 {coins * 100} G</span>
          </button>
        </div>
      </div>
    </div>
  );
};
