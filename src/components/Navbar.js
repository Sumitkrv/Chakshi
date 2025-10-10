import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, X, ChevronDown, LogIn, UserPlus } from 'lucide-react';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('home');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const navbarRef = useRef(null);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Professional color palette
  const colors = {
    primary: {
      50: '#f8f7f4',
      100: '#f5f5ef',
      200: '#ebe9e0',
      300: '#d9d5c8',
      400: '#c7c0a8',
      500: '#b69d74',
      600: '#a08960',
      700: '#8a7550',
      800: '#6d5d3f',
      900: '#504530',
    },
    neutral: {
      50: '#f5f5ef',
      100: '#f0f0ea',
      200: '#e5e5df',
      300: '#d0d0ca',
      400: '#a8a8a2',
      500: '#6d6d67',
      600: '#4a4a44',
      700: '#333330',
      800: '#1f2839',
      900: '#1a1f2e',
    },
    accent: {
      500: '#b69d74',
      600: '#a08960',
      700: '#8a7550',
    }
  };

  // Scroll effect handler
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 10);
      
      // Update active section based on scroll position
      const sections = ['hero', 'features', 'pricing', 'testimonials', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom >= 120;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update active section based on route
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') {
      // For home page, let scroll detection handle active section
      if (window.scrollY < 100) {
        setActiveSection('hero');
      }
    } else if (path.includes('/login') || path.includes('/register') || path.includes('/dashboard')) {
      // Clear active section for auth/dashboard pages
      setActiveSection('');
    }
  }, [location]);

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyPress = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
      if (event.key === 'Escape') {
        searchInputRef.current?.blur();
        setIsSearchFocused(false);
        setShowSuggestions(false);
        setSearchQuery('');
      }
      if (event.key === 'Enter' && isSearchFocused) {
        event.preventDefault();
        handleSearch(event);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isSearchFocused, searchQuery]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target) && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Body overflow handler
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  const handleLinkClick = (section = '') => {
    setIsOpen(false);
    if (section) {
      setActiveSection(section);
      if (location.pathname !== '/') {
        // If not on home page, navigate to home first then scroll
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(section);
          if (element) {
            const offset = 100; // Account for fixed navbar
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
          }
        }, 300);
      } else {
        // If already on home page, just scroll
        const element = document.getElementById(section);
        if (element) {
          const offset = 100; // Account for fixed navbar
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }
    }
  };

  const handleNavigation = (path, section = '') => {
    if (section) {
      setActiveSection(section);
    }
    navigate(path);
    setIsOpen(false);
  };

  // Search suggestions data
  const searchSuggestionsData = [
    { title: 'Contract Analysis', type: 'feature', path: '/', section: 'features' },
    { title: 'AI Legal Research', type: 'feature', path: '/', section: 'features' },
    { title: 'Document Automation', type: 'feature', path: '/', section: 'features' },
    { title: 'Risk Assessment', type: 'feature', path: '/', section: 'features' },
    { title: 'Pricing Plans', type: 'section', path: '/', section: 'pricing' },
    { title: 'Free Trial', type: 'action', path: '', section: '', action: 'register' },
    { title: 'Customer Reviews', type: 'section', path: '/', section: 'testimonials' },
    { title: 'Contact Support', type: 'section', path: '/', section: 'contact' },
    { title: 'Legal Templates', type: 'resource', path: '/', section: 'features' },
    { title: 'Case Studies', type: 'resource', path: '/', section: 'testimonials' },
    { title: 'API Documentation', type: 'resource', path: '/', section: 'contact' },
    { title: 'Security & Privacy', type: 'info', path: '/', section: 'features' }
  ];

  // Enhanced search with suggestions
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const filtered = searchSuggestionsData.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6);
      setSearchSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleSearch = async (e, suggestion = null) => {
    e.preventDefault();
    setIsSearching(true);
    
    try {
      if (suggestion) {
        // Handle suggestion click
        setSearchQuery(suggestion.title);
        setShowSuggestions(false);
        
        if (suggestion.action === 'register') {
          // Open register modal
          setShowRegisterModal(true);
        } else if (suggestion.section) {
          // Navigate to section
          if (location.pathname !== suggestion.path) {
            navigate(suggestion.path);
            setTimeout(() => {
              handleLinkClick(suggestion.section);
            }, 300);
          } else {
            handleLinkClick(suggestion.section);
          }
        } else {
          // Navigate to page
          navigate(suggestion.path);
        }
      } else if (searchQuery.trim()) {
        // Handle direct search
        setShowSuggestions(false);
        
        // Check if query matches any section
        const matchedSuggestion = searchSuggestionsData.find(item => 
          item.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        
        if (matchedSuggestion && matchedSuggestion.section) {
          // Navigate to matched section
          if (location.pathname !== matchedSuggestion.path) {
            navigate(matchedSuggestion.path);
            setTimeout(() => {
              handleLinkClick(matchedSuggestion.section);
            }, 300);
          } else {
            handleLinkClick(matchedSuggestion.section);
          }
        } else {
          // Create search results page route
          navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
      setIsOpen(false);
      setTimeout(() => {
        setSearchQuery('');
        searchInputRef.current?.blur();
      }, 100);
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    if (searchQuery.trim().length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleSearchBlur = () => {
    // Delay to allow suggestion clicks
    setTimeout(() => {
      setIsSearchFocused(false);
      setShowSuggestions(false);
    }, 200);
  };

  const navigationItems = [
    { id: 'hero', label: 'Home', type: 'section', path: '/' },
    { id: 'features', label: 'Features', type: 'section', path: '/' },
    { id: 'pricing', label: 'Pricing', type: 'section', path: '/' },
    { id: 'testimonials', label: 'Reviews', type: 'section', path: '/' },
    { id: 'contact', label: 'Contact', type: 'section', path: '/' }
  ];

  return (
    <nav 
      ref={navbarRef}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'backdrop-blur-xl border-b shadow-lg py-0' 
          : 'backdrop-blur-lg border-b py-0'
      }`}
      style={{
        backgroundColor: isScrolled ? `${colors.neutral[50]}F2` : `${colors.neutral[50]}E6`,
        borderColor: colors.neutral[300],
        boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.08)' : 'none'
      }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 md:h-20 lg:h-22">
          
          {/* Logo & Brand */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group -ml-4"
            onClick={() => handleLinkClick('hero')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleLinkClick('hero')}
            aria-label="Chakshi - Home"
          >
            <div className="relative">
              <img 
                src="/logo.png"
                alt="Chakshi Logo"
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 object-contain"
              />
            </div>
            <div className="flex flex-col">
              {/* <span 
                className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent"
              >
                Chakshi
              </span> */}
            </div>
          </div>

          {/* Enhanced Search Bar - Desktop */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8 relative">
            <form onSubmit={handleSearch} className="relative w-full">
              <div 
                className={`relative flex items-center rounded-2xl border-2 transition-all duration-300 ${
                  isSearchFocused ? 'border-opacity-80 shadow-lg' : 'border-opacity-40'
                }`}
                style={{
                  backgroundColor: `${colors.neutral[50]}F5`,
                  borderColor: isSearchFocused ? colors.primary[500] : colors.neutral[300]
                }}
              >
                <Search 
                  className="absolute left-4 w-5 h-5 transition-colors duration-200"
                  style={{ color: isSearchFocused ? colors.primary[600] : colors.neutral[500] }}
                />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                  placeholder="Search legal resources..."
                  className="w-full pl-12 pr-20 py-3 bg-transparent border-none outline-none font-medium placeholder-opacity-70"
                  style={{
                    color: colors.neutral[800],
                    fontSize: '14px'
                  }}
                  aria-label="Search legal resources"
                  autoComplete="off"
                />
                <div 
                  className="absolute right-3 px-2 py-1 rounded-lg text-xs font-bold border"
                  style={{
                    backgroundColor: colors.neutral[100],
                    borderColor: colors.neutral[300],
                    color: colors.neutral[600]
                  }}
                >
                  ⌘K
                </div>
                
                {/* Search Loading Indicator */}
                {isSearching && (
                  <div className="absolute right-12 flex items-center">
                    <div 
                      className="w-4 h-4 border-2 border-transparent rounded-full animate-spin"
                      style={{
                        borderTopColor: colors.primary[500],
                        borderRightColor: colors.primary[500]
                      }}
                    ></div>
                  </div>
                )}
              </div>
              
              {/* Search Suggestions Dropdown */}
              {showSuggestions && searchSuggestions.length > 0 && (
                <div 
                  className="absolute top-full left-0 right-0 mt-2 rounded-2xl border shadow-xl backdrop-blur-lg z-50 max-h-80 overflow-y-auto"
                  style={{
                    backgroundColor: `${colors.neutral[50]}F8`,
                    borderColor: colors.neutral[300]
                  }}
                >
                  <div className="p-3">
                    <div className="text-xs font-semibold text-gray-500 mb-2 px-2">Suggestions</div>
                    {searchSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={(e) => handleSearch(e, suggestion)}
                        className="w-full flex items-center justify-between px-3 py-3 rounded-xl transition-all duration-200 hover:bg-white/60 text-left group"
                        style={{ color: colors.neutral[700] }}
                      >
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-2 h-2 rounded-full"
                            style={{
                              backgroundColor: suggestion.type === 'feature' ? colors.primary[500] :
                                              suggestion.type === 'section' ? colors.accent[500] :
                                              suggestion.type === 'action' ? '#10b981' : colors.neutral[400]
                            }}
                          ></div>
                          <span className="font-medium">{suggestion.title}</span>
                        </div>
                        <div 
                          className="text-xs font-semibold px-2 py-1 rounded-lg opacity-70 group-hover:opacity-100 transition-opacity"
                          style={{
                            backgroundColor: colors.neutral[200],
                            color: colors.neutral[600]
                          }}
                        >
                          {suggestion.type.charAt(0).toUpperCase() + suggestion.type.slice(1)}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-8">
            
            {/* Navigation Links */}
            <div 
              className="flex items-center space-x-1 rounded-2xl p-2 border"
              style={{
                backgroundColor: `${colors.neutral[50]}99`,
                borderColor: colors.neutral[300]
              }}
            >
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => item.type === 'section' ? handleLinkClick(item.id) : handleNavigation(item.path, item.id)}
                  className={`relative flex items-center px-3 lg:px-4 xl:px-5 py-2 lg:py-3 font-semibold transition-all duration-300 rounded-xl ${
                    activeSection === item.id
                      ? 'text-white shadow-lg'
                      : 'hover:bg-opacity-80'
                  }`}
                  style={{
                    color: activeSection === item.id ? 'white' : colors.neutral[700],
                    backgroundColor: activeSection === item.id ? 'transparent' : 'transparent',
                    ...(activeSection === item.id && {
                      background: `linear-gradient(135deg, ${colors.primary[600]}, ${colors.accent[600]})`,
                      boxShadow: `0 4px 15px ${colors.primary[500]}40`
                    }),
                    ...(activeSection !== item.id && {
                      ':hover': {
                        backgroundColor: `${colors.neutral[100]}CC`,
                        color: colors.neutral[800]
                      }
                    })
                  }}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                >
                  <span className="text-sm tracking-wide">{item.label}</span>
                  {activeSection === item.id && (
                    <div 
                      className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full"
                      style={{ backgroundColor: colors.primary[50] }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2 lg:space-x-3">
              <button 
                className="flex items-center space-x-2 px-4 lg:px-6 py-2 lg:py-3 font-semibold transition-all duration-300 rounded-xl border hover:-translate-y-0.5 hover:shadow-md"
                onClick={() => setShowLoginModal(true)}
                style={{
                  backgroundColor: 'transparent',
                  borderColor: colors.neutral[400],
                  color: colors.neutral[800]
                }}
                type="button"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
              </button>
              <button 
                className="flex items-center space-x-2 px-4 lg:px-6 py-2 lg:py-3 font-semibold text-white transition-all duration-300 rounded-xl border hover:-translate-y-0.5 hover:shadow-lg"
                onClick={() => setShowRegisterModal(true)}
                style={{
                  background: `linear-gradient(135deg, ${colors.primary[600]}, ${colors.accent[600]})`,
                  borderColor: colors.primary[600],
                  boxShadow: `0 4px 15px ${colors.primary[500]}40`
                }}
                type="button"
              >
                <UserPlus className="w-4 h-4" />
                <span>Register</span>
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-3">
            <button
              className={`p-3 rounded-xl transition-all duration-300 hover:scale-105`}
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
              style={{
                backgroundColor: isOpen ? colors.neutral[200] : colors.neutral[100],
                border: `1px solid ${colors.neutral[400]}`,
                color: colors.neutral[800]
              }}
              type="button"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`lg:hidden transition-all duration-500 overflow-hidden ${
            isOpen ? 'max-h-screen opacity-100 pb-6' : 'max-h-0 opacity-0'
          }`}
          aria-hidden={!isOpen}
        >
          <div 
            className="border rounded-2xl mt-4 p-6 shadow-xl backdrop-blur-lg"
            style={{
              backgroundColor: `${colors.neutral[50]}F2`,
              borderColor: colors.neutral[300],
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
            }}
          >
            
            {/* Mobile Search */}
            <div className="mb-6 relative">
              <form onSubmit={handleSearch} className="relative">
                <div 
                  className="relative flex items-center rounded-2xl border-2"
                  style={{
                    backgroundColor: `${colors.neutral[50]}F5`,
                    borderColor: colors.neutral[300]
                  }}
                >
                  <Search 
                    className="absolute left-4 w-5 h-5"
                    style={{ color: colors.neutral[500] }}
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    onFocus={handleSearchFocus}
                    onBlur={handleSearchBlur}
                    placeholder="Search legal resources..."
                    className="w-full pl-12 pr-12 py-3 bg-transparent border-none outline-none font-medium placeholder-opacity-70"
                    style={{
                      color: colors.neutral[800],
                      fontSize: '14px'
                    }}
                    aria-label="Search legal resources"
                    autoComplete="off"
                  />
                  {isSearching && (
                    <div className="absolute right-4 flex items-center">
                      <div 
                        className="w-4 h-4 border-2 border-transparent rounded-full animate-spin"
                        style={{
                          borderTopColor: colors.primary[500],
                          borderRightColor: colors.primary[500]
                        }}
                      ></div>
                    </div>
                  )}
                </div>
                
                {/* Mobile Search Suggestions */}
                {showSuggestions && searchSuggestions.length > 0 && (
                  <div 
                    className="absolute top-full left-0 right-0 mt-2 rounded-2xl border shadow-xl backdrop-blur-lg z-50 max-h-60 overflow-y-auto"
                    style={{
                      backgroundColor: `${colors.neutral[50]}F8`,
                      borderColor: colors.neutral[300]
                    }}
                  >
                    <div className="p-2">
                      {searchSuggestions.slice(0, 4).map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={(e) => handleSearch(e, suggestion)}
                          className="w-full flex items-center space-x-3 px-3 py-2 rounded-xl transition-all duration-200 hover:bg-white/60 text-left"
                          style={{ color: colors.neutral[700] }}
                        >
                          <div 
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{
                              backgroundColor: suggestion.type === 'feature' ? colors.primary[500] :
                                              suggestion.type === 'section' ? colors.accent[500] :
                                              suggestion.type === 'action' ? '#10b981' : colors.neutral[400]
                            }}
                          ></div>
                          <span className="font-medium text-sm">{suggestion.title}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Mobile Navigation Links */}
            <nav aria-label="Mobile navigation">
              <div className="space-y-3 mb-6">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => item.type === 'section' ? handleLinkClick(item.id) : handleNavigation(item.path, item.id)}
                    className={`flex items-center justify-between w-full py-4 px-4 rounded-xl transition-all duration-300 border ${
                      activeSection === item.id
                        ? 'text-white shadow-lg'
                        : 'border-transparent'
                    }`}
                    style={{
                      color: activeSection === item.id ? 'white' : colors.neutral[700],
                      backgroundColor: activeSection === item.id ? 'transparent' : 'transparent',
                      borderColor: activeSection === item.id ? 'transparent' : 'transparent',
                      ...(activeSection === item.id && {
                        background: `linear-gradient(135deg, ${colors.primary[600]}, ${colors.accent[600]})`,
                        boxShadow: `0 4px 15px ${colors.primary[500]}40`
                      })
                    }}
                    aria-current={activeSection === item.id ? 'page' : undefined}
                  >
                    <span className="font-semibold">{item.label}</span>
                    <ChevronDown 
                      className={`w-5 h-5 transition-transform duration-300 ${
                        activeSection === item.id ? 'text-white rotate-180' : ''
                      }`}
                      style={{
                        color: activeSection === item.id ? 'white' : colors.neutral[500]
                      }}
                    />
                  </button>
                ))}
              </div>
            </nav>

            {/* Mobile Auth Buttons */}
            <div className="flex flex-col space-y-4 pt-6 border-t" style={{ borderColor: colors.neutral[300] }}>
              <button 
                className="flex items-center justify-center space-x-2 w-full py-4 px-6 font-semibold transition-all duration-300 rounded-xl border hover:-translate-y-0.5 hover:shadow-md"
                onClick={() => setShowLoginModal(true)}
                style={{
                  backgroundColor: 'transparent',
                  borderColor: colors.neutral[400],
                  color: colors.neutral[800]
                }}
                type="button"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
              </button>
              <button 
                className="flex items-center justify-center space-x-2 w-full py-4 px-6 font-semibold text-white transition-all duration-300 rounded-xl border hover:-translate-y-0.5 hover:shadow-lg"
                onClick={() => setShowRegisterModal(true)}
                style={{
                  background: `linear-gradient(135deg, ${colors.primary[600]}, ${colors.accent[600]})`,
                  borderColor: colors.primary[600],
                  boxShadow: `0 4px 15px ${colors.primary[500]}40`
                }}
                type="button"
              >
                <UserPlus className="w-4 h-4" />
                <span>Register</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
      
      {/* Register Modal */}
      <RegisterModal 
        isOpen={showRegisterModal} 
        onClose={() => setShowRegisterModal(false)} 
      />
    </nav>
  );
};

// Helper function to expose navigation for other components
export const navigateToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const offset = 100;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  }
};

// CSS styles for search animations
const searchStyles = `
  .search-suggestion-enter {
    opacity: 0;
    transform: translateY(-10px);
  }
  
  .search-suggestion-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 200ms, transform 200ms;
  }
  
  .search-suggestion-exit {
    opacity: 1;
    transform: translateY(0);
  }
  
  .search-suggestion-exit-active {
    opacity: 0;
    transform: translateY(-10px);
    transition: opacity 200ms, transform 200ms;
  }
  
  .search-loading-spin {
    animation: search-spin 1s linear infinite;
  }
  
  @keyframes search-spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = searchStyles;
  document.head.appendChild(styleSheet);
}

export default Navbar;