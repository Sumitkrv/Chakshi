import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  FiBell, 
  FiSearch, 
  FiUser, 
  FiLogOut, 
  FiSettings,
  FiHelpCircle,
  FiMoon,
  FiSun,
  FiChevronDown,
  FiX,
  FiCommand
} from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const searchRef = useRef(null);
  const notificationRef = useRef(null);
  const userMenuRef = useRef(null);

  const notifications = [
    {
      id: 1,
      title: 'Assignment Due Soon',
      message: 'Contract Law Assignment due in 2 days',
      time: '2 hours ago',
      unread: true
    },
    {
      id: 2,
      title: 'New Course Material',
      message: 'Criminal Law lecture notes uploaded',
      time: '4 hours ago',
      unread: true
    },
    {
      id: 3,
      title: 'Exam Schedule',
      message: 'Mid-term exams start next week',
      time: '1 day ago',
      unread: false
    }
  ];

  const searchSuggestions = [
    { icon: '📚', text: 'Constitutional Law', type: 'course' },
    { icon: '📝', text: 'Contract Analysis', type: 'assignment' },
    { icon: '👥', text: 'Study Groups', type: 'group' },
    { icon: '📅', text: 'Upcoming Exams', type: 'calendar' },
    { icon: '📊', text: 'Performance Analytics', type: 'analytics' }
  ];

  // Get current page title for breadcrumb
  const getPageTitle = () => {
    const path = location.pathname.split('/').pop();
    const pageTitles = {
      'dashboard': 'Dashboard',
      'courses': 'Courses',
      'assignments': 'Assignments',
      'library': 'Library',
      'moot-court': 'Moot Court',
      'study-groups': 'Study Groups',
      'progress': 'Progress',
      'settings': 'Settings',
      'calendar': 'Calendar',
      'research': 'Research'
    };
    return pageTitles[path] || 'Dashboard';
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchSuggestions(false);
        setIsSearchFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        searchRef.current?.focus();
        setIsSearchFocused(true);
        setShowSearchSuggestions(true);
      }
      if (event.key === 'Escape') {
        setShowNotifications(false);
        setShowUserMenu(false);
        setShowSearchSuggestions(false);
        setIsSearchFocused(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }, [logout, navigate]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      setShowSearchSuggestions(false);
      setIsSearchFocused(false);
    }
  };

  const markNotificationAsRead = useCallback((id) => {
    // In a real app, you'd update this in your state management
    console.log('Marking notification as read:', id);
  }, []);

  const markAllNotificationsAsRead = useCallback(() => {
    // In a real app, you'd update this in your state management
    console.log('Marking all notifications as read');
  }, []);

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="h-16 bg-white border-b border-gray-200">
      <div className="px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          
          {/* Left Section - Page Title & Search */}
          <div className="flex items-center space-x-6 flex-1">
            {/* Page Title */}
            <div className="hidden lg:block">
              <h1 className="text-xl font-semibold text-gray-900">{getPageTitle()}</h1>
              <p className="text-sm text-gray-500 mt-1">Welcome back, {user?.name?.split(' ')[0] || 'Student'}</p>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md w-full" ref={searchRef}>
              <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => {
                      setIsSearchFocused(true);
                      setShowSearchSuggestions(true);
                    }}
                    className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Search courses, assignments..."
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-10 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <FiX className="w-3.5 h-3.5 text-gray-400" />
                    </button>
                  )}
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 hidden sm:flex items-center space-x-1 text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                    <FiCommand className="w-3 h-3" />
                    <span>K</span>
                  </div>
                </div>
              </form>

              {/* Search Suggestions */}
              {showSearchSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                  <div className="p-2">
                    {searchQuery ? (
                      <div className="space-y-1">
                        <p className="text-xs text-gray-500 px-2 py-1">Search results for "{searchQuery}"</p>
                        {searchSuggestions
                          .filter(item => item.text.toLowerCase().includes(searchQuery.toLowerCase()))
                          .map((item, index) => (
                            <button
                              key={index}
                              className="w-full flex items-center space-x-3 p-2 text-left hover:bg-gray-50 rounded-lg transition-colors"
                              onClick={() => {
                                setSearchQuery(item.text);
                                setShowSearchSuggestions(false);
                              }}
                            >
                              <span className="text-lg">{item.icon}</span>
                              <div>
                                <p className="text-sm font-medium text-gray-900">{item.text}</p>
                                <p className="text-xs text-gray-500 capitalize">{item.type}</p>
                              </div>
                            </button>
                          ))}
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <p className="text-xs text-gray-500 px-2 py-1">Quick searches</p>
                        {searchSuggestions.map((item, index) => (
                          <button
                            key={index}
                            className="w-full flex items-center space-x-3 p-2 text-left hover:bg-gray-50 rounded-lg transition-colors"
                            onClick={() => {
                              setSearchQuery(item.text);
                              setShowSearchSuggestions(false);
                            }}
                          >
                            <span className="text-lg">{item.icon}</span>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{item.text}</p>
                              <p className="text-xs text-gray-500 capitalize">{item.type}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center space-x-1">
            
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2.5 rounded-xl hover:bg-gray-100 transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <FiSun className="w-5 h-5 text-gray-600" />
              ) : (
                <FiMoon className="w-5 h-5 text-gray-600" />
              )}
            </button>

            {/* Help Button */}
            <button
              onClick={() => navigate('/help')}
              className="p-2.5 rounded-xl hover:bg-gray-100 transition-colors duration-200 hidden sm:block"
              aria-label="Help"
            >
              <FiHelpCircle className="w-5 h-5 text-gray-600" />
            </button>

            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2.5 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                aria-label="Notifications"
              >
                <FiBell className="w-5 h-5 text-gray-600" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium border-2 border-white">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">Notifications</h3>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllNotificationsAsRead}
                          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Mark all read
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-gray-100 last:border-b-0 cursor-pointer hover:bg-gray-50 transition-colors ${
                            notification.unread ? 'bg-blue-50' : ''
                          }`}
                          onClick={() => markNotificationAsRead(notification.id)}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className="font-medium text-gray-900 text-sm">{notification.title}</p>
                              <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                              <p className="text-gray-500 text-xs mt-2">{notification.time}</p>
                            </div>
                            {notification.unread && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full ml-2 mt-1 flex-shrink-0"></div>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center">
                        <FiBell className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-500 text-sm">No notifications</p>
                      </div>
                    )}
                  </div>
                  <div className="p-3 border-t border-gray-200">
                    <button
                      onClick={() => {
                        navigate('/notifications');
                        setShowNotifications(false);
                      }}
                      className="w-full text-center text-blue-600 hover:text-blue-700 font-medium text-sm py-2"
                    >
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-3 p-1.5 rounded-xl hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                  {user?.name ? user.name.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.name || user?.email?.split('@')[0] || 'Student'}
                  </p>
                  <p className="text-xs text-gray-500">Law Student</p>
                </div>
                <FiChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                  showUserMenu ? 'rotate-180' : ''
                }`} />
              </button>

              {/* User Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                  {/* User Info */}
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {user?.name ? user.name.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-sm truncate">
                          {user?.name || user?.email?.split('@')[0] || 'Student'}
                        </p>
                        <p className="text-gray-500 text-xs truncate">{user?.email || 'student@law.edu'}</p>
                        <p className="text-blue-600 text-xs font-medium mt-1">Law Student</p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="p-2">
                    <button
                      onClick={() => {
                        navigate('/profile');
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center space-x-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <FiUser className="w-4 h-4" />
                      <span>Profile</span>
                    </button>
                    <button
                      onClick={() => {
                        navigate('/settings');
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center space-x-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <FiSettings className="w-4 h-4" />
                      <span>Settings</span>
                    </button>
                  </div>

                  {/* Logout */}
                  <div className="p-2 border-t border-gray-200">
                    <button
                      onClick={() => {
                        handleLogout();
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center space-x-3 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <FiLogOut className="w-4 h-4" />
                      <span>Sign out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Navbar);