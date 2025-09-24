import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingOverlay from '../components/LoadingOverlay';

const Navbar = ({ sidebarCollapsed, setSidebarCollapsed }) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifications] = useState([
    { id: 1, text: 'Hearing reminder for Case #C-2023-4582', time: '10 mins ago', read: false },
    { id: 2, text: 'New document uploaded by client', time: '45 mins ago', read: false },
    { id: 3, text: 'Court date changed for Smith v. Jones', time: '2 hours ago', read: true }
  ]);
  
  const searchRef = useRef(null);
  const notificationsRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const unreadCount = notifications.filter(n => !n.read).length;

  // Clean, professional color palette
  const colors = {
    background: '#FFFFFF',
    border: '#E5E7EB',
    textPrimary: '#374151',
    textSecondary: '#6B7280',
    textLight: '#9CA3AF',
    hover: '#F9FAFB',
    active: '#F3F4F6'
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
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

  const markNotificationAsRead = (id) => {
    // Implementation would update notifications state
  };

  const handleNavigation = (path) => {
    setProfileOpen(false);
    navigate(path);
  };

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleSignOut = async () => {
    setProfileOpen(false);
    setIsLoggingOut(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    logout();
    navigate('/');
  };

  return (
    <>
      {isLoggingOut && <LoadingOverlay message="Signing out..." />}
      
      <nav 
        className="bg-white border-b sticky top-0 z-50 shadow-sm"
        style={{ 
          backgroundColor: colors.background,
          borderColor: colors.border
        }}
      >
        <div className="flex items-center justify-between h-16 px-6">
          {/* Left side - Menu and Logo */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 rounded-md hover:bg-gray-50 transition-colors"
              style={{ color: colors.textPrimary }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <div 
              className="flex items-center cursor-pointer"
              onClick={() => navigate('/advocate/dashboard')}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" style={{ color: colors.textPrimary }}>
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <span 
                  className="text-lg font-semibold tracking-tight"
                  style={{ color: colors.textPrimary }}
                >
                  CHAKSHI
                </span>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8 relative" ref={searchRef}>
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: colors.textLight }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search cases, clients, documents..."
                  className="w-full pl-10 pr-10 py-2.5 text-sm border rounded-lg focus:ring-1 focus:border-blue-500 transition-colors"
                  style={{ 
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                    color: colors.textPrimary
                  }}
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    style={{ color: colors.textLight }}
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </form>

            {/* Search Results */}
            {searchOpen && searchResults.length > 0 && (
              <div 
                className="absolute mt-1 w-full border rounded-lg shadow-lg z-50"
                style={{ 
                  backgroundColor: colors.background,
                  borderColor: colors.border
                }}
              >
                <div className="py-2">
                  {searchResults.map((result, index) => (
                    <div
                      key={index}
                      className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer transition-colors border-b last:border-b-0"
                      style={{ borderColor: colors.border }}
                      onClick={() => {
                        navigate(`/advocate/${result.category.toLowerCase()}s/${result.id}`);
                        setSearchOpen(false);
                      }}
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-medium" style={{ color: colors.textPrimary }}>
                          {result.title}
                        </span>
                        <span 
                          className="text-xs px-2 py-1 rounded bg-gray-100"
                          style={{ color: colors.textSecondary }}
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
          <div className="flex items-center space-x-3">
            {/* Notifications */}
            <div className="relative" ref={notificationsRef}>
              <button 
                className="p-2 rounded-md hover:bg-gray-50 transition-colors relative"
                style={{ color: colors.textPrimary }}
                onClick={() => setNotificationsOpen(!notificationsOpen)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5zM12 2v1m0 18v1m-9-9h1m16 0h1M4.93 4.93l.71.71m12.73.71l.71-.71M4.93 19.07l.71-.71m12.73.71l-.71-.71" />
                </svg>
                {unreadCount > 0 && (
                  <span 
                    className="absolute -top-1 -right-1 h-4 w-4 rounded-full text-xs flex items-center justify-center"
                    style={{ 
                      backgroundColor: '#EF4444',
                      color: '#FFFFFF'
                    }}
                  >
                    {unreadCount}
                  </span>
                )}
              </button>

              {notificationsOpen && (
                <div 
                  className="absolute right-0 mt-2 w-80 border rounded-lg shadow-lg z-10"
                  style={{ 
                    backgroundColor: colors.background,
                    borderColor: colors.border
                  }}
                >
                  <div className="p-4 border-b" style={{ borderColor: colors.border }}>
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-semibold" style={{ color: colors.textPrimary }}>
                        Notifications
                      </h3>
                      <span className="text-xs" style={{ color: colors.textSecondary }}>
                        {unreadCount} unread
                      </span>
                    </div>
                  </div>
                  
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map(notification => (
                      <div 
                        key={notification.id}
                        className="p-4 border-b hover:bg-gray-50 cursor-pointer transition-colors"
                        style={{ borderColor: colors.border }}
                        onClick={() => markNotificationAsRead(notification.id)}
                      >
                        <p className="text-sm mb-1" style={{ color: colors.textPrimary }}>
                          {notification.text}
                        </p>
                        <span className="text-xs" style={{ color: colors.textLight }}>
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
                className="flex items-center space-x-3 p-1 rounded-md hover:bg-gray-50 transition-colors"
                style={{ color: colors.textPrimary }}
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium"
                  style={{ 
                    backgroundColor: colors.active,
                    color: colors.textPrimary
                  }}
                >
                  {user ? user.name?.charAt(0) || user.email?.charAt(0) : 'U'}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium" style={{ color: colors.textPrimary }}>
                    {user ? user.name?.split(' ')[0] : 'User'}
                  </p>
                  <p className="text-xs" style={{ color: colors.textLight }}>
                    {user?.role || 'Legal Professional'}
                  </p>
                </div>
                <svg 
                  className={`w-4 h-4 transition-transform ${profileOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  style={{ color: colors.textLight }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {profileOpen && (
                <div 
                  className="absolute right-0 mt-2 w-56 border rounded-lg shadow-lg z-10"
                  style={{ 
                    backgroundColor: colors.background,
                    borderColor: colors.border
                  }}
                >
                  <div className="p-4 border-b" style={{ borderColor: colors.border }}>
                    <p className="text-sm font-medium" style={{ color: colors.textPrimary }}>
                      {user?.name || 'User'}
                    </p>
                    <p className="text-xs truncate" style={{ color: colors.textLight }}>
                      {user?.email || 'user@example.com'}
                    </p>
                  </div>
                  
                  <div className="py-1">
                    <button 
                      onClick={() => handleNavigation('/advocate/profile')}
                      className="flex items-center space-x-3 w-full px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors"
                      style={{ color: colors.textPrimary }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>Profile Settings</span>
                    </button>

                    <button 
                      onClick={() => handleNavigation('/advocate/settings')}
                      className="flex items-center space-x-3 w-full px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors"
                      style={{ color: colors.textPrimary }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>Account Settings</span>
                    </button>
                  </div>

                  <div className="border-t" style={{ borderColor: colors.border }}></div>
                  
                  <button 
                    onClick={handleSignOut}
                    className="flex items-center space-x-3 w-full px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors"
                    style={{ color: '#DC2626' }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;