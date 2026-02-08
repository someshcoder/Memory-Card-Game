import { Difficulty } from '../types';
import type { GameConfig, CardTheme } from '../types';

// Game configuration based on difficulty levels
export const GAME_CONFIGS: Record<Difficulty, GameConfig> = {
  [Difficulty.EASY]: {
    rows: 2,
    columns: 4,
    totalCards: 8, // 4 pairs
    timeLimit: undefined, // No time limit for easy mode
  },
  [Difficulty.MEDIUM]: {
    rows: 3,
    columns: 4,
    totalCards: 12, // 6 pairs
    timeLimit: 120, // 2 minutes
  },
  [Difficulty.HARD]: {
    rows: 4,
    columns: 5,
    totalCards: 20, // 10 pairs
    timeLimit: 180, // 3 minutes
  },
};

// Scoring system
export const SCORING = {
  MATCH_BONUS: 100,
  TIME_BONUS_MULTIPLIER: 10, // Bonus points per second remaining
  PERFECT_GAME_BONUS: 500, // Bonus for completing with minimum moves
  STREAK_MULTIPLIER: 1.5, // Multiplier for consecutive matches
  MOVE_PENALTY: 5, // Points deducted per extra move
};

// Animation timings (in milliseconds)
export const ANIMATION_DURATION = {
  CARD_FLIP: 600,
  CARD_FLIP_BACK: 600,
  MATCH_DELAY: 1000, // Time cards stay flipped when matched
  NO_MATCH_DELAY: 1200, // Time cards stay visible before flipping back
  SHUFFLE: 800,
  CELEBRATION: 2000,
  FADE_IN: 300,
  FADE_OUT: 300,
  BOUNCE: 400,
  SLIDE: 350,
};

// Game timing constants
export const GAME_TIMING = {
  AUTO_FLIP_DELAY: 1000, // Delay before auto-flipping non-matching cards
  HINT_COOLDOWN: 30000, // 30 seconds between hints
  PAUSE_WARNING_TIME: 300000, // 5 minutes - warn if game paused too long
};

// LocalStorage keys
export const STORAGE_KEYS = {
  HIGH_SCORES: 'memory_game_high_scores',
  PLAYER_STATS: 'memory_game_player_stats',
  GAME_SETTINGS: 'memory_game_settings',
  LAST_GAME_STATE: 'memory_game_last_state',
  PLAYER_NAME: 'memory_game_player_name',
  THEME_PREFERENCE: 'memory_game_theme',
};

// Maximum entries for high scores
export const MAX_HIGH_SCORES = 10;

// Default game settings
export const DEFAULT_SETTINGS = {
  soundEnabled: true,
  musicEnabled: true,
  theme: 'light' as const,
  showTimer: true,
  autoFlipDelay: ANIMATION_DURATION.NO_MATCH_DELAY,
};

// Card themes/categories with emojis (can be replaced with actual images)
export const CARD_THEMES: CardTheme[] = [
  {
    id: 'animals',
    name: 'Animals',
    description: 'Cute animal friends',
    cards: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯'],
    thumbnail: '🐾',
  },
  {
    id: 'fruits',
    name: 'Fruits',
    description: 'Fresh and colorful fruits',
    cards: ['🍎', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍑', '🍒', '🥝'],
    thumbnail: '🍎',
  },
  {
    id: 'sports',
    name: 'Sports',
    description: 'Popular sports and activities',
    cards: ['⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🏓', '🏸', '🏒', '🏑'],
    thumbnail: '⚽',
  },
  {
    id: 'vehicles',
    name: 'Vehicles',
    description: 'Cars, planes and more',
    cards: ['🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒', '🚐'],
    thumbnail: '🚗',
  },
  {
    id: 'nature',
    name: 'Nature',
    description: 'Beautiful nature elements',
    cards: ['🌸', '🌺', '🌻', '🌷', '🌹', '🌼', '🌿', '🍀', '🌳', '🌲'],
    thumbnail: '🌸',
  },
  {
    id: 'food',
    name: 'Food',
    description: 'Delicious food items',
    cards: ['🍕', '🍔', '🍟', '🌭', '🍿', '🧁', '🍰', '🍪', '🍩', '🍦'],
    thumbnail: '🍕',
  },
  {
    id: 'space',
    name: 'Space',
    description: 'Explore the cosmos',
    cards: ['🌍', '🌎', '🌏', '🌕', '🌖', '🌗', '🌘', '🌑', '⭐', '🌟'],
    thumbnail: '🚀',
  },
  {
    id: 'weather',
    name: 'Weather',
    description: 'Weather and seasons',
    cards: ['☀️', '🌤️', '⛅', '🌥️', '☁️', '🌦️', '🌧️', '⛈️', '🌩️', '❄️'],
    thumbnail: '☀️',
  },
];

// Default theme to use
export const DEFAULT_THEME_ID = 'animals';

// Color palette for UI (Tailwind-compatible)
export const COLORS = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  success: {
    light: '#86efac',
    DEFAULT: '#22c55e',
    dark: '#15803d',
  },
  danger: {
    light: '#fca5a5',
    DEFAULT: '#ef4444',
    dark: '#b91c1c',
  },
  warning: {
    light: '#fcd34d',
    DEFAULT: '#f59e0b',
    dark: '#b45309',
  },
  neutral: {
    light: '#f3f4f6',
    DEFAULT: '#6b7280',
    dark: '#1f2937',
  },
};

