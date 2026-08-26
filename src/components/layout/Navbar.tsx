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
  const { coins, score, level, exp, insertCoin, unlockedAchievements, isGodMode } = useGame();
  const { theme, setTheme, crtEnabled, toggleCrt } = useTheme();
  const { isMuted, toggleMute, isBgmActive, toggleBgm, playClick, playPowerUp } = useAudio();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentLevelProgress = exp % 500;
  const progressPercent = Math.min(100, Math.floor((currentLevelProgress / 500) * 100));

  const navStages = [
    { index: 0, label: '00 TITLE', short: 'TITLE', icon: '🏡' },
    { index: 1, label: '01 STATS', short: 'STATS', icon: '🧑‍🌾' },
    { index: 2, label: '02 CROPS', short: 'CROPS', icon: '🌱' },
    { index: 3, label: '03 PRODUCE', short: 'PRODUCE', icon: '📦' },
    { index: 4, label: '04 HARVEST', short: 'HARVEST', icon: '🚜' },
    { index: 5, label: '05 TOWN LOGS', short: 'LOGS', icon: '📜' },
    { index: 6, label: '06 MAILBOX', short: 'MAILBOX', icon: '📮' },
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
    <header className="bg-[#3a2010] border-b-4 border-[#241308] text-[#fff8eb] select-none shrink-0 z-40 shadow-[0_3px_10px_rgba(0,0,0,0.35)]">
      {/* Top Farm Status Bar */}
      <div className="bg-[#241308] px-3 py-1.5 border-b border-white/10 text-[9px] sm:text-[10px] font-press-start flex flex-wrap items-center justify-between gap-2 text-[#fff8eb]">
        {/* Left: Stamina / Gold */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Stamina / Power Berries */}
          <div className="flex items-center space-x-1 text-[#ff7b90]">
            <span>STAMINA:</span>
            {isGodMode ? (
              <span className="text-[#ffe082] animate-pulse">🍓🍓🍓 (MAX)</span>
            ) : (
              <span className="tracking-widest">🍓🍓🍓</span>
            )}
          </div>

          {/* Farm Level & EXP */}
          <div className="hidden md:flex items-center space-x-2">
            <span className="text-[#ffe082]">LV.{level}</span>
            <div className="w-16 h-2 bg-[#120803] border border-[#8c5835] relative">
              <div
                className="h-full bg-gradient-to-r from-[#e69d24] to-[#7cb359]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-[8px] text-[#faecd4]/70 font-mono">
              {currentLevelProgress}/500 EXP
            </span>
          </div>

          {/* Gold (G) */}
          <button
            onClick={insertCoin}
            className="flex items-center space-x-1 text-[#ffe082] hover:text-white transition-colors bg-[#4a2e18] px-2 py-0.5 border border-[#e69d24] rounded-none cursor-pointer"
            title="Click to harvest +100 G & earn EXP!"
          >
            <span>🪙</span>
            <span>{coins * 100} G</span>
            <PlusCircle className="w-3 h-3 text-[#ffe082] ml-0.5" />
          </button>
        </div>

        {/* Center: Harvest Score */}
        <div className="hidden lg:flex items-center space-x-1">
          <span className="text-[#a3c983]">YIELD SCORE:</span>
          <span className="text-[#ffe082] font-mono tracking-widest text-xs">
            {score.toString().padStart(6, '0')}
          </span>
        </div>

        {/* Right: Sound, CRT & Season Theme */}
        <div className="flex items-center space-x-2">
          {/* CRT toggle */}
          <button
            onClick={() => {
              playClick();
              toggleCrt();
            }}
            className={`p-1 border text-[9px] flex items-center gap-1 cursor-pointer ${
              crtEnabled
                ? 'bg-[#e69d24]/30 border-[#e69d24] text-[#ffe082]'
                : 'bg-[#1a0c04] border-gray-700 text-gray-400'
            }`}
            title="Toggle Retro CRT Scanlines"
          >
            <Tv className="w-3 h-3" />
            <span className="hidden sm:inline">CRT</span>
          </button>

          {/* BGM Toggle */}
          <button
            onClick={toggleBgm}
            className={`p-1 border text-[9px] flex items-center gap-1 cursor-pointer ${
              isBgmActive
                ? 'bg-[#7cb359]/30 border-[#7cb359] text-[#7cb359] animate-pulse'
                : 'bg-[#1a0c04] border-gray-700 text-gray-400'
            }`}
            title="Toggle Pastoral Village BGM"
          >
            <Music className="w-3 h-3" />
            <span className="hidden sm:inline">BGM</span>
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={toggleMute}
            className={`p-1 border text-[9px] cursor-pointer ${
              !isMuted
                ? 'bg-[#7cb359]/30 border-[#7cb359] text-[#7cb359]'
                : 'bg-[#1a0c04] border-red-700 text-red-400'
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
            className="p-1 border border-[#e69d24] bg-[#4a2e18] text-[#ffe082] text-[9px] flex items-center gap-1 hover:bg-[#5c3a21] cursor-pointer"
            title="View Harvest Trophies"
          >
            <Trophy className="w-3 h-3" />
            <span>
              {unlockedAchievements.length}/{ACHIEVEMENTS.length}
            </span>
          </button>

          {/* Season Theme Selector */}
          <div className="relative group">
            <select
              value={theme}
              onChange={(e) => handleThemeChange(e.target.value as RetroTheme)}
              aria-label="Select Season Theme"
              className="bg-[#241308] text-[9px] font-press-start text-[#ffe082] border border-[#8c5835] px-1 py-1 focus:outline-none cursor-pointer"
            >
              <option value="spring">🌱 SPRING</option>
              <option value="autumn">🍂 AUTUMN</option>
              <option value="winter">❄️ WINTER</option>
              <option value="night">🌙 NIGHT</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={() => handleStageClick(0)}
          className="flex items-center space-x-2 group text-left cursor-pointer"
        >
          <div className="w-7 h-7 bg-[#fff8eb] border-2 border-[#8c5835] flex items-center justify-center text-xs shadow-[2px_2px_0_0_#241308]">
            🌻
          </div>
          <div>
            <div className="font-press-start text-xs sm:text-sm text-[#fff8eb] group-hover:text-[#ffe082] transition-colors flex items-center gap-1">
              <span>MINERAL FARM</span>
              {isGodMode && <Sparkles className="w-3 h-3 text-[#ffe082] animate-spin" />}
            </div>
            <div className="font-press-start text-[7px] sm:text-[8px] text-[#e69d24] tracking-wider">
              FRONT-END ARTISAN
            </div>
          </div>
        </button>

        {/* Desktop Stage Tap Buttons */}
        <nav className="hidden md:flex items-center space-x-1 font-press-start text-[9px] lg:text-[10px]">
          {navStages.map((stg) => (
            <button
              key={stg.index}
              onClick={() => handleStageClick(stg.index)}
              className={`px-2.5 py-1.5 transition-all cursor-pointer border-2 ${
                activeStage === stg.index
                  ? 'bg-[#e69d24] text-[#2c1808] border-[#4a2e18] shadow-[2px_2px_0_0_#241308] font-bold translate-y-0.5'
                  : 'bg-[#4a2e18] text-[#faecd4] border-white/10 hover:border-[#e69d24] hover:text-white'
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
            className="p-1.5 border-2 border-[#8c5835] text-[#fff8eb] hover:bg-[#4a2e18]"
            aria-label="Toggle stage menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#241308] border-b-4 border-[#8c5835] px-4 py-3 space-y-1.5 animate-in slide-in-from-top duration-150">
          <div className="font-press-start text-[8px] text-[#ffe082] pb-1 border-b border-white/10">
            VISIT PASTURE:
          </div>
          {navStages.map((stg) => (
            <button
              key={stg.index}
              onClick={() => handleStageClick(stg.index)}
              className={`w-full text-left font-press-start text-[10px] px-3 py-2 border flex items-center justify-between ${
                activeStage === stg.index
                  ? 'bg-[#e69d24] text-[#2c1808] border-[#4a2e18] font-bold'
                  : 'bg-[#3a2010] text-[#faecd4] border-white/10 hover:bg-[#4a2e18]'
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
