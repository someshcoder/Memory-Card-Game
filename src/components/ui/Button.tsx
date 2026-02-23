import React, { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import type { ButtonVariant, ComponentSize } from '../../types';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ComponentSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * Reusable Button component with multiple variants and sizes
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    /**
     * Get variant classes
     */
    const getVariantClasses = (): string => {
      const variants: Record<ButtonVariant, string> = {
        primary:
          'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-2xl hover:-translate-y-1 active:scale-95 transition-all duration-300 ease-out',
        secondary:
          'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white shadow-md hover:shadow-xl hover:-translate-y-1 active:scale-95 transition-all duration-300 ease-out',
        success:
          'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-2xl hover:-translate-y-1 active:scale-95 transition-all duration-300 ease-out',
        danger:
          'bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white shadow-lg hover:shadow-2xl hover:-translate-y-1 active:scale-95 transition-all duration-300 ease-out',
        outline:
          'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-700 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 ease-out',
        ghost:
          'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 ease-out',
      };

      return variants[variant];
    };

    /**
     * Get size classes
     */
    const getSizeClasses = (): string => {
      const sizes: Record<ComponentSize, string> = {
        sm: 'px-3 py-1.5 text-sm rounded-md',
        md: 'px-5 py-2.5 text-base rounded-lg',
        lg: 'px-6 py-3 text-lg rounded-xl',
        xl: 'px-8 py-4 text-xl rounded-2xl',
      };

      return sizes[size];
    };

    /**
     * Get base classes
     */
    const baseClasses = `
      font-semibold
      transition-all
      duration-200
      ease-in-out
      group
      flex
      items-center
      justify-center
      gap-2
      focus:outline-none
      focus:ring-4
      focus:ring-blue-300
      dark:focus:ring-blue-800
      disabled:opacity-50
      disabled:cursor-not-allowed
      disabled:hover:scale-100
      relative
      overflow-hidden
    `;

    /**
     * Get full width class
     */
    const fullWidthClass = fullWidth ? 'w-full' : '';

    /**
     * Combine all classes
     */
    const buttonClasses = `
      ${baseClasses}
      ${getVariantClasses()}
      ${getSizeClasses()}
      ${fullWidthClass}
      ${className}
    `.trim().replace(/\s+/g, ' ');

    return (
      <button
        ref={ref}
        className={`${buttonClasses} min-h-12`}
        disabled={disabled || isLoading}
        {...props}
      >
        {!isLoading && leftIcon && (
          <span className="inline-flex items-center z-20 relative">{leftIcon}</span>
        )}

        <span className="inline-block z-20 relative text-black font-bold">{children}</span>

        {!isLoading && rightIcon && (
          <span className="inline-flex items-center z-20 relative">{rightIcon}</span>
        )}

        {isLoading && (
          <svg
            className="animate-spin h-5 w-5 z-20 relative"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

/**
 * Icon Button - Circular button for icons only
 */
interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  variant?: ButtonVariant;
  size?: ComponentSize;
  ariaLabel: string;
  isLoading?: boolean;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      variant = 'ghost',
      size = 'md',
      ariaLabel,
      isLoading = false,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    /**
     * Get variant classes
     */
    const getVariantClasses = (): string => {
      const variants: Record<ButtonVariant, string> = {
        primary:
          'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl',
        secondary:
          'bg-gray-600 hover:bg-gray-700 text-white shadow-md hover:shadow-lg',
        success:
          'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg',
        danger:
          'bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white shadow-lg',
        outline:
          'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20',
        ghost:
          'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800',
      };

      return variants[variant];
    };

    /**
     * Get size classes
     */
    const getSizeClasses = (): string => {
      const sizes: Record<ComponentSize, string> = {
        sm: 'w-8 h-8 text-sm',
        md: 'w-10 h-10 text-base',
        lg: 'w-12 h-12 text-lg',
        xl: 'w-16 h-16 text-xl',
      };

      return sizes[size];
    };

    const buttonClasses = `
      rounded-full
      flex
      items-center
      justify-center
      transition-all
      duration-200
      ease-in-out
      focus:outline-none
      focus:ring-4
      focus:ring-blue-300
      dark:focus:ring-blue-800
      disabled:opacity-50
      disabled:cursor-not-allowed
      active:scale-95
      ${getVariantClasses()}
      ${getSizeClasses()}
      ${className}
    `.trim().replace(/\s+/g, ' ');

    return (
      <button
        ref={ref}
        className={buttonClasses}
        aria-label={ariaLabel}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          icon
        )}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';

/**
 * Button Group - Group multiple buttons together
 */
interface ButtonGroupProps {
  children: React.ReactNode;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  className = '',
  orientation = 'horizontal',
}) => {
  const orientationClasses =
    orientation === 'horizontal' ? 'flex-row space-x-2' : 'flex-col space-y-2';

  return (
    <div className={`flex ${orientationClasses} ${className}`}>
      {children}
    </div>
  );
};

export default Button;