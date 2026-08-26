import React, { useState } from 'react';
import { PROJECTS_DATA, type Project } from '../../data/portfolioData';
import { ProjectCartridgeModal } from './ProjectCartridgeModal';
import { PixelCard } from '../ui/PixelCard';
import { PixelButton } from '../ui/PixelButton';
import { useAudio } from '../../context/AudioContext';
import { useGame } from '../../context/GameContext';
import { ExternalLink, Eye, ArrowRight, PackageCheck } from 'lucide-react';

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
    <section className="h-full overflow-y-auto py-6 sm:py-8 px-4 sm:px-8 select-none max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Side: Title & Harvest Telemetry Panel */}
        <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-2">
          {/* Section Header */}
          <div className="space-y-1.5 border-b-2 border-[#8c5835]/30 pb-3">
            <div className="inline-block bg-[#fff8eb] border-2 border-[#8c5835] px-2.5 py-1 font-press-start text-[8px] sm:text-[9px] text-[#5c3a21] shadow-[2px_2px_0_0_rgba(0,0,0,0.25)]">
              STAGE 03 // SHIPPED PRODUCE
            </div>
            <h2 className="font-press-start text-xl sm:text-2xl text-[#fffdf5] uppercase drop-shadow-[2px_2px_0_#4a2e18] leading-tight">
              SHIPPED PRODUCE & PROJECTS
            </h2>
            <p className="font-mono text-xs text-[#faecd4] leading-relaxed drop-shadow-[1px_1px_0_#2c1808]">
              Completed production-grade applications engineered with modern web stacks.
            </p>
          </div>

          {/* Shipping Bin Telemetry Box */}
          <PixelCard
            title="SHIPPING BIN TELEMETRY"
            badge="CLEARED"
            headerColor="wood"
            borderColor="wood"
          >
            <div className="space-y-2 font-mono text-xs text-[#362213]">
              <div className="flex justify-between items-center bg-[#faecd4] p-2 border border-[#8c5835]/30">
                <span className="text-[#5c3a21]">PRODUCE SHIPPED:</span>
                <span className="font-press-start text-[9px] text-[#5a8740]">4 / 4 CROPS</span>
              </div>
              <div className="flex justify-between items-center bg-[#faecd4] p-2 border border-[#8c5835]/30">
                <span className="text-[#5c3a21]">TOWN CHALLENGES:</span>
                <span className="font-press-start text-[9px] text-[#8c5835]">4 CLEARED</span>
              </div>
              <div className="flex justify-between items-center bg-[#faecd4] p-2 border border-[#8c5835]/30">
                <span className="text-[#5c3a21]">AVERAGE QUALITY:</span>
                <span className="font-press-start text-[9px] text-[#c48114]">RANK S+ GOLD</span>
              </div>
            </div>
          </PixelCard>

          {/* Next Stage Navigation CTA */}
          {onNavigateStage && (
            <PixelButton
              variant="accent"
              size="md"
              soundType="jump"
              onClick={() => onNavigateStage(4)}
              icon={<ArrowRight className="w-3.5 h-3.5" />}
              className="w-full justify-between"
            >
              <span>NEXT: HARVEST GAME (04)</span>
            </PixelButton>
          )}
        </div>

        {/* Right Side: Projects Grid */}
        <div className="lg:col-span-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PROJECTS_DATA.map((project) => (
              <PixelCard
                key={project.id}
                title={`${project.stageNumber} // ${project.title}`}
                badge={project.bossRank}
                headerColor={
                  project.bossRank === 'Rank S+'
                    ? 'yellow'
                    : project.bossRank === 'Rank S'
                    ? 'green'
                    : 'wood'
                }
                borderColor={
                  project.bossRank === 'Rank S+'
                    ? 'yellow'
                    : project.bossRank === 'Rank S'
                    ? 'green'
                    : 'wood'
                }
                className="flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  {/* Thumbnail Banner */}
                  <div className="h-28 bg-[#faecd4] border-2 border-[#8c5835]/40 relative overflow-hidden flex items-center justify-center group">
                    <div className="text-4xl group-hover:scale-110 transition-transform duration-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]">
                      {project.image}
                    </div>

                    <div className="absolute top-1.5 left-1.5 bg-[#fff8eb] border border-[#8c5835] px-1.5 py-0.5 font-press-start text-[7px] text-[#5c3a21] flex items-center gap-1">
                      <PackageCheck className="w-2.5 h-2.5 text-[#5a8740]" />
                      <span>{project.bossName}</span>
                    </div>

                    <div className="absolute bottom-1.5 right-1.5 bg-[#4a2e18] text-[#ffe082] px-1.5 py-0.5 font-press-start text-[7px]">
                      {project.stageNumber}
                    </div>
                  </div>

                  {/* Subtitle & Description */}
                  <div>
                    <h4 className="font-press-start text-[10px] text-[#362213] truncate">
                      {project.subtitle}
                    </h4>
                    <p className="font-mono text-xs text-[#5c3a21] mt-1 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-1.5 py-0.5 bg-[#faecd4] border border-[#8c5835]/40 text-[9px] font-mono text-[#4a2e18]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-between gap-2 pt-2.5 border-t border-[#8c5835]/20 mt-2.5">
                  <button
                    onClick={() => handleInspect(project)}
                    className="flex items-center space-x-1 font-press-start text-[8px] text-[#8c5835] hover:text-[#5a8740] transition-colors cursor-pointer"
                  >
                    <Eye className="w-3 h-3" />
                    <span>INSPECT BLUEPRINT</span>
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
        </div>
      </div>

      {/* Cartridge / Blueprint Inspection Modal */}
      <ProjectCartridgeModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
