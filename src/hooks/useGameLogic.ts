import { useState, useCallback, useEffect, useRef } from 'react';
import { Difficulty } from '../types';
import type {
  Card,
  HighScore,
} from '../types';
import {
  generateCards,
  checkCardsMatch,
  calculateScore,
  isGameWon,
  generateId,
  getCongratulationsMessage,
} from '../utils/gameHelpers';
import {
  addHighScore,
  updatePlayerStats,
  isHighScore as checkIsHighScore,
  saveGameState,
  clearGameState,
} from '../utils/localStorage';
import { ANIMATION_DURATION } from '../utils/constants';
import { useTimer } from './useTimer';

interface UseGameLogicOptions {
  difficulty: Difficulty;
  themeId?: string;
  onGameComplete?: (stats: GameCompletionStats) => void;
  onMatch?: () => void;
  onNoMatch?: () => void;
  onFlip?: () => void;
}

interface GameCompletionStats {
  moves: number;
  time: number;
  score: number;
  difficulty: Difficulty;
  isNewHighScore: boolean;
  congratsMessage: string;
  performanceRating: string;
}

interface UseGameLogicReturn {
  cards: Card[];
  flippedCards: Card[];
  matchedPairs: number;
  moves: number;
  score: number;
  isGameStarted: boolean;
  isGameComplete: boolean;
  isGamePaused: boolean;
  time: number;
  formattedTime: string;
  handleCardClick: (cardId: string) => void;
  startGame: () => void;
  resetGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  canFlipCard: (card: Card) => boolean;
  completionPercentage: number;
  totalPairs: number;
  isProcessing: boolean;
}

/**
 * Main game logic hook - handles all game state and logic
 */
