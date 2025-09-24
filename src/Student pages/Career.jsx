import React, { useState, useEffect, useCallback } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiWifi, FiWifiOff } from 'react-icons/fi';
import { ErrorBoundary } from 'react-error-boundary';

// Import your separate components
import Sidebar from './Sidebar';
import Navbar from './Navbar';

// Loading Component
const LoadingSpinner = () => (
  <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
    <div className="flex flex-col items-center space-y-3">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
      <p className="text-sm font-medium text-gray-600">Loading content...</p>
    </div>
  </div>
);

// Error Fallback Component
const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div className="max-w-md w-full bg-white rounded-lg border border-gray-200 p-6 text-center">
      <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
        <FiX className="w-6 h-6 text-red-500" />
      </div>
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Something went wrong</h2>
      <p className="text-gray-600 mb-4 text-sm">
        {error.message || 'We encountered an unexpected issue. Please try refreshing the page.'}
      </p>
      <button
        onClick={resetErrorBoundary}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium text-sm"
      >
        Try again
      </button>
    </div>
  </div>
);

// Main Layout Component
const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Handle route changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    
    // Close mobile menu on route change
    setIsMobileMenuOpen(false);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // Handle escape key and body scroll
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        closeMobileMenu();
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMobileMenuOpen) {
        closeMobileMenu();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    window.addEventListener('resize', handleResize);
    
    // Control body scroll when mobile menu is open
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen, closeMobileMenu]);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="min-h-screen bg-white flex flex-col lg:flex-row">
        {/* Offline Banner */}
        {!isOnline && (
          <div className="fixed top-0 left-0 right-0 bg-red-600 text-white text-center py-2 text-sm font-medium z-50">
            <div className="flex items-center justify-center space-x-2">
              <FiWifiOff className="w-4 h-4" />
              <span>You're currently offline. Some features may be unavailable.</span>
            </div>
          </div>
        )}

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
        )}

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-200 hover:bg-gray-50 transition-colors"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <FiX className="w-5 h-5 text-gray-700" />
          ) : (
            <FiMenu className="w-5 h-5 text-gray-700" />
          )}
        </button>

        {/* Sidebar - Fixed width of 280px */}
        <aside 
          className={`
            fixed lg:sticky top-0 left-0 z-40 w-72 h-screen bg-white border-r border-gray-200
            transform transition-transform duration-300 ease-in-out lg:transform-none
            ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            flex-shrink-0
          `}
          aria-label="Sidebar"
        >
          <Sidebar onMobileItemClick={closeMobileMenu} />
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-h-screen lg:min-h-0">
          {/* Header */}
          <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
            <Navbar onMenuToggle={toggleMobileMenu} />
          </header>

          {/* Page Content */}
          <main 
            id="main-content"
            className="flex-1 relative overflow-auto bg-gray-50"
          >
            {/* Loading Overlay */}
            {isLoading && <LoadingSpinner />}
            
            {/* Content Container */}
            <div className={`h-full transition-opacity duration-200 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
              <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                  <Outlet />
                </ErrorBoundary>
              </div>
            </div>
          </main>
        </div>

        {/* Network Status Indicator */}
        <div className="fixed bottom-4 right-4 z-40">
          <div 
            className={`
              p-2 rounded-full shadow-md border transition-all duration-300
              ${isOnline 
                ? 'bg-white border-green-300 text-green-600' 
                : 'bg-red-50 border-red-300 text-red-600'
              }
            `}
            title={isOnline ? 'Online' : 'Offline'}
            aria-live="polite"
          >
            {isOnline ? (
              <FiWifi className="w-4 h-4" />
            ) : (
              <FiWifiOff className="w-4 h-4" />
            )}
          </div>
        </div>

        {/* Skip to Content - Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 bg-blue-600 text-white px-3 py-2 rounded-md z-50 font-medium text-sm shadow-lg"
        >
          Skip to main content
        </a>
      </div>
    </ErrorBoundary>
  );
};

export default React.memo(Layout);