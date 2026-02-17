import { useState, useCallback, useEffect, useRef } from 'react';

interface UseSoundsOptions {
  soundEnabled?: boolean;
  volume?: number; // 0 to 1
}

interface UseSoundsReturn {
  playFlip: () => void;
  playMatch: () => void;
  playNoMatch: () => void;
  playWin: () => void;
  playClick: () => void;
  playSuccess: () => void;
  playError: () => void;
  playBackgroundMusic: () => void;
  stopBackgroundMusic: () => void;
  setVolume: (volume: number) => void;
  toggleSound: () => void;
  isSoundEnabled: boolean;
  volume: number;
}

// Create AudioContext for generating sounds
let audioContext: AudioContext | null = null;

const getAudioContext = (): AudioContext => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  }
  return audioContext;
};

/**
 * Generate a simple beep/tone sound
 */
const playTone = (
  frequency: number,
  duration: number,
  type: OscillatorType = 'sine',
  volume: number = 0.3
): void => {
  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(volume, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  } catch (error) {
    console.error('Error playing tone:', error);
  }
};

/**
 * Play card flip sound - quick swoosh effect
 */
const playFlipSound = (volume: number): void => {
  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.setValueAtTime(800, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.1);
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(volume * 0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.1);
  } catch (error) {
    console.error('Error playing flip sound:', error);
  }
};

/**
 * Play match sound - pleasant chime
 */
const playMatchSound = (volume: number): void => {
  try {
    const ctx = getAudioContext();
    // Play multiple notes for a pleasant chord
    [523.25, 659.25, 783.99].forEach((freq, i) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.value = freq;
      oscillator.type = 'sine';

      const startTime = ctx.currentTime + i * 0.05;
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(volume * 0.2, startTime + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.4);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.4);
    });
  } catch (error) {
    console.error('Error playing match sound:', error);
  }
};

/**
 * Play no match sound - low buzz
 */
const playNoMatchSound = (volume: number): void => {
  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.setValueAtTime(200, ctx.currentTime);
    oscillator.type = 'sawtooth';

    gainNode.gain.setValueAtTime(volume * 0.15, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.3);
  } catch (error) {
    console.error('Error playing no match sound:', error);
  }
};

/**
 * Play win sound - celebratory tune
 */
const playWinSound = (volume: number): void => {
  try {
    const ctx = getAudioContext();
    // Play a victory tune
    const notes = [523.25, 587.33, 659.25, 783.99, 880, 1046.50];
    notes.forEach((freq, i) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.value = freq;
      oscillator.type = 'sine';

      const startTime = ctx.currentTime + i * 0.15;
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(volume * 0.25, startTime + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.5);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.5);
    });
  } catch (error) {
    console.error('Error playing win sound:', error);
  }
};

/**
 * Play click sound - short tick
 */
const playClickSound = (volume: number): void => {
  playTone(1000, 0.05, 'sine', volume * 0.2);
};

/**
 * Play success sound - rising tone
 */
const playSuccessSound = (volume: number): void => {
  try {
    const ctx = getAudioContext();
    [400, 500, 600].forEach((freq, i) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.value = freq;
      oscillator.type = 'sine';

      const startTime = ctx.currentTime + i * 0.08;
      gainNode.gain.setValueAtTime(volume * 0.15, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.2);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.2);
    });
  } catch (error) {
    console.error('Error playing success sound:', error);
  }
};

/**
 * Play error sound - low buzz
 */
const playErrorSound = (volume: number): void => {
  playTone(150, 0.2, 'sawtooth', volume * 0.15);
}

/**
 * Custom hook for managing game sounds
 */
