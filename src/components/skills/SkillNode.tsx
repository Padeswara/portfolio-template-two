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
    Lightning: <Zap className="w-3 h-3 text-[#e69d24]" />,
    Fire: <Flame className="w-3 h-3 text-[#d64545]" />,
    Arcane: <Sparkles className="w-3 h-3 text-[#8c5835]" />,
    Wind: <Wind className="w-3 h-3 text-[#5a8740]" />,
    Holy: <Shield className="w-3 h-3 text-[#4a709c]" />,
  };

  const elementBorders = {
    Lightning: 'border-[#c48114]',
    Fire: 'border-[#d64545]',
    Arcane: 'border-[#8c5835]',
    Wind: 'border-[#5a8740]',
    Holy: 'border-[#4a709c]',
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
      className={`relative bg-[#fff8eb] border-2 ${elementBorders[skill.element]} p-2.5 transition-all duration-150 cursor-pointer shadow-[2px_2px_0_0_rgba(0,0,0,0.25)] select-none ${
        isSelected ? 'scale-[1.02] bg-[#faecd4] ring-2 ring-[#e69d24]' : 'hover:-translate-y-0.5'
      }`}
    >
      {/* Top Bar: Element & MP */}
      <div className="flex items-center justify-between text-[7px] sm:text-[8px] font-press-start mb-1.5">
        <span className="flex items-center gap-1 text-[#5c3a21]">
          {elementIcons[skill.element]}
          <span className="hidden sm:inline">{skill.element.toUpperCase()}</span>
        </span>
        <span className="text-[#5a8740] font-bold">
          {skill.mpCost} MP
        </span>
      </div>

      {/* Main Node Content */}
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-[#faecd4] border border-[#8c5835]/40 flex items-center justify-center text-base shrink-0">
          {skill.icon}
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="font-press-start text-[9px] sm:text-[10px] text-[#362213] truncate">
            {skill.name}
          </h4>
          
          {/* Level Stars */}
          <div className="flex items-center space-x-1 mt-0.5">
            <span className="font-mono text-[8px] sm:text-[9px] text-[#8c5835] font-bold">
              LV.{skill.level}
            </span>
            <div className="flex space-x-0.5">
              {Array.from({ length: skill.maxLevel }).map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 border border-[#4a2e18]/40 ${
                    i < skill.level ? 'bg-[#5a8740]' : 'bg-[#e0cfba]'
                  }`}
                />
              ))}
            </div>
            {skill.level === skill.maxLevel && (
              <span className="text-[7px] font-press-start bg-[#d64545] text-white px-1 ml-0.5">
                MAX
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Selected Indicator */}
      {isSelected && (
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#e69d24]" />
      )}
    </div>
  );
};
