import React, { createContext, useContext, useState, useEffect } from 'react';
import { soundEngine } from '../utils/soundEngine';

interface AudioContextType {
  isMuted: boolean;
  toggleMute: () => void;
  isBgmActive: boolean;
  toggleBgm: () => void;
  playClick: () => void;
  playCoin: () => void;
  playLaser: () => void;
  playJump: () => void;
  playPowerUp: () => void;
  playHit: () => void;
  playExplosion: () => void;
  playVictory: () => void;
  playGameOver: () => void;
  playTypewriter: () => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    const saved = localStorage.getItem('retro_audio_muted');
    return saved !== null ? JSON.parse(saved) : false;
  });

  const [isBgmActive, setIsBgmActive] = useState<boolean>(false);

  useEffect(() => {
    soundEngine.setMuted(isMuted);
    localStorage.setItem('retro_audio_muted', JSON.stringify(isMuted));
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev;
      soundEngine.setMuted(next);
      if (!next) soundEngine.playClick();
      return next;
    });
  };

  const toggleBgm = () => {
    const active = soundEngine.toggleBGM();
    setIsBgmActive(active);
    if (active) soundEngine.playPowerUp();
  };

  const playClick = () => soundEngine.playClick();
  const playCoin = () => soundEngine.playCoin();
  const playLaser = () => soundEngine.playLaser();
  const playJump = () => soundEngine.playJump();
  const playPowerUp = () => soundEngine.playPowerUp();
  const playHit = () => soundEngine.playHit();
  const playExplosion = () => soundEngine.playExplosion();
  const playVictory = () => soundEngine.playVictory();
  const playGameOver = () => soundEngine.playGameOver();
  const playTypewriter = () => soundEngine.playTypewriter();

  return (
    <AudioContext.Provider
      value={{
        isMuted,
        toggleMute,
        isBgmActive,
        toggleBgm,
        playClick,
        playCoin,
        playLaser,
        playJump,
        playPowerUp,
        playHit,
        playExplosion,
        playVictory,
        playGameOver,
        playTypewriter,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
