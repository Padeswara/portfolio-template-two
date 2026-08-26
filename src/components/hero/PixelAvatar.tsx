import React, { useState } from 'react';
import { useAudio } from '../../context/AudioContext';
import { useGame } from '../../context/GameContext';

export const PixelAvatar: React.FC = () => {
  const { playJump, playCoin } = useAudio();
  const { addExp } = useGame();
  const [isJumping, setIsJumping] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleAvatarClick = () => {
    if (isJumping) return;
    setIsJumping(true);
    playJump();
    setClickCount((prev) => prev + 1);
    addExp(25);

    if ((clickCount + 1) % 5 === 0) {
      playCoin();
    }

    setTimeout(() => {
      setIsJumping(false);
    }, 380);
  };

  return (
    <div className="relative flex flex-col items-center select-none group">
      {/* Click prompt speech bubble */}
      <div className="absolute -top-9 bg-[#fff8eb] border-2 border-[#8c5835] px-2.5 py-1 text-[8px] font-press-start text-[#4a2e18] shadow-[2px_2px_0_0_rgba(0,0,0,0.3)] animate-bounce pointer-events-none">
        SAY HELLO! 🌻
      </div>

      {/* 8-Bit Harvest Moon Farmer Sprite Container */}
      <div
        onClick={handleAvatarClick}
        className={`relative w-44 h-44 sm:w-52 sm:h-52 cursor-pointer transition-transform duration-300 ${
          isJumping ? '-translate-y-6 scale-105' : 'animate-pixel-float'
        }`}
        title="Tap to say hello and earn Gold & EXP!"
      >
        {/* Soft Sunlight Halo */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#e69d24]/20 via-[#7cb359]/20 to-[#fff8eb]/30 rounded-full blur-xl animate-pulse" />

        {/* Harvest Moon Farmer Pixel SVG */}
        <svg
          viewBox="0 0 24 24"
          className="w-full h-full drop-shadow-[0_8px_16px_rgba(74,46,24,0.35)]"
          style={{ imageRendering: 'pixelated' }}
        >
          {/* Straw Hat Brim (Warm Golden Wheat) */}
          <rect x="4" y="2" width="16" height="2" fill="#e6a122" />
          <rect x="2" y="3" width="20" height="2" fill="#e6a122" />
          <rect x="7" y="1" width="10" height="2" fill="#c48114" /> {/* Hat Crown */}
          {/* Red Hat Ribbon */}
          <rect x="7" y="3" width="10" height="1" fill="#d64545" />

          {/* Brown / Chestnut Hair */}
          <rect x="6" y="5" width="12" height="2" fill="#5c3a21" />
          <rect x="5" y="6" width="3" height="3" fill="#5c3a21" />
          <rect x="16" y="6" width="3" height="3" fill="#5c3a21" />

          {/* Peach Skin Face */}
          <rect x="7" y="5" width="10" height="6" fill="#ffd1a9" />
          
          {/* Eyes (Warm Dark Brown) */}
          <rect x="8" y="7" width="2" height="2" fill="#362213" />
          <rect x="9" y="7" width="1" height="1" fill="#ffffff" />
          <rect x="14" y="7" width="2" height="2" fill="#362213" />
          <rect x="15" y="7" width="1" height="1" fill="#ffffff" />

          {/* Cheerful Blush */}
          <rect x="7" y="8" width="2" height="1" fill="#ff9999" />
          <rect x="15" y="8" width="2" height="1" fill="#ff9999" />

          {/* Smile */}
          <rect x="11" y="9" width="2" height="1" fill="#b84337" />

          {/* Red Plaid / White Undershirt */}
          <rect x="7" y="11" width="10" height="4" fill="#d64545" />
          <rect x="10" y="11" width="4" height="2" fill="#fff8eb" />

          {/* Blue Denim Overalls */}
          <rect x="7" y="13" width="10" height="5" fill="#4a709c" />
          <rect x="8" y="11" width="2" height="3" fill="#4a709c" /> {/* Left Strap */}
          <rect x="14" y="11" width="2" height="3" fill="#4a709c" /> {/* Right Strap */}
          <rect x="8" y="13" width="1" height="1" fill="#e6a122" /> {/* Brass Button */}
          <rect x="15" y="13" width="1" height="1" fill="#e6a122" /> {/* Brass Button */}
          
          {/* Overalls Pocket */}
          <rect x="10" y="14" width="4" height="3" fill="#39587a" />
          <rect x="11" y="15" width="2" height="1" fill="#e6a122" /> {/* Pocket Seed */}

          {/* Left Hand holding Sprout */}
          <rect x="4" y="13" width="2" height="2" fill="#ffd1a9" />
          <rect x="3" y="11" width="2" height="2" fill="#5a8740" /> {/* Green Sprout Leaf */}
          <rect x="4" y="10" width="1" height="1" fill="#7cb359" />

          {/* Right Hand with Watering Can */}
          <rect x="18" y="13" width="2" height="2" fill="#ffd1a9" />
          <rect x="19" y="12" width="3" height="3" fill="#e6a122" /> {/* Can body */}
          <rect x="21" y="11" width="1" height="2" fill="#c48114" /> {/* Spout */}

          {/* Pants Legs */}
          <rect x="8" y="18" width="3" height="3" fill="#39587a" />
          <rect x="13" y="18" width="3" height="3" fill="#39587a" />
          
          {/* Work Boots (Leather Brown) */}
          <rect x="7" y="21" width="4" height="2" fill="#5c3a21" />
          <rect x="13" y="21" width="4" height="2" fill="#5c3a21" />
        </svg>

        {/* Soft Drop Shadow */}
        <div
          className={`mx-auto h-2 bg-[#2c1808]/40 rounded-full blur-[2px] transition-all duration-300 ${
            isJumping ? 'w-14 opacity-20 translate-y-6' : 'w-24 opacity-60'
          }`}
        />
      </div>

      {/* Title Tag */}
      <div className="mt-2 bg-[#fff8eb] border-2 border-[#8c5835] px-3 py-1 font-press-start text-[8px] sm:text-[9px] text-[#4a2e18] shadow-[2px_2px_0_0_rgba(0,0,0,0.3)]">
        🧑‍🌾 FARMER READY
      </div>
    </div>
  );
};
