import React, { useState } from 'react';
import { PROJECTS_DATA, type Project } from '../../data/portfolioData';
import { ProjectCartridgeModal } from './ProjectCartridgeModal';
import { PixelCard } from '../ui/PixelCard';
import { PixelButton } from '../ui/PixelButton';
import { useAudio } from '../../context/AudioContext';
import { useGame } from '../../context/GameContext';
import { ExternalLink, Eye, Skull, ArrowRight } from 'lucide-react';

interface ProjectsSectionProps {
  onNavigateStage?: (stageIndex: number) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onNavigateStage }) => {
  const { playPowerUp, playLaser } = useAudio();
  const { unlockAchievement, addExp } = useGame();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleInspect = (project: Project) => {
    playPowerUp();
    addExp(30);
    unlockAchievement('project_inspector');
    setSelectedProject(project);
  };

  return (
    <section className="h-full overflow-y-auto py-6 sm:py-8 px-4 sm:px-6 select-none max-w-6xl mx-auto w-full">
      <div className="space-y-6">
        {/* Section Header */}
        <div className="text-left space-y-2">
          <div className="inline-block bg-black border-2 border-[#ffe600] px-3 py-1 font-press-start text-[9px] text-[#ffe600] shadow-[2px_2px_0_0_#ff007f]">
            STAGE 03 // WORLD MAP & QUESTS
          </div>
          <h2 className="font-press-start text-xl sm:text-2xl text-white uppercase drop-shadow-[2px_2px_0_#ffe600]">
            STAGE SELECT // FEATURED MISSIONS
          </h2>
          <p className="font-mono text-xs sm:text-sm text-gray-400 max-w-xl">
            Completed boss raids and production-grade applications engineered with modern web stacks.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {PROJECTS_DATA.map((project) => (
            <PixelCard
              key={project.id}
              title={`${project.stageNumber} // ${project.title}`}
              badge={project.bossRank}
              headerColor={
                project.bossRank === 'Rank S+'
                  ? 'pink'
                  : project.bossRank === 'Rank S'
                  ? 'cyan'
                  : 'yellow'
              }
              borderColor={
                project.bossRank === 'Rank S+'
                  ? 'pink'
                  : project.bossRank === 'Rank S'
                  ? 'cyan'
                  : 'yellow'
              }
              className="flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Project Visual / Thumbnail Canvas Banner */}
                <div className="h-32 sm:h-36 bg-gradient-to-br from-[#1a0833] via-black to-[#0d031c] border-2 border-white/15 relative overflow-hidden flex items-center justify-center group">
                  {/* Background grid */}
                  <div className="absolute inset-0 retro-grid opacity-30" />
                  
                  {/* Large Icon */}
                  <div className="text-5xl group-hover:scale-125 transition-transform duration-300 drop-shadow-[0_0_15px_rgba(0,243,255,0.6)]">
                    {project.image}
                  </div>

                  {/* Boss Defeated Banner */}
                  <div className="absolute top-2 left-2 bg-black/80 border border-[#ff3838] px-2 py-0.5 font-press-start text-[7px] text-[#ff3838] flex items-center gap-1">
                    <Skull className="w-2.5 h-2.5 text-[#ff3838]" />
                    <span>BOSS: {project.bossName}</span>
                  </div>

                  {/* Stage Badge */}
                  <div className="absolute bottom-2 right-2 bg-black/90 border border-[#ffe600] px-1.5 py-0.5 font-press-start text-[7px] text-[#ffe600]">
                    {project.stageNumber}
                  </div>
                </div>

                {/* Subtitle & Short Description */}
                <div>
                  <h4 className="font-press-start text-xs text-white truncate">
                    {project.subtitle}
                  </h4>
                  <p className="font-mono text-xs text-gray-300 mt-1 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-1.5 py-0.5 bg-black/70 border border-white/20 text-[9px] font-mono text-[#00f3ff]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-2 pt-3 border-t border-white/10 mt-3">
                <button
                  onClick={() => handleInspect(project)}
                  className="flex items-center space-x-1 font-press-start text-[8px] sm:text-[9px] text-[#ffe600] hover:text-white transition-colors cursor-pointer"
                >
                  <Eye className="w-3 h-3" />
                  <span>INSPECT CARTRIDGE</span>
                </button>

                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => playLaser()}
                >
                  <PixelButton variant="primary" size="sm" icon={<ExternalLink className="w-3 h-3" />}>
                    DEMO
                  </PixelButton>
                </a>
              </div>
            </PixelCard>
          ))}
        </div>

        {/* Next Stage Navigation CTA */}
        {onNavigateStage && (
          <div className="flex justify-end pt-2">
            <PixelButton
              variant="accent"
              size="md"
              soundType="jump"
              onClick={() => onNavigateStage(4)}
              icon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              NEXT: ARCADE MINI-GAME (STAGE 04) ▶
            </PixelButton>
          </div>
        )}
      </div>

      {/* Cartridge Modal */}
      <ProjectCartridgeModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
