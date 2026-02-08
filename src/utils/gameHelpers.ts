import { Difficulty } from '../types';
import type { Card, CardTheme } from '../types';
import { CARD_THEMES, DEFAULT_THEME_ID, GAME_CONFIGS, SCORING, PERFECT_MOVES } from './constants';

/**
 * Shuffle an array using Fisher-Yates algorithm
 * This ensures truly random shuffling
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Generate a unique ID
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Get card theme by ID
 */
export const getCardTheme = (themeId: string): CardTheme => {
  const theme = CARD_THEMES.find((t) => t.id === themeId);
  return theme || CARD_THEMES.find((t) => t.id === DEFAULT_THEME_ID)!;
};

/**
 * Generate cards for the game based on difficulty and theme
 */
export const generateCards = (
  difficulty: Difficulty,
  themeId: string = DEFAULT_THEME_ID
): Card[] => {
  const config = GAME_CONFIGS[difficulty];
  const theme = getCardTheme(themeId);
  const totalPairs = config.totalCards / 2;

  // Select random cards from theme
  const selectedCards = shuffleArray(theme.cards).slice(0, totalPairs);

  // Create pairs
  const cards: Card[] = [];
  selectedCards.forEach((cardValue, index) => {
    const pairId = `pair-${index}`;
    
    // First card of the pair
    cards.push({
      id: generateId(),
      value: cardValue,
      imageUrl: cardValue, // For emoji/images
      isFlipped: false,
      isMatched: false,
      pairId,
    });

    // Second card of the pair
    cards.push({
      id: generateId(),
      value: cardValue,
      imageUrl: cardValue,
      isFlipped: false,
      isMatched: false,
      pairId,
    });
  });

  // Shuffle the cards
  return shuffleArray(cards);
};

/**
 * Check if two cards match
 */
export const checkCardsMatch = (card1: Card, card2: Card): boolean => {
  return card1.pairId === card2.pairId && card1.id !== card2.id;
};

/**
 * Format time in MM:SS format
 */
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Format time in human readable format (e.g., "2m 30s")
 */
export const formatTimeHuman = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  
  if (mins === 0) {
    return `${secs}s`;
  }
  
  if (secs === 0) {
    return `${mins}m`;
  }
  
  return `${mins}m ${secs}s`;
};

/**
 * Calculate score based on moves, time, and difficulty
 */
export const calculateScore = (
  moves: number,
  timeElapsed: number,
  difficulty: Difficulty,
  matchedPairs: number
): number => {
  const config = GAME_CONFIGS[difficulty];
  const totalPairs = config.totalCards / 2;
  const perfectMoves = PERFECT_MOVES[difficulty];
  
  let score = 0;

  // Base score for each match
  score += matchedPairs * SCORING.MATCH_BONUS;

  // Bonus for completing the game
  if (matchedPairs === totalPairs) {
    score += 1000;

    // Perfect game bonus (completed in minimum moves)
    if (moves === perfectMoves) {
      score += SCORING.PERFECT_GAME_BONUS;
    }

    // Time bonus (if time limit exists)
    if (config.timeLimit) {
      const timeRemaining = config.timeLimit - timeElapsed;
      if (timeRemaining > 0) {
        score += Math.floor(timeRemaining * SCORING.TIME_BONUS_MULTIPLIER);
      }
    } else {
      // Bonus for completing quickly (no time limit mode)
      const timeBonusThreshold = 120; // 2 minutes
      if (timeElapsed < timeBonusThreshold) {
        score += Math.floor((timeBonusThreshold - timeElapsed) * SCORING.TIME_BONUS_MULTIPLIER);
      }
    }

    // Penalty for extra moves
    const extraMoves = moves - perfectMoves;
    if (extraMoves > 0) {
      score -= extraMoves * SCORING.MOVE_PENALTY;
    }
  }

  // Ensure score is never negative
  return Math.max(0, score);
};

/**
 * Check if game is won (all cards matched)
 */
export const isGameWon = (cards: Card[]): boolean => {
  return cards.length > 0 && cards.every((card) => card.isMatched);
};

/**
 * Get difficulty level display name
 */
export const getDifficultyName = (difficulty: Difficulty): string => {
  const names: Record<Difficulty, string> = {
    [Difficulty.EASY]: 'Easy',
    [Difficulty.MEDIUM]: 'Medium',
    [Difficulty.HARD]: 'Hard',
  };
  return names[difficulty];
};

/**
 * Get grid layout classes based on difficulty
 */
export const getGridLayoutClasses = (difficulty: Difficulty): string => {
  const config = GAME_CONFIGS[difficulty];
  
  // Return Tailwind grid classes
  return `grid-cols-${config.columns} grid-rows-${config.rows}`;
};

/**
 * Get responsive grid layout styles
 */
export const getGridLayoutStyles = (difficulty: Difficulty): React.CSSProperties => {
  const config = GAME_CONFIGS[difficulty];
  
  return {
    display: 'grid',
    gridTemplateColumns: `repeat(${config.columns}, minmax(0, 1fr))`,
    gridTemplateRows: `repeat(${config.rows}, minmax(0, 1fr))`,
    gap: '1rem',
  };
};

