import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'white' | 'dark';
  text?: string;
  fullScreen?: boolean;
}

/**
 * Loading Spinner Component - Reusable loading indicator
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'primary',
  text,
  fullScreen = false,
}) => {
  /**
   * Get spinner size classes
   */
  const getSizeClasses = (): string => {
    const sizes = {
      sm: 'w-6 h-6 border-2',
      md: 'w-10 h-10 border-3',
      lg: 'w-16 h-16 border-4',
      xl: 'w-24 h-24 border-4',
    };
    return sizes[size];
  };

  /**
   * Get spinner color classes
   */
  const getColorClasses = (): string => {
    const colors = {
      primary: 'border-blue-600 border-t-transparent',
      secondary: 'border-purple-600 border-t-transparent',
      white: 'border-white border-t-transparent',
      dark: 'border-gray-900 border-t-transparent dark:border-white dark:border-t-transparent',
    };
    return colors[color];
  };

  /**
   * Get text size based on spinner size
   */
  const getTextSize = (): string => {
    const sizes = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    };
    return sizes[size];
  };

  /**
   * Spinner element
   */
  const spinner = (
    <div
      className={`
        ${getSizeClasses()}
        ${getColorClasses()}
        rounded-full
        animate-spin
      `}
      role="status"
      aria-label="Loading"
    />
  );

  /**
   * Full screen loading
   */
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="text-center">
          {spinner}
          {text && (
            <p className={`mt-4 font-medium text-gray-700 dark:text-gray-300 ${getTextSize()}`}>
              {text}
            </p>
          )}
        </div>
      </div>
    );
  }

  /**
   * Inline loading
   */
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      {spinner}
      {text && (
        <p className={`font-medium text-gray-700 dark:text-gray-300 ${getTextSize()}`}>
          {text}
        </p>
      )}
    </div>
  );
};

/**
 * Dots Loading Spinner - Alternative style
 */
export const DotsLoader: React.FC<{
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'white';
}> = ({ size = 'md', color = 'primary' }) => {
  const getDotSize = (): string => {
    const sizes = {
      sm: 'w-2 h-2',
      md: 'w-3 h-3',
      lg: 'w-4 h-4',
    };
    return sizes[size];
  };

  const getColorClass = (): string => {
    const colors = {
      primary: 'bg-blue-600',
      secondary: 'bg-purple-600',
      white: 'bg-white',
    };
    return colors[color];
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <div
        className={`${getDotSize()} ${getColorClass()} rounded-full animate-bounce`}
        style={{ animationDelay: '0ms' }}
      />
      <div
        className={`${getDotSize()} ${getColorClass()} rounded-full animate-bounce`}
        style={{ animationDelay: '150ms' }}
      />
      <div
        className={`${getDotSize()} ${getColorClass()} rounded-full animate-bounce`}
        style={{ animationDelay: '300ms' }}
      />
    </div>
  );
};

/**
 * Pulse Loading Spinner - Alternative style
 */
export const PulseLoader: React.FC<{
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary';
}> = ({ size = 'md', color = 'primary' }) => {
  const getSize = (): string => {
    const sizes = {
      sm: 'w-12 h-12',
      md: 'w-16 h-16',
      lg: 'w-24 h-24',
    };
    return sizes[size];
  };

  const getColorClass = (): string => {
    const colors = {
      primary: 'bg-blue-600',
      secondary: 'bg-purple-600',
    };
    return colors[color];
  };

  return (
    <div className="relative flex items-center justify-center">
      <div
        className={`${getSize()} ${getColorClass()} rounded-full opacity-75 absolute animate-ping`}
      />
      <div className={`${getSize()} ${getColorClass()} rounded-full opacity-75`} />
    </div>
  );
};

/**
 * Skeleton Loader - For content placeholders
 */
export const SkeletonLoader: React.FC<{
  width?: string;
  height?: string;
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
}> = ({ width = 'w-full', height = 'h-4', className = '', variant = 'rectangular' }) => {
  const getVariantClass = (): string => {
    const variants = {
      text: 'rounded',
      circular: 'rounded-full',
      rectangular: 'rounded-lg',
    };
    return variants[variant];
  };

  return (
    <div
      className={`
        ${width}
        ${height}
        ${getVariantClass()}
        bg-gray-200
        dark:bg-gray-700
        animate-pulse
        ${className}
      `}
      role="status"
      aria-label="Loading content"
    />
  );
};

/**
 * Card Skeleton Loader
 */
export const CardSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <SkeletonLoader height="h-6" width="w-3/4" className="mb-4" />
      <SkeletonLoader height="h-4" width="w-full" className="mb-2" />
      <SkeletonLoader height="h-4" width="w-5/6" className="mb-2" />
      <SkeletonLoader height="h-4" width="w-4/6" />
    </div>
  );
};

/**
 * Spinner with overlay
 */
export const OverlaySpinner: React.FC<{ text?: string }> = ({ text }) => {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-lg">
      <div className="text-center">
        <LoadingSpinner size="lg" color="primary" />
        {text && (
          <p className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-300">
            {text}
          </p>
        )}
      </div>
    </div>
  );
};

/**
 * Progress Spinner with percentage
 */
export const ProgressSpinner: React.FC<{
  progress: number; // 0-100
  size?: 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'success';
}> = ({ progress, size = 'lg', color = 'primary' }) => {
  const getSizeClasses = (): { container: string; text: string } => {
    const sizes = {
      md: { container: 'w-16 h-16', text: 'text-sm' },
      lg: { container: 'w-24 h-24', text: 'text-base' },
      xl: { container: 'w-32 h-32', text: 'text-xl' },
    };
    return sizes[size];
  };

  const getColorClass = (): string => {
    const colors = {
      primary: 'text-blue-600',
      secondary: 'text-purple-600',
      success: 'text-green-600',
    };
    return colors[color];
  };

  const sizeClasses = getSizeClasses();
  const colorClass = getColorClass();
  const circumference = 2 * Math.PI * 40; // radius = 40
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={`relative ${sizeClasses.container}`}>
      <svg className="transform -rotate-90 w-full h-full">
        {/* Background circle */}
        <circle
          cx="50%"
          cy="50%"
          r="40"
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          className="text-gray-200 dark:text-gray-700"
        />
        {/* Progress circle */}
        <circle
          cx="50%"
          cy="50%"
          r="40"
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className={`${colorClass} transition-all duration-300 ease-out`}
          strokeLinecap="round"
        />
      </svg>
      {/* Percentage text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`font-bold ${colorClass} ${sizeClasses.text}`}>
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
};

export default LoadingSpinner;