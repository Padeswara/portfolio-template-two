import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import type { Achievement } from '../data/achievementsData';
import { ACHIEVEMENTS } from '../data/achievementsData';
import { soundEngine } from '../utils/soundEngine';

interface GameContextType {
  coins: number;
  score: number;
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
  level: number;
  exp: number;
  nextLevelExp: number;
  unlockedAchievements: string[];
  recentAchievement: Achievement | null;
  isGodMode: boolean;
  addCoins: (amount?: number) => void;
  addScore: (amount: number) => void;
  addExp: (amount: number) => void;
  unlockAchievement: (id: string) => void;
  activateGodMode: () => void;
  insertCoin: () => void;
  dismissToast: () => void;
}

const GameContext = createContext<GameContextType | null>(null);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [coins, setCoins] = useState<number>(() => {
    const saved = localStorage.getItem('retro_coins');
    return saved !== null ? parseInt(saved, 10) : 10;
  });

  const [score, setScore] = useState<number>(() => {
    const saved = localStorage.getItem('retro_score');
    return saved !== null ? parseInt(saved, 10) : 1250;
  });

  const [hp, setHp] = useState<number>(3);
  const [maxHp] = useState<number>(3);
  const [mp, setMp] = useState<number>(100);
  const [maxMp] = useState<number>(100);

  const [exp, setExp] = useState<number>(() => {
    const saved = localStorage.getItem('retro_exp');
    return saved !== null ? parseInt(saved, 10) : 450;
  });

  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>(() => {
    const saved = localStorage.getItem('retro_achievements');
    return saved !== null ? JSON.parse(saved) : [];
  });

  const [recentAchievement, setRecentAchievement] = useState<Achievement | null>(null);
  const [isGodMode, setIsGodMode] = useState<boolean>(false);

  // Level calculation: Level = Math.floor(exp / 500) + 1
  const level = Math.floor(exp / 500) + 1;
  const nextLevelExp = level * 500;

  // Persist state
  useEffect(() => {
    localStorage.setItem('retro_coins', coins.toString());
  }, [coins]);

  useEffect(() => {
    localStorage.setItem('retro_score', score.toString());
  }, [score]);

  useEffect(() => {
    localStorage.setItem('retro_exp', exp.toString());
  }, [exp]);

  useEffect(() => {
    localStorage.setItem('retro_achievements', JSON.stringify(unlockedAchievements));
  }, [unlockedAchievements]);

  const addCoins = (amount: number = 1) => {
    setCoins((prev) => {
      const next = prev + amount;
      if (next >= 1) {
        unlockAchievement('first_coin');
      }
      return next;
    });
  };

  const insertCoin = () => {
    soundEngine.playCoin();
    addCoins(1);
    addExp(25);
  };

  const addScore = (amount: number) => {
    setScore((prev) => prev + amount);
  };

  const addExp = (amount: number) => {
    setExp((prev) => {
      const prevLevel = Math.floor(prev / 500) + 1;
      const nextExp = prev + amount;
      const nextLevel = Math.floor(nextExp / 500) + 1;

      if (nextLevel > prevLevel) {
        // Level up!
        soundEngine.playPowerUp();
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#e69d24', '#5a8740', '#8c5835', '#d64545'],
        });
      }
      return nextExp;
    });
  };

  const unlockAchievement = (id: string) => {
    if (unlockedAchievements.includes(id)) return;

    const ach = ACHIEVEMENTS.find((a) => a.id === id);
    if (!ach) return;

    setUnlockedAchievements((prev) => [...prev, id]);
    setRecentAchievement(ach);
    soundEngine.playVictory();

    // Trigger celebratory confetti
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.7 },
      colors: ['#e69d24', '#7cb359', '#fff8eb', '#d64545'],
    });

    setExp((prev) => prev + ach.rewardExp);

    // Auto-dismiss toast after 5s
    setTimeout(() => {
      setRecentAchievement((current) => (current?.id === id ? null : current));
    }, 5000);
  };

  const activateGodMode = () => {
    setIsGodMode(true);
    setCoins(9999);
    setScore(999999);
    setHp(99);
    setMp(999);
    setExp(50000);
    soundEngine.playVictory();
    unlockAchievement('konami_god_mode');

    confetti({
      particleCount: 200,
      spread: 110,
      origin: { y: 0.5 },
      colors: ['#e69d24', '#7cb359', '#fff8eb', '#d64545'],
    });
  };

  const dismissToast = () => {
    setRecentAchievement(null);
  };

  return (
    <GameContext.Provider
      value={{
        coins,
        score,
        hp,
        maxHp,
        mp,
        maxMp,
        level,
        exp,
        nextLevelExp,
        unlockedAchievements,
        recentAchievement,
        isGodMode,
        addCoins,
        addScore,
        addExp,
        unlockAchievement,
        activateGodMode,
        insertCoin,
        dismissToast,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
