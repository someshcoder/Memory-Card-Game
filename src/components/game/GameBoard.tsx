import React, { useMemo } from 'react';
import type { Card as CardType } from '../../types';
import { Difficulty } from '../../types';
import Card from './Card';
import { getGridLayoutStyles } from '../../utils/gameHelpers';

interface GameBoardProps {
  cards: CardType[];
  onCardClick: (cardId: string) => void;
  difficulty: Difficulty;
  isGameStarted: boolean;
  isGamePaused: boolean;
  isProcessing: boolean;
}

/**
 * GameBoard Component - Displays the grid of cards
 */
export const GameBoard: React.FC<GameBoardProps> = ({
  cards,
  onCardClick,
  difficulty,
  isGameStarted,
  isGamePaused,
  isProcessing,
}) => {
  /**
   * Get grid layout styles based on difficulty
   */
  const gridStyles = useMemo(() => getGridLayoutStyles(difficulty), [difficulty]);

  /**
   * Determine if cards should be disabled
   */
  const cardsDisabled = !isGameStarted || isGamePaused || isProcessing;

  /**
   * Get card size based on difficulty
   */
  const getCardSize = (): 'sm' | 'md' | 'lg' => {
    switch (difficulty) {
      case Difficulty.HARD:
        return 'sm';
      case Difficulty.MEDIUM:
        return 'md';
      case Difficulty.EASY:
      default:
        return 'lg';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto mb-6 px-4">
      {/* Game board container */}
      <div
        className={`
          relative
          bg-gradient-to-br
          from-gray-50
          to-gray-100
          dark:from-gray-800
          dark:to-gray-900
          rounded-3xl
          shadow-2xl
          p-6
          md:p-8
          lg:p-10
          overflow-hidden
          ${isGamePaused ? 'filter blur-sm' : ''}
          transition-all
          duration-300
          animate-fadeIn
          delay-500
        `}
      >
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Top-left gradient orb */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl" />
          
          {/* Bottom-right gradient orb */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-3xl" />
          
          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
              backgroundSize: '20px 20px',
            }}
          />
        </div>

        {/* Cards grid */}
        <div
          className="relative z-10"
          style={gridStyles}
          role="grid"
          aria-label="Memory card game board"
        >
          {cards.map((card, index) => (
            <div
              key={card.id}
              className="flex items-center justify-center animate-fadeInScale"
              style={{
                animationDelay: `${index * 30}ms`,
                animationFillMode: 'both',
              }}
              role="gridcell"
            >
              <Card
                card={card}
                onClick={onCardClick}
                disabled={cardsDisabled}
                size={getCardSize()}
              />
            </div>
          ))}
        </div>

        {/* Pause overlay */}
        {isGamePaused && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/30 backdrop-blur-sm rounded-3xl">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-white dark:bg-gray-800 rounded-full shadow-2xl mb-4 animate-pulse">
                <svg
                  className="w-12 h-12 text-blue-600 dark:text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
                Game Paused
              </h3>
              <p className="text-white/90 text-lg drop-shadow">
                Click Resume to continue
              </p>
            </div>
          </div>
        )}

        {/* Start game overlay */}
        {!isGameStarted && cards.length > 0 && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-gradient-to-br from-blue-600/90 via-purple-600/90 to-pink-600/90 backdrop-blur-sm rounded-3xl">
            <div className="text-center px-6">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-md rounded-full shadow-2xl mb-6 animate-bounce">
                <span className="text-6xl">🎮</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg animate-pulse">
                Ready to Play?
              </h3>
              <p className="text-white/90 text-xl md:text-2xl drop-shadow mb-6">
                Click "Start Game" to begin!
              </p>
              <div className="flex flex-col items-center gap-3 text-white/80 text-sm md:text-base">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                  <span>Find all matching pairs</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                  <span>Complete in minimum moves</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                  <span>Beat your high score</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading/Empty state */}
        {cards.length === 0 && (
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-blue-600 mb-4" />
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Loading game...
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Game tips (shown below board when game not started) */}
      {!isGameStarted && cards.length > 0 && (
        <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                💡 How to Play
              </h4>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                  <span>Click on cards to flip them and reveal the image</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                  <span>Find matching pairs by remembering card positions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                  <span>Try to complete the game in minimum moves for a higher score</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                  <span>Beat the timer on Medium and Hard difficulties for bonus points!</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameBoard;
