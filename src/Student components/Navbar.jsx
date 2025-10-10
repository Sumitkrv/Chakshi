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
  FiHome,
  FiBook,
  FiFileText,
  FiCalendar,
  FiBriefcase,
  FiRss,
  FiBookOpen,
  FiAward,
  FiBarChart2,
  FiPlay,
  FiStar,
  FiZap
} from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState('dashboard');
  const [scrolled, setScrolled] = useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const searchRef = useRef(null);
  const notificationRef = useRef(null);
  const userMenuRef = useRef(null);
  const moreMenuRef = useRef(null);
  const navbarRef = useRef(null);

  const notifications = [
    {
      id: 1,
      title: 'Assignment Due Soon',
      message: 'Contract Law Assignment due in 2 days',
      time: '2 hours ago',
      unread: true,
      priority: 'high'
    },
    {
      id: 2,
      title: 'New Course Material',
      message: 'Criminal Law lecture notes uploaded',
      time: '4 hours ago',
      unread: true,
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Exam Schedule',
      message: 'Mid-term exams start next week',
      time: '1 day ago',
      unread: false,
      priority: 'low'
    }
  ];

  const searchSuggestions = [
    { icon: '📚', text: 'Constitutional Law', type: 'course', trending: true },
    { icon: '📝', text: 'Contract Analysis', type: 'assignment', trending: false },
    { icon: '👥', text: 'Study Groups', type: 'group', trending: true },
    { icon: '📅', text: 'Upcoming Exams', type: 'calendar', trending: false },
    { icon: '📊', text: 'Performance Analytics', type: 'analytics', trending: true }
  ];

  // Navigation items with icons
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FiHome, path: '/student/dashboard', premium: false },
    { id: 'courses', label: 'Courses', icon: FiBook, path: '/student/courses', premium: true },
    { id: 'assignments', label: 'Assignments', icon: FiFileText, path: '/student/assignments', premium: false },
    { id: 'calendar', label: 'Calendar', icon: FiCalendar, path: '/student/calendar', premium: false },
    { id: 'career', label: 'Career', icon: FiBriefcase, path: '/student/career', premium: true },
    { id: 'content-feed', label: 'Content Feed', icon: FiRss, path: '/student/content-feed', premium: false },
    { id: 'examprep', label: 'Exam Prep', icon: FiBookOpen, path: '/student/examprep', premium: true },
    { id: 'library', label: 'Library', icon: FiAward, path: '/student/library', premium: false },
    { id: 'mootcourt', label: 'Moot Court', icon: FiBarChart2, path: '/student/mootcourt', premium: true },
    { id: 'research', label: 'Research', icon: FiSearch, path: '/student/research', premium: false },
    { id: 'simulation', label: 'Simulation', icon: FiPlay, path: '/student/simulation', premium: true }
  ];

  // Items to show in main navbar (first 6 items)
  const mainNavItems = navItems.slice(0, 6);
  // Items to show in "More" dropdown (remaining items)
  const moreNavItems = navItems.slice(6);

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) {
        setShowMoreMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Set active nav item based on current route
  useEffect(() => {
    const currentPath = location.pathname;
    const activeItem = navItems.find(item => currentPath.startsWith(item.path)) || navItems[0];
    setActiveNavItem(activeItem.id);
  }, [location.pathname]);

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
        setShowMoreMenu(false);
        setIsSearchFocused(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      // Clear authentication - this will trigger cleanup in other components
      await logout();
      
      // Navigate to home page with replace to clear history
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Logout failed:', error);
      // Still navigate even if there's an error
      navigate('/', { replace: true });
    }
  }, [logout, navigate]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      setShowSearchSuggestions(false);
      setIsSearchFocused(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleNavClick = (item) => {
    console.log('🔍 Student Nav Click:', { itemId: item.id, path: item.path, currentLocation: location.pathname });
    setActiveNavItem(item.id);
    navigate(item.path);
    setShowMoreMenu(false); // Close more menu when an item is clicked
  };

  const markNotificationAsRead = useCallback((id) => {
    console.log('Marking notification as read:', id);
  }, []);

  const markAllNotificationsAsRead = useCallback(() => {
    console.log('Marking all notifications as read');
  }, []);

  const unreadCount = notifications.filter(n => n.unread).length;

  // Premium badge component
  const PremiumBadge = () => (
    <div className="absolute -top-1 -right-1">
      <div className="relative">
        <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full animate-pulse"></div>
        <div className="absolute inset-0 w-2 h-2 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full animate-ping"></div>
      </div>
    </div>
  );

  // Animated gradient background for navbar
  const navbarBackground = scrolled 
    ? "bg-gradient-to-r from-[#f5f5ef]/95 via-[#f8f7f2]/95 to-[#f5f5ef]/95 backdrop-blur-xl shadow-2xl"
    : "bg-gradient-to-r from-[#f5f5ef] via-[#f8f7f2] to-[#f5f5ef] backdrop-blur-lg";

  return (
    <div 
      ref={navbarRef}
      className={`h-16 border-b transition-all duration-500 w-full sticky top-0 z-50 ${navbarBackground} border-[rgba(182,157,116,0.3)]`}
      style={{
        background: scrolled 
          ? 'linear-gradient(135deg, rgba(245,245,239,0.95) 0%, rgba(248,247,242,0.95) 50%, rgba(245,245,239,0.95) 100%)'
          : 'linear-gradient(135deg, #f5f5ef 0%, #f8f7f2 50%, #f5f5ef 100%)'
      }}
    >
      {/* Animated border gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#b69d74] to-transparent opacity-50"></div>
      
      <div className="px-4 sm:px-6 lg:px-8 h-full w-full max-w-full">
        <div className="flex items-center justify-between h-full w-full">
          
          {/* Left Section - Navigation & Search */}
          <div className="flex items-center space-x-4 flex-1 min-w-0">
            
            {/* Navigation Items */}
            <div className="hidden lg:flex items-center space-x-1 flex-shrink-0">
              {mainNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeNavItem === item.id;
                
                return (
                  <div key={item.id} className="relative">
                    <button
                      onClick={() => handleNavClick(item)}
                      className={`relative flex items-center space-x-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex-shrink-0 group ${
                        isActive 
                          ? 'text-white shadow-2xl transform scale-105' 
                          : 'text-[#1f2839] hover:text-[#1f2839] hover:transform hover:scale-105'
                      }`}
                    >
                      {/* Animated background */}
                      <div className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-br from-[#b69d74] via-[#c8b090] to-[#b69d74] shadow-lg shadow-[#b69d74]/30'
                          : 'bg-gradient-to-br from-transparent to-transparent group-hover:bg-gradient-to-br group-hover:from-[rgba(182,157,116,0.1)] group-hover:via-[rgba(200,176,144,0.15)] group-hover:to-[rgba(182,157,116,0.1)]'
                      }`}></div>
                      
                      {/* Glow effect */}
                      {isActive && (
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#b69d74] to-transparent opacity-20 blur-sm"></div>
                      )}
                      
                      <Icon className={`w-4 h-4 flex-shrink-0 relative z-10 transition-transform duration-300 ${
                        isActive ? 'transform scale-110' : 'group-hover:transform group-hover:scale-110'
                      }`} />
                      <span className="whitespace-nowrap relative z-10 font-semibold">{item.label}</span>
                      
                      {item.premium && <PremiumBadge />}
                      
                      {/* Hover underline animation */}
                      {!isActive && (
                        <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-[#b69d74] to-[#c8b090] transition-all duration-300 group-hover:w-4/5 group-hover:left-1/10 transform -translate-x-1/2"></div>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* More items dropdown */}
            <div className="hidden lg:block relative flex-shrink-0" ref={moreMenuRef}>
              <button 
                onClick={() => setShowMoreMenu(!showMoreMenu)}
                className="group relative flex items-center space-x-1 px-3 py-2 rounded-xl text-sm font-medium text-[#1f2839] transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent to-transparent group-hover:from-[rgba(182,157,116,0.1)] group-hover:via-[rgba(200,176,144,0.15)] group-hover:to-[rgba(182,157,116,0.1)] transition-all duration-300"></div>
                <span className="whitespace-nowrap relative z-10">More</span>
                <FiChevronDown className={`w-4 h-4 flex-shrink-0 relative z-10 transition-transform duration-300 ${
                  showMoreMenu ? 'rotate-180' : 'group-hover:rotate-180'
                }`} />
                
                {/* Animated dots */}
                <div className="absolute -top-1 -right-1 flex space-x-0.5">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-1 h-1 bg-gradient-to-r from-[#b69d74] to-[#c8b090] rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    ></div>
                  ))}
                </div>
              </button>

              {/* More Menu Dropdown - FIXED Z-INDEX */}
              {showMoreMenu && (
                <div className="absolute left-0 mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-[rgba(182,157,116,0.2)] z-[100] transform origin-top-left">
                  <div className="p-4 border-b border-[rgba(31,40,57,0.1)]">
                    <h3 className="font-bold text-[#1f2839] text-lg">More Features</h3>
                    <p className="text-[#6b7280] text-xs mt-1">Additional tools and resources</p>
                  </div>
                  <div className="p-2 max-h-80 overflow-y-auto">
                    {moreNavItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeNavItem === item.id;
                      
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleNavClick(item)}
                          className={`w-full flex items-center space-x-3 px-3 py-3 text-sm transition-all duration-300 rounded-xl group relative ${
                            isActive
                              ? 'text-white bg-gradient-to-r from-[#b69d74] to-[#c8b090] shadow-lg'
                              : 'text-[#1f2839] hover:bg-gradient-to-r hover:from-[rgba(182,157,116,0.05)] hover:to-[rgba(200,176,144,0.08)]'
                          }`}
                        >
                          <Icon className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${
                            isActive ? 'transform scale-110' : 'group-hover:transform group-hover:scale-110'
                          } ${
                            isActive ? 'text-white' : 'text-[#b69d74]'
                          }`} />
                          <div className="flex-1 min-w-0 text-left">
                            <div className="flex items-center space-x-2">
                              <span className={`font-semibold truncate ${
                                isActive ? 'text-white' : 'text-[#1f2839]'
                              }`}>
                                {item.label}
                              </span>
                              {item.premium && (
                                <FiStar className="w-3 h-3 text-yellow-500 flex-shrink-0" />
                              )}
                            </div>
                            <p className={`text-xs truncate ${
                              isActive ? 'text-white/80' : 'text-[#6b7280]'
                            }`}>
                              {item.id.replace('-', ' ')}
                            </p>
                          </div>
                          
                          {isActive && (
                            <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  <div className="p-3 border-t border-[rgba(31,40,57,0.1)]">
                    <button
                      onClick={() => {
                        navigate('/student/all-features');
                        setShowMoreMenu(false);
                      }}
                      className="w-full text-center bg-gradient-to-r from-[rgba(182,157,116,0.1)] to-[rgba(200,176,144,0.1)] text-[#b69d74] hover:text-[#1f2839] font-semibold text-sm py-2.5 rounded-xl transition-all duration-300 hover:transform hover:scale-[1.02]"
                    >
                      View All Features
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Search Bar */}
            <div className="relative max-w-md w-full min-w-0" ref={searchRef}>
              <form onSubmit={handleSearchSubmit} className="w-full">
                <div className="relative w-full group">
                  {/* Animated background */}
                  <div className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                    isSearchFocused 
                      ? 'bg-gradient-to-r from-white to-white shadow-2xl shadow-[#b69d74]/20' 
                      : 'bg-white/80 group-hover:bg-white'
                  }`}></div>
                  
                  <FiSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 flex-shrink-0 transition-all duration-300 ${
                    isSearchFocused ? 'text-[#b69d74] scale-110' : 'text-[#6b7280]'
                  }`} />
                  
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => {
                      setIsSearchFocused(true);
                      setShowSearchSuggestions(true);
                    }}
                    onBlur={() => setIsSearchFocused(false)}
                    className="relative w-full pl-10 pr-10 py-2.5 border-0 rounded-xl focus:ring-0 bg-transparent text-[#1f2839] placeholder-[#6b7280] transition-all duration-300 z-10"
                    placeholder="Search courses, assignments..."
                  />
                  
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="relative z-20 absolute right-10 top-1/2 transform -translate-y-1/2 p-1 hover:bg-[rgba(182,157,116,0.1)] rounded-lg transition-all duration-200 flex-shrink-0 hover:scale-110"
                    >
                      <FiX className="w-3.5 h-3.5 text-[#6b7280]" />
                    </button>
                  )}
                  
                  <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 hidden sm:flex items-center space-x-1 text-xs px-2 py-1 rounded-lg border transition-all duration-300 flex-shrink-0 ${
                    isSearchFocused
                      ? 'bg-gradient-to-r from-[#b69d74] to-[#c8b090] text-white border-transparent'
                      : 'text-[#6b7280] bg-[rgba(182,157,116,0.05)] border-[rgba(31,40,57,0.1)] group-hover:bg-[rgba(182,157,116,0.1)]'
                  }`}>
                    <FiCommand className="w-3 h-3" />
                    <span>K</span>
                  </div>

                  {/* Animated focus border */}
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-[#b69d74] to-[#c8b090] opacity-0 transition-all duration-300 ${
                    isSearchFocused ? 'opacity-20 blur-sm' : 'group-hover:opacity-10'
                  }`}></div>
                </div>
              </form>

              {/* Enhanced Search Suggestions */}
              {showSearchSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-[rgba(182,157,116,0.2)] py-3 z-[90] max-h-80 overflow-y-auto transform origin-top">
                  <div className="p-2">
                    {searchQuery ? (
                      <div className="space-y-2">
                        <p className="text-xs text-[#6b7280] px-3 py-1 font-medium">Search results for "{searchQuery}"</p>
                        {searchSuggestions
                          .filter(item => item.text.toLowerCase().includes(searchQuery.toLowerCase()))
                          .map((item, index) => (
                            <button
                              key={index}
                              className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gradient-to-r hover:from-[rgba(182,157,116,0.05)] hover:to-[rgba(200,176,144,0.08)] rounded-xl transition-all duration-300 group hover:transform hover:scale-[1.02]"
                              onClick={() => {
                                setSearchQuery(item.text);
                                setShowSearchSuggestions(false);
                                handleSearchSubmit({ preventDefault: () => {} });
                              }}
                            >
                              <span className="text-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center space-x-2">
                                  <p className="text-sm font-semibold text-[#1f2839] truncate">{item.text}</p>
                                  {item.trending && (
                                    <span className="flex items-center space-x-1 px-1.5 py-0.5 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full">
                                      <FiZap className="w-3 h-3 text-green-600" />
                                      <span className="text-xs text-green-600 font-medium">Trending</span>
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-[#6b7280] capitalize truncate">{item.type}</p>
                              </div>
                              <FiChevronRight className="w-4 h-4 text-[#6b7280] opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-1 group-hover:translate-x-0" />
                            </button>
                          ))}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <p className="text-xs text-[#6b7280] px-3 py-1 font-medium">Quick searches</p>
                        {searchSuggestions.map((item, index) => (
                          <button
                            key={index}
                            className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gradient-to-r hover:from-[rgba(182,157,116,0.05)] hover:to-[rgba(200,176,144,0.08)] rounded-xl transition-all duration-300 group hover:transform hover:scale-[1.02]"
                            onClick={() => {
                              setSearchQuery(item.text);
                              setShowSearchSuggestions(false);
                              handleSearchSubmit({ preventDefault: () => {} });
                            }}
                          >
                            <span className="text-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center space-x-2">
                                <p className="text-sm font-semibold text-[#1f2839] truncate">{item.text}</p>
                                {item.trending && (
                                  <span className="flex items-center space-x-1 px-1.5 py-0.5 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full">
                                    <FiZap className="w-3 h-3 text-green-600" />
                                    <span className="text-xs text-green-600 font-medium">Trending</span>
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-[#6b7280] capitalize truncate">{item.type}</p>
                            </div>
                            <FiChevronRight className="w-4 h-4 text-[#6b7280] opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-1 group-hover:translate-x-0" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Section - Enhanced Actions */}
          <div className="flex items-center space-x-2 flex-shrink-0 ml-4">
            
            {/* Enhanced Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="relative p-2.5 rounded-xl hover:bg-[rgba(182,157,116,0.1)] transition-all duration-300 flex-shrink-0 group hover:transform hover:scale-110"
              aria-label="Toggle dark mode"
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent to-transparent group-hover:from-[rgba(182,157,116,0.1)] group-hover:to-[rgba(200,176,144,0.1)] transition-all duration-300"></div>
              {isDarkMode ? (
                <FiSun className="w-5 h-5 text-[#1f2839] relative z-10 transition-transform duration-300 group-hover:rotate-180" />
              ) : (
                <FiMoon className="w-5 h-5 text-[#1f2839] relative z-10 transition-transform duration-300 group-hover:rotate-180" />
              )}
            </button>

            {/* Enhanced Help Button */}
            <button
              onClick={() => navigate('/student/help')}
              className="relative p-2.5 rounded-xl hover:bg-[rgba(182,157,116,0.1)] transition-all duration-300 hidden sm:flex flex-shrink-0 group hover:transform hover:scale-110"
              aria-label="Help"
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent to-transparent group-hover:from-[rgba(182,157,116,0.1)] group-hover:to-[rgba(200,176,144,0.1)] transition-all duration-300"></div>
              <FiHelpCircle className="w-5 h-5 text-[#1f2839] relative z-10" />
            </button>

            {/* Enhanced Notifications */}
            <div className="relative flex-shrink-0" ref={notificationRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2.5 rounded-xl hover:bg-[rgba(182,157,116,0.1)] transition-all duration-300 flex-shrink-0 group hover:transform hover:scale-110"
                aria-label="Notifications"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent to-transparent group-hover:from-[rgba(182,157,116,0.1)] group-hover:to-[rgba(200,176,144,0.1)] transition-all duration-300"></div>
                <FiBell className="w-5 h-5 text-[#1f2839] relative z-10" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-br from-[#10b981] to-emerald-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold border-2 border-[#f5f5ef] shadow-lg animate-pulse">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {/* Enhanced Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-96 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-[rgba(182,157,116,0.2)] z-[80] transform origin-top-right">
                  <div className="p-4 border-b border-[rgba(31,40,57,0.1)]">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-[#1f2839] text-lg">Notifications</h3>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllNotificationsAsRead}
                          className="text-sm bg-gradient-to-r from-[#b69d74] to-[#c8b090] text-white px-3 py-1 rounded-lg font-medium transition-all duration-300 hover:transform hover:scale-105"
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
                          className={`p-4 border-b border-[rgba(31,40,57,0.05)] last:border-b-0 cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-[rgba(182,157,116,0.05)] hover:to-[rgba(200,176,144,0.08)] group ${
                            notification.unread ? 'bg-[rgba(182,157,116,0.08)]' : ''
                          }`}
                          onClick={() => markNotificationAsRead(notification.id)}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-1">
                                <p className="font-semibold text-[#1f2839] text-sm">{notification.title}</p>
                                {notification.priority === 'high' && (
                                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                                )}
                              </div>
                              <p className="text-[#6b7280] text-sm mb-2">{notification.message}</p>
                              <div className="flex items-center space-x-2">
                                <p className="text-[#b69d74] text-xs font-medium">{notification.time}</p>
                                {notification.unread && (
                                  <span className="text-xs bg-gradient-to-r from-[#b69d74] to-[#c8b090] text-white px-2 py-0.5 rounded-full">
                                    New
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-[rgba(182,157,116,0.1)] to-[rgba(200,176,144,0.2)] rounded-full flex items-center justify-center mx-auto mb-3">
                          <FiBell className="w-6 h-6 text-[#6b7280]" />
                        </div>
                        <p className="text-[#6b7280] text-sm">No notifications</p>
                      </div>
                    )}
                  </div>
                  <div className="p-3 border-t border-[rgba(31,40,57,0.1)]">
                    <button
                      onClick={() => {
                        navigate('/student/notifications');
                        setShowNotifications(false);
                      }}
                      className="w-full text-center bg-gradient-to-r from-[rgba(182,157,116,0.1)] to-[rgba(200,176,144,0.1)] text-[#b69d74] hover:text-[#1f2839] font-semibold text-sm py-2.5 rounded-xl transition-all duration-300 hover:transform hover:scale-[1.02]"
                    >
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced User Menu */}
            <div className="relative flex-shrink-0" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-[rgba(182,157,116,0.1)] transition-all duration-300 group hover:transform hover:scale-105"
              >
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#b69d74] via-[#c8b090] to-[#b69d74] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg flex-shrink-0 relative overflow-hidden">
                    {user?.name ? user.name.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase() || 'U'}
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  </div>
                  {/* Online status */}
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full border-2 border-white shadow-sm"></div>
                </div>
                <div className="hidden lg:block text-left min-w-0">
                  <p className="text-sm font-semibold text-[#1f2839] truncate">
                    {user?.name || user?.email?.split('@')[0] || 'Student'}
                  </p>
                  <p className="text-xs text-[#6b7280] truncate">Law Student</p>
                </div>
                <FiChevronDown className={`w-4 h-4 text-[#6b7280] transition-all duration-300 flex-shrink-0 ${
                  showUserMenu ? 'rotate-180 transform scale-110' : 'group-hover:transform group-hover:scale-110'
                }`} />
              </button>

              {/* Enhanced User Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-[rgba(182,157,116,0.2)] z-[70] transform origin-top-right">
                  {/* User Info */}
                  <div className="p-4 border-b border-[rgba(31,40,57,0.1)]">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#b69d74] via-[#c8b090] to-[#b69d74] rounded-full flex items-center justify-center text-white font-bold text-base shadow-lg flex-shrink-0">
                          {user?.name ? user.name.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full border-2 border-white shadow-sm"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-[#1f2839] text-sm truncate">
                          {user?.name || user?.email?.split('@')[0] || 'Student'}
                        </p>
                        <p className="text-[#6b7280] text-xs truncate">{user?.email || 'student@law.edu'}</p>
                        <p className="text-[#b69d74] text-xs font-bold mt-1 bg-gradient-to-r from-[rgba(182,157,116,0.1)] to-[rgba(200,176,144,0.1)] px-2 py-0.5 rounded-full inline-block">
                          ⚖️ Law Student
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="p-2">
                    <button
                      onClick={() => {
                        navigate('/student/profile');
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center space-x-3 px-3 py-3 text-sm text-[#1f2839] hover:bg-gradient-to-r hover:from-[rgba(182,157,116,0.05)] hover:to-[rgba(200,176,144,0.08)] rounded-xl transition-all duration-300 group"
                    >
                      <FiUser className="w-4 h-4 flex-shrink-0 text-[#b69d74] group-hover:scale-110 transition-transform duration-300" />
                      <span className="font-medium">Profile</span>
                    </button>
                    <button
                      onClick={() => {
                        navigate('/student/settings');
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center space-x-3 px-3 py-3 text-sm text-[#1f2839] hover:bg-gradient-to-r hover:from-[rgba(182,157,116,0.05)] hover:to-[rgba(200,176,144,0.08)] rounded-xl transition-all duration-300 group"
                    >
                      <FiSettings className="w-4 h-4 flex-shrink-0 text-[#b69d74] group-hover:scale-110 transition-transform duration-300" />
                      <span className="font-medium">Settings</span>
                    </button>
                  </div>

                  {/* Logout */}
                  <div className="p-2 border-t border-[rgba(31,40,57,0.1)]">
                    <button
                      onClick={() => {
                        handleLogout();
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center space-x-3 px-3 py-3 text-sm text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 rounded-xl transition-all duration-300 group"
                    >
                      <FiLogOut className="w-4 h-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                      <span className="font-medium">Sign out</span>
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

// Add missing ChevronRight icon
const FiChevronRight = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

export default React.memo(Navbar);