// Gradient presets for modern UI
export const GRADIENTS = {
  primary: 'bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500',
  success: 'bg-gradient-to-br from-green-400 to-emerald-600',
  card: 'bg-gradient-to-br from-slate-50 to-slate-100',
  cardDark: 'bg-gradient-to-br from-slate-800 to-slate-900',
  ocean: 'bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600',
  sunset: 'bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600',
  forest: 'bg-gradient-to-br from-green-400 via-teal-500 to-blue-500',
};

// Z-index layers for proper stacking
export const Z_INDEX = {
  CARD: 1,
  CARD_FLIPPED: 2,
  SCORE_BOARD: 10,
  MODAL_BACKDROP: 50,
  MODAL: 51,
  TOAST: 100,
};

// Breakpoints for responsive design (matching Tailwind defaults)
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Messages and notifications
export const MESSAGES = {
  GAME_START: 'Game Started! Good Luck! 🎮',
  GAME_COMPLETE: 'Congratulations! You Won! 🎉',
  PERFECT_GAME: 'Perfect Game! Amazing! ⭐',
  NEW_HIGH_SCORE: 'New High Score! 🏆',
  MATCH_FOUND: 'Match Found! ✨',
  NO_MATCH: 'Try Again! 💪',
  GAME_PAUSED: 'Game Paused ⏸️',
  GAME_RESUMED: 'Game Resumed ▶️',
  TIME_WARNING: 'Hurry Up! Time Running Out! ⏰',
};

// Card back designs
export const CARD_BACK_DESIGNS = {
  geometric: 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500',
  gradient: 'bg-gradient-to-br from-blue-600 to-cyan-400',
  pattern: 'bg-blue-600',
  solid: 'bg-slate-700',
};

// Celebration confetti colors
export const CONFETTI_COLORS = [
  '#ff0000',
  '#00ff00',
  '#0000ff',
  '#ffff00',
  '#ff00ff',
  '#00ffff',
  '#ffa500',
  '#800080',
  '#ffc0cb',
  '#00ff7f',
];

// Game difficulty labels for UI
export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  [Difficulty.EASY]: 'Easy',
  [Difficulty.MEDIUM]: 'Medium',
  [Difficulty.HARD]: 'Hard',
};

// Game difficulty descriptions
export const DIFFICULTY_DESCRIPTIONS: Record<Difficulty, string> = {
  [Difficulty.EASY]: 'Perfect for beginners - 4 pairs, no time limit',
  [Difficulty.MEDIUM]: '6 pairs with 2 minute time limit',
  [Difficulty.HARD]: 'Challenge yourself - 10 pairs, 3 minute limit',
};

// Minimum moves to complete game perfectly (difficulty based)
export const PERFECT_MOVES: Record<Difficulty, number> = {
  [Difficulty.EASY]: 8, // 4 pairs * 2 moves
  [Difficulty.MEDIUM]: 12, // 6 pairs * 2 moves
  [Difficulty.HARD]: 20, // 10 pairs * 2 moves
};

// API endpoints (for future backend integration)
export const API_ENDPOINTS = {
  SAVE_SCORE: '/api/scores',
  GET_LEADERBOARD: '/api/leaderboard',
  GET_PLAYER_STATS: '/api/stats',
};

// Social share messages
export const SHARE_MESSAGES = {
  TEMPLATE: (moves: number, time: number, difficulty: string) =>
    `I just completed the Memory Card Game on ${difficulty} mode in ${moves} moves and ${time} seconds! Can you beat my score? 🎮🧠`,
};