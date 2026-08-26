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
    }, 400);
  };

  return (
    <div className="relative flex flex-col items-center select-none group">
      {/* Click prompt speech bubble */}
      <div className="absolute -top-10 bg-black border-2 border-[#ffe600] px-2.5 py-1 text-[8px] font-press-start text-[#ffe600] shadow-[2px_2px_0_0_#ff007f] animate-bounce pointer-events-none">
        TAP ME! 👆
      </div>

      {/* 8-Bit Pixel Character Container */}
      <div
        onClick={handleAvatarClick}
        className={`relative w-48 h-48 sm:w-56 sm:h-56 cursor-pointer transition-transform duration-300 ${
          isJumping ? '-translate-y-8 scale-110' : 'animate-pixel-float'
        }`}
        title="Click to jump and earn EXP!"
      >
        {/* Glow halo */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#00f3ff]/20 via-[#ff007f]/20 to-[#ffe600]/20 rounded-full blur-xl animate-pulse" />

        {/* Pixel Canvas/SVG Character */}
        <svg
          viewBox="0 0 24 24"
          className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,243,255,0.4)]"
          style={{ imageRendering: 'pixelated' }}
        >
          {/* Hair / Headband (Cyberpunk Neon Pink) */}
          <rect x="7" y="2" width="10" height="2" fill="#ff007f" />
          <rect x="6" y="3" width="12" height="2" fill="#ff007f" />
          <rect x="5" y="4" width="3" height="3" fill="#ff007f" />
          <rect x="16" y="4" width="3" height="3" fill="#ff007f" />
          <rect x="18" y="5" width="2" height="4" fill="#ffe600" /> {/* Headband knot */}
          <rect x="19" y="8" width="2" height="3" fill="#ffe600" />

          {/* Skin Face (Peach / Pixel Skin) */}
          <rect x="7" y="4" width="10" height="7" fill="#ffcca3" />
          
          {/* Eyes (Cyber Blue & White) */}
          <rect x="8" y="6" width="2" height="2" fill="#090314" />
          <rect x="9" y="6" width="1" height="1" fill="#00f3ff" />
          <rect x="14" y="6" width="2" height="2" fill="#090314" />
          <rect x="15" y="6" width="1" height="1" fill="#00f3ff" />

          {/* VR Visor / Tech Glasses (Toggleable glow look) */}
          <rect x="7" y="6" width="10" height="1" fill="rgba(0, 243, 255, 0.4)" />

          {/* Smile / Mouth */}
          <rect x="11" y="9" width="2" height="1" fill="#c44536" />

          {/* Body / Mage Robe & Developer Armor (Cyber Dark Violet & Cyan trim) */}
          <rect x="7" y="11" width="10" height="7" fill="#15082a" />
          <rect x="6" y="12" width="1" height="5" fill="#15082a" />
          <rect x="17" y="12" width="1" height="5" fill="#15082a" />
          
          {/* Cyan Energy Armor Core / React Symbol */}
          <rect x="10" y="12" width="4" height="4" fill="#00f3ff" />
          <rect x="11" y="13" width="2" height="2" fill="#ffffff" />

          {/* Golden Belt */}
          <rect x="7" y="16" width="10" height="1" fill="#ffe600" />
          <rect x="11" y="16" width="2" height="1" fill="#ff007f" />

          {/* Left Hand holding Code Wand / Stylus */}
          <rect x="4" y="13" width="2" height="2" fill="#ffcca3" />
          <rect x="3" y="10" width="1" height="6" fill="#ffe600" /> {/* Wand shaft */}
          <rect x="2" y="9" width="3" height="2" fill="#00f3ff" /> {/* Wand crystal tip */}

          {/* Right Hand with React Shield / Coffee Mug */}
          <rect x="18" y="13" width="2" height="2" fill="#ffcca3" />
          <rect x="19" y="12" width="3" height="3" fill="#ffffff" /> {/* Coffee Mug */}
          <rect x="20" y="11" width="1" height="1" fill="#8b5a2b" /> {/* Coffee steam */}
          <rect x="21" y="10" width="1" height="1" fill="#8b5a2b" />

          {/* Legs & Pixel Boots */}
          <rect x="8" y="18" width="3" height="3" fill="#0d0221" />
          <rect x="13" y="18" width="3" height="3" fill="#0d0221" />
          
          {/* Cyber Boots (Cyan) */}
          <rect x="7" y="21" width="4" height="2" fill="#00f3ff" />
          <rect x="13" y="21" width="4" height="2" fill="#00f3ff" />
        </svg>

        {/* Shadow underneath */}
        <div
          className={`mx-auto h-2 bg-black/60 rounded-full blur-[2px] transition-all duration-300 ${
            isJumping ? 'w-16 opacity-30 translate-y-8' : 'w-28 opacity-70'
          }`}
        />
      </div>

      {/* Level Tag under sprite */}
      <div className="mt-3 bg-black border-2 border-[#00f3ff] px-3 py-1 font-press-start text-[9px] text-[#00f3ff] shadow-[2px_2px_0_0_#ff007f]">
        READY PLAYER 1
      </div>
    </div>
  );
};

