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
          ? 'bg-white/95 backdrop-blur-md border-b border-[#E5E7EB] shadow-lg' 
          : 'bg-white border-b border-[#E5E7EB]'
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
            <div className="p-2 rounded-lg bg-[#F9FAFB] shadow-sm border border-[#E5E7EB] group-hover:bg-gray-50 transition-all duration-300">
              <img 
               src="src/components/logo.jpeg" 
                alt="Chakshi Logo" 
                className="w-6 h-6 object-contain"
                onError={(e) => {
                  // Fallback to emoji if logo fails to load
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'inline';
                }}
              />
              <span className="text-lg font-bold text-[#374151] hidden">⚖</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-[#374151]">
                Chakshi
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
                  className="relative px-4 py-2 text-[#6B7280] hover:text-[#374151] font-medium transition-all duration-300 rounded-lg hover:bg-[#F9FAFB] group border border-transparent hover:border-[#E5E7EB]"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-4 w-0 h-0.5 bg-[#374151] group-hover:w-[calc(100%-2rem)] transition-all duration-300" />
                </a>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search legal resources..."
                className="bg-[#F9FAFB] border border-[#E5E7EB] hover:border-[#9CA3AF] focus:border-[#374151] text-[#374151] placeholder-[#9CA3AF] px-4 py-2.5 w-72 rounded-lg focus:bg-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#374151]/10"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                aria-label="Search legal resources"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <kbd className="px-2 py-1 text-xs font-semibold text-[#6B7280] bg-white border border-[#E5E7EB] rounded">
                  Ctrl+K
                </kbd>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <button 
                className="px-6 py-2.5 text-[#6B7280] hover:text-[#374151] font-medium transition-all duration-300 hover:bg-[#F9FAFB] rounded-lg border border-transparent hover:border-[#E5E7EB]"
                onClick={handleLogin}
                type="button"
              >
                Sign In
              </button>
              <button 
                className="px-6 py-2.5 bg-[#374151] text-white hover:bg-[#4B5563] font-medium transition-all duration-300 rounded-lg border border-[#374151] hover:border-[#4B5563] shadow-sm"
                onClick={handleRegister}
                type="button"
              >
                Register
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-3">
            {/* Mobile Search Trigger */}
            <button 
              className="p-2 rounded-lg bg-[#F9FAFB] hover:bg-gray-50 text-[#6B7280] border border-[#E5E7EB] transition-all duration-300"
              aria-label="Open search"
              type="button"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            
            <button
              className={`relative p-3 rounded-lg bg-[#F9FAFB] hover:bg-gray-50 text-[#374151] border border-[#E5E7EB] hover:border-[#9CA3AF] transition-all duration-300 ${
                isOpen ? 'bg-gray-50' : ''
              }`}
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
              type="button"
            >
              {isOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`lg:hidden transition-all duration-500 overflow-hidden ${
            isOpen ? 'max-h-screen opacity-100 pb-4' : 'max-h-0 opacity-0'
          }`}
          aria-hidden={!isOpen}
        >
          <div className="bg-white border border-[#E5E7EB] rounded-lg mt-4 p-6 shadow-lg">
            
            {/* Mobile Search */}
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search legal resources..."
                className="bg-[#F9FAFB] border border-[#E5E7EB] hover:border-[#9CA3AF] focus:border-[#374151] text-[#374151] placeholder-[#9CA3AF] px-4 py-3 w-full rounded-lg focus:bg-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#374151]/10"
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
                    className="flex items-center justify-between text-[#6B7280] hover:text-[#374151] font-medium py-3 px-4 rounded-lg transition-all duration-300 hover:bg-[#F9FAFB] border border-transparent hover:border-[#E5E7EB]"
                  >
                    <span>{item.label}</span>
                    <svg className="w-4 h-4 text-[#9CA3AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                ))}
              </div>
            </nav>

            {/* Mobile Auth Buttons */}
            <div className="flex flex-col space-y-3">
              <button 
                className="w-full py-3 px-6 text-[#6B7280] hover:text-[#374151] font-medium transition-all duration-300 hover:bg-[#F9FAFB] rounded-lg border border-[#E5E7EB] hover:border-[#9CA3AF]"
                onClick={handleLogin}
                type="button"
              >
                Sign In
              </button>
              <button 
                className="w-full py-3 px-6 bg-[#374151] text-white hover:bg-[#4B5563] font-medium transition-all duration-300 rounded-lg border border-[#374151] hover:border-[#4B5563] shadow-sm"
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