export const useSounds = ({
  soundEnabled = true,
  volume = 0.5,
}: UseSoundsOptions = {}): UseSoundsReturn => {
  const [isSoundEnabled, setIsSoundEnabled] = useState(soundEnabled);
  const [currentVolume, setCurrentVolume] = useState(volume);
  
  // Store audio instances
  const audioCache = useRef<Map<string, HTMLAudioElement>>(new Map());

  /**
   * Create or get cached audio instance
   */
  const getAudio = useCallback((soundName: string, soundPath?: string): HTMLAudioElement | null => {
    // If sound files are not available yet, return null
    if (!soundPath) {
      return null;
    }

    // Check if audio is already cached
    if (audioCache.current.has(soundName)) {
      return audioCache.current.get(soundName)!;
    }

    // Create new audio instance
    try {
      const audio = new Audio(soundPath);
      audio.volume = currentVolume;
      audioCache.current.set(soundName, audio);
      return audio;
    } catch (error) {
      console.error(`Failed to load sound: ${soundName}`, error);
      return null;
    }
  }, [currentVolume]);

  /**
   * Play a sound
   */
  const playSound = useCallback(
    (soundName: string, soundPath?: string) => {
      if (!isSoundEnabled) return;

      const audio = getAudio(soundName, soundPath);
      if (!audio) {
        // Fallback: console log for now (will be replaced with actual sounds)
        console.log(`🔊 Sound: ${soundName}`);
        return;
      }

      // Reset audio to start
      audio.currentTime = 0;
      
      // Play the sound
      audio.play().catch((error) => {
        console.error(`Failed to play sound: ${soundName}`, error);
      });
    },
    [isSoundEnabled, getAudio]
  );

  // Store background music interval
  const backgroundMusicRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /**
   * Play background music - continuous ambient tune
   */
  const playBackgroundMusic = useCallback(() => {
    if (!isSoundEnabled) return;
    
    // Stop any existing background music
    if (backgroundMusicRef.current) {
      clearInterval(backgroundMusicRef.current);
    }

    // Create a simple ambient background music loop
    const playAmbientNote = () => {
      if (!isSoundEnabled) return;
      
      try {
        const ctx = getAudioContext();
        const notes = [261.63, 293.66, 329.63, 349.23, 392.00]; // C4 to G4
        const randomNote = notes[Math.floor(Math.random() * notes.length)];
        
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.frequency.value = randomNote;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(currentVolume * 0.05, ctx.currentTime + 0.5);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2);

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 2);
      } catch (error) {
        // Silent fail for background music
      }
    };

    // Play a note every 2 seconds
    backgroundMusicRef.current = setInterval(playAmbientNote, 2000);
    
    // Play first note immediately
    playAmbientNote();
  }, [isSoundEnabled, currentVolume]);

  /**
   * Stop background music
   */
  const stopBackgroundMusic = useCallback(() => {
    if (backgroundMusicRef.current) {
      clearInterval(backgroundMusicRef.current);
      backgroundMusicRef.current = null;
    }
  }, []);

  /**
   * Play card flip sound
   */
  const playFlip = useCallback(() => {
    if (!isSoundEnabled) return;
    playFlipSound(currentVolume);
    
    // Optional: Add haptic feedback on mobile
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
  }, [isSoundEnabled, currentVolume]);

  /**
   * Play match found sound
   */
  const playMatch = useCallback(() => {
    if (!isSoundEnabled) return;
    playMatchSound(currentVolume);
    
    // Optional: Stronger haptic feedback for match
    if ('vibrate' in navigator) {
      navigator.vibrate([50, 100, 50]);
    }
  }, [isSoundEnabled, currentVolume]);

  /**
   * Play no match sound
   */
  const playNoMatch = useCallback(() => {
    if (!isSoundEnabled) return;
    playNoMatchSound(currentVolume);
    
    // Optional: Gentle haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(30);
    }
  }, [isSoundEnabled, currentVolume]);

  /**
   * Play win/game complete sound
   */
  const playWin = useCallback(() => {
    if (!isSoundEnabled) return;
    playWinSound(currentVolume);
    
    // Optional: Victory haptic pattern
    if ('vibrate' in navigator) {
      navigator.vibrate([100, 50, 100, 50, 200]);
    }
  }, [isSoundEnabled, currentVolume]);

  /**
   * Play button click sound
   */
  const playClick = useCallback(() => {
    if (!isSoundEnabled) return;
    playClickSound(currentVolume);
  }, [isSoundEnabled, currentVolume]);

  /**
   * Play success sound (for achievements, high scores, etc.)
   */
  const playSuccess = useCallback(() => {
    if (!isSoundEnabled) return;
    playSuccessSound(currentVolume);
    
    // Optional: Success haptic
    if ('vibrate' in navigator) {
      navigator.vibrate([50, 50, 100]);
    }
  }, [isSoundEnabled, currentVolume]);

  /**
   * Play error sound
   */
  const playError = useCallback(() => {
    if (!isSoundEnabled) return;
    playErrorSound(currentVolume);
    
    // Optional: Error haptic
    if ('vibrate' in navigator) {
      navigator.vibrate([100, 50, 100]);
    }
  }, [playSound]);

  /**
   * Set volume for all sounds
   */
  const setVolume = useCallback((newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setCurrentVolume(clampedVolume);
    
    // Update volume for all cached audio instances
    audioCache.current.forEach((audio) => {
      audio.volume = clampedVolume;
    });
  }, []);

  /**
   * Toggle sound on/off
   */
  const toggleSound = useCallback(() => {
    setIsSoundEnabled((prev) => !prev);
  }, []);

  /**
   * Cleanup audio instances on unmount
   */
  useEffect(() => {
    return () => {
      audioCache.current.forEach((audio) => {
        audio.pause();
        audio.src = '';
      });
      audioCache.current.clear();
    };
  }, []);

  /**
   * Update volume when it changes externally
   */
  useEffect(() => {
    setCurrentVolume(volume);
  }, [volume]);

  /**
   * Update sound enabled state when it changes externally
   */
  useEffect(() => {
    setIsSoundEnabled(soundEnabled);
  }, [soundEnabled]);

  return {
    playFlip,
    playMatch,
    playNoMatch,
    playWin,
    playClick,
    playSuccess,
    playError,
    playBackgroundMusic,
    stopBackgroundMusic,
    setVolume,
    toggleSound,
    isSoundEnabled,
    volume: currentVolume,
  };
};

