import React, { useEffect, useRef, useCallback } from 'react';
import type { ModalProps, HighScore } from '../../types';
import { Difficulty } from '../../types';
import { Settings } from '../Settings/Settings';
import { Button, IconButton } from './Button';
import { formatTimeHuman } from '../../utils/gameHelpers';
import { DIFFICULTY_LABELS } from '../../utils/constants';

/**
 * Modal Component - Displays different types of modals
 */
export const Modal: React.FC<ModalProps> = ({ type, isOpen, onClose, data }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  /**
   * Handle escape key press
   */
  const handleEscapeKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    },
    [isOpen, onClose]
  );

  /**
   * Handle click outside modal
   */
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    },
    [onClose]
  );

  /**
   * Setup event listeners
   */
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleEscapeKey, handleClickOutside]);

  /**
   * Don't render if not open
   */
  if (!isOpen || !type) return null;

  /**
   * Render modal content based on type
   */
  const renderModalContent = () => {
    switch (type) {
      case 'win':
        return <WinModalContent data={data} onClose={onClose} />;
      case 'pause':
        return <PauseModalContent onClose={onClose} />;
      case 'settings':
        return <SettingsModalContent onClose={onClose} />;
      case 'highscores':
        return <HighScoresModalContent data={data} onClose={onClose} />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn" />

      {/* Modal container */}
      <div
        ref={modalRef}
        className="relative z-10 w-full max-w-md mx-4 animate-scaleIn"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          {renderModalContent()}
        </div>
      </div>
    </div>
  );
};

/**
 * Win Modal Content
 */
const WinModalContent: React.FC<{ data?: any; onClose: () => void }> = ({
  data,
  onClose,
}) => {
  const { moves = 0, time = 0, score = 0 } = data || {};

  return (
    <div className="p-8 text-center">
      {/* Close button */}
      <div className="absolute top-4 right-4">
        <IconButton
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          }
          onClick={onClose}
          ariaLabel="Close modal"
          variant="ghost"
        />
      </div>

      {/* Celebration icon */}
      <div className="mb-6">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-bounce">
          <span className="text-5xl">🎉</span>
        </div>
      </div>

      {/* Title */}
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Congratulations!
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        You Won! 🏆
      </p>

      {/* Stats */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-900 rounded-xl p-6 mb-8">
        <div className="grid grid-cols-3 gap-4">
          {/* Moves */}
          <div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
              {moves}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Moves</div>
          </div>

          {/* Time */}
          <div>
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
              {formatTimeHuman(time)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Time</div>
          </div>

          {/* Score */}
          <div>
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
              {score}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Score</div>
          </div>
        </div>
      </div>

      {/* New high score badge */}
      {data?.isNewHighScore && (
        <div className="mb-6 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full inline-block animate-pulse">
          <span className="text-white font-bold flex items-center gap-2">
            <span>⭐</span>
            <span>New High Score!</span>
            <span>⭐</span>
          </span>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <Button variant="secondary" size="lg" onClick={onClose} fullWidth>
          Close
        </Button>
        <Button
          variant="primary"
          size="lg"
          onClick={() => {
            onClose();
            window.location.reload(); // Simple reset, can be improved
          }}
          fullWidth
        >
          Play Again
        </Button>
      </div>

      {/* Share button */}
      <button
        className="mt-4 text-sm text-blue-600 dark:text-blue-400 hover:underline transition-colors"
        onClick={() => {
          const shareText = `🎮 I got ${score} points in Memory Card Game! 🎉\n⏱️ Time: ${formatTimeHuman(time)}\n🔄 Moves: ${moves}\n\nCan you beat my score? 🏆`;
          
          // Try Web Share API first
          if (navigator.share) {
            navigator.share({
              title: 'Memory Card Game - My Score',
              text: shareText,
            }).catch(() => {
              // User cancelled share
            });
          } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(shareText).then(() => {
              alert('Score copied to clipboard! 📋');
            }).catch(() => {
              alert('Share functionality not available on your device');
            });
          }
        }}
      >
        Share your score 🔗
      </button>
    </div>
  );
};

/**
 * Pause Modal Content
 */
const PauseModalContent: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="p-8 text-center">
      {/* Icon */}
      <div className="mb-6">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full">
          <svg
            className="w-10 h-10 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
          </svg>
        </div>
      </div>

      {/* Title */}
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Game Paused
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        Take a break! ⏸️
      </p>

      {/* Actions */}
      <div className="space-y-3">
        <Button variant="primary" size="lg" onClick={onClose} fullWidth>
          Resume Game
        </Button>
        <Button
          variant="secondary"
          size="lg"
          onClick={() => {
            onClose();
            window.location.reload();
          }}
          fullWidth
        >
          New Game
        </Button>
        <Button variant="ghost" size="md" onClick={onClose} fullWidth>
          Settings
        </Button>
      </div>
    </div>
  );
};

