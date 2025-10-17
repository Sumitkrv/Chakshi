import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { X, Eye, EyeOff } from 'lucide-react';
import RegisterModal from './RegisterModal';
import { supabase } from '../lib/supabaseClient'; // Import supabase client
import { exchangeSupabaseTokenForBackendToken } from '../lib/api'; // Import the new API function

const LoginModal = ({ isOpen, onClose, onOpenRegister }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // Removed hoveredRole and roleError as role selection is removed
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();
  const { login, logoutEvent } = useAuth();
  const [showRegister, setShowRegister] = useState(false);

  const colors = {
    background: '#f5f5ef',
    darkNavy: '#1f2839',
    golden: '#b69d74',
    mediumGray: '#6b7280',
    goldenAlpha10: 'rgba(182, 157, 116, 0.10)',
    goldenAlpha15: 'rgba(182, 157, 116, 0.15)',
    goldenAlpha40: 'rgba(182, 157, 116, 0.40)',
    goldenAlpha50: 'rgba(182, 157, 116, 0.50)',
    goldenAlpha05: 'rgba(182, 157, 116, 0.05)',
    navyAlpha70: 'rgba(31, 40, 57, 0.70)'
  };

  const roles = [
    {
      id: 'ADVOCATE',
      title: 'Advocate',
      route: '/advocate/dashboard',
      description: 'Legal professional practice management'
    },
    {
      id: 'STUDENT',
      title: 'Law Student',
      route: '/student/dashboard',
      description: 'Pursuing legal education and training'
    },
    {
      id: 'CLERK',
      title: 'Court Clerk',
      route: '/clerk/dashboard',
      description: 'Court administration and case management'
    },
    {
      id: 'ADMIN',
      title: 'Admin',
      route: '/admin/dashboard',
      description: 'Administrator with full system access'
    }
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsAnimating(true);
      setFormData({ email: '', password: '' });
      setError('');
      // Removed setRoleError as role selection is removed
      setShowPassword(false);
      // Removed setHoveredRole as role selection is removed

      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleEscape);
      };
    } else {
      document.body.style.overflow = '';
      setIsAnimating(false);
    }
  }, [isOpen, onClose]);

  // Close modal when logout event occurs
  useEffect(() => {
    if (logoutEvent > 0 && isOpen) {
      onClose();
    }
  }, [logoutEvent, isOpen, onClose]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      // 1. Authenticate with Supabase
      const { data, error: supabaseError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (supabaseError) {
        throw new Error(supabaseError.message);
      }

      if (!data.session || !data.session.access_token) {
        throw new Error('Supabase authentication failed: No session or access token.');
      }

      const supabaseAccessToken = data.session.access_token;

      // 2. Exchange Supabase JWT for Backend JWT
      const backendResponse = await exchangeSupabaseTokenForBackendToken(supabaseAccessToken);

      if (!backendResponse.success) {
        throw new Error(backendResponse.message || 'Backend login failed.');
      }

      const backendToken = backendResponse.data.user.token;
      // The role is now expected to come directly from the backend response
      const userProfile = backendResponse.data.user; 
      
      if (!userProfile.role) {
        throw new Error('User role not provided by backend. Cannot determine dashboard route.');
      }

      // 3. Log in to AuthContext
      login(userProfile, backendToken);
      onClose();
      // Navigate based on the role provided by the backend
      const selectedRole = roles.find(role => role.id === userProfile.role);
      if (selectedRole) {
        navigate(selectedRole.route);
      } else {
        console.warn(`No route defined for role: ${userProfile.role}. Navigating to default dashboard.`);
        navigate('/dashboard'); // Fallback to a generic dashboard if role route is not found
      }

    } catch (err) {
      console.error('Login failed:', err);
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
    <div 
      className={`fixed inset-0 z-[10000] transition-all duration-300 ${
        isAnimating ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      style={{
        backgroundColor: colors.navyAlpha70,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        height: '100vh',
        width: '100vw'
      }}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
    >
      <div className="min-h-screen flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8">
        <div 
          className={`relative w-full max-w-xs xs:max-w-sm sm:max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 transform ${
            isAnimating ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
          }`}
          style={{
            boxShadow: `0 25px 50px rgba(31, 40, 57, 0.3), 0 0 0 1px ${colors.goldenAlpha15}`,
            maxHeight: 'calc(100vh - 1.5rem)',
            overflowY: 'auto',
            minHeight: 'auto',
            margin: '0 auto',
            scrollBehavior: 'smooth'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full transition-all duration-200 hover:scale-110 bg-gray-100 hover:bg-gray-200"
            disabled={loading}
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>

          <div className="p-4 sm:p-6 md:p-8">
          <div className="text-center mb-6 sm:mb-8">
            <h1 
              id="login-modal-title"
              className="text-xl sm:text-2xl font-bold mb-2"
              style={{ color: colors.darkNavy }}
            >
              Access Your Account
            </h1>
            <p 
              className="text-sm sm:text-base"
              style={{ color: colors.mediumGray }}
            >
              Sign in to your legal platform account to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium mb-2"
                style={{ color: colors.darkNavy }}
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your professional email"
                className="w-full p-3 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                style={{
                  backgroundColor: '#fafafa',
                  borderColor: colors.goldenAlpha40,
                  color: colors.darkNavy
                }}
                disabled={loading}
              />
            </div>

            <div>
              <label 
                htmlFor="password"
                className="block text-sm font-medium mb-2"
                style={{ color: colors.darkNavy }}
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your secure password"
                  className="w-full p-3 pr-12 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                  style={{
                    backgroundColor: '#fafafa',
                    borderColor: colors.goldenAlpha40,
                    color: colors.darkNavy
                  }}
                  disabled={loading}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded transition-colors duration-200 hover:bg-gray-100"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? <EyeOff className="w-4 h-4 text-gray-500" /> : <Eye className="w-4 h-4 text-gray-500" />}
                </button>
              </div>
            </div>

            {/* Role selection UI removed as per user's request */}

            <button 
              type="submit"
              className={`w-full text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:opacity-90 shadow-lg ${
                loading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
              style={{
                background: `linear-gradient(135deg, ${colors.golden}, ${colors.golden}DD)`,
                boxShadow: `0 4px 15px ${colors.goldenAlpha40}`
              }}
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing In...
                </>
              ) : (
                <>
                  Sign In Securely
                  <span>→</span>
                </>
              )}
            </button>
          </form>

          {error && (
            <div 
              className="mt-4 p-3 border rounded-lg flex items-center gap-2"
              style={{
                backgroundColor: colors.goldenAlpha10,
                borderColor: colors.goldenAlpha40
              }}
            >
              <span style={{ color: colors.golden }}>⚠️</span>
              <p 
                className="text-sm"
                style={{ color: colors.darkNavy }}
              >
                {error}
              </p>
            </div>
          )}

          <div className="mt-4 sm:mt-6 text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
            <p 
              className="text-xs sm:text-sm"
              style={{ color: colors.mediumGray }}
            >
              Don't have an account?{' '}
              <button 
                className="font-medium hover:underline transition-colors duration-200"
                onClick={() => {
                  onClose();
                  // Preferred: call the prop if provided
                  if (typeof onOpenRegister === 'function') {
                    onOpenRegister();
                    return;
                  }

                  // Otherwise open the local RegisterModal instance
                  setShowRegister(true);
                }}
                disabled={loading}
                style={{
                  color: colors.darkNavy
                }}
              >
                Create one here
              </button>
            </p>
          </div>

          {/* Secure & Private section removed for professionalism */}
          </div>
        </div>
      </div>
    </div>
    <RegisterModal isOpen={showRegister} onClose={() => setShowRegister(false)} />
    </>
  );
};

export default LoginModal;
