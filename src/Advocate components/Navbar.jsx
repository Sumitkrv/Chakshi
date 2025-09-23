import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingOverlay from '../components/LoadingOverlay';
import { Search, Menu, Bell, Grid3X3, Settings, User, LogOut, ChevronDown, X, Zap, Filter, Clock, ArrowRight, Check, Trash2, Mail, Phone, Shield, Moon, Sun, Globe, HelpCircle } from 'lucide-react';

const Navbar = ({ sidebarCollapsed, setSidebarCollapsed }) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchFilters, setSearchFilters] = useState({ category: 'all', dateRange: 'all' });
  const [searchHistory, setSearchHistory] = useState([]);
  const [selectedSearchIndex, setSelectedSearchIndex] = useState(-1);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Hearing reminder for Case #C-2023-4582', time: '10 mins ago', read: false, type: 'reminder', priority: 'high' },
    { id: 2, text: 'New document uploaded by client', time: '45 mins ago', read: false, type: 'document', priority: 'medium' },
    { id: 3, text: 'Court date changed for Smith v. Jones', time: '2 hours ago', read: true, type: 'schedule', priority: 'high' },
    { id: 4, text: 'Client Johnson signed the agreement', time: '5 hours ago', read: true, type: 'document', priority: 'low' },
    { id: 5, text: 'Payment received from client ABC Corp', time: '1 day ago', read: false, type: 'payment', priority: 'medium' }
  ]);
  const [notificationFilter, setNotificationFilter] = useState('all');
  const [darkMode, setDarkMode] = useState(false);
  
  const searchRef = useRef(null);
  const notificationsRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const unreadCount = notifications.filter(n => !n.read).length;

  // Enhanced search categories
  const searchCategories = [
    { value: 'all', label: 'All' },
    { value: 'cases', label: 'Cases' },
    { value: 'clients', label: 'Clients' },
    { value: 'documents', label: 'Documents' },
    { value: 'appointments', label: 'Appointments' },
    { value: 'contacts', label: 'Contacts' }
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
        setSelectedSearchIndex(-1);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Keyboard navigation for search
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (searchOpen && searchResults.length > 0) {
        switch (event.key) {
          case 'ArrowDown':
            event.preventDefault();
            setSelectedSearchIndex(prev => 
              prev < searchResults.length - 1 ? prev + 1 : prev
            );
            break;
          case 'ArrowUp':
            event.preventDefault();
            setSelectedSearchIndex(prev => prev > 0 ? prev - 1 : -1);
            break;
          case 'Enter':
            event.preventDefault();
            if (selectedSearchIndex >= 0) {
              handleResultClick(searchResults[selectedSearchIndex]);
            } else if (searchResults.length > 0) {
              handleResultClick(searchResults[0]);
            }
            break;
          case 'Escape':
            setSearchOpen(false);
            setSelectedSearchIndex(-1);
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen, searchResults, selectedSearchIndex]);

  // Enhanced search function with filters
  const searchAllContent = useCallback((query) => {
    if (!query.trim()) return [];
    
    const results = [];
    const searchTerm = query.toLowerCase();
    
    // Mock data for different categories
    const mockData = {
      cases: [
        { title: 'Smith v. Jones Corporation', category: 'Commercial Law', id: 'C-2023-001' },
        { title: 'Estate of Williams', category: 'Probate Law', id: 'C-2023-002' },
        { title: 'ABC Corp vs XYZ Ltd', category: 'Corporate Law', id: 'C-2023-003' }
      ],
      clients: [
        { name: 'John Smith', company: 'Smith Enterprises', phone: '+1-555-0123' },
        { name: 'Sarah Johnson', company: 'Johnson & Associates', phone: '+1-555-0124' },
        { name: 'Michael Brown', company: 'Brown Industries', phone: '+1-555-0125' }
      ],
      documents: [
        { name: 'Contract Agreement - Smith.pdf', type: 'Contract', date: '2023-12-01' },
        { name: 'Court Filing - Jones Case.doc', type: 'Court Filing', date: '2023-11-28' },
        { name: 'Legal Brief - Williams Estate.pdf', type: 'Legal Brief', date: '2023-11-25' }
      ]
    };

    // Search through different data types based on filter
    Object.keys(mockData).forEach(category => {
      if (searchFilters.category === 'all' || searchFilters.category === category) {
        mockData[category].forEach(item => {
          const searchableText = Object.values(item).join(' ').toLowerCase();
          if (searchableText.includes(searchTerm)) {
            results.push({
              text: category === 'cases' ? `${item.title} - ${item.category}` :
                    category === 'clients' ? `${item.name} - ${item.company}` :
                    `${item.name} - ${item.type}`,
              category: category.charAt(0).toUpperCase() + category.slice(1),
              id: item.id || item.name || item.title,
              data: item
            });
          }
        });
      }
    });
    
    return results.slice(0, 8);
  }, [searchFilters]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setSelectedSearchIndex(-1);
    
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
    setSelectedSearchIndex(-1);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Add to search history
      setSearchHistory(prev => {
        const newHistory = [searchQuery, ...prev.filter(item => item !== searchQuery)].slice(0, 5);
        return newHistory;
      });
      
      if (searchResults.length > 0) {
        const targetResult = selectedSearchIndex >= 0 ? searchResults[selectedSearchIndex] : searchResults[0];
        handleResultClick(targetResult);
      }
    }
  };

  const handleResultClick = (result) => {
    // Navigate based on category
    switch (result.category.toLowerCase()) {
      case 'cases':
        navigate(`/advocate/cases/${result.id}`);
        break;
      case 'clients':
        navigate(`/advocate/clients/${result.id}`);
        break;
      case 'documents':
        navigate(`/advocate/documents/${result.id}`);
        break;
      default:
        // Scroll to element if it exists
        if (result.element) {
          result.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // Highlight the element temporarily with a more sophisticated approach
          const originalBg = result.element.style.backgroundColor;
          const originalTransition = result.element.style.transition;
          
          result.element.style.transition = 'background-color 0.5s ease';
          result.element.style.backgroundColor = '#fffdba';
          
          setTimeout(() => {
            result.element.style.backgroundColor = originalBg;
            setTimeout(() => {
              result.element.style.transition = originalTransition;
            }, 500);
          }, 2000);
        }
    }
    setSearchOpen(false);
    setSelectedSearchIndex(-1);
  };

  // Enhanced notification functions
  const markNotificationAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const filteredNotifications = notifications.filter(notif => {
    if (notificationFilter === 'all') return true;
    if (notificationFilter === 'unread') return !notif.read;
    return notif.type === notificationFilter;
  });

  // Handle navigation to different pages
  const handleNavigation = (path) => {
    setProfileOpen(false);
    navigate(path);
  };

  // Handle sign out
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleSignOut = async () => {
    setProfileOpen(false);
    setIsLoggingOut(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    logout();
    navigate('/');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Apply dark mode to document
    document.documentElement.classList.toggle('dark');
  };

  return (
    <>
      {isLoggingOut && <LoadingOverlay message="Logging out..." />}
      <nav className="border-b border-gray-200 backdrop-blur-xl bg-gradient-to-r from-blue-900/95 via-blue-800/95 to-blue-900/95 px-4 md:px-6 py-3 md:py-4 shadow-lg sticky top-0 z-50" style={{backgroundColor: '#1E3A8A'}}>
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Left side - Menu toggle and Logo */}
          <div className="flex items-center space-x-3 md:space-x-4">
            <button 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 md:p-2.5 rounded-lg group transition-all duration-300 hover:bg-gray-700/30 text-white"
              aria-label="Toggle sidebar"
              style={{color: '#FFFFFF'}}
            >
              <span className="text-sm font-medium">Menu</span>
            </button>
            
            {/* Enhanced Logo/Brand */}
            <div className="hidden md:flex items-center cursor-pointer group" onClick={() => navigate('/advocate/dashboard')}>
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300" style={{backgroundColor: '#374151'}}>
                  <span className="text-white font-bold text-lg">⚖</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg md:text-xl font-bold text-white">
                    Chakshi Pro
                  </span>
                  <span className="text-xs text-gray-200 font-medium">
                    Legal Practice Management
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Search Bar */}
          <div className="flex-1 max-w-xl md:max-w-2xl mx-3 md:mx-6 relative" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="w-full">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none">
                  <span className="text-sm text-gray-400">🔍</span>
                </div>
                <input
                  type="text"
                  placeholder="Search cases, documents, clients..."
                  className="w-full pl-10 md:pl-12 pr-16 md:pr-20 py-2.5 md:py-3.5 border border-gray-600/30 text-white placeholder-gray-300 backdrop-blur-md focus:border-gray-400/50 focus:ring-2 focus:ring-gray-400/30 rounded-xl transition-all duration-300"
                  style={{backgroundColor: 'rgba(55, 65, 81, 0.3)'}}
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => searchQuery.length > 2 && setSearchOpen(true)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center space-x-1 md:space-x-2 pr-3 md:pr-4">
                  <button
                    type="button"
                    onClick={() => setSearchOpen(!searchOpen)}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                    aria-label="Search filters"
                  >
                    <span className="text-xs">Filters</span>
                  </button>
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      <span className="text-xs">Clear</span>
                    </button>
                  )}
                </div>
              </div>
            </form>

            {/* Enhanced Search Results */}
            {searchOpen && (
              <div className="absolute z-50 mt-2 w-full border border-gray-600/30 backdrop-blur-xl rounded-xl overflow-hidden animate-slide-down shadow-lg" style={{backgroundColor: 'rgba(30, 58, 138, 0.9)'}}>
                {/* Search Filters */}
                <div className="p-3 md:p-4 border-b border-gray-600/20" style={{backgroundColor: 'rgba(55, 65, 81, 0.1)'}}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-white">Search Options</h3>
                    <button 
                      onClick={clearSearch}
                      className="text-xs text-gray-300 hover:text-white transition-colors duration-300"
                    >
                      <span>Close</span>
                    </button>
                  </div>
                  <div className="flex space-x-3">
                    <select 
                      value={searchFilters.category}
                      onChange={(e) => setSearchFilters(prev => ({ ...prev, category: e.target.value }))}
                      className="text-xs border border-gray-600/30 text-white rounded-lg px-3 py-1.5"
                      style={{backgroundColor: 'rgba(55, 65, 81, 0.3)'}}
                    >
                      {searchCategories.map(cat => (
                        <option key={cat.value} value={cat.value} style={{backgroundColor: '#374151'}}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Search History */}
                {searchHistory.length > 0 && searchQuery.length <= 2 && (
                  <div className="p-4 border-b border-white/10">
                    <h4 className="text-xs font-semibold text-white/80 mb-2 flex items-center">
                      <span className="mr-2">🕒</span>
                      Recent Searches
                    </h4>
                    {searchHistory.map((term, index) => (
                      <button
                        key={index}
                        onClick={() => setSearchQuery(term)}
                        className="block w-full text-left text-sm text-white/70 hover:text-white py-1 hover:bg-white/5 rounded px-2"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                )}

                {/* Search Results */}
                {searchResults.length > 0 && (
                  <>
                    <div className="p-3 md:p-4 border-b border-gray-600/20" style={{backgroundColor: 'rgba(55, 65, 81, 0.1)'}}>
                      <h3 className="text-sm font-semibold text-white">
                        {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
                      </h3>
                    </div>
                    <div className="max-h-80 overflow-y-auto custom-scrollbar">
                      {searchResults.map((result, index) => (
                        <div 
                          key={index} 
                          className={`p-3 md:p-4 border-b border-gray-600/20 hover:bg-gray-500/10 cursor-pointer transition-all duration-300 group ${
                            selectedSearchIndex === index ? 'bg-gray-500/15' : ''
                          }`}
                          onClick={() => handleResultClick(result)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-white/90 group-hover:text-white transition-colors duration-300 line-clamp-2">
                                {result.text}
                              </p>
                              <span className="inline-flex items-center mt-2 px-3 py-1 rounded-full text-xs font-medium text-white border border-gray-500/30" style={{backgroundColor: 'rgba(55, 65, 81, 0.2)'}}>
                                {result.category}
                              </span>
                            </div>
                            <span className="text-gray-400 flex-shrink-0 ml-3 mt-1 group-hover:text-white transition-colors duration-300">→</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {searchQuery.length > 2 && searchResults.length === 0 && (
                  <div className="p-6 md:p-8 text-center">
                    <span className="text-4xl mx-auto block mb-3">🔍</span>
                    <p className="text-sm text-white/80 mb-1">No results found for "{searchQuery}"</p>
                    <p className="text-xs text-gray-300">Try different keywords or check your spelling</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <button 
              onClick={toggleDarkMode}
              className="p-2 md:p-2.5 group relative rounded-lg transition-all duration-300 hover:bg-gray-700/30 text-white"
              aria-label="Toggle theme"
            >
              <span className="text-sm font-medium">
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </span>
            </button>

            {/* Applications */}
            <button 
              className="p-2 md:p-2.5 group relative rounded-lg transition-all duration-300 hover:bg-gray-700/30 text-white"
              onClick={() => navigate('/apps')}
              aria-label="Applications"
            >
              <span className="text-sm font-medium">Applications</span>
            </button>

            {/* Enhanced Notifications */}
            <div className="relative" ref={notificationsRef}>
              <button 
                className="p-2 md:p-2.5 group relative rounded-lg transition-all duration-300 hover:bg-gray-700/30 text-white"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                aria-label="Notifications"
              >
                <span className="text-sm font-medium">Notifications</span>
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center h-4 w-4 md:h-5 md:w-5 text-xs font-bold text-white rounded-full animate-pulse shadow-lg" style={{backgroundColor: '#DC2626'}}>
                    {unreadCount}
                  </span>
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-3 w-80 md:w-96 border border-gray-600/30 backdrop-blur-xl rounded-xl overflow-hidden z-10 animate-slide-down shadow-lg" style={{backgroundColor: 'rgba(30, 58, 138, 0.9)'}}>
                  <div className="p-3 md:p-4 border-b border-gray-600/20" style={{backgroundColor: 'rgba(55, 65, 81, 0.1)'}}>
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-sm font-semibold text-white">Notifications</h3>
                      <div className="flex space-x-2">
                        {unreadCount > 0 && (
                          <button 
                            onClick={markAllAsRead}
                            className="text-xs text-gray-300 hover:text-white font-medium transition-colors duration-300"
                          >
                            Mark all read
                          </button>
                        )}
                        <button 
                          onClick={() => navigate('/notifications')}
                          className="text-xs text-gray-300 hover:text-white font-medium transition-colors duration-300"
                        >
                          View all
                        </button>
                      </div>
                    </div>
                    {/* Notification Filters */}
                    <div className="flex space-x-2">
                      {['all', 'unread', 'reminder', 'document', 'payment'].map(filter => (
                        <button
                          key={filter}
                          onClick={() => setNotificationFilter(filter)}
                          className={`text-xs px-3 py-1 rounded-full transition-colors duration-300 ${
                            notificationFilter === filter 
                              ? 'text-white border' 
                              : 'text-gray-300 hover:text-white border border-gray-600/20 hover:border-gray-500/30'
                          }`}
                          style={{backgroundColor: notificationFilter === filter ? 'rgba(55, 65, 81, 0.3)' : 'rgba(55, 65, 81, 0.1)', borderColor: notificationFilter === filter ? '#374151' : 'rgba(55, 65, 81, 0.3)'}}
                        >
                          {filter.charAt(0).toUpperCase() + filter.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto custom-scrollbar">
                    {filteredNotifications.length > 0 ? (
                      filteredNotifications.map(notification => (
                        <div key={notification.id} className={`p-3 md:p-4 border-b border-gray-600/20 hover:bg-gray-500/10 transition-all duration-300 group ${!notification.read ? 'bg-gray-500/5 border-l-2' : ''}`} style={{borderLeftColor: !notification.read ? '#374151' : 'transparent'}}>
                          <div className="flex items-start justify-between">
                            <div className="flex items-start flex-1">
                              {!notification.read && (
                                <span className="h-2 w-2 mt-2 rounded-full mr-3 flex-shrink-0 animate-pulse" style={{backgroundColor: '#374151'}}></span>
                              )}
                              <div className={notification.read ? "ml-5" : ""}>
                                <p className="text-sm text-white/90">{notification.text}</p>
                                <div className="flex items-center justify-between mt-2">
                                  <p className="text-xs text-gray-300">{notification.time}</p>
                                  <span className={`text-xs px-2 py-1 rounded-full ${
                                    notification.priority === 'high' ? 'bg-red-500/20 text-red-300' :
                                    notification.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                                    'bg-green-500/20 text-green-300'
                                  }`}>
                                    {notification.priority}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              {!notification.read && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    markNotificationAsRead(notification.id);
                                  }}
                                  className="p-1 text-gray-400 hover:text-green-400 transition-colors duration-300"
                                  title="Mark as read"
                                >
                                  <span>✓</span>
                                </button>
                              )}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteNotification(notification.id);
                                }}
                                className="p-1 text-gray-400 hover:text-red-400 transition-colors duration-300"
                                title="Delete"
                              >
                                <span>🗑</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="p-6 text-sm text-gray-300 text-center">No notifications found</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced User profile */}
            <div className="relative" ref={profileRef}>
              <button 
                className="flex items-center space-x-2 md:space-x-3 focus:outline-none group px-3 md:px-4 py-2 md:py-2.5 rounded-xl transition-all duration-300 hover:bg-gray-700/30 text-white"
                onClick={() => setProfileOpen(!profileOpen)}
                aria-label="User profile"
              >
                <div className="h-8 w-8 md:h-9 md:w-9 rounded-xl flex items-center justify-center text-white font-bold shadow-lg group-hover:shadow-xl transition-all duration-300" style={{backgroundColor: '#374151'}}>
                  {user ? user.name?.charAt(0) || user.email?.charAt(0) || 'U' : 'U'}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold text-white group-hover:text-gray-200 transition-colors duration-300 truncate max-w-[120px]">
                    {user ? user.name || user.email.split('@')[0] : 'User'}
                  </p>
                  <p className="text-xs text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                    {user ? user.role || 'Legal Professional' : 'Legal Professional'}
                  </p>
                </div>
                <span className={`text-sm transition-all duration-300 ${profileOpen ? 'rotate-180' : ''}`}>▼</span>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-64 border border-gray-600/30 backdrop-blur-xl rounded-xl py-2 z-10 animate-slide-down shadow-lg" style={{backgroundColor: 'rgba(30, 58, 138, 0.9)'}}>
                  <div className="px-4 py-3 border-b border-gray-600/20">
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 rounded-xl flex items-center justify-center text-white font-bold" style={{backgroundColor: '#374151'}}>
                        {user ? user.name?.charAt(0) || user.email?.charAt(0) || 'U' : 'U'}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white truncate">{user ? user.name || user.email.split('@')[0] : 'User'}</p>
                        <p className="text-xs text-gray-300 truncate">{user ? user.email : 'user@example.com'}</p>
                        <div className="flex items-center mt-1">
                          <span className="text-xs text-green-400">🛡 Verified</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleNavigation('/advocate/profile')}
                    className="flex items-center space-x-3 w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-gray-500/10 hover:text-white transition-all duration-300 group"
                  >
                    <span>👤</span>
                    <span>Profile Settings</span>
                  </button>

                  <button 
                    onClick={() => handleNavigation('/advocate/settings')}
                    className="flex items-center space-x-3 w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-gray-500/10 hover:text-white transition-all duration-300 group"
                  >
                    <span>⚙️</span>
                    <span>Account Settings</span>
                  </button>

                  <button 
                    onClick={() => handleNavigation('/advocate/billing')}
                    className="flex items-center space-x-3 w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-gray-500/10 hover:text-white transition-all duration-300 group"
                  >
                    <span>💳</span>
                    <span>Billing & Plans</span>
                  </button>

                  <button 
                    onClick={() => handleNavigation('/help')}
                    className="flex items-center space-x-3 w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-gray-500/10 hover:text-white transition-all duration-300 group"
                  >
                    <span>❓</span>
                    <span>Help & Support</span>
                  </button>

                  <div className="border-t border-gray-600/20 my-1"></div>
                  
                  <button 
                    onClick={handleSignOut}
                    className="flex items-center space-x-3 w-full text-left px-4 py-3 text-sm text-red-300 hover:bg-red-500/10 hover:text-red-200 transition-all duration-300 group"
                  >
                    <span>🚪</span>
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