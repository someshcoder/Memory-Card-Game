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
  updateSettings: (newSettings: Partial<GameSettings>) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

/**
 * Default game settings
 */
const defaultSettings: GameSettings = {
  soundEnabled: true,
  musicEnabled: true,
  theme: 'light',
  showTimer: true,
  autoFlipDelay: 500,
};

/**
 * GameProvider Component - Provides game state to child components
 */
export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<GameSettings>(defaultSettings);
  const [difficulty, setDifficulty] = useState<Difficulty>('MEDIUM');
  const [_selectedTheme] = useState<string>('default');
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  /**
   * Open a modal
   */
  const openModal = (modalType: ModalType) => {
    setActiveModal(modalType);
  };

  /**
   * Close the modal
   */
  const closeModal = () => {
    setActiveModal(null);
  };

  /**
   * Toggle theme between light and dark
   */
  const toggleTheme = () => {
    setSettings((prev) => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light'
    }));
  };

  /**
   * Update game settings
   */
  const updateSettings = (newSettings: Partial<GameSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
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
