import React from 'react';
import type { Skill } from '../../data/portfolioData';
import { useAudio } from '../../context/AudioContext';
import { useGame } from '../../context/GameContext';
import { Sparkles, Flame, Zap, Wind, Shield } from 'lucide-react';

interface SkillNodeProps {
  skill: Skill;
  isSelected: boolean;
  onSelect: () => void;
}

export const SkillNode: React.FC<SkillNodeProps> = ({ skill, isSelected, onSelect }) => {
  const { playClick, playPowerUp } = useAudio();
  const { addExp, unlockAchievement } = useGame();

  const elementIcons = {
    Lightning: <Zap className="w-3 h-3 text-[#ffe600]" />,
    Fire: <Flame className="w-3 h-3 text-[#ff3838]" />,
    Arcane: <Sparkles className="w-3 h-3 text-[#00f3ff]" />,
    Wind: <Wind className="w-3 h-3 text-[#39ff14]" />,
    Holy: <Shield className="w-3 h-3 text-[#ff007f]" />,
  };

  const elementBorders = {
    Lightning: 'border-[#ffe600] hover:shadow-[0_0_12px_rgba(255,230,0,0.4)]',
    Fire: 'border-[#ff3838] hover:shadow-[0_0_12px_rgba(255,56,56,0.4)]',
    Arcane: 'border-[#00f3ff] hover:shadow-[0_0_12px_rgba(0,243,255,0.4)]',
    Wind: 'border-[#39ff14] hover:shadow-[0_0_12px_rgba(57,255,20,0.4)]',
    Holy: 'border-[#ff007f] hover:shadow-[0_0_12px_rgba(255,0,127,0.4)]',
  };

  const handleClick = () => {
    if (!isSelected) {
      playPowerUp();
      addExp(15);
      unlockAchievement('skill_master');
    } else {
      playClick();
    }
    onSelect();
  };

  return (
    <div
      onClick={handleClick}
      className={`relative bg-[#130726] border-2 ${elementBorders[skill.element]} p-3 transition-all duration-150 cursor-pointer shadow-[3px_3px_0_0_#000] select-none ${
        isSelected ? 'scale-105 bg-[#220c45] ring-2 ring-[#ffe600]' : 'hover:-translate-y-1'
      }`}
    >
      {/* Top Node Bar: Element & MP */}
      <div className="flex items-center justify-between text-[8px] font-press-start mb-2">
        <span className="flex items-center gap-1 text-gray-300">
          {elementIcons[skill.element]}
          <span className="hidden sm:inline">{skill.element.toUpperCase()}</span>
        </span>
        <span className="text-[#00f3ff]">
          {skill.mpCost} MP
        </span>
      </div>

      {/* Main Node Content */}
      <div className="flex items-center space-x-2.5">
        <div className="w-9 h-9 bg-black/80 border border-white/20 flex items-center justify-center text-lg shrink-0">
          {skill.icon}
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="font-press-start text-[10px] text-white truncate">
            {skill.name}
          </h4>
          
          {/* Level Stars / Gauge */}
          <div className="flex items-center space-x-1 mt-1">
            <span className="font-mono text-[9px] text-[#ffe600] font-bold">
              LV.{skill.level}
            </span>
            <div className="flex space-x-0.5">
              {Array.from({ length: skill.maxLevel }).map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 border border-black ${
                    i < skill.level ? 'bg-[#39ff14]' : 'bg-gray-800'
                  }`}
                />
              ))}
            </div>
            {skill.level === skill.maxLevel && (
              <span className="text-[7px] font-press-start bg-[#ff007f] text-white px-1 ml-1">
                MAX
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Active Selection Glow Dot */}
      {isSelected && (
        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#ffe600] animate-ping" />
      )}
    </div>
  );
};
