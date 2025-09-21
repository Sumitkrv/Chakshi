import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Menu, X, Zap, ChevronDown } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navbarRef = useRef(null);
  const navigate = useNavigate();

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target) && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Prevent body scroll when menu is open on mobile
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

  // Handle menu toggle for mobile view
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close mobile menu when a link is clicked
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // Handle login navigation
  const handleLogin = () => {
    handleLinkClick();
    navigate('/login');
  };

  // Handle register navigation
  const handleRegister = () => {
    handleLinkClick();
    navigate('/register');
  };

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass-morphism-card border-b border-white/20 backdrop-blur-xl bg-slate-900/80' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg hover:shadow-yellow-500/30 transition-all duration-300 group">
                <Zap className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Chakshi
                </span>
                <span className="text-xs text-white/60 font-medium -mt-1">
                  Legal AI Suite
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <div className="flex items-center space-x-6">
                {[
                  { href: '#home', label: 'Home' },
                  { href: '#features', label: 'Features' },
                  { href: '#resources', label: 'Resources' },
                  { href: '#pricing', label: 'Pricing' },
                  { href: '#contact', label: 'Contact' }
                ].map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    onClick={handleLinkClick}
                    className="text-white/80 hover:text-white font-medium transition-colors duration-300 relative group"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                  </a>
                ))}
              </div>

              {/* Search */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-white/60" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="saas-input bg-white/10 border border-white/20 text-white placeholder-white/60 pl-10 pr-4 py-2.5 w-64 backdrop-blur-md focus:bg-white/15 focus:border-blue-400/50"
                />
              </div>

              {/* Auth Buttons */}
              <div className="flex items-center space-x-4">
                <button 
                  className="saas-button-secondary px-6 py-2.5 font-semibold"
                  onClick={handleLogin}
                >
                  Log In
                </button>
                <button 
                  className="saas-button-primary px-6 py-2.5 font-semibold"
                  onClick={handleRegister}
                >
                  Get Started
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`lg:hidden saas-button-secondary p-2.5 transition-all duration-300 ${isOpen ? 'rotate-180' : ''}`}
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isOpen ? 'max-h-screen opacity-100 pb-6' : 'max-h-0 opacity-0'
          }`}>
            <div className="glass-morphism-card mt-4 p-6 border border-white/20 backdrop-blur-xl">
              
              {/* Mobile Search */}
              <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-white/60" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="saas-input bg-white/10 border border-white/20 text-white placeholder-white/60 pl-10 pr-4 py-3 w-full backdrop-blur-md"
                />
              </div>

              {/* Mobile Navigation Links */}
              <div className="space-y-4 mb-6">
                {[
                  { href: '#home', label: 'Home' },
                  { href: '#features', label: 'Features' },
                  { href: '#resources', label: 'Resources' },
                  { href: '#pricing', label: 'Pricing' },
                  { href: '#contact', label: 'Contact' }
                ].map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    onClick={handleLinkClick}
                    className="block text-white/80 hover:text-white font-medium py-2 transition-colors duration-300 border-b border-white/10 last:border-0"
                  >
                    {item.label}
                  </a>
                ))}
              </div>

              {/* Mobile Auth Buttons */}
              <div className="flex flex-col space-y-3">
                <button 
                  className="saas-button-secondary w-full py-3 font-semibold"
                  onClick={handleLogin}
                >
                  Log In
                </button>
                <button 
                  className="saas-button-primary w-full py-3 font-semibold"
                  onClick={handleRegister}
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;