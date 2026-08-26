import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { useTheme, type RetroTheme } from '../../context/ThemeContext';
import { useAudio } from '../../context/AudioContext';
import { Volume2, VolumeX, Music, Tv, Trophy, Menu, X, PlusCircle, Sparkles } from 'lucide-react';
import { ACHIEVEMENTS } from '../../data/achievementsData';

interface NavbarProps {
  activeStage: number;
  onSelectStage: (index: number) => void;
  onOpenAchievements: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeStage, onSelectStage, onOpenAchievements }) => {
  const { coins, score, hp, level, exp, insertCoin, unlockedAchievements, isGodMode } = useGame();
  const { theme, setTheme, crtEnabled, toggleCrt } = useTheme();
  const { isMuted, toggleMute, isBgmActive, toggleBgm, playClick, playPowerUp } = useAudio();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentLevelProgress = exp % 500;
  const progressPercent = Math.min(100, Math.floor((currentLevelProgress / 500) * 100));

  const navStages = [
    { index: 0, label: '00 START', short: 'START', icon: '👾' },
    { index: 1, label: '01 STATS', short: 'STATS', icon: '👤' },
    { index: 2, label: '02 SKILLS', short: 'SKILLS', icon: '⚡' },
    { index: 3, label: '03 QUESTS', short: 'QUESTS', icon: '💎' },
    { index: 4, label: '04 ARCADE', short: 'ARCADE', icon: '🎮' },
    { index: 5, label: '05 LOGS', short: 'LOGS', icon: '📜' },
    { index: 6, label: '06 SAVE POINT', short: 'SAVE', icon: '💾' },
  ];

  const handleStageClick = (idx: number) => {
    playPowerUp();
    onSelectStage(idx);
    setMobileMenuOpen(false);
  };

  const handleThemeChange = (newTheme: RetroTheme) => {
    playClick();
    setTheme(newTheme);
  };

  return (
    <header className="bg-[#090314]/95 border-b-4 border-[var(--theme-border)] text-white select-none shrink-0 z-40">
      {/* Top Arcade Status Bar */}
      <div className="bg-black/90 px-3 py-1.5 border-b border-white/10 text-[10px] font-press-start flex flex-wrap items-center justify-between gap-2">
        {/* Left: Player status */}
        <div className="flex items-center space-x-3 sm:space-x-5">
          {/* HP / Lives */}
          <div className="flex items-center space-x-1 text-[#ff007f]">
            <span>HP:</span>
            {isGodMode ? (
              <span className="text-[#ffe600] animate-pulse">❤️❤️❤️ (MAX)</span>
            ) : (
              <span className="tracking-widest">
                {'❤️'.repeat(Math.min(3, Math.max(1, hp)))}
              </span>
            )}
          </div>

          {/* Level & EXP Progress */}
          <div className="hidden md:flex items-center space-x-2">
            <span className="text-[#00f3ff]">LV.{level}</span>
            <div className="w-16 h-2 bg-gray-900 border border-white/30 relative">
              <div
                className="h-full bg-gradient-to-r from-[#00f3ff] to-[#39ff14]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-[8px] text-gray-400 font-mono">
              {currentLevelProgress}/500 XP
            </span>
          </div>

          {/* Coins */}
          <button
            onClick={insertCoin}
            className="flex items-center space-x-1 text-[#ffe600] hover:text-white transition-colors bg-yellow-950/40 px-2 py-0.5 border border-[#ffe600]/40 rounded-none cursor-pointer"
            title="Click to insert coin & earn XP!"
          >
            <span>🪙</span>
            <span>x{coins}</span>
            <PlusCircle className="w-3 h-3 text-[#ffe600] animate-bounce ml-0.5" />
          </button>
        </div>

        {/* Center: Score */}
        <div className="text-white hidden lg:flex items-center space-x-1">
          <span className="text-[#00f3ff]">SCORE:</span>
          <span className="text-[#ffe600] font-mono tracking-widest text-xs">
            {score.toString().padStart(6, '0')}
          </span>
        </div>

        {/* Right: Sound, CRT & Theme toggles */}
        <div className="flex items-center space-x-2">
          {/* CRT toggle */}
          <button
            onClick={() => {
              playClick();
              toggleCrt();
            }}
            className={`p-1 border text-[9px] flex items-center gap-1 cursor-pointer ${
              crtEnabled
                ? 'bg-[#00f3ff]/20 border-[#00f3ff] text-[#00f3ff]'
                : 'bg-black border-gray-600 text-gray-400'
            }`}
            title="Toggle CRT Scanlines"
          >
            <Tv className="w-3 h-3" />
            <span className="hidden sm:inline">CRT</span>
          </button>

          {/* BGM Toggle */}
          <button
            onClick={toggleBgm}
            className={`p-1 border text-[9px] flex items-center gap-1 cursor-pointer ${
              isBgmActive
                ? 'bg-[#ff007f]/20 border-[#ff007f] text-[#ff007f] animate-pulse'
                : 'bg-black border-gray-600 text-gray-400'
            }`}
            title="Toggle 8-bit Background Music"
          >
            <Music className="w-3 h-3" />
            <span className="hidden sm:inline">BGM</span>
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={toggleMute}
            className={`p-1 border text-[9px] cursor-pointer ${
              !isMuted
                ? 'bg-[#39ff14]/20 border-[#39ff14] text-[#39ff14]'
                : 'bg-black border-red-500 text-red-500'
            }`}
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
          </button>

          {/* Trophy Room Button */}
          <button
            onClick={() => {
              playClick();
              onOpenAchievements();
            }}
            className="p-1 border border-[#ffe600] bg-yellow-900/30 text-[#ffe600] text-[9px] flex items-center gap-1 hover:bg-yellow-800/50 cursor-pointer"
            title="View Trophies & Achievements"
          >
            <Trophy className="w-3 h-3" />
            <span>
              {unlockedAchievements.length}/{ACHIEVEMENTS.length}
            </span>
          </button>

          {/* Theme Dropdown */}
          <div className="relative group">
            <select
              value={theme}
              onChange={(e) => handleThemeChange(e.target.value as RetroTheme)}
              aria-label="Select Retro Theme"
              className="bg-black text-[9px] font-press-start text-[#00f3ff] border border-[#00f3ff] px-1 py-1 focus:outline-none cursor-pointer"
            >
              <option value="arcade">🕹️ ARCADE</option>
              <option value="gameboy">📟 GAMEBOY</option>
              <option value="nes">🔴 NES 8-BIT</option>
              <option value="dos">💻 DOS 90s</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 flex items-center justify-between">
        {/* Brand / Title Jump */}
        <button
          onClick={() => handleStageClick(0)}
          className="flex items-center space-x-2 group text-left cursor-pointer"
        >
          <div className="w-7 h-7 bg-black border-2 border-[#00f3ff] flex items-center justify-center text-xs shadow-[2px_2px_0_0_#ff007f]">
            👾
          </div>
          <div>
            <div className="font-press-start text-xs sm:text-sm text-white group-hover:text-[#00f3ff] transition-colors flex items-center gap-1">
              <span>PLAYER 1</span>
              {isGodMode && <Sparkles className="w-3 h-3 text-[#ffe600] animate-spin" />}
            </div>
            <div className="font-press-start text-[7px] sm:text-[8px] text-[var(--theme-secondary)] tracking-wider">
              FRONT-END WARRIOR
            </div>
          </div>
        </button>

        {/* Desktop Stage Tap Buttons */}
        <nav className="hidden md:flex items-center space-x-1 font-press-start text-[9px] lg:text-[10px]">
          {navStages.map((stg) => (
            <button
              key={stg.index}
              onClick={() => handleStageClick(stg.index)}
              className={`px-2 py-1.5 transition-all cursor-pointer border-2 ${
                activeStage === stg.index
                  ? 'bg-[#00f3ff] text-black border-black shadow-[2px_2px_0_0_#ff007f] font-bold translate-y-0.5'
                  : 'bg-[#15082a] text-gray-300 border-white/10 hover:border-[#00f3ff] hover:text-white'
              }`}
            >
              <span className="hidden xl:inline mr-1">{stg.icon}</span>
              <span>{stg.label}</span>
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => {
              playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-1.5 border-2 border-[var(--theme-border)] text-white hover:bg-[var(--theme-border)]/20"
            aria-label="Toggle stage menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Tap to select stage) */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0e041f] border-b-4 border-[var(--theme-border)] px-4 py-3 space-y-1.5 animate-in slide-in-from-top duration-150">
          <div className="font-press-start text-[8px] text-[#ffe600] pb-1 border-b border-white/10">
            SELECT STAGE TO TELEPORT:
          </div>
          {navStages.map((stg) => (
            <button
              key={stg.index}
              onClick={() => handleStageClick(stg.index)}
              className={`w-full text-left font-press-start text-[10px] px-3 py-2 border flex items-center justify-between ${
                activeStage === stg.index
                  ? 'bg-[#00f3ff] text-black border-black font-bold'
                  : 'bg-black text-gray-200 border-white/10 hover:bg-[#1f0d3d]'
              }`}
            >
              <span>{stg.icon} {stg.label}</span>
              {activeStage === stg.index && <span>◀ CURRENT</span>}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
