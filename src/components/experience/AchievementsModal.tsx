import React from 'react';
import { ACHIEVEMENTS } from '../../data/achievementsData';
import { useGame } from '../../context/GameContext';
import { useAudio } from '../../context/AudioContext';
import { PixelBadge } from '../ui/PixelBadge';
import { X, Lock, Trophy } from 'lucide-react';

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AchievementsModal: React.FC<AchievementsModalProps> = ({ isOpen, onClose }) => {
  const { unlockedAchievements } = useGame();
  const { playClick } = useAudio();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-[#fff8eb] border-4 border-[#4a2e18] shadow-[6px_6px_0_0_rgba(0,0,0,0.45)] text-[#362213] overflow-hidden">
        {/* Top Header */}
        <div className="bg-[#8c5835] text-[#fff8eb] px-4 py-2.5 flex items-center justify-between border-b-2 border-[#4a2e18] font-press-start text-[9px] sm:text-[10px]">
          <div className="flex items-center space-x-2">
            <Trophy className="w-4 h-4 text-[#ffe082]" />
            <span>TOWN TROPHY SHED ({unlockedAchievements.length}/{ACHIEVEMENTS.length})</span>
          </div>
          <button
            onClick={() => {
              playClick();
              onClose();
            }}
            className="p-1 hover:bg-[#4a2e18] text-[#fff8eb] cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List of Badges */}
        <div className="p-4 sm:p-5 space-y-3 max-h-[70vh] overflow-y-auto">
          <p className="font-mono text-xs text-[#5c3a21]">
            Unlock village secrets by interacting with the farm tools, listening to BGM, watering crops, and casting abilities!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {ACHIEVEMENTS.map((ach) => {
              const isUnlocked = unlockedAchievements.includes(ach.id);
              return (
                <div
                  key={ach.id}
                  className={`p-3 border-2 transition-all flex items-start space-x-3 ${
                    isUnlocked
                      ? 'bg-[#faecd4] border-[#e69d24] shadow-[2px_2px_0_0_rgba(0,0,0,0.15)]'
                      : 'bg-[#fff8eb]/50 border-gray-300 opacity-60'
                  }`}
                >
                  <div className="w-10 h-10 bg-[#fff8eb] border border-[#8c5835]/40 flex items-center justify-center text-xl shrink-0">
                    {isUnlocked ? ach.icon : <Lock className="w-4 h-4 text-gray-500" />}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="font-press-start text-[9px] text-[#362213] truncate">
                        {ach.title}
                      </h4>
                      {isUnlocked && (
                        <PixelBadge variant="green" size="sm">
                          UNLOCKED
                        </PixelBadge>
                      )}
                    </div>
                    <p className="font-mono text-[11px] text-[#5c3a21] mt-0.5 leading-snug">
                      {ach.description}
                    </p>
                    <div className="mt-1 font-press-start text-[7px] text-[#e69d24]">
                      REWARD: +{ach.rewardExp} EXP / +{ach.rewardCoins * 100} G
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
