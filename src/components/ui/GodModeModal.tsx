import React from 'react';
import { PixelButton } from './PixelButton';
import { useAudio } from '../../context/AudioContext';
import { Sparkles, X, Sun } from 'lucide-react';

interface GodModeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GodModeModal: React.FC<GodModeModalProps> = ({ isOpen, onClose }) => {
  const { playClick, playVictory } = useAudio();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none animate-in zoom-in-95 duration-200">
      <div className="relative w-full max-w-md bg-[#fff8eb] border-4 border-[#e69d24] shadow-[8px_8px_0_0_rgba(0,0,0,0.45)] text-[#362213] overflow-hidden text-center p-5 space-y-4">
        {/* Close Button */}
        <button
          onClick={() => {
            playClick();
            onClose();
          }}
          className="absolute top-2 right-2 text-[#5c3a21] hover:text-black cursor-pointer p-1"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon */}
        <div className="w-16 h-16 bg-[#faecd4] border-4 border-[#e69d24] flex items-center justify-center mx-auto text-3xl shadow-[0_0_20px_rgba(230,157,36,0.5)] animate-bounce">
          🌻
        </div>

        {/* Title */}
        <div className="space-y-1">
          <div className="font-press-start text-[9px] text-[#e69d24] tracking-wider uppercase flex items-center justify-center gap-1">
            <Sun className="w-3.5 h-3.5 animate-spin text-[#e69d24]" />
            <span>HARVEST GODDESS BLESSING</span>
          </div>
          <h2 className="font-press-start text-base sm:text-lg text-[#362213] drop-shadow-[1px_1px_0_#e69d24]">
            ★ INFINITE STAMINA UNLOCKED ★
          </h2>
        </div>

        {/* Perks description */}
        <div className="bg-[#faecd4] p-3 border-2 border-[#8c5835]/30 space-y-2 font-mono text-xs text-[#5c3a21] text-left">
          <div className="flex items-center space-x-2 text-[#e69d24]">
            <Sparkles className="w-4 h-4" />
            <span className="font-bold">KONAMI BLESSING:</span>
          </div>
          <ul className="space-y-1 pl-4 list-disc text-[11px]">
            <li>🍓 Infinite Power Berries (Max Stamina)</li>
            <li>🪙 +1,000 Golden Coins (100,000 G)</li>
            <li>✨ +9,999 Artisan EXP Buff</li>
            <li>🏆 "Goddess Whisperer" Trophy Unlocked</li>
          </ul>
        </div>

        <PixelButton
          variant="primary"
          size="lg"
          soundType="powerup"
          onClick={() => {
            playVictory();
            onClose();
          }}
          className="w-full"
        >
          EMBRACE HARVEST BLESSING
        </PixelButton>
      </div>
    </div>
  );
};
