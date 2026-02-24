import React from 'react';
import { formatTime } from '../../utils/gameHelpers';
import { Difficulty } from '../../types';
import { DIFFICULTY_LABELS } from '../../utils/constants';

interface ScoreBoardProps {
  moves: number;
  time: number;
  score: number;
  matchedPairs: number;
  totalPairs: number;
  difficulty: Difficulty;
  isGameStarted: boolean;
  completionPercentage: number;
}

/**
 * ScoreBoard Component - Displays game statistics
 */
export const ScoreBoard: React.FC<ScoreBoardProps> = ({
  moves,
  time,
  score,
  matchedPairs,
  totalPairs,
  difficulty,
  isGameStarted,
  completionPercentage,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto mb-6">
      {/* Main score container */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        {/* Top section with gradient */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-4">
          <div className="flex items-center justify-between">
            {/* Game title and difficulty */}
            <div className="flex items-center gap-3">
              <span className="text-3xl">🎮</span>
              <div>
                <h2 className="text-white text-xl font-bold">Memory Game</h2>
                <p className="text-white/80 text-sm">
                  {DIFFICULTY_LABELS[difficulty]} Mode
                </p>
              </div>
            </div>

            {/* Score badge */}
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
              <div className="text-white/80 text-xs font-medium">Score</div>
              <div className="text-white text-2xl font-bold">{score}</div>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-4 p-6">
          {/* Moves */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl mb-3 shadow-lg transform hover:scale-110 transition-transform duration-200">
              <svg
                className="w-8 h-8 text-white"
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
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {moves}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              Moves
            </div>
          </div>

          {/* Time */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl mb-3 shadow-lg transform hover:scale-110 transition-transform duration-200">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {formatTime(time)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              Time
            </div>
          </div>

          {/* Matches */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl mb-3 shadow-lg transform hover:scale-110 transition-transform duration-200">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {matchedPairs}/{totalPairs}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              Matches
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="px-6 pb-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Progress
            </span>
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              {completionPercentage}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-full transition-all duration-500 ease-out relative overflow-hidden"
              style={{ width: `${completionPercentage}%` }}
            >
              {/* Animated shine effect on progress bar */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"
                style={{
                  animation: 'shimmer 2s infinite',
                }}
              />
            </div>
          </div>
        </div>

        {/* Status message */}
        {isGameStarted && (
          <div className="px-6 pb-4">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-lg p-3 text-center">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {completionPercentage === 0 ? (
                  <>
                    <span className="inline-block animate-pulse mr-2">💡</span>
                    Find matching pairs!
                  </>
                ) : completionPercentage < 50 ? (
                  <>
                    <span className="inline-block animate-bounce mr-2">🎯</span>
                    Keep going! You're doing great!
                  </>
                ) : completionPercentage < 100 ? (
                  <>
                    <span className="inline-block animate-pulse mr-2">🔥</span>
                    Almost there! You've got this!
                  </>
                ) : (
                  <>
                    <span className="inline-block animate-bounce mr-2">🎉</span>
                    Congratulations! Game Complete!
                  </>
                )}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Mini stats cards (mobile-friendly alternative) */}
      <div className="grid grid-cols-3 gap-3 mt-4 lg:hidden">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-md text-center">
          <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
            {moves}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Moves</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-md text-center">
          <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
            {formatTime(time)}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Time</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-md text-center">
          <div className="text-xl font-bold text-pink-600 dark:text-pink-400">
            {matchedPairs}/{totalPairs}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Pairs</div>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;