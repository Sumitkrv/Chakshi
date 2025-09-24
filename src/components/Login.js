import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: ''
  });
  const [error, setError] = useState('');
  const [roleError, setRoleError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const roles = [
    {
      id: 'advocate',
      title: 'Advocate',
      label: '⚖️ Legal Professional',
      route: '/advocate/dashboard',
      description: 'Legal professional practice management',
      emoji: '⚖️'
    },
    {
      id: 'student',
      title: 'Law Student',
      label: '🎓 Academic Learning',
      route: '/student/dashboard',
      description: 'Pursuing legal education and training',
      emoji: '🎓'
    },
    {
      id: 'clerk',
      title: 'Court Clerk',
      label: '📋 Administrative Support',
      route: '/clerk/dashboard',
      description: 'Court administration and case management',
      emoji: '📋'
    }
  ];

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

  // Demo authentication - replace with actual API call
  const authenticateUser = async (credentials) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, allow any email/password combination
    // In production, this should make a real API call
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
      // Authenticate user (replace with actual API call)
      const userData = await authenticateUser(formData);
      
      // Store user data in context and localStorage
      login(userData);
      
      // Get the selected role's route
      const selectedRole = roles.find(role => role.id === formData.role);
      navigate(selectedRole.route);
      
    } catch (err) {
      console.error('Login failed:', err);
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-6 lg:p-8">
      
      {/* Background Pattern - Subtle */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 pointer-events-none"></div>
      
      <div className="w-full max-w-md relative z-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white border border-gray-200 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm">
            <span className="text-3xl">🔐</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-lg sm:text-xl text-gray-600">Sign in to your legal platform account</p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 mb-6 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                📧 Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                  className="w-full p-3 sm:p-4 pl-4 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
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
                  className="w-full p-3 sm:p-4 pl-4 pr-12 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                  disabled={loading}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-500 hover:text-gray-700 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                👤 Select Your Role
              </label>
              <div className="space-y-3">
                {roles.map((role) => {
                  return (
                    <div
                      key={role.id}
                      className={`p-3 sm:p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                        formData.role === role.id 
                          ? `border-blue-500 bg-blue-50 ring-1 ring-blue-200` 
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => !loading && handleChange({ target: { name: 'role', value: role.id } })}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-xl sm:text-2xl">{role.emoji}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="text-base sm:text-lg font-semibold text-gray-900 truncate">{role.title}</h4>
                            {formData.role === role.id && (
                              <span className="text-green-500 text-lg sm:text-xl flex-shrink-0 ml-2">✅</span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 truncate">{role.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {roleError && (
                <div className="mt-2 flex items-center gap-2 text-sm text-red-600">
                  <span>⚠️</span>
                  {roleError}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className={`w-full bg-gray-900 hover:bg-gray-800 text-white py-3 sm:py-4 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                loading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="animate-spin">⏳</span>
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

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
              <span className="text-red-500">⚠️</span>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
        </div>

        {/* Register Link */}
        <div className="text-center p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="text-sm text-gray-600">
            Don't have an account? {' '}
            <button 
              className="text-gray-900 hover:text-gray-700 font-medium hover:underline transition-colors duration-200"
              onClick={() => !loading && navigate('/register')}
              disabled={loading}
            >
              Create one here
            </button>
          </p>
        </div>

        {/* Demo Notice */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-100 border border-blue-200 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-xl">⭐</span>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-1">Demo Mode Active</h4>
              <p className="text-xs text-gray-700 leading-relaxed">
                You can sign in with any email and password. Just select your role and click "Sign In" to explore the platform.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Access */}
        <div className="mt-4 text-center">
          <button 
            className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1 mx-auto transition-colors duration-200"
            onClick={() => navigate('/')}
          >
            <span>🏠</span>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;