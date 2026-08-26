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
    <div className="bg-[#0b0318] border-t-4 border-[var(--theme-border)] text-white select-none py-2 px-3 sm:px-6 relative z-40 shadow-[0_-5px_15px_rgba(0,0,0,0.7)] shrink-0">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
        {/* Left: Prev Button & Home */}
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          <button
            onClick={handleHome}
            disabled={currentStage === 0}
            className="p-1.5 sm:p-2 bg-black border-2 border-white/20 hover:border-[#00f3ff] text-white disabled:opacity-40 disabled:hover:border-white/20 transition-all font-press-start text-[9px] flex items-center gap-1 shadow-[2px_2px_0_0_#000] active:translate-y-0.5 cursor-pointer"
            title="Return to Title Screen (Stage 00)"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="hidden md:inline">TITLE</span>
          </button>

          <button
            onClick={handlePrev}
            className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 bg-[#ff007f] text-white border-2 border-black hover:bg-[#ff4da6] font-press-start text-[9px] sm:text-[10px] flex items-center gap-1 shadow-[2px_2px_0_0_#000] active:translate-y-0.5 cursor-pointer"
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
          <div className="bg-black border-2 border-[#00f3ff] px-3 py-1 text-center shadow-[0_0_10px_rgba(0,243,255,0.3)] w-full flex items-center justify-center space-x-2">
            <span className="text-sm sm:text-base animate-pulse">{currentInfo.icon}</span>
            <span className="font-press-start text-[9px] sm:text-[11px] text-[#ffe600] tracking-wider truncate">
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
                    ? 'w-6 bg-[#00f3ff] border-[#00f3ff] shadow-[0_0_8px_#00f3ff]'
                    : 'w-2 bg-gray-800 border-gray-600 hover:bg-gray-600'
                }`}
                title={`Jump to ${s.stageNum}: ${s.title}`}
              />
            ))}
          </div>
        </div>

        {/* Right: Next Button & Coin Button */}
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          <button
            onClick={handleNext}
            className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 bg-[#00f3ff] text-black border-2 border-black hover:bg-[#80f9ff] font-press-start text-[9px] sm:text-[10px] flex items-center gap-1 shadow-[2px_2px_0_0_#ff007f] active:translate-y-0.5 cursor-pointer font-bold"
            title="Next Stage [E or Right Arrow]"
          >
            <span>NEXT</span>
            <span className="hidden sm:inline text-[8px] opacity-75 font-mono">(E)</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleCoin}
            className="hidden lg:flex items-center space-x-1 bg-yellow-950/60 border border-[#ffe600] px-2 py-1.5 font-press-start text-[8px] text-[#ffe600] hover:bg-yellow-900/60 transition-colors shadow-[2px_2px_0_0_#000] cursor-pointer"
            title="Insert Coin for +100 EXP"
          >
            <Sparkles className="w-3 h-3 text-[#ffe600] animate-spin" />
            <span>🪙 x{coins}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
