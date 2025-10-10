import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { X, Eye, EyeOff } from 'lucide-react';

const LoginModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: ''
  });
  const [error, setError] = useState('');
  const [roleError, setRoleError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [hoveredRole, setHoveredRole] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

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
      id: 'advocate',
      title: 'Advocate',
      route: '/advocate/dashboard',
      description: 'Legal professional practice management',
      emoji: '⚖️'
    },
    {
      id: 'student',
      title: 'Law Student',
      route: '/student/dashboard',
      description: 'Pursuing legal education and training',
      emoji: '🎓'
    },
    {
      id: 'clerk',
      title: 'Court Clerk',
      route: '/clerk/dashboard',
      description: 'Court administration and case management',
      emoji: '📋'
    }
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsAnimating(true);
      setFormData({ email: '', password: '', role: '' });
      setError('');
      setRoleError('');
      setShowPassword(false);
      setHoveredRole(null);

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (e.target.name === 'role') {
      setRoleError('');
    }
    setError('');
  };

  const authenticateUser = async (credentials) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (credentials.email && credentials.password && credentials.role) {
      return {
        id: Date.now(),
        email: credentials.email,
        role: credentials.role,
        name: credentials.email.split('@')[0],
        token: `demo-token-${Date.now()}`,
        isAuthenticated: true
      };
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setRoleError('');
    setLoading(true);
    
    if (!formData.role) {
      setRoleError('Please select your role');
      setLoading(false);
      return;
    }

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const userData = await authenticateUser(formData);
      login(userData);
      onClose();
      const selectedRole = roles.find(role => role.id === formData.role);
      navigate(selectedRole.route);
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
            <div 
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${colors.golden}, ${colors.golden}DD)`
              }}
            >
              <span className="text-2xl sm:text-3xl text-white">🔐</span>
            </div>
            <h1 
              id="login-modal-title"
              className="text-xl sm:text-2xl font-bold mb-2"
              style={{ color: colors.darkNavy }}
            >
              Welcome Back
            </h1>
            <p 
              className="text-sm sm:text-base"
              style={{ color: colors.mediumGray }}
            >
              Sign in to your legal platform account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium mb-2"
                style={{ color: colors.darkNavy }}
              >
                📧 Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
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
                🔒 Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
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

            <div>
              <label 
                className="block text-sm font-medium mb-3"
                style={{ color: colors.darkNavy }}
              >
                👤 Select Your Role
              </label>
              <div className="space-y-2 sm:space-y-3">
                {roles.map((role) => {
                  const isSelected = formData.role === role.id;
                  const isHovered = hoveredRole === role.id;
                  
                  return (
                    <div
                      key={role.id}
                      className={`p-3 sm:p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                        loading ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      style={{
                        borderColor: isSelected ? colors.golden : colors.goldenAlpha40,
                        backgroundColor: isSelected ? colors.goldenAlpha10 : 'transparent',
                        ...(isHovered && !isSelected && {
                          borderColor: colors.goldenAlpha50,
                          backgroundColor: colors.goldenAlpha05
                        })
                      }}
                      onClick={() => !loading && handleChange({ target: { name: 'role', value: role.id } })}
                      onMouseEnter={() => setHoveredRole(role.id)}
                      onMouseLeave={() => setHoveredRole(null)}
                    >
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{
                            background: `linear-gradient(135deg, ${colors.golden}, ${colors.golden}CC)`
                          }}
                        >
                          <span className="text-lg sm:text-xl text-white">{role.emoji}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 
                              className="text-sm sm:text-base font-semibold"
                              style={{ color: colors.darkNavy }}
                            >
                              {role.title}
                            </h4>
                            {isSelected && (
                              <span 
                                className="text-base sm:text-lg"
                                style={{ color: colors.golden }}
                              >
                                ✅
                              </span>
                            )}
                          </div>
                          <p 
                            className="text-xs sm:text-sm"
                            style={{ color: colors.mediumGray }}
                          >
                            {role.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {roleError && (
                <div 
                  className="mt-2 flex items-center gap-2 text-sm"
                  style={{ color: colors.golden }}
                >
                  <span>⚠️</span>
                  {roleError}
                </div>
              )}
            </div>

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
                  <span>👤</span>
                  Sign In
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
                  navigate('/register');
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

          <div 
            className="mt-3 sm:mt-4 p-3 sm:p-4 rounded-lg"
            style={{
              backgroundColor: colors.goldenAlpha10,
              borderColor: colors.goldenAlpha40
            }}
          >
            <div className="flex items-start gap-2 sm:gap-3">
              <div 
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${colors.golden}, ${colors.golden}DD)`
                }}
              >
                <span className="text-sm sm:text-lg text-white">⭐</span>
              </div>
              <div>
                <h4 
                  className="text-xs sm:text-sm font-semibold mb-1"
                  style={{ color: colors.darkNavy }}
                >
                  Demo Mode Active
                </h4>
                <p 
                  className="text-xs leading-relaxed"
                  style={{ color: colors.mediumGray }}
                >
                  You can sign in with any email and password. Just select your role and click "Sign In" to explore the platform.
                </p>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;