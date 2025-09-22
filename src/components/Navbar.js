import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth
import { supabase } from '../lib/supabaseClient'; // Import supabase
import { Search, Menu, X, Scale, ChevronDown, ArrowRight, LogOut } from 'lucide-react'; // Add LogOut icon
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

  const { user, logout } = useAuth(); // Get user and logout from AuthContext

  const handleLogout = async () => {
    setIsOpen(false); // Close mobile menu if open
    try {
      await supabase.auth.signOut(); // Sign out from Supabase
      logout(); // Clear local auth state
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error('Logout failed:', error);
      // Optionally, display an error message to the user
    }
  };

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'backdrop-blur-xl bg-navy-800/95 border-b border-gold-400/20 shadow-2xl shadow-navy-800/20' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => navigate('/')}>
              <div className="relative p-3 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 shadow-xl hover:shadow-gold-400/30 transition-all duration-300">
                <Scale className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-white via-gold-200 to-gold-300 bg-clip-text text-transparent">
                  Chakshi
                </span>
                <span className="text-xs text-gold-300/80 font-medium -mt-1 tracking-wide">
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
                    className="relative text-white/90 hover:text-gold-300 font-medium transition-all duration-300 group py-2"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gold-400 to-gold-600 group-hover:w-full transition-all duration-300"></span>
                  </a>
                ))}
              </div>

              {/* Search */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gold-300/60" />
                </div>
                <input
                  type="text"
                  placeholder="Search legal AI..."
                  className="bg-white/10 border border-white/20 hover:border-gold-400/50 focus:border-gold-400 text-white placeholder-gold-200/60 pl-10 pr-4 py-2.5 w-64 rounded-xl backdrop-blur-md focus:bg-white/15 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-400/30"
                />
              </div>

              {/* Auth Buttons */}
              <div className="flex items-center space-x-4">
                {user ? (
                  <button 
                    className="px-6 py-2.5 bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-500 hover:to-gold-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-gold-400/30 flex items-center gap-2"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                ) : (
                  <>
                    <button 
                      className="px-6 py-2.5 text-white/90 hover:text-white font-semibold transition-all duration-300 hover:bg-white/10 rounded-xl"
                      onClick={handleLogin}
                    >
                      Sign In
                    </button>
                    <button 
                      className="px-6 py-2.5 bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-500 hover:to-gold-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-gold-400/30 flex items-center gap-2"
                      onClick={handleRegister}
                    >
                      Get Started
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`lg:hidden p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-gold-400/50 transition-all duration-300 ${isOpen ? 'rotate-180' : ''}`}
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className={`lg:hidden transition-all duration-500 overflow-hidden ${
            isOpen ? 'max-h-screen opacity-100 pb-6' : 'max-h-0 opacity-0'
          }`}>
            <div className="backdrop-blur-xl bg-navy-800/90 border border-gold-400/20 rounded-2xl mt-4 p-6 shadow-2xl">
              
              {/* Mobile Search */}
              <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gold-300/60" />
                </div>
                <input
                  type="text"
                  placeholder="Search legal AI..."
                  className="bg-white/10 border border-white/20 hover:border-gold-400/50 focus:border-gold-400 text-white placeholder-gold-200/60 pl-10 pr-4 py-3 w-full rounded-xl backdrop-blur-md focus:bg-white/15 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-400/30"
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
                    className="block text-white/90 hover:text-gold-300 font-medium py-3 px-4 rounded-xl transition-all duration-300 hover:bg-white/10 border-b border-gold-400/20 last:border-0"
                  >
                    {item.label}
                  </a>
                ))}
              </div>

              {/* Mobile Auth Buttons */}
              <div className="flex flex-col space-y-3">
                {user ? (
                  <button 
                    className="w-full py-3 px-6 bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-500 hover:to-gold-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-gold-400/30 flex items-center justify-center gap-2"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                ) : (
                  <>
                    <button 
                      className="w-full py-3 px-6 text-white/90 hover:text-white font-semibold transition-all duration-300 hover:bg-white/10 rounded-xl border border-white/20 hover:border-gold-400/50"
                      onClick={handleLogin}
                    >
                      Sign In
                    </button>
                    <button 
                      className="w-full py-3 px-6 bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-500 hover:to-gold-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-gold-400/30 flex items-center justify-center gap-2"
                      onClick={handleRegister}
                    >
                      Get Started
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
