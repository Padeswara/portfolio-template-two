import React from 'react';
import type { Project } from '../../data/portfolioData';
import { PixelButton } from '../ui/PixelButton';
import { useAudio } from '../../context/AudioContext';
import { X, ExternalLink, Code2, Sparkles, CheckCircle } from 'lucide-react';

interface ProjectCartridgeModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectCartridgeModal: React.FC<ProjectCartridgeModalProps> = ({ project, onClose }) => {
  const { playClick, playLaser } = useAudio();

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl bg-[#fff8eb] border-4 border-[#4a2e18] shadow-[6px_6px_0_0_rgba(0,0,0,0.45)] text-[#362213] overflow-hidden">
        {/* Top Cartridge Header */}
        <div className="bg-[#8c5835] text-[#fff8eb] px-3.5 py-2 flex items-center justify-between border-b-2 border-[#4a2e18] font-press-start text-[9px] sm:text-[10px]">
          <div className="flex items-center space-x-2">
            <span className="text-sm">📦</span>
            <span className="truncate">{project.stageNumber}: {project.title}</span>
          </div>
          <button
            onClick={() => {
              playClick();
              onClose();
            }}
            className="p-0.5 text-[#fff8eb] hover:bg-[#4a2e18] cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 space-y-4 max-h-[80vh] overflow-y-auto font-mono text-xs">
          {/* Blueprint Info */}
          <div className="flex items-start space-x-3 bg-[#faecd4] p-3 border border-[#8c5835]/30">
            <div className="w-12 h-12 bg-[#fff8eb] border-2 border-[#8c5835] flex items-center justify-center text-2xl shrink-0">
              {project.image}
            </div>
            <div>
              <div className="font-press-start text-[9px] text-[#5a8740]">
                {project.bossRank} HARVEST
              </div>
              <h3 className="font-press-start text-xs sm:text-sm text-[#362213] mt-0.5">
                {project.title}
              </h3>
              <p className="text-[#5c3a21] mt-0.5 font-sans text-xs">
                {project.subtitle}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <div className="font-press-start text-[8px] text-[#8c5835]">
              HARVEST SPECIFICATIONS:
            </div>
            <p className="text-[#362213] leading-relaxed bg-[#fff8eb] p-2.5 border border-[#8c5835]/20">
              {project.longDescription}
            </p>
          </div>

          {/* Key Features */}
          <div className="space-y-1.5">
            <div className="font-press-start text-[8px] text-[#5a8740]">
              BLUEPRINT HIGHLIGHTS:
            </div>
            <div className="space-y-1 bg-[#faecd4] p-2.5 border border-[#8c5835]/30">
              {project.keyFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-start space-x-2 text-[#362213]">
                  <CheckCircle className="w-3.5 h-3.5 text-[#5a8740] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Loot Drops */}
          <div className="space-y-1">
            <div className="font-press-start text-[8px] text-[#e69d24]">
              LOOT REWARDS EARNED:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.lootDrops.map((loot, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 bg-[#faecd4] border border-[#e69d24] text-[9px] text-[#5c3a21] font-press-start flex items-center gap-1"
                >
                  <Sparkles className="w-2.5 h-2.5 text-[#e69d24]" />
                  <span>{loot}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="pt-2 border-t border-[#8c5835]/30 flex flex-wrap items-center justify-end gap-2">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => playLaser()}
            >
              <PixelButton variant="dark" size="sm" icon={<Code2 className="w-3.5 h-3.5" />}>
                SOURCE CODE
              </PixelButton>
            </a>
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => playLaser()}
            >
              <PixelButton variant="primary" size="sm" icon={<ExternalLink className="w-3.5 h-3.5" />}>
                LAUNCH LIVE DEMO
              </PixelButton>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
