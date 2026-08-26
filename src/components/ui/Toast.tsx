import React from 'react';
import { useGame } from '../../context/GameContext';
import { useAudio } from '../../context/AudioContext';
import { Trophy, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { recentAchievement, dismissToast } = useGame();
  const { playClick } = useAudio();

  if (!recentAchievement) return null;

  const handleDismiss = () => {
    playClick();
    dismissToast();
  };

  return (
    <div className="fixed bottom-6 right-6 z-[10001] max-w-sm w-full animate-bounce duration-500">
      <div className="bg-[#15082a] border-4 border-[#ffe600] p-4 shadow-[8px_8px_0_0_#000] relative">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b-2 border-[#ffe600]/40 pb-2 mb-2">
          <div className="flex items-center space-x-2">
            <Trophy className="w-4 h-4 text-[#ffe600] animate-spin" />
            <span className="font-press-start text-[10px] text-[#ffe600] tracking-wider">
              ACHIEVEMENT UNLOCKED!
            </span>
          </div>
          <button
            onClick={handleDismiss}
            className="text-white hover:text-[#ff007f] p-0.5"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex items-start space-x-3">
          <div className="text-3xl bg-black/50 p-2 border-2 border-white/20 shrink-0">
            {recentAchievement.icon}
          </div>
          <div className="space-y-1 min-w-0">
            <h4 className="font-press-start text-xs text-white truncate">
              {recentAchievement.title}
            </h4>
            <p className="text-xs text-gray-300 font-mono line-clamp-2">
              {recentAchievement.description}
            </p>
            <div className="pt-1">
              <span className="inline-block bg-[#39ff14]/20 border border-[#39ff14] text-[#39ff14] font-press-start text-[8px] px-1.5 py-0.5">
                +{recentAchievement.expReward} EXP REWARD
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

