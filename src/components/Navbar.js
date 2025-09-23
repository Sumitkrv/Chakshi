import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const navbarRef = useRef(null);
  const navigate = useNavigate();

  // Scroll effect handler
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const handleLogin = () => {
    handleLinkClick();
    navigate('/login');
  };

  const handleRegister = () => {
    handleLinkClick();
    navigate('/register');
  };

  const handleHomeClick = () => {
    navigate('/');
    handleLinkClick();
  };

  const navigationItems = [
    { href: '#home', label: 'Home' },
    { href: '#features', label: 'Features' },
    { href: '#solutions', label: 'Solutions' },
    { href: '#resources', label: 'Resources' },
    { href: '#pricing', label: 'Pricing' }
  ];

  return (
    <nav 
      ref={navbarRef}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'backdrop-blur-md bg-[#1E3A8A]/95 border-b border-white/10 shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={handleHomeClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleHomeClick()}
          >
            <div className="p-2 rounded-lg bg-[#374151] shadow-md group-hover:bg-[#374151]/80 transition-all duration-300">
              <span className="text-lg font-bold text-white">⚖</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white">
                Chakshi
              </span>
              <span className="text-xs text-gray-300 font-medium -mt-1 tracking-wide">
                Legal Intelligence Platform
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            
            {/* Navigation Links */}
            <div className="flex items-center space-x-1">
              {navigationItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={handleLinkClick}
                  className="relative px-4 py-2 text-gray-300 hover:text-white font-medium transition-all duration-300 rounded-lg hover:bg-white/10 group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-4 w-0 h-0.5 bg-white group-hover:w-[calc(100%-2rem)] transition-all duration-300" />
                </a>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search legal resources..."
                className="bg-white/10 border border-white/20 hover:border-white/40 focus:border-white/60 text-white placeholder-gray-400 px-4 py-3 w-72 rounded-lg backdrop-blur-sm focus:bg-white/15 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/30"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                aria-label="Search legal resources"
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                <kbd className="px-2 py-1 text-xs font-semibold text-gray-400 bg-white/10 border border-white/20 rounded">
                  Ctrl+K
                </kbd>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              <button 
                className="px-6 py-2.5 text-gray-300 hover:text-white font-medium transition-all duration-300 hover:bg-white/10 rounded-lg"
                onClick={handleLogin}
                type="button"
              >
                Sign In
              </button>
              <button 
                className="px-6 py-2.5 text-gray-300 hover:text-white font-medium transition-all duration-300 hover:bg-white/10 rounded-lg"
                onClick={handleRegister}
                type="button"
              >
                Register
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden relative p-3 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 transition-all duration-300 ${
              isOpen ? 'bg-white/20' : ''
            }`}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            type="button"
          >
            {isOpen ? (
              <span className="text-lg font-medium">✕</span>
            ) : (
              <span className="text-lg font-medium">Menu</span>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`lg:hidden transition-all duration-500 overflow-hidden ${
            isOpen ? 'max-h-screen opacity-100 pb-6' : 'max-h-0 opacity-0'
          }`}
          aria-hidden={!isOpen}
        >
          <div className="backdrop-blur-md bg-[#1E3A8A]/95 border border-white/20 rounded-lg mt-4 p-6 shadow-lg">
            
            {/* Mobile Search */}
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search legal resources..."
                className="bg-white/10 border border-white/20 hover:border-white/40 focus:border-white/60 text-white placeholder-gray-400 px-4 py-3 w-full rounded-lg backdrop-blur-sm focus:bg-white/15 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/30"
                aria-label="Search legal resources"
              />
            </div>

            {/* Mobile Navigation Links */}
            <nav aria-label="Mobile navigation">
              <div className="space-y-2 mb-6">
                {navigationItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={handleLinkClick}
                    className="flex items-center justify-between text-gray-300 hover:text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 hover:bg-white/10 border border-transparent hover:border-white/20"
                  >
                    <span>{item.label}</span>
                  </a>
                ))}
              </div>
            </nav>

            {/* Mobile Auth Buttons */}
            <div className="flex flex-col space-y-3">
              <button 
                className="w-full py-3 px-6 text-gray-300 hover:text-white font-medium transition-all duration-300 hover:bg-white/10 rounded-lg border border-white/20 hover:border-white/40"
                onClick={handleLogin}
                type="button"
              >
                Sign In
              </button>
              <button 
                className="w-full py-3 px-6 text-gray-300 hover:text-white font-medium transition-all duration-300 hover:bg-white/10 rounded-lg border border-white/20 hover:border-white/40"
                onClick={handleRegister}
                type="button"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;