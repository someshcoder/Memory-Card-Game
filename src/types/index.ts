// Central export file for all types
// This makes importing types cleaner throughout the application

export type {
  Card,
  GameConfig,
  GameState,
  PlayerStats,
  HighScore,
  GameSettings,
  ModalProps,
  CardTheme,
} from './gametypes';

export { Difficulty, TimerStatus } from './gametypes';
export type { ModalType, GameAction } from './gametypes';

// Additional utility types for the application

// Generic response type for async operations
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Loading state type
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// Animation duration presets (in milliseconds)
export const AnimationDuration = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
  CARD_FLIP: 600,
  MATCH_CELEBRATION: 800,
} as const;

export type AnimationDuration = typeof AnimationDuration[keyof typeof AnimationDuration];

// Breakpoint types for responsive design
export const Breakpoint = {
  MOBILE: 640,
  TABLET: 768,
  DESKTOP: 1024,
  LARGE: 1280,
} as const;

export type Breakpoint = typeof Breakpoint[keyof typeof Breakpoint];

// Toast notification types (for future enhancements)
export interface ToastNotification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

// Component size variants
export type ComponentSize = 'sm' | 'md' | 'lg' | 'xl';

// Button variants for UI consistency
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'outline'
  | 'ghost';

// Card back design options
export type CardBackDesign =
  | 'geometric'
  | 'gradient'
  | 'pattern'
  | 'solid';
