import React from 'react';
import { useGameContext } from '../../context/GameContext';
import type { GameSettings } from '../../types';
import { Button, IconButton } from '../ui/Button';

interface SettingsProps {
  onClose: () => void;
  data?: any;
}

/**
 * Settings Component - Dedicated settings panel
 */
export const Settings: React.FC<SettingsProps> = ({ onClose, data }) => {
  const { settings, updateSettings } = useGameContext();
  const gameSettings = data?.settings || settings;

  const handleSettingChange = (setting: keyof GameSettings, value: any) => {
    updateSettings({ [setting]: value });
  };

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
          <span className="text-4xl">⚙️</span>
          <span>Settings</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Customize your gaming experience
        </p>
      </div>

      {/* Settings options */}
      <div className="space-y-5">
        {/* Sound Effects */}
        <div className="flex items-center justify-between p-5 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 rounded-xl border border-gray-200 dark:border-gray-600">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white">
              <span className="text-xl">🔊</span>
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                Sound Effects
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Toggle sound effects during gameplay
              </p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={gameSettings.soundEnabled} 
              onChange={(e) => handleSettingChange('soundEnabled', e.target.checked)}
              className="sr-only peer" 
            />
            <div className="w-12 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-500 peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-indigo-600"></div>
          </label>
        </div>

        {/* Background Music */}
        <div className="flex items-center justify-between p-5 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-gray-700 dark:to-gray-800 rounded-xl border border-gray-200 dark:border-gray-600">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-white">
              <span className="text-xl">🎵</span>
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                Background Music
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Enable relaxing background music
              </p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={gameSettings.musicEnabled} 
              onChange={(e) => handleSettingChange('musicEnabled', e.target.checked)}
              className="sr-only peer" 
            />
            <div className="w-12 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-500 peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-violet-600"></div>
          </label>
        </div>

        {/* Timer Display */}
        <div className="flex items-center justify-between p-5 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-700 dark:to-gray-800 rounded-xl border border-gray-200 dark:border-gray-600">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white">
              <span className="text-xl">⏱️</span>
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                Show Timer
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Display game timer during play
              </p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={gameSettings.showTimer} 
              onChange={(e) => handleSettingChange('showTimer', e.target.checked)}
              className="sr-only peer" 
            />
            <div className="w-12 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-500 peer-checked:bg-gradient-to-r peer-checked:from-emerald-500 peer-checked:to-teal-600"></div>
          </label>
        </div>

        {/* Auto Flip Delay */}
        <div className="p-5 bg-gradient-to-br from-cyan-50 to-sky-50 dark:from-gray-700 dark:to-gray-800 rounded-xl border border-gray-200 dark:border-gray-600">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-sky-600 flex items-center justify-center text-white">
              <span className="text-xl">⚡</span>
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                Card Flip Speed
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Adjust how quickly unmatched cards flip back
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>Slow</span>
              <span>Fast</span>
            </div>
            <input
              type="range"
              min="200"
              max="1000"
              step="100"
              value={gameSettings.autoFlipDelay}
              onChange={(e) => handleSettingChange('autoFlipDelay', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
              {gameSettings.autoFlipDelay}ms delay
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <Button 
          variant="secondary" 
          size="lg" 
          onClick={() => {
            // Reset to defaults
            updateSettings({
              soundEnabled: true,
              musicEnabled: true,
              theme: 'light',
              showTimer: true,
              autoFlipDelay: 500,
            });
          }}
          fullWidth={false}
        >
          Reset Defaults
        </Button>
        <Button 
          variant="primary" 
          size="lg" 
          onClick={onClose} 
          fullWidth={false}
        >
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default Settings;