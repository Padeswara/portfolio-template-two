import React from 'react';
import { useGame } from '../../context/GameContext';
import { Sparkles, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { recentAchievement, dismissToast } = useGame();

  if (!recentAchievement) return null;

  return (
    <div className="fixed bottom-16 right-4 z-50 animate-in slide-in-from-bottom-5 fade-in duration-200 select-none max-w-xs sm:max-w-sm">
      <div className="bg-[#fff8eb] border-4 border-[#e69d24] p-3 shadow-[6px_6px_0_0_rgba(0,0,0,0.4)] flex items-start space-x-3 text-[#362213] relative">
        {/* Close */}
        <button
          onClick={dismissToast}
          className="absolute top-1 right-1 text-[#8c5835] hover:text-[#362213] p-0.5"
          aria-label="Dismiss toast"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        {/* Icon */}
        <div className="w-10 h-10 bg-[#faecd4] border-2 border-[#8c5835] flex items-center justify-center text-xl shrink-0 shadow-[2px_2px_0_0_rgba(0,0,0,0.15)]">
          {recentAchievement.icon}
        </div>

        {/* Text */}
        <div className="min-w-0 flex-1 pr-3">
          <div className="flex items-center space-x-1 font-press-start text-[8px] text-[#e69d24]">
            <Sparkles className="w-2.5 h-2.5 animate-spin" />
            <span>HARVEST BADGE UNLOCKED!</span>
          </div>
          <h4 className="font-press-start text-[9px] sm:text-[10px] text-[#362213] mt-0.5 truncate">
            {recentAchievement.title}
          </h4>
          <p className="font-mono text-[11px] text-[#5c3a21] mt-0.5 line-clamp-2">
            {recentAchievement.description}
          </p>
        </div>
      </div>
    </div>
  );
};
