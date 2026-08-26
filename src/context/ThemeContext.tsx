import React, { createContext, useContext, useState, useEffect } from 'react';

export type RetroTheme = 'arcade' | 'gameboy' | 'nes' | 'dos';

interface ThemeContextType {
  theme: RetroTheme;
  setTheme: (theme: RetroTheme) => void;
  crtEnabled: boolean;
  toggleCrt: () => void;
  flickerEnabled: boolean;
  toggleFlicker: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<RetroTheme>(() => {
    const saved = localStorage.getItem('retro_theme');
    return (saved as RetroTheme) || 'arcade';
  });

  const [crtEnabled, setCrtEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('retro_crt_enabled');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [flickerEnabled, setFlickerEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('retro_flicker_enabled');
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('retro_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('retro_crt_enabled', JSON.stringify(crtEnabled));
  }, [crtEnabled]);

  useEffect(() => {
    localStorage.setItem('retro_flicker_enabled', JSON.stringify(flickerEnabled));
  }, [flickerEnabled]);

  const setTheme = (newTheme: RetroTheme) => {
    setThemeState(newTheme);
  };

  const toggleCrt = () => {
    setCrtEnabled((prev) => !prev);
  };

  const toggleFlicker = () => {
    setFlickerEnabled((prev) => !prev);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        crtEnabled,
        toggleCrt,
        flickerEnabled,
        toggleFlicker,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

