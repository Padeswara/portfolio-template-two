import React from 'react';
import { useAudio } from '../../context/AudioContext';
import { PixelButton } from './PixelButton';

interface GodModeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GodModeModal: React.FC<GodModeModalProps> = ({ isOpen, onClose }) => {
  const { playClick } = useAudio();

  if (!isOpen) return null;

  const handleClose = () => {
    playClick();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[10002] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in zoom-in-95 duration-200 select-none">
      <div className="relative w-full max-w-lg bg-[#1a0733] border-4 border-[#ffe600] p-6 sm:p-8 text-center shadow-[0_0_35px_rgba(255,230,0,0.6)]">
        {/* Header Ribbon */}
        <div className="inline-block bg-[#ffe600] text-black font-press-start text-[10px] px-4 py-1.5 border-2 border-black -mt-12 mb-4 shadow-[3px_3px_0_0_#ff007f]">
          ★ SECRET KONAMI CODE UNLOCKED ★
        </div>

        {/* Big Icon */}
        <div className="w-20 h-20 mx-auto mb-4 bg-yellow-950/60 border-2 border-[#ffe600] flex items-center justify-center text-4xl shadow-[0_0_20px_#ffe600] animate-bounce">
          👑
        </div>

        {/* Title */}
        <h3 className="font-press-start text-base sm:text-xl text-[#ffe600] uppercase mb-2">
          30 LIVES GOD MODE ACTIVATED!
        </h3>

        {/* Description */}
        <p className="font-mono text-xs sm:text-sm text-gray-200 leading-relaxed mb-6">
          Incredible! You remembered the legendary code <span className="text-[#00f3ff] font-bold">↑↑↓↓←→←→BA</span>. Your player stats have been boosted to maximum limit break!
        </p>

        {/* Stats Granted */}
        <div className="grid grid-cols-3 gap-2 bg-black/60 p-3 border border-white/20 text-xs font-mono mb-6">
          <div>
            <div className="text-gray-400 text-[10px]">HP HEARTS</div>
            <div className="text-[#ff007f] font-press-start text-xs mt-1">❤️❤️❤️ 99</div>
          </div>
          <div>
            <div className="text-gray-400 text-[10px]">GOLD COINS</div>
            <div className="text-[#ffe600] font-press-start text-xs mt-1">9,999</div>
          </div>
          <div>
            <div className="text-gray-400 text-[10px]">ARCADE SCORE</div>
            <div className="text-[#00f3ff] font-press-start text-xs mt-1">999,999</div>
          </div>
        </div>

        {/* Close Button */}
        <PixelButton
          variant="accent"
          size="lg"
          onClick={handleClose}
          soundType="powerup"
          className="w-full"
        >
          CONTINUE ADVENTURE ⚔️
        </PixelButton>
      </div>
    </div>
  );
};
