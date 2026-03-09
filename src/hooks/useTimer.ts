import { useState, useEffect, useRef, useCallback } from 'react';
import { TimerStatus } from '../types';

interface UseTimerOptions {
  initialTime?: number; // Starting time in seconds
  countDown?: boolean; // Count down instead of up
  timeLimit?: number; // Time limit for countdown (in seconds)
  onTimeUp?: () => void; // Callback when time reaches limit
  onTick?: (time: number) => void; // Callback on each second
  autoStart?: boolean; // Start timer automatically
}

interface UseTimerReturn {
  time: number;
  status: TimerStatus;
  formattedTime: string;
  start: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  stop: () => void;
  setTime: (time: number) => void;
  isRunning: boolean;
  isPaused: boolean;
  isTimeUp: boolean;
}

/**
 * Custom hook for managing game timer
 * Supports both count-up and count-down modes
 */
export const useTimer = ({
  initialTime = 0,
  countDown = false,
  timeLimit,
  onTimeUp,
  onTick,
  autoStart = false,
}: UseTimerOptions = {}): UseTimerReturn => {
  const [time, setTime] = useState<number>(initialTime);
  const [status, setStatus] = useState<TimerStatus>(
    autoStart ? TimerStatus.RUNNING : TimerStatus.IDLE
  );
  
  const intervalRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const pausedTimeRef = useRef<number>(0);

  /**
   * Format time as MM:SS
   */
  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(Math.abs(seconds) / 60);
    const secs = Math.abs(seconds) % 60;
    const sign = seconds < 0 ? '-' : '';
    return `${sign}${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  /**
   * Start the timer
   */
  const start = useCallback(() => {
    if (status === TimerStatus.RUNNING) return;

    setStatus(TimerStatus.RUNNING);
    startTimeRef.current = Date.now();
    pausedTimeRef.current = 0;
  }, [status]);

  /**
   * Pause the timer
   */
  const pause = useCallback(() => {
    if (status !== TimerStatus.RUNNING) return;

    setStatus(TimerStatus.PAUSED);
    pausedTimeRef.current = Date.now();
  }, [status]);

  /**
   * Resume the timer from paused state
   */
  const resume = useCallback(() => {
    if (status !== TimerStatus.PAUSED) return;

    setStatus(TimerStatus.RUNNING);
    
    // Adjust start time to account for pause duration
    if (pausedTimeRef.current > 0) {
      const pauseDuration = Date.now() - pausedTimeRef.current;
      startTimeRef.current += pauseDuration;
      pausedTimeRef.current = 0;
    }
  }, [status]);

  /**
   * Reset the timer to initial time
   */
  const reset = useCallback(() => {
    setTime(initialTime);
    setStatus(TimerStatus.IDLE);
    startTimeRef.current = Date.now();
    pausedTimeRef.current = 0;
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [initialTime]);

  /**
   * Stop the timer
   */
  const stop = useCallback(() => {
    setStatus(TimerStatus.STOPPED);
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  /**
   * Manually set time
   */
  const setTimeManually = useCallback((newTime: number) => {
    setTime(newTime);
  }, []);

  /**
   * Check if time limit reached
   */
  const checkTimeLimit = useCallback(
    (currentTime: number): boolean => {
      if (!timeLimit) return false;

      if (countDown) {
        return currentTime <= 0;
      } else {
        return currentTime >= timeLimit;
      }
    },
    [timeLimit, countDown]
  );

  /**
   * Main timer effect
   */
  useEffect(() => {
    if (status !== TimerStatus.RUNNING) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Start interval
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => {
        const newTime = countDown ? prevTime - 1 : prevTime + 1;

        // Call onTick callback
        if (onTick) {
          onTick(newTime);
        }

        // Check if time limit reached
        if (checkTimeLimit(newTime)) {
          if (onTimeUp) {
            onTimeUp();
          }
          stop();
          return countDown ? 0 : timeLimit || prevTime;
        }

        return newTime;
      });
    }, 1000);

    // Cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [status, countDown, timeLimit, onTimeUp, onTick, checkTimeLimit, stop]);

  /**
   * Auto-start effect
   */
  useEffect(() => {
    if (autoStart && status === TimerStatus.IDLE) {
      start();
    }
  }, [autoStart, status, start]);

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    time,
    status,
    formattedTime: formatTime(time),
    start,
    pause,
    resume,
    reset,
    stop,
    setTime: setTimeManually,
    isRunning: status === TimerStatus.RUNNING,
    isPaused: status === TimerStatus.PAUSED,
    isTimeUp: timeLimit ? checkTimeLimit(time) : false,
  };
};

/**
 * Simplified timer hook for count-up only
 */
export const useCountUpTimer = (autoStart = false) => {
  return useTimer({
    initialTime: 0,
    countDown: false,
    autoStart,
  });
};

/**
 * Simplified timer hook for count-down with time limit
 */
export const useCountDownTimer = (
  timeLimit: number,
  onTimeUp?: () => void,
  autoStart = false
) => {
  return useTimer({
    initialTime: timeLimit,
    countDown: true,
    timeLimit,
    onTimeUp,
    autoStart,
  });
};

/**
 * Hook for creating multiple timers (e.g., for tracking different game phases)
 */
/**
 * Hook for creating multiple timers (e.g., for tracking different game phases)
 * Note: Only call this with constant count - don't use dynamic values
 */
export const useMultipleTimers = (count: number) => {
  const timers = Array.from({ length: count }, () => useTimer());
  return timers;
};

/**
 * Hook for lap timer functionality
 */
export const useLapTimer = () => {
  const [laps, setLaps] = useState<number[]>([]);
  const timer = useTimer();

  const recordLap = useCallback(() => {
    setLaps((prevLaps) => [...prevLaps, timer.time]);
  }, [timer.time]);

  const clearLaps = useCallback(() => {
    setLaps([]);
  }, []);

  const resetWithLaps = useCallback(() => {
    timer.reset();
    clearLaps();
  }, [timer, clearLaps]);

  return {
    ...timer,
    laps,
    recordLap,
    clearLaps,
    resetWithLaps,
    lapCount: laps.length,
  };
};

/**
 * Hook for stopwatch with split times
 */
export const useStopwatch = () => {
  const [splits, setSplits] = useState<{ time: number; label: string }[]>([]);
  const timer = useTimer();

  const addSplit = useCallback(
    (label?: string) => {
      setSplits((prevSplits) => [
        ...prevSplits,
        {
          time: timer.time,
          label: label || `Split ${prevSplits.length + 1}`,
        },
      ]);
    },
    [timer.time]
  );

  const clearSplits = useCallback(() => {
    setSplits([]);
  }, []);

  const resetStopwatch = useCallback(() => {
    timer.reset();
    clearSplits();
  }, [timer, clearSplits]);

  return {
    ...timer,
    splits,
    addSplit,
    clearSplits,
    resetStopwatch,
  };
};

export default useTimer;