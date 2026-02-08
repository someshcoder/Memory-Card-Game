import type { HighScore, PlayerStats, GameSettings, GameState } from '../types';
import { STORAGE_KEYS, MAX_HIGH_SCORES, DEFAULT_SETTINGS } from './constants';

/**
 * Generic localStorage helper functions with error handling
 */

/**
 * Save data to localStorage
 */
const saveToStorage = <T>(key: string, data: T): boolean => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
    return true;
  } catch (error) {
    console.error(`Error saving to localStorage (${key}):`, error);
    return false;
  }
};

/**
 * Load data from localStorage
 */
const loadFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const serializedData = localStorage.getItem(key);
    if (serializedData === null) {
      return defaultValue;
    }
    return JSON.parse(serializedData) as T;
  } catch (error) {
    console.error(`Error loading from localStorage (${key}):`, error);
    return defaultValue;
  }
};

/**
 * Remove data from localStorage
 */
const removeFromStorage = (key: string): boolean => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing from localStorage (${key}):`, error);
    return false;
  }
};

/**
 * Clear all game data from localStorage
 */
export const clearAllGameData = (): boolean => {
  try {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
    return true;
  } catch (error) {
    console.error('Error clearing all game data:', error);
    return false;
  }
};

// ==================== HIGH SCORES ====================

/**
 * Save high scores to localStorage
 */
export const saveHighScores = (scores: HighScore[]): boolean => {
  // Sort by score descending, then by time ascending (lower is better)
  const sortedScores = [...scores]
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return a.time - b.time;
    })
    .slice(0, MAX_HIGH_SCORES);

  return saveToStorage(STORAGE_KEYS.HIGH_SCORES, sortedScores);
};

/**
 * Load high scores from localStorage
 */
export const loadHighScores = (): HighScore[] => {
  return loadFromStorage<HighScore[]>(STORAGE_KEYS.HIGH_SCORES, []);
};

/**
 * Add a new high score
 */
export const addHighScore = (newScore: HighScore): boolean => {
  const currentScores = loadHighScores();
  const updatedScores = [...currentScores, newScore];
  return saveHighScores(updatedScores);
};

/**
 * Check if score qualifies as a high score
 */
export const isHighScore = (score: number): boolean => {
  const highScores = loadHighScores();
  
  // If we don't have max scores yet, it's automatically a high score
  if (highScores.length < MAX_HIGH_SCORES) {
    return true;
  }
  
  // Check if score is higher than the lowest high score
  const lowestHighScore = highScores[highScores.length - 1];
  return score > lowestHighScore.score;
};

/**
 * Get high scores filtered by difficulty
 */
export const getHighScoresByDifficulty = (difficulty: string): HighScore[] => {
  const allScores = loadHighScores();
  return allScores.filter((score) => score.difficulty === difficulty);
};

/**
 * Get personal best score
 */
export const getPersonalBest = (): HighScore | null => {
  const scores = loadHighScores();
  return scores.length > 0 ? scores[0] : null;
};

// ==================== PLAYER STATS ====================

/**
 * Load player statistics
 */
export const loadPlayerStats = (): PlayerStats => {
  const defaultStats: PlayerStats = {
    gamesPlayed: 0,
    gamesWon: 0,
    bestTime: Infinity,
    bestMoves: Infinity,
    totalMoves: 0,
    averageTime: 0,
    lastPlayed: new Date().toISOString(),
  };
  
  return loadFromStorage<PlayerStats>(STORAGE_KEYS.PLAYER_STATS, defaultStats);
};

/**
 * Save player statistics
 */
export const savePlayerStats = (stats: PlayerStats): boolean => {
  return saveToStorage(STORAGE_KEYS.PLAYER_STATS, stats);
};

/**
 * Update player statistics after a game
 */
export const updatePlayerStats = (
  moves: number,
  time: number,
  isWon: boolean
): PlayerStats => {
  const currentStats = loadPlayerStats();
  
  const updatedStats: PlayerStats = {
    gamesPlayed: currentStats.gamesPlayed + 1,
    gamesWon: isWon ? currentStats.gamesWon + 1 : currentStats.gamesWon,
    bestTime: isWon ? Math.min(currentStats.bestTime, time) : currentStats.bestTime,
    bestMoves: isWon ? Math.min(currentStats.bestMoves, moves) : currentStats.bestMoves,
    totalMoves: currentStats.totalMoves + moves,
    averageTime:
      ((currentStats.averageTime * currentStats.gamesPlayed) + time) /
      (currentStats.gamesPlayed + 1),
    lastPlayed: new Date().toISOString(),
  };
  
  savePlayerStats(updatedStats);
  return updatedStats;
};

/**
 * Reset player statistics
 */
export const resetPlayerStats = (): boolean => {
  const defaultStats: PlayerStats = {
    gamesPlayed: 0,
    gamesWon: 0,
    bestTime: Infinity,
    bestMoves: Infinity,
    totalMoves: 0,
    averageTime: 0,
    lastPlayed: new Date().toISOString(),
  };
  
  return savePlayerStats(defaultStats);
};

/**
 * Get win rate percentage
 */
export const getWinRate = (): number => {
  const stats = loadPlayerStats();
  if (stats.gamesPlayed === 0) return 0;
  return Math.round((stats.gamesWon / stats.gamesPlayed) * 100);
};

/**
 * Get average moves per game
 */
export const getAverageMoves = (): number => {
  const stats = loadPlayerStats();
  if (stats.gamesPlayed === 0) return 0;
  return Math.round(stats.totalMoves / stats.gamesPlayed);
};

// ==================== GAME SETTINGS ====================

/**
 * Load game settings
 */
export const loadGameSettings = (): GameSettings => {
  return loadFromStorage<GameSettings>(STORAGE_KEYS.GAME_SETTINGS, DEFAULT_SETTINGS);
};

/**
 * Save game settings
 */
export const saveGameSettings = (settings: GameSettings): boolean => {
  return saveToStorage(STORAGE_KEYS.GAME_SETTINGS, settings);
};

/**
 * Update a specific setting
 */
export const updateSetting = <K extends keyof GameSettings>(
  key: K,
  value: GameSettings[K]
): boolean => {
  const currentSettings = loadGameSettings();
  const updatedSettings = {
    ...currentSettings,
    [key]: value,
  };
  return saveGameSettings(updatedSettings);
};

/**
 * Toggle sound setting
 */
export const toggleSound = (): boolean => {
  const settings = loadGameSettings();
  return updateSetting('soundEnabled', !settings.soundEnabled);
};

/**
 * Toggle music setting
 */
export const toggleMusic = (): boolean => {
  const settings = loadGameSettings();
  return updateSetting('musicEnabled', !settings.musicEnabled);
};

/**
 * Toggle theme
 */
export const toggleTheme = (): boolean => {
  const settings = loadGameSettings();
  const newTheme = settings.theme === 'light' ? 'dark' : 'light';
  return updateSetting('theme', newTheme);
};

/**
 * Reset settings to defaults
 */
export const resetSettings = (): boolean => {
  return saveGameSettings(DEFAULT_SETTINGS);
};

// ==================== GAME STATE ====================

/**
 * Save current game state (for pause/resume functionality)
 */
export const saveGameState = (gameState: Partial<GameState>): boolean => {
  return saveToStorage(STORAGE_KEYS.LAST_GAME_STATE, {
    ...gameState,
    savedAt: new Date().toISOString(),
  });
};

/**
 * Load saved game state
 */
export const loadGameState = (): (Partial<GameState> & { savedAt?: string }) | null => {
  const savedState = loadFromStorage<any>(STORAGE_KEYS.LAST_GAME_STATE, null);
  
  if (!savedState) return null;
  
  // Check if saved state is not too old (e.g., 24 hours)
  const savedAt = new Date(savedState.savedAt);
  const now = new Date();
  const hoursDifference = (now.getTime() - savedAt.getTime()) / (1000 * 60 * 60);
  
  if (hoursDifference > 24) {
    // State is too old, remove it
    removeFromStorage(STORAGE_KEYS.LAST_GAME_STATE);
    return null;
  }
  
  return savedState;
};

/**
 * Clear saved game state
 */
export const clearGameState = (): boolean => {
  return removeFromStorage(STORAGE_KEYS.LAST_GAME_STATE);
};

/**
 * Check if there's a saved game state
 */
export const hasSavedGame = (): boolean => {
  return loadGameState() !== null;
};

// ==================== PLAYER NAME ====================

/**
 * Save player name
 */
export const savePlayerName = (name: string): boolean => {
  return saveToStorage(STORAGE_KEYS.PLAYER_NAME, name.trim());
};

/**
 * Load player name
 */
export const loadPlayerName = (): string => {
  return loadFromStorage<string>(STORAGE_KEYS.PLAYER_NAME, '');
};

/**
 * Check if player name is set
 */
export const hasPlayerName = (): boolean => {
  const name = loadPlayerName();
  return name.length > 0;
};

// ==================== THEME PREFERENCE ====================

/**
 * Save theme preference
 */
export const saveThemePreference = (theme: 'light' | 'dark'): boolean => {
  return saveToStorage(STORAGE_KEYS.THEME_PREFERENCE, theme);
};

/**
 * Load theme preference
 */
export const loadThemePreference = (): 'light' | 'dark' => {
  return loadFromStorage<'light' | 'dark'>(STORAGE_KEYS.THEME_PREFERENCE, 'light');
};

// ==================== DATA EXPORT/IMPORT ====================

/**
 * Export all game data as JSON (for backup)
 */
export const exportGameData = (): string => {
  const data = {
    highScores: loadHighScores(),
    playerStats: loadPlayerStats(),
    gameSettings: loadGameSettings(),
    playerName: loadPlayerName(),
    themePreference: loadThemePreference(),
    exportedAt: new Date().toISOString(),
  };
  
  return JSON.stringify(data, null, 2);
};

/**
 * Import game data from JSON (restore from backup)
 */
export const importGameData = (jsonData: string): boolean => {
  try {
    const data = JSON.parse(jsonData);
    
    // Validate data structure
    if (!data.highScores || !data.playerStats || !data.gameSettings) {
      throw new Error('Invalid game data format');
    }
    
    // Import data
    saveHighScores(data.highScores);
    savePlayerStats(data.playerStats);
    saveGameSettings(data.gameSettings);
    
    if (data.playerName) {
      savePlayerName(data.playerName);
    }
    
    if (data.themePreference) {
      saveThemePreference(data.themePreference);
    }
    
    return true;
  } catch (error) {
    console.error('Error importing game data:', error);
    return false;
  }
};

/**
 * Download game data as a file
 */
export const downloadGameData = (): void => {
  const data = exportGameData();
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `memory-game-backup-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// ==================== STORAGE AVAILABILITY ====================

/**
 * Check if localStorage is available
 */
export const isLocalStorageAvailable = (): boolean => {
  try {
    const testKey = '__localStorage_test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Get storage usage information
 */
export const getStorageInfo = (): {
  isAvailable: boolean;
  itemCount: number;
  estimatedSize: number;
} => {
  if (!isLocalStorageAvailable()) {
    return {
      isAvailable: false,
      itemCount: 0,
      estimatedSize: 0,
    };
  }
  
  let estimatedSize = 0;
  let itemCount = 0;
  
  Object.values(STORAGE_KEYS).forEach((key) => {
    const item = localStorage.getItem(key);
    if (item) {
      itemCount++;
      estimatedSize += item.length;
    }
  });
  
  return {
    isAvailable: true,
    itemCount,
    estimatedSize: estimatedSize * 2, // Approximate bytes (UTF-16)
  };
};