/**
 * Calculate completion percentage
 */
export const getCompletionPercentage = (matchedPairs: number, totalCards: number): number => {
  const totalPairs = totalCards / 2;
  return Math.round((matchedPairs / totalPairs) * 100);
};

/**
 * Get performance rating based on moves and perfect moves
 */
export const getPerformanceRating = (moves: number, difficulty: Difficulty): string => {
  const perfectMoves = PERFECT_MOVES[difficulty];
  const ratio = moves / perfectMoves;

  if (ratio === 1) return 'Perfect! ⭐⭐⭐';
  if (ratio <= 1.2) return 'Excellent! ⭐⭐';
  if (ratio <= 1.5) return 'Great! ⭐';
  if (ratio <= 2) return 'Good!';
  return 'Keep Practicing!';
};

/**
 * Generate random position for confetti/particles
 */
export const getRandomPosition = (max: number): number => {
  return Math.floor(Math.random() * max);
};

/**
 * Delay function for async operations
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Debounce function for performance optimization
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: number | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
};

/**
 * Throttle function for performance optimization
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle = false;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};

/**
 * Check if device is mobile
 */
export const isMobileDevice = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

/**
 * Get card size based on screen size and difficulty
 */
export const getCardSize = (difficulty: Difficulty): { width: number; height: number } => {
  const isMobile = isMobileDevice();
  
  if (isMobile) {
    return difficulty === Difficulty.HARD 
      ? { width: 60, height: 80 }
      : difficulty === Difficulty.MEDIUM
      ? { width: 70, height: 95 }
      : { width: 80, height: 110 };
  }
  
  return difficulty === Difficulty.HARD
    ? { width: 90, height: 120 }
    : difficulty === Difficulty.MEDIUM
    ? { width: 110, height: 145 }
    : { width: 130, height: 170 };
};

/**
 * Validate player name
 */
export const validatePlayerName = (name: string): { valid: boolean; error?: string } => {
  if (!name || name.trim().length === 0) {
    return { valid: false, error: 'Name cannot be empty' };
  }
  
  if (name.trim().length < 2) {
    return { valid: false, error: 'Name must be at least 2 characters' };
  }
  
  if (name.trim().length > 20) {
    return { valid: false, error: 'Name must be less than 20 characters' };
  }
  
  // Check for valid characters (letters, numbers, spaces, and basic punctuation)
  const validNameRegex = /^[a-zA-Z0-9\s\-_.]+$/;
  if (!validNameRegex.test(name)) {
    return { valid: false, error: 'Name contains invalid characters' };
  }
  
  return { valid: true };
};

/**
 * Get congratulatory message based on performance
 */
export const getCongratulationsMessage = (
  moves: number,
  timeElapsed: number,
  difficulty: Difficulty
): string => {
  const perfectMoves = PERFECT_MOVES[difficulty];
  const config = GAME_CONFIGS[difficulty];
  
  if (moves === perfectMoves) {
    return "🎉 PERFECT GAME! You're a Memory Master! 🏆";
  }
  
  if (config.timeLimit && timeElapsed < config.timeLimit / 2) {
    return "⚡ LIGHTNING FAST! Incredible speed! ⚡";
  }
  
  if (moves <= perfectMoves * 1.2) {
    return "⭐ EXCELLENT! Outstanding performance! ⭐";
  }
  
  if (moves <= perfectMoves * 1.5) {
    return "🎯 GREAT JOB! Keep up the good work! 🎯";
  }
  
  return "🎊 WELL DONE! You completed the game! 🎊";
};

/**
 * Copy text to clipboard
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
};

/**
 * Share game results (Web Share API)
 */
export const shareGameResults = async (
  moves: number,
  time: number,
  difficulty: Difficulty,
  score: number
): Promise<boolean> => {
  const shareData = {
    title: 'Memory Card Game Results',
    text: `I completed the Memory Card Game on ${getDifficultyName(difficulty)} difficulty!\n🎮 Moves: ${moves}\n⏱️ Time: ${formatTimeHuman(time)}\n🏆 Score: ${score}\n\nCan you beat my score?`,
    url: window.location.href,
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return true;
    } catch (error) {
      console.error('Error sharing:', error);
      return false;
    }
  } else {
    // Fallback to copying to clipboard
    return await copyToClipboard(shareData.text);
  }
};

/**
 * Play sound effect (will be used when sounds are added)
 */
export const playSound = (soundName: string, volume: number = 1): void => {
  // Placeholder for future sound implementation
  // Will be implemented when sound files are added
  console.log(`Playing sound: ${soundName} at volume: ${volume}`);
};

/**
 * Vibrate device (for mobile feedback)
 */
export const vibrate = (pattern: number | number[] = 50): void => {
  if ('vibrate' in navigator) {
    navigator.vibrate(pattern);
  }
};

/**
 * Generate share image data URL (for social sharing)
 */
export const generateShareImage = (
  _moves: number,
  _time: number,
  _difficulty: Difficulty,
  _score: number
): string => {
  // This would generate a canvas-based image for sharing
  // Placeholder for now
  return '';
};