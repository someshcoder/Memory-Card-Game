import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';
import './styles/animations.css';
import "./index.css";

/**
 * Initialize theme on app load
 */
const initializeTheme = () => {
  // Check if user has a theme preference in localStorage
  const savedTheme = localStorage.getItem('memory_game_theme');
  
  // Check system preference if no saved preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Apply theme
  const theme = savedTheme || (prefersDark ? 'dark' : 'light');
  
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

/**
 * Initialize app
 */
const initializeApp = () => {
  // Initialize theme
  initializeTheme();

  // Log app version and info (can be removed in production)
  console.log('%c🧠 Memory Card Game', 'color: #3b82f6; font-size: 24px; font-weight: bold;');
  console.log('%cVersion: 1.0.0', 'color: #6b7280; font-size: 12px;');
  console.log('%cBuilt with React + TypeScript + Tailwind CSS', 'color: #6b7280; font-size: 12px;');
  console.log('%c───────────────────────────────────────', 'color: #d1d5db;');

  // Check for localStorage availability
  try {
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
  } catch (error) {
    console.warn('⚠️ localStorage is not available. Game data will not be saved.');
  }

  // Performance monitoring (optional)
  if (import.meta.env.MODE === 'development') {
    // Log when React finishes rendering
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log(`⚡ ${entry.name}: ${entry.duration.toFixed(2)}ms`);
      }
    });
    
    observer.observe({ entryTypes: ['measure'] });
  }
};

/**
 * Error Boundary fallback
 */
const ErrorFallback: React.FC<{ error: Error }> = ({ error }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-rose-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 text-center">
        <div className="text-6xl mb-4">😞</div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Oops! Something went wrong
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          We're sorry, but something unexpected happened. Please try refreshing the page.
        </p>
        <details className="mb-6 text-left">
          <summary className="cursor-pointer text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 mb-2">
            Error Details
          </summary>
          <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-auto max-h-40 text-red-600 dark:text-red-400">
            {error.message}
          </pre>
        </details>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
};

/**
 * Simple Error Boundary Component
 */
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by Error Boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

/**
 * Loading Screen Component
 */
const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center">
        <div className="relative inline-block mb-8">
          {/* Animated logo */}
          <div className="w-24 h-24 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl animate-bounce">
            <span className="text-5xl">🧠</span>
          </div>
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur-xl opacity-50 animate-pulse" />
        </div>
        
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          Memory Game
        </h2>
        
        {/* Loading spinner */}
        <div className="flex items-center justify-center gap-2">
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-3 h-3 bg-pink-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 mt-4 text-sm">
          Loading game...
        </p>
      </div>
    </div>
  );
};

/**
 * Render App
 */
const renderApp = () => {
  const rootElement = document.getElementById('root');

  if (!rootElement) {
    console.error('Root element not found!');
    return;
  }

  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <React.Suspense fallback={<LoadingScreen />}>
          <App />
        </React.Suspense>
      </ErrorBoundary>
    </React.StrictMode>
  );
};

/**
 * Initialize and render
 */
initializeApp();
renderApp();

/**
 * Service Worker Registration (optional - for PWA)
 */
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('✅ Service Worker registered:', registration);
      })
      .catch((error) => {
        console.log('❌ Service Worker registration failed:', error);
      });
  });
}

/**
 * Handle online/offline status
 */
window.addEventListener('online', () => {
  console.log('✅ Back online!');
  // You can show a notification to user
});

window.addEventListener('offline', () => {
  console.log('⚠️ You are offline!');
  // You can show a notification to user
});

/**
 * Prevent context menu on production (optional)
 */
if (import.meta.env.PROD) {
  document.addEventListener('contextmenu', (e) => {
    // Allow context menu on input/textarea elements
    const target = e.target as HTMLElement;
    if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
      e.preventDefault();
    }
  });
}

/**
 * Detect developer tools (optional security measure)
 */
if (import.meta.env.PROD) {
  const devtools = /./;
  devtools.toString = function () {
    console.log('Developer tools detected!');
    return '';
  };
  console.log('%c', devtools);
}

/**
 * Export for testing purposes
 */
export { initializeTheme, initializeApp };