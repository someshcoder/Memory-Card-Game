// Card interface - represents a single card in the game
export interface Card {
  id: string;
  value: string | number;
  imageUrl?: string;
  isFlipped: boolean;
  isMatched: boolean;
  pairId: string; // To identify matching pairs
}

// Game difficulty levels
export const Difficulty = {
  EASY: 'EASY',
  MEDIUM: 'MEDIUM',
  HARD: 'HARD',
} as const;

export type Difficulty = typeof Difficulty[keyof typeof Difficulty];

// Game configuration based on difficulty
export interface GameConfig {
  rows: number;
  columns: number;
  totalCards: number;
  timeLimit?: number; // in seconds, optional
}

// Game state management
export interface GameState {
  cards: Card[];
  flippedCards: Card[];
  matchedPairs: number;
  moves: number;
  isGameStarted: boolean;
  isGameComplete: boolean;
  difficulty: Difficulty;
  score: number;
  timeElapsed: number;
}

// Player statistics for localStorage
export interface PlayerStats {
  gamesPlayed: number;
  gamesWon: number;
  bestTime: number;
  bestMoves: number;
  totalMoves: number;
  averageTime: number;
  lastPlayed: string; // ISO date string
}

// High score entry
export interface HighScore {
  id: string;
  playerName?: string;
  moves: number;
  time: number;
  difficulty: Difficulty;
  date: string; // ISO date string
  score: number;
}

// Game settings
export interface GameSettings {
  soundEnabled: boolean;
  musicEnabled: boolean;
  theme: 'light' | 'dark';
  showTimer: boolean;
  autoFlipDelay: number; // milliseconds
}

// Modal types for different game states
export type ModalType = 'win' | 'pause' | 'settings' | 'highscores' | null;

// Props for Modal component
export interface ModalProps {
  type: ModalType;
  isOpen: boolean;
  onClose: () => void;
  data?: {
    moves?: number;
    time?: number;
    score?: number;
    highScores?: HighScore[];
  };
}

// Timer status
export const TimerStatus = {
  IDLE: 'IDLE',
  RUNNING: 'RUNNING',
  PAUSED: 'PAUSED',
  STOPPED: 'STOPPED',
} as const;

export type TimerStatus = typeof TimerStatus[keyof typeof TimerStatus];

// Action types for game reducer (if using useReducer)
export type GameAction =
  | { type: 'FLIP_CARD'; payload: Card }
  | { type: 'MATCH_FOUND'; payload: { card1: Card; card2: Card } }
  | { type: 'NO_MATCH'; payload: { card1: Card; card2: Card } }
  | { type: 'START_GAME'; payload: { difficulty: Difficulty } }
  | { type: 'RESET_GAME' }
  | { type: 'INCREMENT_MOVES' }
  | { type: 'UPDATE_TIME'; payload: number }
  | { type: 'GAME_COMPLETE' }
  | { type: 'PAUSE_GAME' }
  | { type: 'RESUME_GAME' };

// Card theme/category options
export interface CardTheme {
  id: string;
  name: string;
  description: string;
  cards: string[]; // Array of image URLs or identifiers
  thumbnail?: string;
}