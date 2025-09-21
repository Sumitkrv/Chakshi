import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingOverlay from '../components/LoadingOverlay';
import { Search, Menu, Bell, Grid3X3, Settings, User, LogOut, ChevronDown, X, Zap } from 'lucide-react';

const Navbar = ({ sidebarCollapsed, setSidebarCollapsed }) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef(null);
  const notificationsRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const notifications = [
    { id: 1, text: 'Hearing reminder for Case #C-2023-4582', time: '10 mins ago', read: false },
    { id: 2, text: 'New document uploaded by client', time: '45 mins ago', read: false },
    { id: 3, text: 'Court date changed for Smith v. Jones', time: '2 hours ago', read: true },
    { id: 4, text: 'Client Johnson signed the agreement', time: '5 hours ago', read: true }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

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
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Function to search all visible content
  const searchAllContent = (query) => {
    if (!query.trim()) return [];
    
    const results = [];
    const searchTerm = query.toLowerCase();
    
    // Get all text content from the main content area
    const mainContent = document.querySelector('main');
    if (!mainContent) return results;
    
    // Search through all elements with text content
    const textNodes = mainContent.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, td, th, span, div');
    
    textNodes.forEach(node => {
      if (node.textContent) {
        const text = node.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
          // Get some context around the match
          const startIndex = Math.max(0, text.indexOf(searchTerm) - 20);
          const endIndex = Math.min(text.length, text.indexOf(searchTerm) + searchTerm.length + 50);
          let context = text.substring(startIndex, endIndex);
          
          // Add ellipsis if not at beginning/end
          if (startIndex > 0) context = '...' + context;
          if (endIndex < text.length) context = context + '...';
          
          // Find the closest section or card for categorization
          let category = 'Page Content';
          let parent = node.parentElement;
          
          while (parent && parent !== mainContent) {
            if (parent.tagName === 'SECTION' || parent.classList.contains('card') || 
                parent.classList.contains('panel') || parent.getAttribute('aria-label')) {
              if (parent.getAttribute('aria-label')) {
                category = parent.getAttribute('aria-label');
              } else if (parent.classList.contains('card')) {
                category = 'Card';
              } else if (parent.tagName === 'SECTION') {
                category = 'Section';
              } else if (parent.id) {
                category = parent.id;
              }
              break;
            }
            parent = parent.parentElement;
          }
          
          // Avoid duplicate results
          const isDuplicate = results.some(result => 
            result.element === node || result.text.includes(context)
          );
          
          if (!isDuplicate) {
            results.push({
              text: context,
              category: category,
              element: node
            });
          }
        }
      }
    });
    
    return results.slice(0, 8); // Limit to 8 results
  };

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
    if (searchResults.length > 0) {
      handleResultClick(searchResults[0]);
    }
  };

  const handleResultClick = (result) => {
    // Scroll to the element
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
    
    setSearchOpen(false);
  };

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
    // Simulate logout delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    // Call the logout function from context
    logout();
    // Navigate to home page
    navigate('/');
  };

  return (
    <>
      {isLoggingOut && <LoadingOverlay message="Logging out..." />}
      <nav className="glass-morphism-card border-b border-white/20 backdrop-blur-xl bg-gradient-to-r from-purple-900/80 via-blue-900/80 to-indigo-900/80 px-6 py-4 saas-shadow-glow sticky top-0 z-50">
        <div className="flex justify-between items-center">
          {/* Left side - Menu toggle and Logo */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="saas-button-secondary p-2.5 group"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-5 h-5 text-white/80 group-hover:text-white transition-colors duration-300" />
            </button>
            
            {/* Enhanced Logo/Brand */}
            <div className="hidden md:flex items-center cursor-pointer group" onClick={() => navigate('/advocate/dashboard')}>
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg group-hover:shadow-yellow-500/30 transition-all duration-300">
                  <Zap className="w-6 h-6 text-white animate-pulse-glow" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    LegalSuite
                  </span>
                  <span className="text-xs text-white/60 font-medium">
                    Advocate Dashboard
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Search Bar */}
          <div className="flex-1 max-w-2xl mx-6 relative animate-float" ref={searchRef}>
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-white/60" />
                </div>
                <input
                  type="text"
                  placeholder="Search cases, documents, clients..."
                  className="saas-input w-full pl-12 pr-12 py-3.5 bg-white/10 border border-white/20 text-white placeholder-white/60 backdrop-blur-md focus:bg-white/15 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/30"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => searchQuery.length > 2 && setSearchOpen(true)}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/60 hover:text-white transition-colors duration-300"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            </form>

            {/* Enhanced Search Results Dropdown */}
            {searchOpen && searchResults.length > 0 && (
              <div className="absolute z-50 mt-2 w-full glass-morphism-card border border-white/20 backdrop-blur-xl overflow-hidden animate-stagger-fade-in">
                <div className="p-4 border-b border-white/10 bg-gradient-to-r from-blue-600/20 to-purple-600/20 flex justify-between items-center">
                  <h3 className="text-sm font-semibold text-white">
                    {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
                  </h3>
                  <button 
                    onClick={clearSearch}
                    className="text-xs text-white/60 hover:text-white transition-colors duration-300"
                  >
                    Clear
                  </button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {searchResults.map((result, index) => (
                    <div 
                      key={index} 
                      className="p-4 border-b border-white/10 hover:bg-white/10 cursor-pointer transition-all duration-300 group"
                      onClick={() => handleResultClick(result)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white/90 truncate group-hover:text-white transition-colors duration-300">
                            {result.text}
                          </p>
                          <span className="inline-flex items-center mt-2 px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-200 border border-blue-400/30">
                            {result.category}
                          </span>
                        </div>
                        <ChevronDown className="h-4 w-4 text-white/60 flex-shrink-0 ml-3 rotate-[-90deg] group-hover:text-white transition-colors duration-300" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {searchOpen && searchQuery.length > 2 && searchResults.length === 0 && (
              <div className="absolute z-50 mt-2 w-full glass-morphism-card border border-white/20 backdrop-blur-xl overflow-hidden animate-stagger-fade-in">
                <div className="p-6 text-center">
                  <Search className="w-12 h-12 mx-auto text-white/30 mb-3" />
                  <p className="text-sm text-white/80 mb-1">No results found for "{searchQuery}"</p>
                  <p className="text-xs text-white/50">Try different keywords or check your spelling</p>
                </div>
              </div>
            )}
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-3">
            {/* Apps button */}
            <button 
              className="saas-button-secondary p-2.5 group relative"
              onClick={() => navigate('/apps')}
            >
              <Grid3X3 className="h-5 w-5 text-white/80 group-hover:text-white transition-colors duration-300" />
              <div className="saas-tooltip">
                Apps
              </div>
            </button>

            {/* Enhanced Notifications */}
            <div className="relative" ref={notificationsRef}>
              <button 
                className="saas-button-secondary p-2.5 group relative"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
              >
                <Bell className="h-5 w-5 text-white/80 group-hover:text-white transition-colors duration-300" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center h-5 w-5 text-xs font-bold text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse-glow shadow-lg">
                    {unreadCount}
                  </span>
                )}
                <div className="saas-tooltip">
                  Notifications
                </div>
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-3 w-80 glass-morphism-card border border-white/20 backdrop-blur-xl overflow-hidden z-10 animate-slide-down">
                  <div className="p-4 border-b border-white/10 bg-gradient-to-r from-blue-600/20 to-purple-600/20 flex justify-between items-center">
                    <h3 className="text-sm font-semibold text-white">Notifications</h3>
                    <button className="text-xs text-blue-300 hover:text-blue-200 font-medium transition-colors duration-300">
                      Mark all as read
                    </button>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map(notification => (
                        <div key={notification.id} className={`p-4 border-b border-white/10 hover:bg-white/10 transition-all duration-300 ${!notification.read ? 'bg-blue-500/10' : ''}`}>
                          <div className="flex">
                            {!notification.read && (
                              <span className="h-2 w-2 mt-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 mr-3 flex-shrink-0 animate-pulse-glow"></span>
                            )}
                            <div className={notification.read ? "ml-5" : ""}>
                              <p className="text-sm text-white/90">{notification.text}</p>
                              <p className="text-xs text-white/50 mt-1">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="p-6 text-sm text-white/60 text-center">No notifications</p>
                    )}
                  </div>
                  <div className="p-3 border-t border-white/10 bg-gradient-to-r from-purple-600/10 to-blue-600/10 text-center">
                    <button 
                      className="text-xs text-blue-300 hover:text-blue-200 font-medium transition-colors duration-300"
                      onClick={() => navigate('/notifications')}
                    >
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced User profile */}
            <div className="relative" ref={profileRef}>
              <button 
                className="flex items-center space-x-3 focus:outline-none group saas-button-secondary px-4 py-2.5"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg group-hover:shadow-purple-500/30 transition-all duration-300">
                  {user ? user.name?.charAt(0) || user.email?.charAt(0) || 'U' : 'U'}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold text-white/90 group-hover:text-white transition-colors duration-300">
                    {user ? user.name || user.email.split('@')[0] : 'User'}
                  </p>
                  <p className="text-xs text-white/60 group-hover:text-white/70 transition-colors duration-300">
                    {user ? user.role || 'Advocate' : 'Advocate'}
                  </p>
                </div>
                <ChevronDown className={`h-4 w-4 text-white/60 group-hover:text-white transition-all duration-300 ${profileOpen ? 'rotate-180' : ''}`} />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-52 glass-morphism-card border border-white/20 backdrop-blur-xl py-2 z-10 animate-slide-down">
                  <div className="px-4 py-3 border-b border-white/10">
                    <p className="text-sm font-semibold text-white/90">{user ? user.name || user.email.split('@')[0] : 'User'}</p>
                    <p className="text-xs text-white/60 truncate">{user ? user.email : 'user@example.com'}</p>
                  </div>
                  <button 
                    onClick={() => handleNavigation('/advocate/settings')}
                    className="block w-full text-left px-4 py-3 text-sm text-white/80 hover:bg-white/10 hover:text-white transition-all duration-300 flex items-center space-x-3 group"
                  >
                    <User className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                    <span>Profile</span>
                  </button>
                  <button 
                    onClick={() => handleNavigation('/advocate/settings')}
                    className="block w-full text-left px-4 py-3 text-sm text-white/80 hover:bg-white/10 hover:text-white transition-all duration-300 flex items-center space-x-3 group"
                  >
                    <Settings className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                    <span>Settings</span>
                  </button>
                  <div className="border-t border-white/10 my-1"></div>
                  <button 
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-3 text-sm text-red-300 hover:bg-red-500/10 hover:text-red-200 transition-all duration-300 flex items-center space-x-3 group"
                  >
                    <LogOut className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                    <span>Sign out</span>
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