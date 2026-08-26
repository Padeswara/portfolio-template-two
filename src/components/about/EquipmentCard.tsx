import React, { useState } from 'react';
import type { Equipment } from '../../data/portfolioData';
import { useAudio } from '../../context/AudioContext';
import { Sparkles, Info } from 'lucide-react';

interface EquipmentCardProps {
  item: Equipment;
}

export const EquipmentCard: React.FC<EquipmentCardProps> = ({ item }) => {
  const { playClick, playPowerUp } = useAudio();
  const [isOpen, setIsOpen] = useState(false);

  const rarityColors = {
    Mythic: 'border-[#c48114] text-[#8c5835] bg-[#fff8eb]',
    Legendary: 'border-[#8c5835] text-[#5c3a21] bg-[#fff8eb]',
    Epic: 'border-[#4a709c] text-[#2c4b6e] bg-[#fff8eb]',
    Rare: 'border-[#5a8740] text-[#36541f] bg-[#fff8eb]',
  };

  const handleCardClick = () => {
    if (!isOpen) playPowerUp();
    else playClick();
    setIsOpen(!isOpen);
  };

  return (
    <div
      onClick={handleCardClick}
      className={`relative border-2 ${rarityColors[item.rarity]} p-2.5 transition-all duration-150 cursor-pointer shadow-[2px_2px_0_0_rgba(0,0,0,0.25)] hover:-translate-y-0.5`}
    >
      {/* Slot Header */}
      <div className="flex items-center justify-between font-press-start text-[7px] sm:text-[8px] opacity-85 mb-1.5 pb-1 border-b border-[#8c5835]/20">
        <span>[{item.slot.toUpperCase()}]</span>
        <span className="uppercase text-[7px] tracking-wider px-1 bg-[#8c5835] text-[#fff8eb]">
          {item.rarity}
        </span>
      </div>

      {/* Item Main Body */}
      <div className="flex items-center space-x-2.5">
        <div className="w-9 h-9 bg-[#faecd4] border border-[#8c5835]/40 flex items-center justify-center text-lg shrink-0">
          {item.icon}
        </div>
        <div className="min-w-0">
          <h4 className="font-press-start text-[9px] sm:text-[10px] text-[#362213] truncate">
            {item.name}
          </h4>
          <p className="font-mono text-[11px] text-[#5a8740] font-bold mt-0.5 truncate">
            {item.stats}
          </p>
        </div>
      </div>

      {/* Expanded Details */}
      {isOpen && (
        <div className="mt-2.5 pt-2 border-t border-[#8c5835]/20 text-left animate-in fade-in duration-150">
          <p className="font-mono text-xs text-[#5c3a21] italic leading-relaxed">
            "{item.description}"
          </p>
          <div className="mt-1 flex items-center gap-1 font-press-start text-[7px] text-[#8c5835]">
            <Sparkles className="w-2.5 h-2.5 text-[#e69d24]" />
            <span>TOOL EFFICIENCY BUFF ACTIVE</span>
          </div>
        </div>
      )}

      {/* Inspect Prompt */}
      <div className="mt-1 flex justify-end">
        <span className="text-[8px] font-mono text-[#8c5835] flex items-center gap-1">
          <Info className="w-2.5 h-2.5" /> {isOpen ? 'Hide' : 'Inspect'}
        </span>
      </div>
    </div>
  );
};
