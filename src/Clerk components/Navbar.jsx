import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = ({
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
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  
  const searchRef = useRef(null);
  const notificationRef = useRef(null);
  const userMenuRef = useRef(null);
  const moreMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Enhanced color palette with gradients
  const colors = {
    cream: '#f5f5ef',
    navy: '#1f2839',
    gold: '#b69d74',
    gray: '#6b7280',
    green: '#10b981',
    amber: '#f59e0b',
    blue: '#3b82f6',
    gold05: 'rgba(182, 157, 116, 0.05)',
    gold10: 'rgba(182, 157, 116, 0.10)',
    gold15: 'rgba(182, 157, 116, 0.15)',
    gold20: 'rgba(182, 157, 116, 0.20)',
    gold40: 'rgba(182, 157, 116, 0.40)',
    navy05: 'rgba(31, 40, 57, 0.05)',
    navy10: 'rgba(31, 40, 57, 0.10)',
    navy15: 'rgba(31, 40, 57, 0.15)',
    navy25: 'rgba(31, 40, 57, 0.25)',
    white03: 'rgba(255, 255, 255, 0.03)',
    white06: 'rgba(255, 255, 255, 0.06)',
    white08: 'rgba(255, 255, 255, 0.08)',
  };

  // Enhanced shadows and glows
  const shadows = {
    subtle: `0 2px 12px ${colors.navy05}`,
    medium: `0 4px 20px ${colors.navy10}`,
    large: `0 8px 32px ${colors.navy15}`,
    glow: `0 0 20px ${colors.gold20}`,
    intenseGlow: `0 0 30px ${colors.gold40}`,
    floating: `0 12px 40px ${colors.navy25}`,
  };

  // Mock notifications
  const mockNotifications = [
    { id: 1, text: 'Hearing reminder for Case #C-2023-4582', time: '10 mins ago', read: false },
    { id: 2, text: 'New document uploaded by client', time: '45 mins ago', read: false },
    { id: 3, text: 'Court date changed for Smith v. Jones', time: '2 hours ago', read: true }
  ];

  // Navigation structure with enhanced icons
  const navItems = [
    { 
      name: 'Dashboard', 
      path: '/clerk/dashboard', 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    { 
      name: 'Cases', 
      path: '/clerk/cases', 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    { 
      name: 'Calendar', 
      path: '/clerk/calendar', 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    { 
      name: 'Documents', 
      path: '/clerk/documents', 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    // Fraud Detection (FakeCaseChecker) removed
    { 
      name: 'Reports', 
      path: '/clerk/reports', 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
  ];

  const settingsItems = [
    { 
      name: 'Settings', 
      path: '/clerk/settings', 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    { 
      name: 'Offline Mode', 
      path: '/clerk/offline-mode', 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3" />
        </svg>
      ),
      badge: !isOnline ? 'Active' : null
    },
    { 
      name: 'Help & Support', 
      path: '/clerk/help', 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
  ];

  // Effects
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setUnreadCount(mockNotifications.filter(n => !n.read).length);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const refs = [
        { ref: searchRef, setter: setShowSearchResults },
        { ref: notificationRef, setter: setShowNotifications },
        { ref: userMenuRef, setter: setShowUserMenu },
        { ref: moreMenuRef, setter: setShowMoreMenu },
        { ref: mobileMenuRef, setter: setMobileMenuOpen }
      ];
      
      refs.forEach(({ ref, setter }) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setter(false);
        }
      });
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length > 1) {
      const results = navItems
        .filter(item => item.name.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 8);
      setSearchResults(results);
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const isActivePath = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  // Enhanced Navigation Item Component with animations - Using Link for proper routing
  const NavItem = ({ item, mobile = false }) => (
    <Link
      to={item.path}
      onClick={() => {
        if (mobile) {
          setMobileMenuOpen(false);
        }
      }}
      className={`flex items-center transition-all duration-300 transform ${
        mobile 
          ? 'w-full px-4 py-3 rounded-xl text-left border backdrop-blur-sm hover:scale-105' 
          : 'px-4 py-2 rounded-xl text-sm font-medium border border-transparent hover:scale-105'
      } ${
        isActivePath(item.path) ? 'shadow-lg' : 'hover:shadow-md'
      }`}
      style={{
        color: isActivePath(item.path) ? colors.white : colors.navy,
        backgroundColor: isActivePath(item.path) 
          ? `linear-gradient(135deg, ${colors.gold}, #9c835a)`
          : 'transparent',
        borderColor: mobile ? colors.gold10 : 'transparent',
        background: isActivePath(item.path) 
          ? `linear-gradient(135deg, ${colors.gold}, #9c835a)`
          : 'transparent',
        transform: isActivePath(item.path) ? 'translateY(-1px)' : 'none',
        boxShadow: isActivePath(item.path) ? shadows.glow : 'none',
      }}
      onMouseEnter={(e) => {
        if (!mobile && !isActivePath(item.path)) {
          e.currentTarget.style.backgroundColor = colors.gold10;
          e.currentTarget.style.borderColor = colors.gold20;
          e.currentTarget.style.boxShadow = shadows.subtle;
        }
        setHoveredNav(item.path);
      }}
      onMouseLeave={(e) => {
        if (!mobile && !isActivePath(item.path)) {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.borderColor = 'transparent';
          e.currentTarget.style.boxShadow = 'none';
        }
        setHoveredNav(null);
      }}
    >
      <span 
        className="mr-3 transition-transform duration-300"
        style={{ 
          color: isActivePath(item.path) ? colors.white : colors.gold,
          transform: hoveredNav === item.path ? 'scale(1.1)' : 'scale(1)'
        }}
      >
        {item.icon}
      </span>
      <span className="font-medium">{item.name}</span>
      
      {/* Active indicator removed for cleaner UI */}
    </Link>
  );

  // Enhanced Dropdown Component - Fixed routing with better styling
  const EnhancedDropdown = ({ items, isOpen, onClose, title, position = 'left-0' }) => (
    <div 
      className={`absolute ${position} top-full mt-3 w-72 bg-white rounded-2xl transition-all duration-300 transform backdrop-blur-xl ${
        isOpen 
          ? 'opacity-100 scale-100 translate-y-0' 
          : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
      }`}
      style={{
        border: `2px solid ${colors.gold20}`,
        boxShadow: shadows.floating,
        background: `linear-gradient(145deg, ${colors.white} 0%, ${colors.cream} 100%)`,
        zIndex: 9999
      }}
    >
      {/* Header with enhanced gradient */}
      <div 
        className="px-5 py-4 border-b rounded-t-2xl"
        style={{ 
          borderColor: colors.gold15,
          background: `linear-gradient(135deg, ${colors.gold05}, ${colors.gold15})`
        }}
      >
        <h3 className="font-bold text-base" style={{ color: colors.navy }}>{title}</h3>
        <p className="text-xs mt-1 font-medium" style={{ color: colors.gray }}>
          {items.length} option{items.length !== 1 ? 's' : ''} available
        </p>
      </div>
      
      {/* Items with enhanced spacing */}
      <div className="p-3 max-h-96 overflow-y-auto custom-scrollbar">
        {items.map((item, index) => {
          // Check if this is a logout/sign out item
          const isLogoutItem = item.name === 'Sign Out' || item.name === 'Logout';
          
          if (isLogoutItem) {
            return (
              <button
                key={item.name}
                onClick={() => {
                  handleLogout();
                  onClose();
                }}
                className="flex items-center w-full px-4 py-3.5 rounded-xl transition-all duration-300 transform hover:scale-[1.02] mb-2 border-2"
                style={{
                  color: '#ef4444',
                  backgroundColor: 'transparent',
                  borderColor: '#fee2e2',
                  animationDelay: `${index * 50}ms`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#fef2f2';
                  e.currentTarget.style.borderColor = '#fecaca';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = '#fee2e2';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <span 
                  className="mr-3 transition-transform duration-300"
                  style={{ color: '#ef4444' }}
                >
                  {item.icon}
                </span>
                <span className="text-sm font-semibold flex-1 text-left">{item.name}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            );
          }
          
          // Regular navigation item - use Link with badge support
          const isActive = isActivePath(item.path);
          return (
            <Link
              key={item.path || item.id}
              to={item.path || '#'}
              onClick={() => onClose()}
              className={`flex items-center w-full px-4 py-3.5 rounded-xl transition-all duration-300 transform hover:scale-[1.02] mb-2 border-2 group ${
                isActive ? 'shadow-lg' : 'hover:shadow-md'
              }`}
              style={{
                color: isActive ? colors.gold : colors.navy,
                backgroundColor: isActive ? colors.gold10 : 'transparent',
                borderColor: isActive ? colors.gold : colors.gold10,
                animationDelay: `${index * 50}ms`
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = colors.gold05;
                  e.currentTarget.style.borderColor = colors.gold20;
                  e.currentTarget.style.boxShadow = shadows.subtle;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = colors.gold10;
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              <span 
                className="mr-3 transition-transform duration-300 group-hover:scale-110"
                style={{ color: isActive ? colors.gold : colors.gray }}
              >
                {item.icon}
              </span>
              <span className="text-sm font-semibold flex-1 text-left">{item.name}</span>
              
              {/* Badge for special items */}
              {item.badge && (
                <span 
                  className="px-2 py-1 text-xs font-bold rounded-full mr-2"
                  style={{
                    backgroundColor: colors.green,
                    color: 'white'
                  }}
                >
                  {item.badge}
                </span>
              )}
              
              <svg 
                className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1" 
                style={{ color: colors.gold }} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      <nav 
        className="sticky top-0 z-50 border-b backdrop-blur-lg transition-all duration-500"
        style={{ 
          backgroundColor: `rgba(245, 245, 239, 0.95)`,
          borderColor: colors.gold15,
          boxShadow: isScrolled ? shadows.medium : 'none',
          background: isScrolled 
            ? `linear-gradient(135deg, rgba(245, 245, 239, 0.98) 0%, rgba(245, 245, 239, 0.92) 100%)`
            : colors.cream
        }}
      >
        <div className="flex items-center justify-between h-16 px-6">
          {/* Left Section - Logo with enhanced animation */}
          <div className="flex items-center space-x-8">
            <Link 
              to="/clerk/dashboard"
              className="flex items-center cursor-pointer group"
            >
              <div 
                className="w-8 h-8 rounded-xl flex items-center justify-center mr-3 transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${colors.gold}, #9c835a)`,
                  boxShadow: `0 4px 15px ${colors.gold20}`
                }}
              >
                <span className="text-white font-bold text-sm">CL</span>
              </div>
              <div className="transition-transform duration-300 group-hover:scale-105">
                <h1 className="text-lg font-bold" style={{ color: colors.navy }}>
                  Chakshi Legal
                </h1>
                <p className="text-xs transition-colors duration-300 group-hover:text-gray-600" style={{ color: colors.gray }}>
                  Court Clerk System
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              {navItems.slice(0, 4).map(item => (
                <NavItem key={item.path} item={item} />
              ))}
              
              {/* More dropdown */}
              <div className="relative" ref={moreMenuRef}>
                <button
                  onClick={() => setShowMoreMenu(!showMoreMenu)}
                  className="flex items-center px-4 py-2 rounded-xl text-sm font-medium border border-transparent transition-all duration-300 hover:scale-105"
                  style={{ 
                    color: colors.navy,
                    backgroundColor: showMoreMenu ? colors.gold10 : 'transparent',
                    borderColor: showMoreMenu ? colors.gold20 : 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    if (!showMoreMenu) {
                      e.target.style.backgroundColor = colors.gold05;
                      e.target.style.borderColor = colors.gold10;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!showMoreMenu) {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.borderColor = 'transparent';
                    }
                  }}
                >
                  More
                  <svg 
                    className={`ml-2 w-4 h-4 transition-transform duration-300 ${showMoreMenu ? 'rotate-180' : ''}`}
                    style={{ color: colors.gold }}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <EnhancedDropdown 
                  items={navItems.slice(4)}
                  isOpen={showMoreMenu}
                  onClose={() => setShowMoreMenu(false)}
                  title="More Options"
                />
              </div>
            </div>
          </div>

          {/* Compact Search Button (professional minimal UI) */}
          <div className="flex-1 flex justify-center mx-4">
            <Link
              to="/search"
              className="p-2 rounded-lg border-2 transition-colors duration-200 hover:bg-white hover:shadow-sm"
              style={{ borderColor: colors.gold10, color: colors.navy, backgroundColor: 'transparent' }}
              aria-label="Open search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Link>
          </div>

          {/* Right Section - Cleaned up (Online button removed) */}
          <div className="flex items-center space-x-3">
            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg border border-transparent"
              style={{ color: colors.navy }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = colors.gold05;
                e.target.style.borderColor = colors.gold10;
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.borderColor = 'transparent';
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Connection Status Indicator (neutral text only) */}
            <div className="hidden lg:flex items-center">
              <div 
                className="px-3 py-2 rounded-xl"
                style={{
                  backgroundColor: 'transparent'
                }}
              >
                <span 
                  className="text-xs font-semibold"
                  style={{ color: isOnline ? colors.green : colors.gray }}
                >
                  {isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>

            {/* Enhanced Notifications */}
            <div className="relative" ref={notificationRef}>
              <button 
                className="relative p-2.5 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg border-2 group"
                style={{ 
                  color: colors.navy,
                  borderColor: showNotifications ? colors.gold : colors.gold10,
                  backgroundColor: showNotifications ? colors.gold05 : 'transparent'
                }}
                onClick={() => setShowNotifications(!showNotifications)}
                onMouseEnter={(e) => {
                  if (!showNotifications) {
                    e.currentTarget.style.backgroundColor = colors.gold05;
                    e.currentTarget.style.borderColor = colors.gold20;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!showNotifications) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.borderColor = colors.gold10;
                  }
                }}
              >
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {unreadCount > 0 && (
                  <span 
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full text-xs flex items-center justify-center text-white font-bold animate-bounce"
                    style={{ 
                      backgroundColor: colors.amber,
                      boxShadow: `0 4px 12px ${colors.amber}60`
                    }}
                  >
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div 
                  className={`absolute right-0 top-full mt-3 w-80 bg-white rounded-2xl transition-all duration-300 transform backdrop-blur-xl ${
                    showNotifications 
                      ? 'opacity-100 scale-100 translate-y-0' 
                      : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                  }`}
                  style={{
                    border: `2px solid ${colors.gold20}`,
                    boxShadow: shadows.floating,
                    background: `linear-gradient(145deg, ${colors.white} 0%, ${colors.cream} 100%)`,
                    zIndex: 9999
                  }}
                >
                  {/* Notifications Header */}
                  <div 
                    className="px-5 py-4 border-b rounded-t-2xl flex items-center justify-between"
                    style={{ 
                      borderColor: colors.gold15,
                      background: `linear-gradient(135deg, ${colors.gold05}, ${colors.gold15})`
                    }}
                  >
                    <div>
                      <h3 className="font-bold text-base" style={{ color: colors.navy }}>Notifications</h3>
                      <p className="text-xs mt-1 font-medium" style={{ color: colors.gray }}>
                        {unreadCount} unread message{unreadCount !== 1 ? 's' : ''}
                      </p>
                    </div>
                    {unreadCount > 0 && (
                      <button
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-300 hover:scale-105"
                        style={{
                          backgroundColor: colors.gold20,
                          color: colors.gold
                        }}
                        onClick={() => {
                          // Mark all as read logic here
                          setUnreadCount(0);
                        }}
                      >
                        Mark all read
                      </button>
                    )}
                  </div>
                  
                  {/* Notifications List */}
                  <div className="p-3 max-h-96 overflow-y-auto custom-scrollbar">
                    {mockNotifications.map((notif, index) => (
                      <div
                        key={notif.id}
                        className="px-4 py-3 rounded-xl transition-all duration-300 hover:scale-[1.02] mb-2 border-2 cursor-pointer"
                        style={{
                          backgroundColor: notif.read ? 'transparent' : colors.gold05,
                          borderColor: notif.read ? colors.gold10 : colors.gold20,
                          animationDelay: `${index * 50}ms`
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = colors.gold10;
                          e.currentTarget.style.borderColor = colors.gold20;
                          e.currentTarget.style.boxShadow = shadows.subtle;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = notif.read ? 'transparent' : colors.gold05;
                          e.currentTarget.style.borderColor = notif.read ? colors.gold10 : colors.gold20;
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        <div className="flex items-start space-x-3">
                          <div 
                            className={`w-2.5 h-2.5 rounded-full mt-1 flex-shrink-0 ${!notif.read ? 'animate-pulse' : ''}`}
                            style={{ 
                              backgroundColor: notif.read ? colors.gray : colors.amber,
                              boxShadow: !notif.read ? `0 0 8px ${colors.amber}` : 'none'
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium" style={{ color: colors.navy }}>
                              {notif.text}
                            </p>
                            <p className="text-xs mt-1" style={{ color: colors.gray }}>
                              {notif.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced User Profile */}
            <div className="relative" ref={userMenuRef}>
              <button 
                className="flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 group"
                style={{
                  borderColor: showUserMenu ? colors.gold : colors.gold10,
                  color: colors.navy,
                  backgroundColor: showUserMenu ? colors.gold10 : 'transparent',
                  boxShadow: showUserMenu ? shadows.subtle : 'none'
                }}
                onClick={() => setShowUserMenu(!showUserMenu)}
                onMouseEnter={(e) => {
                  if (!showUserMenu) {
                    e.currentTarget.style.backgroundColor = colors.gold05;
                    e.currentTarget.style.borderColor = colors.gold20;
                    e.currentTarget.style.boxShadow = shadows.subtle;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!showUserMenu) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.borderColor = colors.gold10;
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                <div 
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${colors.gold}, #9c835a)`,
                    boxShadow: `0 4px 15px ${colors.gold20}`
                  }}
                >
                  {/* Animated glow effect */}
                  <div 
                    className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  />
                  {user ? user.name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() : 'U'}
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-bold transition-colors duration-300 group-hover:text-gray-900" style={{ color: colors.navy }}>
                    {user ? user.name?.split(' ')[0] : 'User'}
                  </p>
                  <p className="text-xs font-medium transition-colors duration-300 group-hover:text-gray-600" style={{ color: colors.gray }}>
                    {user?.role || 'Court Clerk'}
                  </p>
                </div>
                <svg 
                  className={`w-4 h-4 transition-all duration-300 ${showUserMenu ? 'rotate-180' : ''} group-hover:scale-110`}
                  style={{ color: colors.gold }}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showUserMenu && (
                <EnhancedDropdown 
                  items={[
                    ...settingsItems,
                    { 
                      name: 'Sign Out', 
                      path: '#', 
                      icon: (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                      )
                    }
                  ]}
                  isOpen={showUserMenu}
                  onClose={() => setShowUserMenu(false)}
                  title="Account Menu"
                  position="right-0"
                />
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div 
          ref={mobileMenuRef}
          className="lg:hidden fixed top-16 left-0 right-0 bottom-0 z-40 backdrop-blur-lg"
          style={{
            backgroundColor: `rgba(245, 245, 239, 0.95)`,
          }}
        >
          <div 
            className="border-b mx-6 mt-4 rounded-2xl shadow-xl overflow-hidden"
            style={{
              borderColor: colors.gold20,
              boxShadow: shadows.floating,
              background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.cream} 100%)`
            }}
          >
            <div className="px-6 py-4 space-y-1 max-h-[calc(100vh-8rem)] overflow-y-auto">
              {/* Navigation Items */}
              <div className="space-y-2">
                {navItems.map(item => (
                  <NavItem key={item.path} item={item} mobile />
                ))}
              </div>

              {/* Settings Section */}
              <div className="pt-4 mt-4 border-t" style={{ borderColor: colors.gold10 }}>
                <div className="space-y-2">
                  {settingsItems.map(item => (
                    <NavItem key={item.path} item={item} mobile />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced custom styles */}
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
        
        /* Custom Scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: ${colors.gold05};
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${colors.gold};
          border-radius: 10px;
          transition: all 0.3s ease;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9c835a;
        }
        
        /* Smooth transitions for all interactive elements */
        button, a, input {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Focus styles for accessibility */
        button:focus-visible, a:focus-visible {
          outline: 2px solid ${colors.gold};
          outline-offset: 2px;
        }
        
        /* Enhanced hover effects */
        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .hover-lift:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        }
      `}</style>
    </>
  );
};

export default Navbar;