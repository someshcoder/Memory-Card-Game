import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton } from '../ui/Button';
import { Difficulty } from '../../types';
import { DIFFICULTY_LABELS, DIFFICULTY_DESCRIPTIONS } from '../../utils/constants';

interface GameControlsProps {
  isGameStarted: boolean;
  isGamePaused: boolean;
  isGameComplete: boolean;
  difficulty: Difficulty;
  onStart: () => void;
  onReset: () => void;
  onPause: () => void;
  onResume: () => void;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onOpenHighScores: () => void;
}

/**
 * Game Controls Component - Handles game actions and difficulty selection
 */
export const GameControls: React.FC<GameControlsProps> = ({
  isGameStarted,
  isGamePaused,
  isGameComplete,
  difficulty,
  onStart,
  onReset,
  onPause,
  onResume,
  onDifficultyChange,
  onOpenHighScores,
}) => {
  const navigate = useNavigate();
  return (
    <div className="w-full max-w-4xl mx-auto mb-6 px-4 sm:px-6">
      {/* Main controls container */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 md:p-6">
        {/* Top row - Action buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 mb-6">
          {/* Left side - Main action buttons */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {!isGameStarted ? (
              // Start button (before game starts)
              <Button
                variant="primary"
                size="lg"
                onClick={onStart}
                leftIcon={
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                }
              >
                Start Game
              </Button>
            ) : isGamePaused ? (
              // Resume button (when paused)
              <Button
                variant="success"
                size="lg"
                onClick={onResume}
                leftIcon={
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                }
              >
                Resume
              </Button>
            ) : !isGameComplete ? (
              // Pause button (during game)
              <Button
                variant="secondary"
                size="lg"
                onClick={onPause}
                leftIcon={
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                }
              >
                Pause
              </Button>
            ) : null}

            {/* Reset/New Game button */}
            <Button
              variant={isGameStarted ? 'danger' : 'secondary'}
              size="lg"
              onClick={onReset}
              leftIcon={
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              }
            >
              {isGameStarted ? 'Reset' : 'New Game'}
            </Button>
          </div>

          {/* Right side - Utility buttons */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* High Scores button */}
            <IconButton
              icon={
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              }
              onClick={onOpenHighScores}
              ariaLabel="View high scores"
              variant="ghost"
              size="lg"
            />

            {/* Settings button */}
            <IconButton
              icon={
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              }
              onClick={() => navigate('/settings')}
              ariaLabel="Open settings"
              variant="ghost"
              size="lg"
            />
          </div>
        </div>

        {/* Difficulty selector */}
        {!isGameStarted && (
            <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <svg
                className="w-5 h-5 text-gray-600 dark:text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Select Difficulty
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
              {/* Easy */}
              <button
                onClick={() => onDifficultyChange(Difficulty.EASY)}
                className={`
                  group
                  relative
                  flex
                  flex-col
                  justify-between
                  h-full
                  p-4 md:p-6
                  rounded-xl
                  border-2
                  transition-all
                  duration-300
                  transform
                  hover:scale-105
                  active:scale-95
                  ${
                    difficulty === Difficulty.EASY
                      ? 'border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 shadow-lg shadow-green-200 dark:shadow-green-900/50'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-green-400 dark:hover:border-green-500'
                  }
                `}
              >
                {/* Selected indicator */}
                {difficulty === Difficulty.EASY && (
                  <div className="absolute top-3 right-3 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}

                <div className="text-4xl mb-3">🟢</div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {DIFFICULTY_LABELS[Difficulty.EASY]}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {DIFFICULTY_DESCRIPTIONS[Difficulty.EASY]}
                </p>
              </button>

              {/* Medium */}
              <button
                onClick={() => onDifficultyChange(Difficulty.MEDIUM)}
                className={`
                  group
                  relative
                  flex
                  flex-col
                  justify-between
                  h-full
                  p-4 md:p-6
                  rounded-xl
                  border-2
                  transition-all
                  duration-300
                  transform
                  hover:scale-105
                  active:scale-95
                  ${
                    difficulty === Difficulty.MEDIUM
                      ? 'border-yellow-500 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 shadow-lg shadow-yellow-200 dark:shadow-yellow-900/50'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-yellow-400 dark:hover:border-yellow-500'
                  }
                `}
              >
                {/* Selected indicator */}
                {difficulty === Difficulty.MEDIUM && (
                  <div className="absolute top-3 right-3 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}

                <div className="text-4xl mb-3">🟡</div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {DIFFICULTY_LABELS[Difficulty.MEDIUM]}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {DIFFICULTY_DESCRIPTIONS[Difficulty.MEDIUM]}
                </p>
              </button>

              {/* Hard */}
              <button
                onClick={() => onDifficultyChange(Difficulty.HARD)}
                className={`
                  group
                  relative
                  flex
                  flex-col
                  justify-between
                  h-full
                  p-4 md:p-6
                  rounded-xl
                  border-2
                  transition-all
                  duration-300
                  transform
                  hover:scale-105
                  active:scale-95
                  ${
                    difficulty === Difficulty.HARD
                      ? 'border-red-500 bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 shadow-lg shadow-red-200 dark:shadow-red-900/50'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-red-400 dark:hover:border-red-500'
                  }
                `}
              >
                {/* Selected indicator */}
                {difficulty === Difficulty.HARD && (
                  <div className="absolute top-3 right-3 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}

                <div className="text-4xl mb-3">🔴</div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {DIFFICULTY_LABELS[Difficulty.HARD]}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {DIFFICULTY_DESCRIPTIONS[Difficulty.HARD]}
                </p>
              </button>
            </div>
          </div>
        )}

        {/* Game status indicator */}
        {isGameStarted && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-center gap-2">
              <div
                className={`
                  w-3
                  h-3
                  rounded-full
                  ${
                    isGamePaused
                      ? 'bg-yellow-500 animate-pulse'
                      : isGameComplete
                      ? 'bg-green-500'
                      : 'bg-blue-500 animate-pulse'
                  }
                `}
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {isGamePaused
                  ? 'Game Paused'
                  : isGameComplete
                  ? 'Game Complete!'
                  : 'Game In Progress'}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameControls;