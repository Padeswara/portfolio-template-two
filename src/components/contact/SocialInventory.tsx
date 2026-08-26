import React from 'react';
import { SOCIAL_LINKS } from '../../data/portfolioData';
import { useAudio } from '../../context/AudioContext';
import { useGame } from '../../context/GameContext';
import { ExternalLink } from 'lucide-react';

export const SocialInventory: React.FC = () => {
  const { playCoin } = useAudio();
  const { addCoins } = useGame();

  const handleLinkClick = () => {
    playCoin();
    addCoins(1);
  };

  return (
    <div className="space-y-4">
      <div className="font-press-start text-[10px] text-[#ffe600] tracking-wider">
        COMMUNICATION BEACONS // SOCIAL LOOT
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {SOCIAL_LINKS.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            onClick={handleLinkClick}
            className="bg-[#15082a] border-2 border-white/20 p-3 hover:border-[#00f3ff] hover:bg-[#1f0d3d] hover:-translate-y-1 transition-all duration-150 shadow-[3px_3px_0_0_#000] flex items-center justify-between group"
          >
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-black/60 border border-white/20 flex items-center justify-center text-lg shrink-0 group-hover:border-[#00f3ff]">
                {link.icon}
              </div>
              <div className="min-w-0">
                <div className="font-press-start text-[9px] text-white group-hover:text-[#00f3ff] transition-colors truncate">
                  {link.name}
                </div>
                <div className="font-mono text-[11px] text-gray-400 truncate">
                  {link.handle}
                </div>
              </div>
            </div>

            <ExternalLink className="w-3.5 h-3.5 text-gray-500 group-hover:text-[#00f3ff] shrink-0" />
          </a>
        ))}
      </div>
    </div>
  );
};
