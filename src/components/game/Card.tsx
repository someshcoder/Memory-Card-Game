import React, { memo } from 'react';
import type { Card as CardType } from '../../types';

interface CardProps {
  card: CardType;
  onClick: (cardId: string) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Individual Card Component with 3D flip animation
 */
export const Card: React.FC<CardProps> = memo(
  ({ card, onClick, disabled = false, size = 'md' }) => {
    const { id, value, imageUrl, isFlipped, isMatched } = card;

    /**
     * Get card size classes
     */
    const getSizeClasses = (): string => {
      const sizes = {
        sm: 'w-16 h-20 text-2xl',
        md: 'w-20 h-28 text-3xl',
        lg: 'w-24 h-32 text-4xl',
      };
      return sizes[size];
    };

    /**
     * Handle card click
     */
    const handleClick = () => {
      if (!disabled && !isFlipped && !isMatched) {
        onClick(id);
      }
    };

    /**
     * Determine if card should show face
     */
    const showFace = isFlipped || isMatched;

    return (
      <div
        className={`
          card-container
          group
          ${getSizeClasses()}
          cursor-pointer
          perspective-1000
          ${disabled || isFlipped || isMatched ? 'pointer-events-none' : ''}
        `}
        onClick={handleClick}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label={`Card ${showFace ? value : 'face down'}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
      >
        <div
          className={`
            card-inner
            relative
            w-full
            h-full
            transition-all
            duration-600
            transform-style-3d
            ${showFace ? 'rotate-y-180' : ''}
            ${isMatched ? 'scale-105' : 'group-hover:scale-105 group-hover:-rotate-3'}
          `}
          style={{
            transformStyle: 'preserve-3d',
            transition: 'transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)',
          }}
        >
          {/* Card Back */}
          <div
            className={`
              card-face
              card-back
              absolute
              inset-0
              w-full
              h-full
              rounded-xl
              backface-hidden
              flex
              items-center
              justify-center
              overflow-hidden
              ${
                isMatched
                  ? 'bg-gradient-to-br from-green-400 to-emerald-500'
                  : 'bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600'
              }
              shadow-lg
              hover:shadow-2xl
              transition-shadow
              duration-300
            `}
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            {/* Decorative pattern on card back */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8),transparent_50%)]" />
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent" />
            </div>

            {/* Card back icon/design */}
            <div className="relative z-10 text-white/80 text-4xl font-bold">
              {isMatched ? '✓' : '?'}
            </div>

            {/* Animated shine effect */}
            {!isMatched && (
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-shine"
                style={{
                  animation: 'shine 3s ease-in-out infinite',
                }}
              />
            )}

            {/* Border glow */}
            <div className="absolute inset-0 rounded-xl border-2 border-white/30" />
          </div>

          {/* Card Front */}
          <div
            className={`
              card-face
              card-front
              absolute
              inset-0
              w-full
              h-full
              rounded-xl
              backface-hidden
              rotate-y-180
              flex
              items-center
              justify-center
              bg-gradient-to-br
              from-white
              to-gray-50
              dark:from-gray-700
              dark:to-gray-800
              shadow-xl
              ${isMatched ? 'ring-4 ring-green-400 ring-opacity-50' : ''}
            `}
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            {/* Card content */}
            <div className="relative z-10 select-none">
              {imageUrl ? (
                // If using images
                typeof imageUrl === 'string' && imageUrl.startsWith('http') ? (
                  <img
                    src={imageUrl}
                    alt={`Card ${value}`}
                    className="w-full h-full object-contain p-2"
                    draggable={false}
                  />
                ) : (
                  // Emoji or text
                  <span className="text-5xl drop-shadow-lg">{imageUrl || value}</span>
                )
              ) : (
                <span className="text-5xl drop-shadow-lg">{value}</span>
              )}
            </div>

            {/* Matched card celebration effect */}
            {isMatched && (
              <>
                {/* Particle effect */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-particle"
                      style={{
                        top: '50%',
                        left: '50%',
                        animation: `particle-${i} 0.8s ease-out forwards`,
                        animationDelay: '0.3s',
                      }}
                    />
                  ))}
                </div>

                {/* Success checkmark */}
                <div className="absolute top-2 right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-bounceIn shadow-lg">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </>
            )}

            {/* Border */}
            <div
              className={`
                absolute
                inset-0
                rounded-xl
                border-2
                ${isMatched ? 'border-green-400' : 'border-gray-200 dark:border-gray-600'}
              `}
            />
          </div>
        </div>

        {/* Pulse effect for matched cards */}
        {isMatched && (
          <div className="absolute inset-0 rounded-xl bg-green-400 animate-ping opacity-30 pointer-events-none" />
        )}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;