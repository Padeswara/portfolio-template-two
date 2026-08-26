import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AudioProvider, useAudio } from './context/AudioContext';
import { GameProvider, useGame } from './context/GameContext';
import { Navbar } from './components/layout/Navbar';
import { StageController } from './components/layout/StageController';
import { CrtOverlay } from './components/layout/CrtOverlay';
import { Hero } from './components/hero/Hero';
import { AboutSection } from './components/about/AboutSection';
import { SkillsSection } from './components/skills/SkillsSection';
import { ProjectsSection } from './components/projects/ProjectsSection';
import { BugSmasherGame } from './components/minigame/BugSmasherGame';
import { ExperienceSection } from './components/experience/ExperienceSection';
import { ContactSection } from './components/contact/ContactSection';
import { Toast } from './components/ui/Toast';
import { AchievementsModal } from './components/experience/AchievementsModal';
import { GodModeModal } from './components/ui/GodModeModal';
import { useKonamiCode } from './hooks/useKonamiCode';

const PortfolioContent: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(0);
  const [achievementsOpen, setAchievementsOpen] = useState(false);
  const [godModeModalOpen, setGodModeModalOpen] = useState(false);

  const { activateGodMode } = useGame();
  const { playClick, playJump } = useAudio();

  // Listen for Konami Code sequence: ↑ ↑ ↓ ↓ ← → ← → B A
  useKonamiCode(() => {
    activateGodMode();
    setGodModeModalOpen(true);
  });

  const handleStageSelect = (index: number) => {
    setActiveStage(index);
  };

  // Keyboard navigation between stages (Left/Right or Q/E or Number 1-7)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore when user is actively typing in a form field or playing the arcade game
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT'
      ) {
        return;
      }

      // If user is currently in mini-game (stage 4), don't hijack arrow keys
      if (activeStage === 4 && ['arrowleft', 'arrowright', ' '].includes(e.key.toLowerCase())) {
        return;
      }

      const key = e.key.toLowerCase();
      if (key === 'q') {
        playJump();
        setActiveStage((prev) => (prev > 0 ? prev - 1 : 6));
      } else if (key === 'e') {
        playJump();
        setActiveStage((prev) => (prev < 6 ? prev + 1 : 0));
      } else if (['1', '2', '3', '4', '5', '6', '7'].includes(key)) {
        playClick();
        setActiveStage(parseInt(key, 10) - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeStage, playJump, playClick]);

  return (
    <div className="h-screen w-screen max-h-screen overflow-hidden flex flex-col bg-[var(--theme-bg)] text-[var(--theme-text)] font-tech select-none transition-colors duration-300">
      {/* CRT Visual Filters */}
      <CrtOverlay />

      {/* Retro Arcade HUD Navbar */}
      <Navbar
        activeStage={activeStage}
        onSelectStage={handleStageSelect}
        onOpenAchievements={() => setAchievementsOpen(true)}
      />

      {/* Main Stage Viewport (Screen Scene) */}
      <main className="flex-1 min-h-0 overflow-hidden relative retro-grid">
        <div key={activeStage} className="h-full w-full animate-in fade-in zoom-in-[0.98] duration-150">
          {activeStage === 0 && <Hero onNavigateStage={handleStageSelect} />}
          {activeStage === 1 && <AboutSection onNavigateStage={handleStageSelect} />}
          {activeStage === 2 && <SkillsSection onNavigateStage={handleStageSelect} />}
          {activeStage === 3 && <ProjectsSection onNavigateStage={handleStageSelect} />}
          {activeStage === 4 && <BugSmasherGame onNavigateStage={handleStageSelect} />}
          {activeStage === 5 && <ExperienceSection onNavigateStage={handleStageSelect} />}
          {activeStage === 6 && <ContactSection onNavigateStage={handleStageSelect} />}
        </div>
      </main>

      {/* Bottom Retro Handheld Controller Dock */}
      <StageController
        currentStage={activeStage}
        onSelectStage={handleStageSelect}
      />

      {/* Overlays & Modals */}
      <Toast />
      <AchievementsModal
        isOpen={achievementsOpen}
        onClose={() => setAchievementsOpen(false)}
      />
      <GodModeModal
        isOpen={godModeModalOpen}
        onClose={() => setGodModeModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AudioProvider>
        <GameProvider>
          <PortfolioContent />
        </GameProvider>
      </AudioProvider>
    </ThemeProvider>
  );
}
