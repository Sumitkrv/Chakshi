import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = ({
  sidebarCollapsed,
  setSidebarCollapsed,
  theme,
  setTheme,
  language,
  setLanguage,
  isOnline,
  user,
  notifications,
  addNotification
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const searchRef = useRef(null);
  const notificationRef = useRef(null);
  const userMenuRef = useRef(null);

  // Mock search data - in real app, this would come from API
  const searchableItems = [
    { id: 1, title: 'Case Management', type: 'page', url: '/clerk/cases' },
    { id: 2, title: 'Dashboard', type: 'page', url: '/clerk/dashboard' },
    { id: 3, title: 'SMS Logs', type: 'page', url: '/clerk/sms-log' },
    { id: 4, title: 'Quick Actions', type: 'page', url: '/clerk/quick-actions' },
    { id: 5, title: 'Settings', type: 'page', url: '/clerk/settings' },
    { id: 6, title: 'Case #2023/001', type: 'case', url: '/clerk/case/1' },
    { id: 7, title: 'Case #2023/002', type: 'case', url: '/clerk/case/2' },
    { id: 8, title: 'Document Upload', type: 'action', url: '/clerk/cases' },
    { id: 9, title: 'Generate Report', type: 'action', url: '/clerk/dashboard' },
    { id: 10, title: 'Integrations', type: 'page', url: '/clerk/integrations' }
  ];

  // Handle search functionality
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length > 2) {
      const results = searchableItems.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8);
      setSearchResults(results);
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
      setSearchResults([]);
    }
  };

  // Handle search navigation
  const handleSearchNavigation = (item) => {
    navigate(item.url);
    setShowSearchResults(false);
    setSearchQuery('');
  };

  // Handle theme toggle
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    addNotification({
      type: 'success',
      message: `Switched to ${newTheme} mode`,
      duration: 3000
    });
  };

  // Handle language toggle
  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ta' : 'en';
    setLanguage(newLanguage);
    addNotification({
      type: 'success',
      message: `Language changed to ${newLanguage === 'en' ? 'English' : 'Tamil'}`,
      duration: 3000
    });
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      // Clear authentication - this will trigger cleanup in other components
      await logout();
      
      // Navigate to home page with replace to clear history
      navigate('/', { replace: true });
      
      addNotification({
        type: 'success',
        message: 'Logged out successfully',
        duration: 3000
      });
    } catch (error) {
      // Still navigate even if there's an error
      navigate('/', { replace: true });
      
      addNotification({
        type: 'error',
        message: 'Logout failed',
        duration: 3000
      });
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update unread notifications count
  useEffect(() => {
    setUnreadCount(notifications.filter(n => !n.read).length);
  }, [notifications]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyboardShortcuts = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('global-search')?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyboardShortcuts);
    return () => document.removeEventListener('keydown', handleKeyboardShortcuts);
  }, []);

  const getSearchIcon = (type) => {
    switch (type) {
      case 'case':
        return (
          <svg className="h-4 w-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'action':
        return (
          <svg className="h-4 w-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      default:
        return (
          <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        );
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 relative z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            {/* Sidebar Toggle */}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-label="Toggle sidebar"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Logo/Brand */}
            <Link to="/clerk/dashboard" className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div className="hidden md:block">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Chakshi</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Court Clerk</p>
              </div>
            </Link>
          </div>

          {/* Center Section - Search */}
          <div className="flex-1 max-w-lg mx-8" ref={searchRef}>
            <div className="relative">
              <input
                id="global-search"
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search cases, documents, actions... (Ctrl+K)"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Search Results Dropdown */}
              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute top-full mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
                  {searchResults.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSearchNavigation(item)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                    >
                      {getSearchIcon(item.type)}
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.title}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">{item.type}</div>
                      </div>
                    </button>
                  ))}
                  {searchQuery.length > 2 && (
                    <div className="px-4 py-2 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700">
                      Press Enter to search all results
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2">
            {/* Connection Status */}
            <div className="flex items-center space-x-2 mr-2">
              <div className={`h-2 w-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
              <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                {isOnline ? 'Online' : 'Offline'}
              </span>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-medium"
              aria-label="Toggle language"
            >
              {language === 'en' ? 'EN' : 'தமிழ்'}
            </button>

            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 relative"
                aria-label="Notifications"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5-5V9a6 6 0 10-12 0v3l-5 5h5m7 0v1a3 3 0 11-6 0v-1" />
                </svg>
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Notifications</h3>
                  </div>
                  {notifications.length > 0 ? (
                    notifications.slice(0, 5).map((notification) => (
                      <div key={notification.id} className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                        <div className="flex items-start space-x-3">
                          <div className={`flex-shrink-0 h-2 w-2 rounded-full mt-2 ${
                            notification.type === 'error' ? 'bg-red-500' :
                            notification.type === 'warning' ? 'bg-yellow-500' :
                            notification.type === 'success' ? 'bg-green-500' :
                            'bg-blue-500'
                          }`}></div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-900 dark:text-gray-100">{notification.message}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {new Date(notification.id).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                      <svg className="h-8 w-8 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5-5V9a6 6 0 10-12 0v3l-5 5h5m7 0v1a3 3 0 11-6 0v-1" />
                      </svg>
                      <p className="text-sm">No notifications</p>
                    </div>
                  )}
                  {notifications.length > 0 && (
                    <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
                      <button className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                        View all notifications
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="User menu"
              >
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {user?.name || 'User'}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Court Clerk</div>
                </div>
              </button>

              {/* User Menu Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-50">
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {user?.name || 'User'}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {user?.email || 'user@example.com'}
                    </div>
                  </div>
                  
                  <div className="py-1">
                    <Link
                      to="/clerk/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <svg className="h-4 w-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Settings
                    </Link>
                    
                    <Link
                      to="/clerk/quick-actions"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <svg className="h-4 w-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Quick Actions
                    </Link>
                    
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        // Add help modal logic here
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <svg className="h-4 w-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Help & Support
                    </button>
                    
                    <div className="border-t border-gray-200 dark:border-gray-700">
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          handleLogout();
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <svg className="h-4 w-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign out
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;