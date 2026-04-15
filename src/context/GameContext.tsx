import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { GameSettings, Difficulty, ModalType } from '../types';

interface GameContextType {
  settings: GameSettings;
  difficulty: Difficulty;
  setDifficulty: (difficulty: Difficulty) => void;
  selectedTheme: string;
  activeModal: ModalType;
  openModal: (modalType: ModalType) => void;
  closeModal: () => void;
  toggleTheme: () => void;
  updateSettings: (updates: Partial<GameSettings>) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameProviderProps {
  children: ReactNode;
}

const defaultSettings: GameSettings = {
  soundEnabled: true,
  musicEnabled: true,
  theme: 'light',
  showTimer: true,
  autoFlipDelay: 500,
};


export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<GameSettings>(defaultSettings);
  const [difficulty, setDifficulty] = useState<Difficulty>('MEDIUM');
  const [_selectedTheme] = useState<string>('default');
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  
  const openModal = (modalType: ModalType) => {
    setActiveModal(modalType);
  };

  
  const closeModal = () => {
    setActiveModal(null);
  };

  
  const toggleTheme = () => {
    setSettings((prev) => {
      const newTheme: 'light' | 'dark' = prev.theme === 'light' ? 'dark' : 'light';
      const next = { ...prev, theme: newTheme };
      try {
        console.log('toggleTheme ->', prev.theme, '->', next.theme);
      } catch (e) {}
      return next;
    });
  };

  /**
   * Update game settings
   */
  const updateSettings = (updates: Partial<GameSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  };

  const value: GameContextType = {
    settings,
    difficulty,
    setDifficulty,
    selectedTheme: _selectedTheme,
    activeModal,
    openModal,
    closeModal,
    toggleTheme,
    updateSettings,
  };

  // Apply theme class to document element so Tailwind dark mode works
  useEffect(() => {
    try {
      if (settings.theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {
      // ignore (server-side rendering or no document)
    }
  }, [settings.theme]);

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

/**
 * useGameContext Hook - Use game context in components
 */
export const useGameContext = (): GameContextType => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};
