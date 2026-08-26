import React from 'react';
import { SOCIAL_LINKS } from '../../data/portfolioData';
import { PixelCard } from '../ui/PixelCard';
import { useAudio } from '../../context/AudioContext';
import { ExternalLink } from 'lucide-react';

export const SocialInventory: React.FC = () => {
  const { playClick, playLaser } = useAudio();

  return (
    <PixelCard
      title="COURIER BEACONS // SOCIALS"
      badge="CONNECTED"
      headerColor="wood"
      borderColor="wood"
    >
      <div className="space-y-2">
        {SOCIAL_LINKS.map((item) => (
          <a
            key={item.name}
            href={item.url}
            target="_blank"
            rel="noreferrer"
            onClick={() => {
              playClick();
              playLaser();
            }}
            className="flex items-center justify-between p-2 bg-[#faecd4] border border-[#8c5835]/30 hover:border-[#e69d24] hover:bg-[#fff8eb] transition-all group cursor-pointer"
          >
            <div className="flex items-center space-x-2.5">
              <span className="text-lg">{item.icon}</span>
              <div>
                <div className="font-press-start text-[8px] sm:text-[9px] text-[#362213] group-hover:text-[#5a8740] transition-colors">
                  {item.name}
                </div>
                <div className="font-mono text-[10px] text-[#785a44]">
                  {item.handle}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-1.5">
              <span className="px-1.5 py-0.5 bg-[#8c5835] text-[#fff8eb] text-[7px] font-press-start">
                {item.badge}
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-[#8c5835] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </a>
        ))}
      </div>
    </PixelCard>
  );
};
