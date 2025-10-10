import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingOverlay from '../components/LoadingOverlay';

const Navbar = ({ sidebarCollapsed, setSidebarCollapsed }) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  const notifications = [
    { id: 1, text: 'Hearing reminder for Case #C-2023-4582', time: '10 mins ago', read: false },
    { id: 2, text: 'New document uploaded by client', time: '45 mins ago', read: false },
    { id: 3, text: 'Court date changed for Smith v. Jones', time: '2 hours ago', read: true }
  ];
  
  const searchRef = useRef(null);
  const notificationsRef = useRef(null);
  const profileRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const unreadCount = notifications.filter(n => !n.read).length;

  // Updated color palette to match Hero.js
  const colors = {
    // Primary Brand Colors
    background: '#f5f5ef', // Light cream background
    textPrimary: '#1f2839', // Dark navy text
    textSecondary: '#6b7280', // Medium gray
    accent: '#b69d74', // Golden brown accent
    border: 'rgba(31, 40, 57, 0.15)', // Light navy border
    hover: 'rgba(182, 157, 116, 0.08)', // Light golden brown hover
    active: 'rgba(182, 157, 116, 0.12)', // Medium golden brown active
    shadow: '0 1px 3px 0 rgba(31, 40, 57, 0.1), 0 1px 2px 0 rgba(31, 40, 57, 0.06)',
    
    // Status Colors
    success: '#10b981', // Green
    warning: '#f59e0b', // Amber
    info: '#3b82f6', // Blue
    
    // Additional functional colors
    cardBackground: 'rgba(255, 255, 255, 0.03)',
    overlay: 'rgba(255, 255, 255, 0.08)',
  };

  // Navigation items organized by category
  const navItems = {
    core: [
      { name: 'Dashboard', path: '/advocate/dashboard' },
      { name: 'Cases', path: '/advocate/cases' },
      { name: 'Clients', path: '/advocate/clients' },
      { name: 'Documents', path: '/advocate/documents' },
    ],
    tools: [
      { name: 'Contract Analysis', path: '/advocate/contractcomparison' },
      { name: 'Research', path: '/advocate/research' },
      { name: 'Simulation', path: '/advocate/simulation' },
    ],
    insights: []
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      [searchRef, notificationsRef, profileRef, mobileMenuRef].forEach(ref => {
        if (ref.current && !ref.current.contains(event.target)) {
          if (ref === searchRef) setSearchOpen(false);
          if (ref === notificationsRef) setNotificationsOpen(false);
          if (ref === profileRef) setProfileOpen(false);
          if (ref === mobileMenuRef) setMobileMenuOpen(false);
        }
      });
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Mock search function
  const searchAllContent = useCallback((query) => {
    if (!query.trim()) return [];
    
    const mockData = [
      { title: 'Smith v. Jones Corporation', category: 'Case', id: 'C-2023-001' },
      { title: 'John Smith', category: 'Client', id: 'CL-001' },
      { title: 'Contract Agreement.pdf', category: 'Document', id: 'DOC-001' }
    ];

    return mockData.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.length > 2) {
      const results = searchAllContent(query);
      setSearchResults(results);
      setSearchOpen(true);
    } else {
      setSearchResults([]);
      setSearchOpen(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setSearchOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() && searchResults.length > 0) {
      navigate('/advocate/search', { state: { query: searchQuery } });
      setSearchOpen(false);
    }
  };

  const handleSignOut = async () => {
    setProfileOpen(false);
    setIsLoggingOut(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    logout();
    navigate('/');
  };

  const NavButton = ({ item, mobile = false }) => (
    <button
      onClick={() => mobile ? (navigate(item.path), setMobileMenuOpen(false)) : navigate(item.path)}
      className={`transition-all duration-200 ${
        mobile 
          ? 'w-full px-4 py-3 rounded-lg text-left border backdrop-blur-sm' 
          : 'px-3 py-2 rounded-md text-sm font-medium'
      }`}
      style={{
        color: location.pathname === item.path ? colors.accent : colors.textPrimary,
        backgroundColor: location.pathname === item.path ? colors.active : 'transparent',
        borderColor: mobile ? colors.border : 'transparent',
        fontWeight: location.pathname === item.path ? '600' : '500',
        border: location.pathname === item.path ? `1px solid ${colors.accent}40` : '1px solid transparent'
      }}
      onMouseEnter={(e) => {
        if (!mobile && location.pathname !== item.path) {
          e.target.style.backgroundColor = colors.hover;
          e.target.style.borderColor = `${colors.accent}30`;
        }
      }}
      onMouseLeave={(e) => {
        if (!mobile && location.pathname !== item.path) {
          e.target.style.backgroundColor = 'transparent';
          e.target.style.borderColor = 'transparent';
        }
      }}
    >
      <span>{item.name}</span>
    </button>
  );

  return (
    <>
      {isLoggingOut && <LoadingOverlay message="Signing out..." />}
      
      <nav 
        className="border-b sticky top-0 z-50 backdrop-blur-sm"
        style={{ 
          backgroundColor: colors.background,
          borderColor: colors.border,
          boxShadow: colors.shadow
        }}
      >
        <div className="flex items-center justify-between h-16 px-6">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <div 
              className="flex items-center cursor-pointer"
              onClick={() => navigate('/advocate/dashboard')}
            >
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center mr-3"
                style={{
                  background: `linear-gradient(135deg, ${colors.accent}, ${colors.accent}DD, ${colors.accent}BB)`
                }}
              >
                <span className="text-white font-bold text-sm">CL</span>
              </div>
              <div>
                <h1 
                  className="text-lg font-bold"
                  style={{ color: colors.textPrimary }}
                >
                  Chakshi Legal
                </h1>
                <p 
                  className="text-xs"
                  style={{ color: colors.textSecondary }}
                >
                  Professional Suite
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center space-x-1">
              {navItems.core.map(item => (
                <NavButton key={item.path} item={item} />
              ))}
              
              {/* Tools Dropdown */}
              <div className="relative group">
                <button 
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors border border-transparent"
                  style={{
                    color: colors.textPrimary,
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = colors.hover;
                    e.target.style.borderColor = `${colors.accent}30`;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.borderColor = 'transparent';
                  }}
                >
                  <span>Tools</span>
                  <span className="text-xs" style={{ color: colors.accent }}>▼</span>
                </button>
                <div 
                  className="absolute top-full left-0 mt-1 w-48 border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-30 backdrop-blur-sm"
                  style={{
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                    boxShadow: `0 10px 25px ${colors.textPrimary}15`
                  }}
                >
                  {navItems.tools.map(item => (
                    <NavButton key={item.path} item={item} />
                  ))}
                </div>
              </div>

              {/* Settings Dropdown */}
              <div className="relative group">
                <button 
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors border border-transparent"
                  style={{
                    color: colors.textPrimary,
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = colors.hover;
                    e.target.style.borderColor = `${colors.accent}30`;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.borderColor = 'transparent';
                  }}
                >
                  <span>Settings</span>
                  <span className="text-xs" style={{ color: colors.accent }}>▼</span>
                </button>
                <div 
                  className="absolute top-full left-0 mt-1 w-48 border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-30 backdrop-blur-sm"
                  style={{
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                    boxShadow: `0 10px 25px ${colors.textPrimary}15`
                  }}
                >
                  <NavButton item={{ name: 'Settings', path: '/advocate/settings' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8 relative" ref={searchRef}>
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search cases, clients, documents..."
                  className="w-full px-4 py-2 text-sm border rounded-lg focus:ring-2 transition-all duration-200 backdrop-blur-sm"
                  style={{
                    backgroundColor: colors.cardBackground,
                    borderColor: colors.border,
                    color: colors.textPrimary,
                    focusBorderColor: colors.accent,
                    focusRingColor: `${colors.accent}40`
                  }}
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                {searchQuery && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="text-sm transition-colors"
                      style={{ color: colors.textSecondary }}
                    >
                      Clear
                    </button>
                  </div>
                )}
              </div>
            </form>

            {/* Search Results */}
            {searchOpen && searchResults.length > 0 && (
              <div 
                className="absolute mt-1 w-full border rounded-lg shadow-lg z-50 backdrop-blur-sm"
                style={{
                  backgroundColor: colors.background,
                  borderColor: colors.border,
                  boxShadow: `0 10px 25px ${colors.textPrimary}15`
                }}
              >
                <div className="py-2">
                  {searchResults.map((result, index) => (
                    <div
                      key={index}
                      className="px-4 py-3 cursor-pointer transition-colors border-b last:border-b-0"
                      style={{
                        borderColor: colors.border,
                        hoverBackground: colors.hover
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = colors.hover;
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                      }}
                      onClick={() => {
                        navigate(`/advocate/${result.category.toLowerCase()}s/${result.id}`);
                        setSearchOpen(false);
                      }}
                    >
                      <div className="flex justify-between items-center">
                        <span 
                          className="text-sm font-medium"
                          style={{ color: colors.textPrimary }}
                        >
                          {result.title}
                        </span>
                        <span 
                          className="text-xs px-2 py-1 rounded"
                          style={{
                            backgroundColor: `${colors.accent}15`,
                            color: colors.accent,
                            border: `1px solid ${colors.accent}30`
                          }}
                        >
                          {result.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button */}
            <button 
              className="xl:hidden p-2 rounded-md transition-colors text-sm font-medium border border-transparent"
              style={{ color: colors.textPrimary }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = colors.hover;
                e.target.style.borderColor = `${colors.accent}30`;
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.borderColor = 'transparent';
              }}
            >
              Menu
            </button>

            {/* Notifications */}
            <div className="relative" ref={notificationsRef}>
              <button 
                className="relative p-2 rounded-md transition-colors text-sm font-medium border border-transparent"
                style={{ color: colors.textPrimary }}
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = colors.hover;
                  e.target.style.borderColor = `${colors.accent}30`;
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.borderColor = 'transparent';
                }}
              >
                Notifications
                {unreadCount > 0 && (
                  <span 
                    className="absolute -top-1 -right-1 h-4 w-4 rounded-full text-xs flex items-center justify-center text-white font-semibold"
                    style={{ backgroundColor: colors.warning }}
                  >
                    {unreadCount}
                  </span>
                )}
              </button>

              {notificationsOpen && (
                <div 
                  className="absolute right-0 mt-2 w-80 border rounded-lg shadow-lg z-40 backdrop-blur-sm"
                  style={{
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                    boxShadow: `0 10px 25px ${colors.textPrimary}15`
                  }}
                >
                  <div className="p-4 border-b" style={{ borderColor: colors.border }}>
                    <div className="flex justify-between items-center">
                      <h3 
                        className="text-sm font-semibold"
                        style={{ color: colors.textPrimary }}
                      >
                        Notifications
                      </h3>
                      <span 
                        className="text-xs"
                        style={{ color: colors.textSecondary }}
                      >
                        {unreadCount} unread
                      </span>
                    </div>
                  </div>
                  
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map(notification => (
                      <div 
                        key={notification.id}
                        className="p-4 border-b cursor-pointer transition-colors"
                        style={{
                          borderColor: colors.border,
                          backgroundColor: notification.read ? 'transparent' : `${colors.accent}08`
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = colors.hover;
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = notification.read ? 'transparent' : `${colors.accent}08`;
                        }}
                      >
                        <p 
                          className="text-sm mb-1 font-medium"
                          style={{ color: colors.textPrimary }}
                        >
                          {notification.text}
                        </p>
                        <span 
                          className="text-xs"
                          style={{ color: colors.textSecondary }}
                        >
                          {notification.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile */}
            <div className="relative" ref={profileRef}>
              <button 
                className="flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors border backdrop-blur-sm"
                style={{
                  borderColor: colors.border,
                  color: colors.textPrimary
                }}
                onClick={() => setProfileOpen(!profileOpen)}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = colors.hover;
                  e.target.style.borderColor = colors.accent;
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.borderColor = colors.border;
                }}
              >
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold"
                  style={{
                    background: `linear-gradient(135deg, ${colors.accent}, ${colors.accent}DD)`
                  }}
                >
                  {user ? user.name?.charAt(0) || user.email?.charAt(0) : 'U'}
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-semibold" style={{ color: colors.textPrimary }}>
                    {user ? user.name?.split(' ')[0] : 'User'}
                  </p>
                  <p className="text-xs" style={{ color: colors.textSecondary }}>
                    {user?.role || 'Legal Professional'}
                  </p>
                </div>
                <span 
                  className={`text-xs transition-transform ${profileOpen ? 'rotate-180' : ''}`}
                  style={{ color: colors.accent }}
                >
                  ▼
                </span>
              </button>

              {profileOpen && (
                <div 
                  className="absolute right-0 mt-2 w-56 border rounded-lg shadow-lg z-40 backdrop-blur-sm"
                  style={{
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                    boxShadow: `0 10px 25px ${colors.textPrimary}15`
                  }}
                >
                  <div className="p-4 border-b" style={{ borderColor: colors.border }}>
                    <p className="text-sm font-medium" style={{ color: colors.textPrimary }}>
                      {user?.name || 'User'}
                    </p>
                    <p className="text-xs truncate" style={{ color: colors.textSecondary }}>
                      {user?.email || 'user@example.com'}
                    </p>
                  </div>
                  
                  <div className="py-2">
                    <button 
                      onClick={() => navigate('/advocate/profile')}
                      className="flex items-center w-full px-4 py-2 text-sm transition-colors text-left"
                      style={{ color: colors.textPrimary }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = colors.hover;
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                      }}
                    >
                      Profile Settings
                    </button>
                    <button 
                      onClick={() => navigate('/advocate/settings')}
                      className="flex items-center w-full px-4 py-2 text-sm transition-colors text-left"
                      style={{ color: colors.textPrimary }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = colors.hover;
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                      }}
                    >
                      Account Settings
                    </button>
                  </div>

                  <div className="border-t py-2" style={{ borderColor: colors.border }}>
                    <button 
                      onClick={handleSignOut}
                      className="flex items-center w-full px-4 py-2 text-sm transition-colors text-left"
                      style={{ color: colors.warning }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = `${colors.warning}15`;
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                      }}
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div 
          ref={mobileMenuRef}
          className="xl:hidden absolute top-16 left-0 right-0 z-40 border-b shadow-lg backdrop-blur-sm"
          style={{
            backgroundColor: colors.background,
            borderColor: colors.border,
            boxShadow: `0 10px 25px ${colors.textPrimary}15`
          }}
        >
          <div className="px-6 py-4 space-y-1">
            {/* Core Navigation */}
            <div className="mb-4">
              <h3 
                className="text-xs font-semibold uppercase tracking-wider mb-2"
                style={{ color: colors.textSecondary }}
              >
                Core
              </h3>
              <div className="space-y-1">
                {navItems.core.map(item => (
                  <NavButton key={item.path} item={item} mobile />
                ))}
              </div>
            </div>

            {/* Tools */}
            <div className="mb-4">
              <h3 
                className="text-xs font-semibold uppercase tracking-wider mb-2"
                style={{ color: colors.textSecondary }}
              >
                Tools
              </h3>
              <div className="space-y-1">
                {navItems.tools.map(item => (
                  <NavButton key={item.path} item={item} mobile />
                ))}
              </div>
            </div>

            {/* Settings */}
            <div className="mb-4">
              <h3 
                className="text-xs font-semibold uppercase tracking-wider mb-2"
                style={{ color: colors.textSecondary }}
              >
                Settings
              </h3>
              <div className="space-y-1">
                <NavButton item={{ name: 'Settings', path: '/advocate/settings' }} mobile />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;