export const useGameLogic = ({
  difficulty,
  themeId,
  onGameComplete,
  onMatch,
  onNoMatch,
  onFlip,
}: UseGameLogicOptions): UseGameLogicReturn => {
  // Game state
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<Card[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [isGameComplete, setIsGameComplete] = useState<boolean>(false);
  const [isGamePaused, setIsGamePaused] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Timer
  const timer = useTimer({
    initialTime: 0,
    countDown: false,
    autoStart: false,
  });

  // Refs for managing async operations
  const processingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const gameCompleteTriggeredRef = useRef<boolean>(false);

  /**
   * Calculate total pairs based on cards
   */
  const totalPairs = cards.length / 2;

  /**
   * Calculate completion percentage
   */
  const completionPercentage =
    totalPairs > 0 ? Math.round((matchedPairs / totalPairs) * 100) : 0;

  /**
   * Initialize game
   */
  const initializeGame = useCallback(() => {
    const newCards = generateCards(difficulty, themeId);
    setCards(newCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setScore(0);
    setIsGameStarted(false);
    setIsGameComplete(false);
    setIsGamePaused(false);
    setIsProcessing(false);
    gameCompleteTriggeredRef.current = false;
    timer.reset();

    // Clear any pending timeouts
    if (processingTimeoutRef.current) {
      clearTimeout(processingTimeoutRef.current);
      processingTimeoutRef.current = null;
    }
  }, [difficulty, themeId, timer]);

  /**
   * Start the game
   */
  const startGame = useCallback(() => {
    setIsGameStarted(true);
    setIsGamePaused(false);
    timer.start();
  }, [timer]);

  /**
   * Reset the game
   */
  const resetGame = useCallback(() => {
    initializeGame();
    clearGameState();
  }, [initializeGame]);

  /**
   * Pause the game
   */
  const pauseGame = useCallback(() => {
    if (!isGameStarted || isGameComplete) return;
    
    setIsGamePaused(true);
    timer.pause();
    
    // Save game state
    saveGameState({
      cards,
      flippedCards: [],
      matchedPairs,
      moves,
      score,
      isGameStarted,
      isGameComplete: false,
      difficulty,
      timeElapsed: timer.time,
    });
  }, [
    isGameStarted,
    isGameComplete,
    timer,
    cards,
    matchedPairs,
    moves,
    score,
    difficulty,
  ]);

  /**
   * Resume the game
   */
  const resumeGame = useCallback(() => {
    if (!isGamePaused) return;
    
    setIsGamePaused(false);
    timer.resume();
  }, [isGamePaused, timer]);

  /**
   * Check if card can be flipped
   */
  const canFlipCard = useCallback(
    (card: Card): boolean => {
      if (!isGameStarted || isGameComplete || isGamePaused || isProcessing) {
        return false;
      }

      if (card.isMatched || card.isFlipped) {
        return false;
      }

      if (flippedCards.length >= 2) {
        return false;
      }

      return true;
    },
    [isGameStarted, isGameComplete, isGamePaused, isProcessing, flippedCards]
  );

  /**
   * Flip a card
   */
  const flipCard = useCallback((cardId: string) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId ? { ...card, isFlipped: true } : card
      )
    );
  }, []);

  /**
   * Unflip cards
   */
  const unflipCards = useCallback((cardIds: string[]) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        cardIds.includes(card.id) ? { ...card, isFlipped: false } : card
      )
    );
  }, []);

  /**
   * Mark cards as matched
   */
  const markCardsAsMatched = useCallback((cardIds: string[]) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        cardIds.includes(card.id)
          ? { ...card, isMatched: true, isFlipped: true }
          : card
      )
    );
  }, []);

  /**
   * Handle match found
   */
  const handleMatch = useCallback(
    (card1: Card, card2: Card) => {
      // Mark cards as matched
      markCardsAsMatched([card1.id, card2.id]);

      // Update state
      setMatchedPairs((prev) => prev + 1);
      setFlippedCards([]);

      // Calculate and update score
      const newMatchedPairs = matchedPairs + 1;
      const newScore = calculateScore(moves + 1, timer.time, difficulty, newMatchedPairs);
      setScore(newScore);

      // Trigger callback
      if (onMatch) {
        onMatch();
      }

      setIsProcessing(false);
    },
    [matchedPairs, moves, timer.time, difficulty, markCardsAsMatched, onMatch]
  );

  /**
   * Handle no match
   */
  const handleNoMatch = useCallback(
    (card1: Card, card2: Card) => {
      // Wait before flipping back
      processingTimeoutRef.current = setTimeout(() => {
        unflipCards([card1.id, card2.id]);
        setFlippedCards([]);
        setIsProcessing(false);

        // Trigger callback
        if (onNoMatch) {
          onNoMatch();
        }
      }, ANIMATION_DURATION.NO_MATCH_DELAY);
    },
    [unflipCards, onNoMatch]
  );

  /**
   * Handle card click
   */
  const handleCardClick = useCallback(
    (cardId: string) => {
      const card = cards.find((c) => c.id === cardId);
      if (!card || !canFlipCard(card)) {
        return;
      }

      // Auto-start game on first card click
      if (!isGameStarted) {
        startGame();
      }

      // Flip the card
      flipCard(cardId);

      // Trigger flip callback
      if (onFlip) {
        onFlip();
      }

      // Add to flipped cards
      const newFlippedCards = [...flippedCards, card];
      setFlippedCards(newFlippedCards);

      // Check if two cards are flipped
      if (newFlippedCards.length === 2) {
        setIsProcessing(true);
        setMoves((prev) => prev + 1);

        const [firstCard, secondCard] = newFlippedCards;

        // Check for match after animation completes
        processingTimeoutRef.current = setTimeout(() => {
          if (checkCardsMatch(firstCard, secondCard)) {
            handleMatch(firstCard, secondCard);
          } else {
            handleNoMatch(firstCard, secondCard);
          }
        }, ANIMATION_DURATION.CARD_FLIP);
      }
    },
    [
      cards,
      flippedCards,
      canFlipCard,
      isGameStarted,
      startGame,
      flipCard,
      handleMatch,
      handleNoMatch,
      onFlip,
    ]
  );

  /**
   * Handle game completion
   */
  const handleGameCompletion = useCallback(() => {
    if (gameCompleteTriggeredRef.current) return;
    
    gameCompleteTriggeredRef.current = true;
    setIsGameComplete(true);
    timer.stop();

    // Calculate final score
    const finalScore = calculateScore(moves, timer.time, difficulty, matchedPairs);
    setScore(finalScore);

    // Check if it's a high score
    const isNewHighScore = checkIsHighScore(finalScore);

    // Save high score
    if (isNewHighScore) {
      const highScore: HighScore = {
        id: generateId(),
        moves,
        time: timer.time,
        difficulty,
        score: finalScore,
        date: new Date().toISOString(),
      };
      addHighScore(highScore);
    }

    // Update player stats
    updatePlayerStats(moves, timer.time, true);

    // Clear saved game state
    clearGameState();

    // Get congratulations message
    const congratsMessage = getCongratulationsMessage(moves, timer.time, difficulty);

    // Prepare completion stats
    const completionStats: GameCompletionStats = {
      moves,
      time: timer.time,
      score: finalScore,
      difficulty,
      isNewHighScore,
      congratsMessage,
      performanceRating: congratsMessage,
    };

    // Trigger completion callback
    if (onGameComplete) {
      setTimeout(() => {
        onGameComplete(completionStats);
      }, ANIMATION_DURATION.MATCH_DELAY);
    }
  }, [moves, timer, difficulty, matchedPairs, onGameComplete]);

  /**
   * Check for game completion
   */
  useEffect(() => {
    if (
      isGameStarted &&
      !isGameComplete &&
      !gameCompleteTriggeredRef.current &&
      cards.length > 0 &&
      isGameWon(cards)
    ) {
      handleGameCompletion();
    }
  }, [cards, isGameStarted, isGameComplete, handleGameCompletion]);

  /**
   * Initialize game on mount or difficulty/theme change
   */
  useEffect(() => {
    initializeGame();
  }, [difficulty, themeId]);

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      if (processingTimeoutRef.current) {
        clearTimeout(processingTimeoutRef.current);
      }
    };
  }, []);

  /**
   * Auto-save game state periodically
   */
  useEffect(() => {
    if (!isGameStarted || isGameComplete || isGamePaused) return;

    const autoSaveInterval = setInterval(() => {
      saveGameState({
        cards,
        flippedCards: [],
        matchedPairs,
        moves,
        score,
        isGameStarted,
        isGameComplete: false,
        difficulty,
        timeElapsed: timer.time,
      });
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(autoSaveInterval);
  }, [
    isGameStarted,
    isGameComplete,
    isGamePaused,
    cards,
    matchedPairs,
    moves,
    score,
    difficulty,
    timer.time,
  ]);

  /**
   * Auto-flip last remaining pair when only 1 pair is left
   */
  useEffect(() => {
    // Only auto-flip when game is in progress, not processing, and only 1 pair left
    if (
      isGameStarted &&
      !isGamePaused &&
      !isProcessing &&
      !isGameComplete &&
      totalPairs > 0 &&
      totalPairs - matchedPairs === 1
    ) {
      // Find the two unmatched cards
      const unmatchedCards = cards.filter((card) => !card.isMatched);
      
      if (unmatchedCards.length === 2) {
        // Set processing to prevent user interaction during auto-flip
        setIsProcessing(true);
        
        // Flip both cards automatically with a small delay between them
        setTimeout(() => {
          if (onFlip) onFlip();
          flipCard(unmatchedCards[0].id);
        }, 500);
        
        setTimeout(() => {
          if (onFlip) onFlip();
          flipCard(unmatchedCards[1].id);
        }, 800);

        // After flipping both, check for match after animation completes
        setTimeout(() => {
          const [firstCard, secondCard] = unmatchedCards;
          if (checkCardsMatch(firstCard, secondCard)) {
            // Mark cards as matched
            setCards((prevCards) =>
              prevCards.map((card) =>
                card.id === firstCard.id || card.id === secondCard.id
                  ? { ...card, isMatched: true, isFlipped: true }
                  : card
              )
            );
            setMatchedPairs((prev) => prev + 1);
            setFlippedCards([]);
            setIsProcessing(false);
            
            if (onMatch) onMatch();
          }
        }, ANIMATION_DURATION.CARD_FLIP + 900);
      }
    }
  }, [
    matchedPairs,
    totalPairs,
    cards,
    isGameStarted,
    isGamePaused,
    isProcessing,
    isGameComplete,
    flipCard,
    onFlip,
    onMatch,
  ]);

  return {
    cards,
    flippedCards,
    matchedPairs,
    moves,
    score,
    isGameStarted,
    isGameComplete,
    isGamePaused,
    time: timer.time,
    formattedTime: timer.formattedTime,
    handleCardClick,
    startGame,
    resetGame,
    pauseGame,
    resumeGame,
    canFlipCard,
    completionPercentage,
    totalPairs,
    isProcessing,
  };
};

export default useGameLogic;