/**
 * Settings Modal Content
 */
const SettingsModalContent: React.FC<{ onClose: () => void; data?: any }> = ({ onClose, data }) => {
  return <Settings onClose={onClose} data={data} />;
};

/**
 * High Scores Modal Content
 */
const HighScoresModalContent: React.FC<{ data?: any; onClose: () => void }> = ({
  data,
  onClose,
}) => {
  const highScores = (data?.highScores || []) as HighScore[];
  
  // Group scores by difficulty
  const groupedScores = highScores.reduce((acc, score) => {
    if (!acc[score.difficulty]) {
      acc[score.difficulty] = [];
    }
    acc[score.difficulty].push(score);
    return acc;
  }, {} as Record<Difficulty, HighScore[]>);

  // Sort scores within each difficulty group
  Object.keys(groupedScores).forEach(difficulty => {
    groupedScores[difficulty as Difficulty] = groupedScores[difficulty as Difficulty]
      .sort((a, b) => b.score - a.score) // Sort by score descending
      .slice(0, 10); // Limit to top 10 per difficulty
  });

  return (
    <div className="p-8">
      {/* Close button */}
      <div className="absolute top-4 right-4">
        <IconButton
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          }
          onClick={onClose}
          ariaLabel="Close modal"
          variant="ghost"
        />
      </div>

      {/* Title */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
          <span className="text-4xl">🏆</span>
          <span>Leaderboard</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Top performers across all difficulty levels
        </p>
      </div>

      {/* Difficulty Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {Object.values(Difficulty).map((difficulty) => {
          const difficultyScores = groupedScores[difficulty as Difficulty];
          const hasScores = difficultyScores && difficultyScores.length > 0;
          
          return (
          <button
            key={difficulty}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              hasScores
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed'
            }`}
            disabled={!hasScores}
          >
            {DIFFICULTY_LABELS[difficulty as Difficulty]}
            {hasScores && (
              <span className="ml-2 bg-white dark:bg-gray-600 text-xs px-2 py-0.5 rounded-full">
                {difficultyScores.length}
              </span>
            )}
          </button>
        );})}
      </div>

      {/* Scores list */}
      <div className="max-h-96 overflow-y-auto pr-2">
        {Object.keys(groupedScores).length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
              <span className="text-5xl">📊</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              No records yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              Be the first to set a high score! Complete a game to appear on the leaderboard.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(groupedScores).map(([difficulty, scores]) => (
              <div key={difficulty} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-3">
                  <h3 className="text-white font-bold text-lg">
                    {DIFFICULTY_LABELS[difficulty as Difficulty]}
                    <span className="ml-2 text-sm font-normal opacity-90">
                      ({scores.length} records)
                    </span>
                  </h3>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                  {scores.map((score, index) => (
                    <div
                      key={score.id}
                      className={`
                        p-4 transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800/50
                        ${index < 3 ? 'bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20' : ''}
                      `}
                    >
                      <div className="flex items-center justify-between">
                        {/* Rank and Info */}
                        <div className="flex items-center gap-4">
                          <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                            index === 0
                              ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white'
                              : index === 1
                              ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-white'
                              : index === 2
                              ? 'bg-gradient-to-br from-amber-600 to-amber-800 text-white'
                              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                          }`}>
                            {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                          </div>
                          <div>
                            <div className="font-bold text-lg text-gray-900 dark:text-white">
                              {score.score.toLocaleString()} pts
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {new Date(score.date).toLocaleDateString()} • {score.moves} moves
                            </div>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {formatTimeHuman(score.time)}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-500">
                            {Math.round(score.score / score.moves)} pts/move
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <Button variant="secondary" size="lg" onClick={onClose} fullWidth={false}>
          Close
        </Button>
        <Button 
          variant="primary" 
          size="lg" 
          onClick={() => {
            // Refresh scores
            window.location.reload();
          }}
          fullWidth={false}
        >
          View All
        </Button>
      </div>
    </div>
  );
};

export default Modal;