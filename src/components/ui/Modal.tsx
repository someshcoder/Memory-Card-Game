import React, { useEffect, useRef, useCallback } from 'react';
import type { ModalProps, HighScore } from '../../types';
import { Difficulty } from '../../types';
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
const SettingsModalContent: React.FC<{ onClose: () => void }> = ({ onClose }) => {
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
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Settings ⚙️
      </h2>

      {/* Settings options */}
      <div className="space-y-4">
        {/* Sound toggle */}
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🔊</span>
            <span className="text-gray-900 dark:text-white font-medium">
              Sound Effects
            </span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" defaultChecked className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* Music toggle */}
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎵</span>
            <span className="text-gray-900 dark:text-white font-medium">
              Background Music
            </span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" defaultChecked className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* Theme toggle */}
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌙</span>
            <span className="text-gray-900 dark:text-white font-medium">
              Dark Mode
            </span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>

      {/* Close button */}
      <div className="mt-6">
        <Button variant="primary" size="lg" onClick={onClose} fullWidth>
          Done
        </Button>
      </div>
    </div>
  );
};

/**
 * High Scores Modal Content
 */
const HighScoresModalContent: React.FC<{ data?: any; onClose: () => void }> = ({
  data,
  onClose,
}) => {
  const highScores = (data?.highScores || []) as HighScore[];

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
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <span>🏆</span>
        <span>High Scores</span>
      </h2>

      {/* Scores list */}
      <div className="max-h-96 overflow-y-auto">
        {highScores.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">
              No high scores yet
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-sm">
              Complete a game to set your first record!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {highScores.map((score, index) => (
              <div
                key={score.id}
                className={`
                  p-4 rounded-lg transition-all duration-200 hover:scale-105
                  ${
                    index === 0
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg'
                      : index === 1
                      ? 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-900 shadow-md'
                      : index === 2
                      ? 'bg-gradient-to-r from-orange-300 to-orange-400 text-gray-900 shadow-md'
                      : 'bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white'
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  {/* Rank */}
                  <div className="flex items-center gap-3">
                    <div className="text-2xl font-bold">
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                    </div>
                    <div>
                      <div className="font-bold text-lg">{score.score} pts</div>
                      <div className={`text-sm ${index < 3 ? 'opacity-90' : 'text-gray-600 dark:text-gray-400'}`}>
                        {DIFFICULTY_LABELS[score.difficulty as Difficulty]}
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="text-right">
                    <div className={`text-sm font-medium ${index < 3 ? 'opacity-90' : 'text-gray-600 dark:text-gray-400'}`}>
                      {score.moves} moves
                    </div>
                    <div className={`text-sm ${index < 3 ? 'opacity-90' : 'text-gray-600 dark:text-gray-400'}`}>
                      {formatTimeHuman(score.time)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Close button */}
      <div className="mt-6">
        <Button variant="primary" size="lg" onClick={onClose} fullWidth>
          Close
        </Button>
      </div>
    </div>
  );
};

export default Modal;