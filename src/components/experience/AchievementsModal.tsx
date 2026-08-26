import React from 'react';
import { ACHIEVEMENTS } from '../../data/achievementsData';
import { useGame } from '../../context/GameContext';
import { useAudio } from '../../context/AudioContext';
import { X, Lock, CheckCircle2 } from 'lucide-react';

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AchievementsModal: React.FC<AchievementsModalProps> = ({ isOpen, onClose }) => {
  const { unlockedAchievements } = useGame();
  const { playClick } = useAudio();

  if (!isOpen) return null;

  const total = ACHIEVEMENTS.length;
  const unlockedCount = unlockedAchievements.length;
  const progressPercent = Math.floor((unlockedCount / total) * 100);

  const handleClose = () => {
    playClick();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150 select-none">
      <div className="relative w-full max-w-2xl bg-[#140828] border-4 border-[#ffe600] shadow-[10px_10px_0_0_#000] text-white p-5 sm:p-7 max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-[#ffe600]/40 pb-4 mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-950/60 border-2 border-[#ffe600] flex items-center justify-center text-xl">
              🏆
            </div>
            <div>
              <h3 className="font-press-start text-sm sm:text-base text-[#ffe600]">
                TROPHY & ACHIEVEMENTS ROOM
              </h3>
              <p className="font-mono text-xs text-gray-400 mt-0.5">
                Unlock trophies by interacting with secret quests and easter eggs!
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1 text-gray-400 hover:text-[#ff007f] hover:bg-white/10 border border-white/20 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Overview Bar */}
        <div className="bg-black/60 border border-white/10 p-3 mb-5 space-y-2">
          <div className="flex justify-between items-center text-xs font-press-start">
            <span className="text-gray-300">COMPLETION:</span>
            <span className="text-[#39ff14]">
              {unlockedCount} / {total} ({progressPercent}%)
            </span>
          </div>
          <div className="w-full h-3 bg-gray-900 border border-white/20 p-0.5">
            <div
              className="h-full bg-gradient-to-r from-[#00f3ff] via-[#ffe600] to-[#39ff14] transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ACHIEVEMENTS.map((ach) => {
            const isUnlocked = unlockedAchievements.includes(ach.id);
            return (
              <div
                key={ach.id}
                className={`p-3 border-2 flex items-start space-x-3 transition-all ${
                  isUnlocked
                    ? 'bg-[#1e0d3b] border-[#ffe600] shadow-[3px_3px_0_0_#000]'
                    : 'bg-black/40 border-gray-800 opacity-60'
                }`}
              >
                <div
                  className={`w-10 h-10 flex items-center justify-center text-xl shrink-0 border ${
                    isUnlocked
                      ? 'bg-yellow-950/40 border-[#ffe600]'
                      : 'bg-gray-900 border-gray-700'
                  }`}
                >
                  {isUnlocked ? ach.icon : <Lock className="w-4 h-4 text-gray-500" />}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h4
                      className={`font-press-start text-[9px] truncate ${
                        isUnlocked ? 'text-[#ffe600]' : 'text-gray-400'
                      }`}
                    >
                      {ach.title}
                    </h4>
                    {isUnlocked && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#39ff14] shrink-0 ml-1" />
                    )}
                  </div>

                  <p className="font-mono text-[11px] text-gray-300 mt-1 leading-snug">
                    {isUnlocked ? ach.description : '??? (Hidden Quest)'}
                  </p>

                  <div className="mt-1.5">
                    <span
                      className={`text-[8px] font-press-start px-1.5 py-0.5 border ${
                        isUnlocked
                          ? 'border-[#39ff14] text-[#39ff14] bg-[#39ff14]/10'
                          : 'border-gray-700 text-gray-500'
                      }`}
                    >
                      +{ach.expReward} EXP
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
