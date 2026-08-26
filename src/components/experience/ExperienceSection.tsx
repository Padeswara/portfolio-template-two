import React, { useState } from 'react';
import { EXPERIENCE_DATA } from '../../data/portfolioData';
import { AchievementsModal } from './AchievementsModal';
import { PixelButton } from '../ui/PixelButton';
import { PixelBadge } from '../ui/PixelBadge';
import { PixelCard } from '../ui/PixelCard';
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
    <section className="h-full overflow-y-auto py-6 sm:py-8 px-4 sm:px-8 select-none max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Side: Title & Trophy Room Overview Panel */}
        <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-2">
          {/* Section Header */}
          <div className="space-y-1.5 border-b-2 border-[#8c5835]/30 pb-3">
            <div className="inline-block bg-[#fff8eb] border-2 border-[#8c5835] px-2.5 py-1 font-press-start text-[8px] sm:text-[9px] text-[#5c3a21] shadow-[2px_2px_0_0_rgba(0,0,0,0.25)]">
              STAGE 05 // TOWN CHRONICLES
            </div>
            <h2 className="font-press-start text-xl sm:text-2xl text-[#fffdf5] uppercase drop-shadow-[2px_2px_0_#4a2e18] leading-tight">
              TOWN LOGS & HISTORY
            </h2>
            <p className="font-mono text-xs text-[#faecd4] leading-relaxed drop-shadow-[1px_1px_0_#2c1808]">
              Chronological record of artisan guild tenures, harvest campaigns, and milestones.
            </p>
          </div>

          {/* Trophy Room Overview Box */}
          <PixelCard
            title="TOWN TROPHY SHED"
            badge={`${unlockedAchievements.length}/${ACHIEVEMENTS.length}`}
            headerColor="yellow"
            borderColor="yellow"
          >
            <div className="space-y-2.5">
              <p className="font-mono text-xs text-[#362213]">
                You have unlocked <span className="text-[#e69d24] font-bold">{unlockedAchievements.length}</span> out of <span className="text-[#5c3a21] font-bold">{ACHIEVEMENTS.length}</span> village badges!
              </p>
              <PixelButton
                variant="primary"
                size="md"
                soundType="powerup"
                onClick={handleOpenTrophies}
                icon={<Trophy className="w-3.5 h-3.5 text-[#2c1808]" />}
                className="w-full justify-center"
              >
                OPEN TROPHY SHED
              </PixelButton>
            </div>
          </PixelCard>

          {/* Next Stage Navigation CTA */}
          {onNavigateStage && (
            <PixelButton
              variant="accent"
              size="md"
              soundType="jump"
              onClick={() => onNavigateStage(6)}
              icon={<ArrowRight className="w-3.5 h-3.5" />}
              className="w-full justify-between"
            >
              <span>NEXT: MAILBOX & CONTACT (06)</span>
            </PixelButton>
          )}
        </div>

        {/* Right Side: Timeline List */}
        <div className="lg:col-span-8 relative border-l-4 border-[#8c5835] ml-3 sm:ml-6 pl-5 sm:pl-7 space-y-5">
          {EXPERIENCE_DATA.map((exp, index) => (
            <div key={exp.id} className="relative group">
              {/* Timeline Marker */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-5 h-5 bg-[#fff8eb] border-2 border-[#8c5835] flex items-center justify-center text-[10px] shadow-[2px_2px_0_0_rgba(0,0,0,0.25)]">
                {index === 0 ? '🌻' : index === 1 ? '🌾' : '🌱'}
              </div>

              {/* Quest Card */}
              <div className="bg-[#fff8eb] border-2 border-[#8c5835] p-4 shadow-[3px_3px_0_0_rgba(0,0,0,0.25)] relative text-[#362213]">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#8c5835]/20 pb-2 mb-2">
                  <div>
                    <span className="font-press-start text-[8px] sm:text-[9px] text-[#e69d24] tracking-wider">
                      {exp.questRank}
                    </span>
                    <h3 className="font-press-start text-xs sm:text-sm text-[#362213] mt-0.5">
                      {exp.role}
                    </h3>
                    <div className="font-mono text-xs text-[#5a8740] font-bold">
                      @{exp.company}
                    </div>
                  </div>

                  <div className="flex flex-col sm:items-end gap-0.5 font-mono text-xs text-[#785a44]">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#d64545]" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#8c5835]" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <p className="font-mono text-xs sm:text-sm text-[#5c3a21] leading-relaxed mb-2.5">
                  {exp.summary}
                </p>

                {/* Achievements */}
                <div className="space-y-1 mb-3 bg-[#faecd4] p-2.5 border border-[#8c5835]/30">
                  <div className="font-press-start text-[8px] text-[#4a6b36] flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>KEY CONTRIBUTIONS & HARVESTS:</span>
                  </div>
                  <ul className="space-y-1 font-mono text-xs text-[#362213]">
                    {exp.achievements.map((ach, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle className="w-3 h-3 text-[#5a8740] shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Loot */}
                <div className="flex flex-wrap gap-1">
                  {exp.skillsUsed.map((skill) => (
                    <PixelBadge key={skill} variant="wood" size="sm">
                      {skill}
                    </PixelBadge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trophy Modal */}
      <AchievementsModal
        isOpen={trophyModalOpen}
        onClose={() => setTrophyModalOpen(false)}
      />
    </section>
  );
};
