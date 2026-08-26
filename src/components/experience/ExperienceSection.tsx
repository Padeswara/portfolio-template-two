import React, { useState } from 'react';
import { EXPERIENCE_DATA } from '../../data/portfolioData';
import { AchievementsModal } from './AchievementsModal';
import { PixelButton } from '../ui/PixelButton';
import { PixelBadge } from '../ui/PixelBadge';
import { useAudio } from '../../context/AudioContext';
import { useGame } from '../../context/GameContext';
import { Trophy, Calendar, MapPin, CheckCircle, ShieldCheck, ArrowRight } from 'lucide-react';
import { ACHIEVEMENTS } from '../../data/achievementsData';

interface ExperienceSectionProps {
  onNavigateStage?: (stageIndex: number) => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ onNavigateStage }) => {
  const { playPowerUp } = useAudio();
  const { unlockedAchievements } = useGame();
  const [trophyModalOpen, setTrophyModalOpen] = useState(false);

  const handleOpenTrophies = () => {
    playPowerUp();
    setTrophyModalOpen(true);
  };

  return (
    <section className="h-full overflow-y-auto py-6 sm:py-8 px-4 sm:px-6 select-none max-w-5xl mx-auto w-full">
      <div className="space-y-6">
        {/* Section Header */}
        <div className="text-center space-y-2">
          <div className="inline-block bg-black border-2 border-[#00f3ff] px-3 py-1 font-press-start text-[9px] text-[#00f3ff] shadow-[2px_2px_0_0_#ff007f]">
            STAGE 05 // GUILD HISTORY
          </div>
          <h2 className="font-press-start text-xl sm:text-2xl text-white uppercase drop-shadow-[2px_2px_0_#ff007f]">
            QUEST LOG & BOSS DEFEATS
          </h2>
          <p className="font-mono text-xs sm:text-sm text-gray-400 max-w-xl mx-auto">
            Chronological record of company campaigns, guild raids, and unlocked accomplishments.
          </p>

          {/* Quick Trophy Room CTA */}
          <div className="pt-1">
            <PixelButton
              variant="accent"
              size="md"
              soundType="powerup"
              onClick={handleOpenTrophies}
              icon={<Trophy className="w-3.5 h-3.5 text-black" />}
            >
              TROPHY ROOM ({unlockedAchievements.length}/{ACHIEVEMENTS.length} UNLOCKED)
            </PixelButton>
          </div>
        </div>

        {/* Timeline List */}
        <div className="relative border-l-4 border-[#00f3ff] ml-3 sm:ml-6 pl-5 sm:pl-7 space-y-6">
          {EXPERIENCE_DATA.map((exp, index) => (
            <div key={exp.id} className="relative group">
              {/* Timeline Marker */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-5 h-5 bg-black border-2 border-[#00f3ff] flex items-center justify-center text-[10px] shadow-[2px_2px_0_0_#ff007f]">
                {index === 0 ? '⚔️' : index === 1 ? '🛡️' : '📜'}
              </div>

              {/* Quest Card */}
              <div className="bg-[#140828] border-2 border-[var(--theme-border)] p-4 sm:p-5 shadow-[4px_4px_0_0_#000] relative">
                {/* Top Quest Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2.5 mb-2.5">
                  <div>
                    <span className="font-press-start text-[8px] sm:text-[9px] text-[#ffe600] tracking-wider">
                      {exp.questRank}
                    </span>
                    <h3 className="font-press-start text-xs sm:text-sm text-white mt-0.5">
                      {exp.role}
                    </h3>
                    <div className="font-mono text-xs text-[#00f3ff] font-bold">
                      @{exp.company}
                    </div>
                  </div>

                  <div className="flex flex-col sm:items-end gap-0.5 font-mono text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#ff007f]" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-gray-500" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <p className="font-mono text-xs sm:text-sm text-gray-200 leading-relaxed mb-3">
                  {exp.summary}
                </p>

                {/* Achievements Completed */}
                <div className="space-y-1.5 mb-3 bg-black/40 p-2.5 border border-white/10">
                  <div className="font-press-start text-[8px] text-[#39ff14] flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>RAID ACHIEVEMENTS & VICTORIES:</span>
                  </div>
                  <ul className="space-y-1 font-mono text-xs text-gray-300">
                    {exp.achievements.map((ach, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle className="w-3 h-3 text-[#39ff14] shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Loot Used */}
                <div className="flex flex-wrap gap-1">
                  {exp.skillsUsed.map((skill) => (
                    <PixelBadge key={skill} variant="cyan" size="sm">
                      {skill}
                    </PixelBadge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Next Stage Navigation CTA */}
        {onNavigateStage && (
          <div className="flex justify-end pt-2">
            <PixelButton
              variant="primary"
              size="md"
              soundType="jump"
              onClick={() => onNavigateStage(6)}
              icon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              NEXT: SAVE POINT & CONTACT (STAGE 06) ▶
            </PixelButton>
          </div>
        )}
      </div>

      {/* Trophy Showcase Modal */}
      <AchievementsModal
        isOpen={trophyModalOpen}
        onClose={() => setTrophyModalOpen(false)}
      />
    </section>
  );
};
