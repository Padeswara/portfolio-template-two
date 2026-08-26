import React from 'react';
import { useGame } from '../../context/GameContext';
import { useAudio } from '../../context/AudioContext';
import { Sparkles, Gamepad2, Heart } from 'lucide-react';
import { DEVELOPER_INFO } from '../../data/portfolioData';

export const Footer: React.FC = () => {
  const { insertCoin, coins } = useGame();
  const { playCoin } = useAudio();

  const handleCoinSlot = () => {
    playCoin();
    insertCoin();
  };

  return (
    <footer className="relative bg-black border-t-4 border-[var(--theme-border)] text-white pt-12 pb-8 overflow-hidden select-none">
      {/* Background arcade grid */}
      <div className="absolute inset-0 retro-grid opacity-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center border-b-2 border-white/10 pb-8 text-center md:text-left">
          {/* Left: Arcade branding */}
          <div className="space-y-2">
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <Gamepad2 className="w-6 h-6 text-[#00f3ff] animate-pulse" />
              <span className="font-press-start text-sm text-[#00f3ff]">
                ARCADE MACHINE v2.0
              </span>
            </div>
            <p className="font-mono text-xs text-gray-400 max-w-sm mx-auto md:mx-0">
              {DEVELOPER_INFO.name} // {DEVELOPER_INFO.classTitle}
            </p>
            <p className="font-mono text-[11px] text-gray-500">
              Built with React 19, Tailwind CSS v4, and Web Audio Synthesizer.
            </p>
          </div>

          {/* Center: Coin Slot interactive element */}
          <div className="flex flex-col items-center justify-center space-y-2">
            <button
              onClick={handleCoinSlot}
              className="group relative bg-[#140828] border-4 border-[#ffe600] px-6 py-3 shadow-[4px_4px_0_0_#ff007f] hover:translate-y-0.5 active:translate-y-1 transition-all cursor-pointer"
            >
              <div className="w-12 h-1.5 bg-black mx-auto mb-2 border border-gray-600 rounded-sm group-hover:bg-[#ffe600] transition-colors" />
              <div className="font-press-start text-[10px] text-[#ffe600] tracking-wider flex items-center gap-1.5">
                <span>INSERT COIN</span>
                <span className="animate-retro-blink">🪙</span>
              </div>
              <div className="font-mono text-[9px] text-gray-400 mt-1">
                CREDITS: {coins}
              </div>
            </button>
            <span className="font-press-start text-[8px] text-gray-500 animate-pulse">
              1 COIN = +100 EXP
            </span>
          </div>

          {/* Right: Secret easter egg & credits */}
          <div className="space-y-2 md:text-right">
            <div className="inline-block bg-white/5 border border-white/20 p-2 font-mono text-[10px] text-gray-300">
              <div className="text-[#39ff14] font-press-start text-[8px] mb-1 flex items-center justify-center md:justify-end gap-1">
                <Sparkles className="w-3 h-3 text-[#39ff14]" />
                <span>SECRET CHEAT CODE</span>
              </div>
              <div className="tracking-widest">
                <kbd className="px-1 bg-black border border-gray-700 text-[#00f3ff]">↑</kbd>{' '}
                <kbd className="px-1 bg-black border border-gray-700 text-[#00f3ff]">↑</kbd>{' '}
                <kbd className="px-1 bg-black border border-gray-700 text-[#00f3ff]">↓</kbd>{' '}
                <kbd className="px-1 bg-black border border-gray-700 text-[#00f3ff]">↓</kbd>{' '}
                <kbd className="px-1 bg-black border border-gray-700 text-[#ff007f]">←</kbd>{' '}
                <kbd className="px-1 bg-black border border-gray-700 text-[#ff007f]">→</kbd>{' '}
                <kbd className="px-1 bg-black border border-gray-700 text-[#ff007f]">←</kbd>{' '}
                <kbd className="px-1 bg-black border border-gray-700 text-[#ff007f]">→</kbd>{' '}
                <kbd className="px-1 bg-black border border-gray-700 text-[#ffe600]">B</kbd>{' '}
                <kbd className="px-1 bg-black border border-gray-700 text-[#ffe600]">A</kbd>
              </div>
            </div>
            <div className="text-[10px] font-mono text-gray-500">
              © {new Date().getFullYear()} ALL RIGHTS RESERVED // 8-BIT EDITION
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-center text-[10px] font-press-start text-gray-400">
          <div className="flex items-center gap-1">
            <span>READY PLAYER ONE</span>
            <span className="text-[#ff007f]">●</span>
            <span className="text-[#00f3ff]">PRESS ANY KEY TO PLAY</span>
          </div>
          <div className="flex items-center gap-1 text-gray-400">
            <span>CRAFTED WITH</span>
            <Heart className="w-3 h-3 text-[#ff007f] fill-[#ff007f] inline animate-bounce" />
            <span>FOR PIXEL LOVERS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