/**
 * Preload sounds for better performance
 * Call this function when the app loads
 */
export const preloadSounds = async (soundPaths: string[]): Promise<void> => {
  const loadPromises = soundPaths.map(
    (path) =>
      new Promise<void>((resolve, reject) => {
        const audio = new Audio(path);
        audio.addEventListener('canplaythrough', () => resolve(), { once: true });
        audio.addEventListener('error', () => reject(new Error(`Failed to load ${path}`)), { once: true });
        audio.load();
      })
  );

  try {
    await Promise.all(loadPromises);
    console.log('✅ All sounds preloaded successfully');
  } catch (error) {
    console.error('❌ Failed to preload some sounds:', error);
  }
};

/**
 * Get sound file paths (will be used when sounds are added)
 */
export const SOUND_PATHS = {
  FLIP: '/sounds/card-flip.mp3',
  MATCH: '/sounds/match.mp3',
  NO_MATCH: '/sounds/wrong.mp3',
  WIN: '/sounds/win.mp3',
  CLICK: '/sounds/click.mp3',
  SUCCESS: '/sounds/success.mp3',
  ERROR: '/sounds/error.mp3',
} as const;

/**
 * Simple sound manager using Web Audio API (alternative approach)
 */
export class SoundManager {
  private audioContext: AudioContext | null = null;
  private buffers: Map<string, AudioBuffer> = new Map();
  private volume: number = 0.5;
  private enabled: boolean = true;

  constructor() {
    if (typeof window !== 'undefined' && 'AudioContext' in window) {
      this.audioContext = new AudioContext();
    }
  }

  async loadSound(name: string, url: string): Promise<void> {
    if (!this.audioContext) return;

    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
      this.buffers.set(name, audioBuffer);
    } catch (error) {
      console.error(`Failed to load sound ${name}:`, error);
    }
  }

  play(name: string): void {
    if (!this.enabled || !this.audioContext) return;

    const buffer = this.buffers.get(name);
    if (!buffer) {
      console.warn(`Sound ${name} not loaded`);
      return;
    }

    const source = this.audioContext.createBufferSource();
    const gainNode = this.audioContext.createGain();

    source.buffer = buffer;
    gainNode.gain.value = this.volume;

    source.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    source.start(0);
  }

  setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  async resumeContext(): Promise<void> {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
  }
}

export default useSounds;