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
  FiCommand,
  FiBook,
  FiFileText,
  FiUsers,
  FiCalendar,
  FiTrendingUp,
  FiHome
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
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Assignment Due Soon',
      message: 'Contract Law Assignment due in 2 days',
      time: '2 hours ago',
      type: 'warning',
      unread: true
    },
    {
      id: 2,
      title: 'New Course Material',
      message: 'Criminal Law lecture notes uploaded',
      time: '4 hours ago',
      type: 'info',
      unread: true
    },
    {
      id: 3,
      title: 'Exam Schedule',
      message: 'Mid-term exams start next week',
      time: '1 day ago',
      type: 'info',
      unread: false
    }
  ]);

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const searchRef = useRef(null);
  const notificationRef = useRef(null);
  const userMenuRef = useRef(null);

  // Search suggestions based on current route
  const searchSuggestions = [
    { icon: <FiBook className="w-4 h-4" />, text: 'Constitutional Law', type: 'course' },
    { icon: <FiFileText className="w-4 h-4" />, text: 'Contract Analysis Assignment', type: 'assignment' },
    { icon: <FiUsers className="w-4 h-4" />, text: 'Study Group: Civil Procedure', type: 'group' },
    { icon: <FiCalendar className="w-4 h-4" />, text: 'Upcoming Exams', type: 'calendar' },
    { icon: <FiTrendingUp className="w-4 h-4" />, text: 'Performance Analytics', type: 'analytics' }
  ];

  // Get current page breadcrumb
  const getBreadcrumb = () => {
    const path = location.pathname;
    const segments = path.split('/').filter(Boolean);
    
    if (segments.length < 2) return 'Dashboard';
    
    const pageMap = {
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
    
    return pageMap[segments[segments.length - 1]] || 'Student Portal';
  };

  // Handle click outside to close dropdowns
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

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Cmd/Ctrl + K for search
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        searchRef.current?.focus();
        setIsSearchFocused(true);
        setShowSearchSuggestions(true);
      }
      
      // Escape to close dropdowns
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

  const handleNotificationClick = useCallback((notificationId) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId 
          ? { ...notif, unread: false }
          : notif
      )
    );
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications(prev => prev.map(notif => ({ ...notif, unread: false })));
  }, []);

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search functionality
      console.log('Searching for:', searchQuery);
      setShowSearchSuggestions(false);
      setIsSearchFocused(false);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Implement dark mode toggle logic
  };

  return (
    <nav className="pro-header bg-white/95 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Left Section - Breadcrumb & Search */}
          <div className="flex items-center space-x-6 flex-1">
            {/* Breadcrumb */}
            <div className="hidden md:flex items-center space-x-2 text-sm">
              <FiHome className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400">/</span>
              <span className="font-medium text-gray-700">{getBreadcrumb()}</span>
            </div>

            {/* Enhanced Search */}
            <div className="relative max-w-lg w-full" ref={searchRef}>
              <form onSubmit={handleSearchSubmit}>
                <div className="pro-search relative">
                  <div className="pro-search-icon">
                    <FiSearch className="w-4 h-4" />
                  </div>
                  <input
                    ref={searchRef}
                    id="search"
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => {
                      setIsSearchFocused(true);
                      setShowSearchSuggestions(true);
                    }}
                    className={`
                      pro-search-input transition-all duration-300
                      ${isSearchFocused ? 'ring-2 ring-blue-500/20 border-blue-500' : ''}
                    `}
                    placeholder="Search courses, assignments, resources..."
                    aria-label="Search"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => {
                          setSearchQuery('');
                          setShowSearchSuggestions(false);
                        }}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <FiX className="w-3 h-3 text-gray-400" />
                      </button>
                    )}
                    <div className="hidden sm:flex items-center space-x-1 text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                      <FiCommand className="w-3 h-3" />
                      <span>K</span>
                    </div>
                  </div>
                </div>
              </form>

              {/* Search Suggestions Dropdown */}
              {showSearchSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 max-h-80 overflow-y-auto pro-scrollbar">
                  {searchQuery ? (
                    <div className="px-4 py-2">
                      <p className="text-sm text-gray-500 mb-2">Search results for "{searchQuery}"</p>
                      <div className="space-y-1">
                        {searchSuggestions
                          .filter(item => item.text.toLowerCase().includes(searchQuery.toLowerCase()))
                          .map((item, index) => (
                            <button
                              key={index}
                              className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors text-left"
                              onClick={() => {
                                setSearchQuery(item.text);
                                setShowSearchSuggestions(false);
                              }}
                            >
                              <div className="text-gray-400">{item.icon}</div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">{item.text}</p>
                                <p className="text-xs text-gray-500 capitalize">{item.type}</p>
                              </div>
                            </button>
                          ))}
                      </div>
                    </div>
                  ) : (
                    <div className="px-4 py-2">
                      <p className="text-sm text-gray-500 mb-2">Quick searches</p>
                      <div className="space-y-1">
                        {searchSuggestions.slice(0, 5).map((item, index) => (
                          <button
                            key={index}
                            className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors text-left"
                            onClick={() => {
                              setSearchQuery(item.text);
                              setShowSearchSuggestions(false);
                            }}
                          >
                            <div className="text-gray-400">{item.icon}</div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{item.text}</p>
                              <p className="text-xs text-gray-500 capitalize">{item.type}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Section - Actions & User */}
          <div className="flex items-center space-x-2">
            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200 group"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <FiSun className="w-5 h-5 text-yellow-500 group-hover:text-yellow-600" />
              ) : (
                <FiMoon className="w-5 h-5 text-gray-500 group-hover:text-gray-600" />
              )}
            </button>

            {/* Help Button */}
            <button
              onClick={() => navigate('/student/help')}
              className="p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200 group"
              aria-label="Help"
            >
              <FiHelpCircle className="w-5 h-5 text-gray-500 group-hover:text-blue-600" />
            </button>

            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200 group"
                aria-label="Notifications"
              >
                <FiBell className="w-5 h-5 text-gray-500 group-hover:text-blue-600" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium animate-pulse">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="pro-notification-panel">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                      {unreadCount > 0 && (
                        <button
                          onClick={clearAllNotifications}
                          className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Mark all read
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="max-h-80 overflow-y-auto pro-scrollbar">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`pro-notification-item cursor-pointer ${
                            notification.unread ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                          }`}
                          onClick={() => handleNotificationClick(notification.id)}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                              <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                              <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                            </div>
                            {notification.unread && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full ml-2 mt-1"></div>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-8 text-center">
                        <FiBell className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">No notifications</p>
                      </div>
                    )}
                  </div>
                  <div className="px-4 py-3 border-t border-gray-100">
                    <button
                      onClick={() => {
                        navigate('/student/notifications');
                        setShowNotifications(false);
                      }}
                      className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium"
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
                className="flex items-center space-x-3 px-3 py-2 rounded-xl hover:bg-gray-100 transition-colors duration-200 group"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md">
                  {user?.name ? user.name.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.name || user?.email?.split('@')[0] || 'Student'}
                  </p>
                  <p className="text-xs text-gray-500">3L Student</p>
                </div>
                <FiChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} />
              </button>

              {/* User Dropdown */}
              {showUserMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold shadow-md">
                        {user?.name ? user.name.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {user?.name || user?.email?.split('@')[0] || 'Student'}
                        </p>
                        <p className="text-xs text-gray-500">{user?.email || 'student@example.com'}</p>
                        <p className="text-xs text-blue-600 font-medium">3L Student</p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-1">
                    <button
                      onClick={() => {
                        navigate('/student/profile');
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <FiUser className="w-4 h-4" />
                      <span>View Profile</span>
                    </button>
                    <button
                      onClick={() => {
                        navigate('/student/settings');
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <FiSettings className="w-4 h-4" />
                      <span>Settings</span>
                    </button>
                  </div>

                  {/* Logout */}
                  <div className="border-t border-gray-100 py-1">
                    <button
                      onClick={() => {
                        handleLogout();
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
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
    </nav>
  );
};

export default React.memo(Navbar);