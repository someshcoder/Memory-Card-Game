import React from 'react';
import { Link } from 'react-router-dom';
import { IconButton } from '../ui/Button';

interface HeaderProps {
  onStart?: () => void;
}

/**
 * Header Component - Top navigation bar
 */
export const Header: React.FC<HeaderProps> = ({
  onStart,
}) => {
  return (
    <header className="w-full bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo and title */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Animated logo */}
            <div className="relative">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-110 hover:rotate-6 transition-all duration-300">
                <span className="text-2xl md:text-3xl animate-pulse">🧠</span>
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl blur-md opacity-50 -z-10 animate-pulse" />
            </div>

            {/* Title */}
            <div className="flex flex-col justify-end pt-4">
              <Link to="/" className="hover:opacity-80 transition-opacity">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Memory Game
                </h1>
              </Link>
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Stats indicator (optional) - clickable to start if onStart provided */}
            {onStart ? (
              <button
                type="button"
                onClick={onStart}
                aria-label="Start game"
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-lg cursor-pointer hover:scale-105 transition-transform duration-150"
              >
                <svg
                  className="w-5 h-5 text-blue-600 dark:text-blue-400"
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
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Ready to play
                </span>
              </button>
            ) : (
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-lg">
                <svg
                  className="w-5 h-5 text-blue-600 dark:text-blue-400"
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
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Ready to play
                </span>
              </div>
            )}

            {/* Theme toggle */}
            {/* Removed as per user request */}

            {/* About/Info button */}
            <Link to="/about">
              <IconButton
                icon={
                  <svg
                    className="w-5 h-5"
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
                }
                ariaLabel="About and information"
                variant="ghost"
                size="md"
              />
            </Link>
            
            {/* Settings button */}
            {/* Removed as per user request */}

            {/* Settings button (mobile only) */}
            {/* Removed as per user request */}
          </div>
        </div>
      </div>

      {/* Decorative bottom border with gradient */}
      <div className="h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600" />
    </header>
  );
};

export default Header;