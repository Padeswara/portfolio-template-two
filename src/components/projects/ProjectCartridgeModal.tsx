import React from 'react';
import type { Project } from '../../data/portfolioData';
import { PixelButton } from '../ui/PixelButton';
import { PixelBadge } from '../ui/PixelBadge';
import { useAudio } from '../../context/AudioContext';
import { X, ExternalLink, Code2, Skull, Gift, CheckCircle2 } from 'lucide-react';

interface ProjectCartridgeModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectCartridgeModal: React.FC<ProjectCartridgeModalProps> = ({ project, onClose }) => {
  const { playClick, playLaser } = useAudio();

  if (!project) return null;

  const handleClose = () => {
    playClick();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      {/* Retro Cartridge Shell */}
      <div className="relative w-full max-w-2xl bg-[#180b30] border-4 border-[#00f3ff] shadow-[10px_10px_0_0_#000] text-white p-5 sm:p-7 max-h-[90vh] overflow-y-auto">
        {/* Cartridge Notch / Grip Top */}
        <div className="flex justify-center -mt-8 mb-4">
          <div className="bg-[#241245] border-2 border-[#00f3ff] px-6 py-1 text-[8px] font-press-start text-[#00f3ff] shadow-[2px_2px_0_0_#000]">
            ★ 64-BIT CARTRIDGE INSERTED ★
          </div>
        </div>

        {/* Top Header */}
        <div className="flex items-start justify-between border-b-2 border-white/15 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-press-start text-[10px] text-[#ffe600]">
                {project.stageNumber}
              </span>
              <PixelBadge variant="pink" size="sm">
                {project.bossRank}
              </PixelBadge>
            </div>
            <h3 className="font-press-start text-base sm:text-xl text-white mt-1">
              {project.title}
            </h3>
            <p className="font-mono text-xs text-gray-400 mt-0.5">
              {project.subtitle}
            </p>
          </div>

          <button
            onClick={handleClose}
            className="p-1 text-gray-400 hover:text-[#ff007f] hover:bg-white/10 border border-white/20 transition-colors"
            aria-label="Close cartridge modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="space-y-5 my-5">
          {/* Boss Encounter Banner */}
          <div className="bg-red-950/40 border-2 border-[#ff3838] p-3 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs font-press-start text-[#ff3838]">
              <Skull className="w-4 h-4 text-[#ff3838] animate-bounce" />
              <span>BOSS: {project.bossName}</span>
            </div>
            <span className="font-mono text-xs text-[#ffe600] font-bold">
              STATUS: DEFEATED ⚔️
            </span>
          </div>

          {/* Long Description */}
          <div className="font-mono text-sm text-gray-200 leading-relaxed bg-black/40 p-4 border border-white/10">
            {project.longDescription}
          </div>

          {/* Key Features Checkpoints */}
          <div className="space-y-2">
            <div className="font-press-start text-[10px] text-[#00f3ff]">
              QUEST OBJECTIVES COMPLETED:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs text-gray-300">
              {project.keyFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-start space-x-2 bg-[#120625] p-2 border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-[#39ff14] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Loot Drops */}
          <div className="space-y-2">
            <div className="font-press-start text-[10px] text-[#ffe600] flex items-center gap-1.5">
              <Gift className="w-3.5 h-3.5" />
              <span>TECH STACK & LOOT DROPS:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <PixelBadge key={tag} variant="cyan" size="sm">
                  {tag}
                </PixelBadge>
              ))}
              {project.lootDrops.map((loot) => (
                <PixelBadge key={loot} variant="yellow" size="sm">
                  {loot}
                </PixelBadge>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t-2 border-white/15">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => playLaser()}
          >
            <PixelButton
              variant="dark"
              size="md"
              icon={<Code2 className="w-4 h-4" />}
            >
              SOURCE CODE
            </PixelButton>
          </a>

          <a
            href={project.demoUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => playLaser()}
          >
            <PixelButton
              variant="primary"
              size="md"
              icon={<ExternalLink className="w-4 h-4" />}
            >
              LAUNCH MISSION
            </PixelButton>
          </a>
        </div>
      </div>
    </div>
  );
};
