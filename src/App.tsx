import React, { useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Difficulty } from './types';
import { GameProvider, useGameContext } from './context/GameContext';
import { useGameLogic } from './hooks/useGameLogic';
import { useSounds } from './hooks/useSound';
import { loadHighScores } from './utils/localStorage';

// Components
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { GameBoard } from './components/game/GameBoard';
import { ScoreBoard } from './components/game/ScoreBoard';
import { GameControls } from './components/game/GameControls';
import { Modal } from './components/ui/Modal';

// Pages
import AboutPage from './pages/About';

// Styles
import './styles/globals.css';
import './styles/animations.css';

/**
 * Home/Game Page Component
 */
const HomePage: React.FC = () => {
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

  // Sound effects hook
  const { playFlip, playMatch, playNoMatch, playWin, playBackgroundMusic, stopBackgroundMusic } = useSounds({
    soundEnabled: settings.soundEnabled,
    volume: 0.5,
  });

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
      // Play win sound
      playWin();
      stopBackgroundMusic();
      // Show win modal with stats
      setTimeout(() => {
        openModal('win');
      }, 500);
    },
    onMatch: () => {
      // Play match sound
      playMatch();
    },
    onNoMatch: () => {
      // Play no match sound
      playNoMatch();
    },
    onFlip: () => {
      // Play flip sound
      playFlip();
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
    // Start background music when game begins (if music is enabled)
    if (settings.musicEnabled) {
      playBackgroundMusic();
    }
    startGame();
  }, [startGame, playBackgroundMusic, settings.musicEnabled]);

  /**
   * Handle game reset
   */
  const handleResetGame = useCallback(() => {
    const confirmed = isGameStarted
      ? window.confirm('Are you sure you want to reset the game? Your progress will be lost.')
      : true;

    if (confirmed) {
      stopBackgroundMusic();
      resetGame();
      closeModal();
    }
  }, [isGameStarted, resetGame, closeModal, stopBackgroundMusic]);

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
    <>
      {/* Header */}
      <Header
        onToggleTheme={toggleTheme}
        theme={settings.theme}
        onOpenSettings={handleOpenSettings}
        onStart={handleStartGame}
      />

      {/* Main Content */}
      <main className="flex-1 py-8 px-4 animate-fadeIn delay-200">
        <div className="max-w-7xl mx-auto">
          {/* Page Title */}
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
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 text-center shadow-xl border-2 border-green-200 dark:border-green-800 relative">
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
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  You completed the game with{' '}
                  <span className="font-bold text-green-600 dark:text-green-400">
                    {matchedPairs} matching pairs
                  </span>
                  !
                </p>

                {/* Back to Home Button with Black Outer Box */}
                <div className="inline-block bg-black rounded-2xl p-1 shadow-2xl">
                  <button
                    onClick={resetGame}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-2xl hover:from-blue-700 hover:to-purple-700 hover:scale-105 transition-all duration-300 group"
                  >
                    <svg
                      className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                    <span>Back to Home</span>
                  </button>
                </div>
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
        onClose={activeModal === 'pause' ? handleResumeGame : closeModal}
        data={getModalData()}
      />

      {/* Enhanced Confetti Celebration */}
      {isGameComplete && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full">
            {/* Layer 1: Small particles */}
            {[...Array(80)].map((_, i) => (
              <div
                key={`confetti-${i}`}
                className="absolute w-2 h-2 rounded-full opacity-80"
                style={{
                  backgroundColor: [
                    '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4',
                    '#ffeaa7', '#dda0dd', '#ff7675', '#74b9ff'
                  ][i % 8],
                  left: `${Math.random() * 100}%`,
                  top: `-10%`,
                  animation: `confettiFall ${3 + Math.random() * 3}s linear ${Math.random() * 1}s forwards, confettiSpin ${1 + Math.random()}s linear infinite`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
              />
            ))}

            {/* Layer 2: Medium particles with emoji */}
            {[...Array(30)].map((_, i) => (
              <div
                key={`emoji-${i}`}
                className="absolute text-lg opacity-90"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-10%`,
                  animation: `confettiFall ${4 + Math.random() * 4}s linear ${Math.random() * 2}s forwards`,
                }}
              >
                {['🎉', '🎊', '⭐', '✨', '🔥', '💯'][i % 6]}
              </div>
            ))}

            {/* Layer 3: Sparkle effects */}
            {[...Array(20)].map((_, i) => (
              <div
                key={`sparkle-${i}`}
                className="absolute w-1 h-1 bg-yellow-300 rounded-full opacity-70 animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                }}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

/**
 * App Content with Routes
 */
const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500 ease-in-out">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </div>
  );
};

/**
 * App Component with Context Provider and Router
 */
const App: React.FC = () => {
  return (
    <Router>
      <GameProvider>
        <AppContent />
      </GameProvider>
    </Router>
  );
};

export default App;