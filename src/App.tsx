import React, { useCallback } from 'react';

import { Difficulty } from './types';
import { GameProvider, useGameContext } from './context/GameContext';
import { useGameLogic } from './hooks/useGameLogic';
import { loadHighScores } from './utils/localStorage';

// Components
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { GameBoard } from './components/game/GameBoard';
import { ScoreBoard } from './components/game/ScoreBoard';
import { GameControls } from './components/game/GameControls';
import { Modal } from './components/ui/Modal';

// Styles
import './styles/globals.css';
import './styles/animations.css';

/**
 * Main App Component (wrapped with GameProvider)
 */
const AppContent: React.FC = () => {
  const {
    settings,
    difficulty,
    setDifficulty,
    selectedTheme,
    activeModal,
    openModal,
    closeModal,
    toggleTheme,
  } = useGameContext();

  // Game logic hook
  const {
    cards,
    matchedPairs,
    moves,
    score,
    isGameStarted,
    isGameComplete,
    isGamePaused,
    time,
    formattedTime,
    handleCardClick,
    startGame,
    resetGame,
    pauseGame,
    resumeGame,
    completionPercentage,
    totalPairs,
    isProcessing,
  } = useGameLogic({
    difficulty,
    themeId: selectedTheme,
    onGameComplete: () => {
      // Show win modal with stats
      setTimeout(() => {
        openModal('win');
      }, 500);
    },
    onMatch: () => {
      // Play match sound (will be implemented when sounds are added)
      console.log('Match found! ✨');
    },
    onNoMatch: () => {
      // Play no match sound
      console.log('No match! Try again! 💪');
    },
    onFlip: () => {
      // Play flip sound
      console.log('Card flipped! 🎴');
    },
  });

  /**
   * Handle difficulty change
   */
  const handleDifficultyChange = useCallback(
    (newDifficulty: Difficulty) => {
      if (!isGameStarted) {
        setDifficulty(newDifficulty);
      }
    },
    [isGameStarted, setDifficulty]
  );

  /**
   * Handle game start
   */
  const handleStartGame = useCallback(() => {
    startGame();
  }, [startGame]);

  /**
   * Handle game reset
   */
  const handleResetGame = useCallback(() => {
    const confirmed = isGameStarted
      ? window.confirm('Are you sure you want to reset the game? Your progress will be lost.')
      : true;

    if (confirmed) {
      resetGame();
      closeModal();
    }
  }, [isGameStarted, resetGame, closeModal]);

  /**
   * Handle game pause
   */
  const handlePauseGame = useCallback(() => {
    pauseGame();
    openModal('pause');
  }, [pauseGame, openModal]);

  /**
   * Handle game resume
   */
  const handleResumeGame = useCallback(() => {
    resumeGame();
    closeModal();
  }, [resumeGame, closeModal]);

  /**
   * Handle open settings
   */
  const handleOpenSettings = useCallback(() => {
    if (isGameStarted && !isGamePaused && !isGameComplete) {
      pauseGame();
    }
    openModal('settings');
  }, [isGameStarted, isGamePaused, isGameComplete, pauseGame, openModal]);

  /**
   * Handle open high scores
   */
  const handleOpenHighScores = useCallback(() => {
    if (isGameStarted && !isGamePaused && !isGameComplete) {
      pauseGame();
    }
    openModal('highscores');
  }, [isGameStarted, isGamePaused, isGameComplete, pauseGame, openModal]);

  /**
   * Get modal data based on type
   */
  const getModalData = () => {
    switch (activeModal) {
      case 'win':
        return {
          moves,
          time,
          score,
          isNewHighScore: true, // This should be calculated properly
        };
      case 'highscores':
        return {
          highScores: loadHighScores(),
        };
      default:
        return undefined;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Header */}
      <Header
        onToggleTheme={toggleTheme}
        theme={settings.theme}
        onOpenSettings={handleOpenSettings}
        onStart={handleStartGame}
      />

      {/* Main Content */}
      <main className="flex-1 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Page Title (optional, can be removed) */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {isGameStarted
                ? isGameComplete
                  ? '🎉 Game Complete! 🎉'
                  : isGamePaused
                  ? '⏸️ Game Paused'
                  : '🎮 Game in Progress'
                : '🧠 Ready to Challenge Your Memory?'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {isGameStarted
                ? isGameComplete
                  ? 'Congratulations on completing the game!'
                  : isGamePaused
                  ? 'Take a break and come back refreshed'
                  : 'Find all the matching pairs!'
                : 'Select your difficulty and start playing!'}
            </p>
          </div>

          {/* Game Controls */}
          <GameControls
            isGameStarted={isGameStarted}
            isGamePaused={isGamePaused}
            isGameComplete={isGameComplete}
            difficulty={difficulty}
            onStart={handleStartGame}
            onReset={handleResetGame}
            onPause={handlePauseGame}
            onResume={handleResumeGame}
            onDifficultyChange={handleDifficultyChange}
            onOpenSettings={handleOpenSettings}
            onOpenHighScores={handleOpenHighScores}
          />

          {/* Score Board */}
          {isGameStarted && (
            <ScoreBoard
              moves={moves}
              time={time}
              score={score}
              matchedPairs={matchedPairs}
              totalPairs={totalPairs}
              difficulty={difficulty}
              isGameStarted={isGameStarted}
              completionPercentage={completionPercentage}
            />
          )}

          {/* Game Board */}
          <GameBoard
            cards={cards}
            onCardClick={handleCardClick}
            difficulty={difficulty}
            isGameStarted={isGameStarted}
            isGamePaused={isGamePaused}
            isProcessing={isProcessing}
          />

          {/* Game Stats Summary (when game is complete) */}
          {isGameComplete && (
            <div className="max-w-4xl mx-auto mt-6 animate-fadeInScale">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 text-center shadow-xl border-2 border-green-200 dark:border-green-800">
                <div className="text-6xl mb-4 animate-bounce">🏆</div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Fantastic Job!
                </h3>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div>
                    <div className="text-4xl font-bold text-green-600 dark:text-green-400">
                      {moves}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Total Moves
                    </div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                      {formattedTime}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Time Taken
                    </div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">
                      {score}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Final Score
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  You completed the game with{' '}
                  <span className="font-bold text-green-600 dark:text-green-400">
                    {matchedPairs} matching pairs
                  </span>
                  !
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer
        onOpenHighScores={handleOpenHighScores}
        onOpenSettings={handleOpenSettings}
      />

      {/* Modal */}
      <Modal
        type={activeModal}
        isOpen={activeModal !== null}
        onClose={
          activeModal === 'pause' ? handleResumeGame : closeModal
        }
        data={getModalData()}
      />

      {/* Confetti effect (optional - can be added later) */}
      {isGameComplete && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {/* Confetti animation placeholder */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full animate-fadeOut"
                style={{
                  backgroundColor: [
                    '#ff0000',
                    '#00ff00',
                    '#0000ff',
                    '#ffff00',
                    '#ff00ff',
                    '#00ffff',
                  ][i % 6],
                  left: `${Math.random() * 100}vw`,
                  top: `${Math.random() * -20}vh`,
                  animation: `fadeOut ${2 + Math.random() * 2}s linear ${
                    Math.random() * 0.5
                  }s forwards`,
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * App Component with Context Provider
 */
const App: React.FC = () => {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
};

export default App;