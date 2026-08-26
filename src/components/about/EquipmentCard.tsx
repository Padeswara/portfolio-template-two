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
    Mythic: 'border-[#ff007f] text-[#ff007f] bg-pink-950/30',
    Legendary: 'border-[#ffe600] text-[#ffe600] bg-yellow-950/30',
    Epic: 'border-[#aa00ff] text-[#aa00ff] bg-purple-950/30',
    Rare: 'border-[#00f3ff] text-[#00f3ff] bg-cyan-950/30',
  };

  const handleCardClick = () => {
    if (!isOpen) playPowerUp();
    else playClick();
    setIsOpen(!isOpen);
  };

  return (
    <div
      onClick={handleCardClick}
      className={`relative bg-[#100722] border-2 ${rarityColors[item.rarity]} p-3 transition-all duration-200 cursor-pointer shadow-[3px_3px_0_0_#000] hover:-translate-y-1`}
    >
      {/* Slot Header */}
      <div className="flex items-center justify-between font-press-start text-[8px] opacity-80 mb-2 pb-1 border-b border-white/10">
        <span>[{item.slot.toUpperCase()}]</span>
        <span className="uppercase text-[7px] tracking-wider px-1 bg-black">
          {item.rarity}
        </span>
      </div>

      {/* Item Main Body */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-black/60 border border-white/20 flex items-center justify-center text-xl shrink-0">
          {item.icon}
        </div>
        <div className="min-w-0">
          <h4 className="font-press-start text-[10px] text-white truncate">
            {item.name}
          </h4>
          <p className="font-mono text-[11px] text-[#39ff14] mt-0.5 truncate">
            {item.stats}
          </p>
        </div>
      </div>

      {/* Expanded Details / Lore Tooltip */}
      {isOpen && (
        <div className="mt-3 pt-2 border-t border-white/10 text-left animate-in fade-in duration-200">
          <p className="font-mono text-xs text-gray-300 italic">
            "{item.description}"
          </p>
          <div className="mt-1 flex items-center gap-1 font-press-start text-[7px] text-[#ffe600]">
            <Sparkles className="w-2.5 h-2.5" />
            <span>ITEM BUFF ACTIVE</span>
          </div>
        </div>
      )}

      {/* Click to inspect prompt */}
      <div className="mt-1.5 flex justify-end">
        <span className="text-[8px] font-mono text-gray-500 flex items-center gap-1">
          <Info className="w-2.5 h-2.5" /> {isOpen ? 'Hide' : 'Inspect'}
        </span>
      </div>
    </div>
  );
};
