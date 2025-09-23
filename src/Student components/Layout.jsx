import React, { useState, useEffect, Suspense, useCallback } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiWifi, FiWifiOff } from 'react-icons/fi';
import { ErrorBoundary } from 'react-error-boundary';
import Navbar from '../Student components/Navbar';
import Sidebar from '../Student components/Sidebar';

// Loading Component
const LoadingSpinner = () => (
  <div className="pro-loading-overlay">
    <div className="flex flex-col items-center space-y-4">
      <div className="pro-loading w-8 h-8"></div>
      <p className="text-sm text-gray-600 font-medium">Loading...</p>
    </div>
  </div>
);

// Error Fallback Component
const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6 text-center">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <FiX className="w-8 h-8 text-red-600" />
      </div>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h2>
      <p className="text-gray-600 mb-6 text-sm">
        {error.message || 'An unexpected error occurred. Please try again.'}
      </p>
      <button
        onClick={resetErrorBoundary}
        className="pro-btn pro-btn-primary w-full"
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

  // Handle route changes with loading state
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    
    // Close mobile menu on route change
    setIsMobileMenuOpen(false);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Toggle mobile menu
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  // Close mobile menu when clicking outside
  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="pro-dashboard-layout min-h-screen">
        {/* Offline Indicator */}
        {!isOnline && (
          <div className="fixed top-0 left-0 right-0 bg-red-600 text-white text-center py-2 text-sm font-medium z-50 flex items-center justify-center space-x-2">
            <FiWifiOff className="w-4 h-4" />
            <span>You are currently offline</span>
          </div>
        )}

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div
            className="pro-mobile-overlay lg:hidden"
            onClick={closeMobileMenu}
            aria-label="Close mobile menu"
          />
        )}

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <FiX className="w-6 h-6 text-gray-600" />
          ) : (
            <FiMenu className="w-6 h-6 text-gray-600" />
          )}
        </button>

        {/* Sidebar */}
        <aside
          className={`
            pro-sidebar-responsive lg:translate-x-0
            ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          <Sidebar />
        </aside>

        {/* Main Content Area */}
        <div className="pro-main-content flex flex-col min-h-screen">
          {/* Top Navigation */}
          <header className="pro-header">
            <Navbar />
          </header>

          {/* Page Content */}
          <main className={`
            flex-1 relative transition-all duration-300 ease-in-out
            ${!isOnline ? 'pt-10' : ''} 
            bg-gradient-to-br from-gray-50 via-white to-gray-100
            pro-scrollbar overflow-y-auto
          `}>
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
            
            {/* Content Container */}
            <div className="relative z-10 p-4 sm:p-6 lg:p-8">
              <div className="max-w-7xl mx-auto">
                {/* Loading Overlay */}
                {isLoading && <LoadingSpinner />}
                
                {/* Page Content */}
                <div className={`transition-opacity duration-300 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
                  <Suspense fallback={<LoadingSpinner />}>
                    <ErrorBoundary FallbackComponent={ErrorFallback}>
                      <Outlet />
                    </ErrorBoundary>
                  </Suspense>
                </div>
              </div>
            </div>

            {/* Bottom Padding for Mobile */}
            <div className="h-safe-area-inset-bottom" />
          </main>

          {/* Network Status Indicator */}
          <div className="fixed bottom-4 right-4 lg:bottom-6 lg:right-6 z-40">
            {isOnline ? (
              <div className="bg-green-100 text-green-800 p-2 rounded-full shadow-lg opacity-75 hover:opacity-100 transition-opacity duration-200">
                <FiWifi className="w-4 h-4" />
              </div>
            ) : (
              <div className="bg-red-100 text-red-800 p-2 rounded-full shadow-lg animate-pulse">
                <FiWifiOff className="w-4 h-4" />
              </div>
            )}
          </div>
        </div>

        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50 text-sm font-medium"
        >
          Skip to main content
        </a>
      </div>
    </ErrorBoundary>
  );
};

export default React.memo(Layout);