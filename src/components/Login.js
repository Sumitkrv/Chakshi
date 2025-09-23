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
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 flex items-center justify-center p-4">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      
      <div className="w-full max-w-md relative z-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🔐</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-xl text-blue-200">Sign in to your legal platform account</p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 mb-6 border border-white/20 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
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
                  className="w-full p-4 pl-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
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
                  className="w-full p-4 pl-4 pr-12 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                  disabled={loading}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-300 hover:text-white transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-white mb-3">
                👤 Select Your Role
              </label>
              <div className="space-y-3">
                {roles.map((role) => {
                  return (
                    <div
                      key={role.id}
                      className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                        formData.role === role.id 
                          ? `border-white bg-white/20 ring-2 ring-white/30` 
                          : 'border-white/30 hover:border-white/50 hover:bg-white/10'
                      } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => !loading && handleChange({ target: { name: 'role', value: role.id } })}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-600 rounded-xl flex items-center justify-center flex-shrink-0">
                          <span className="text-2xl">{role.emoji}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-lg font-semibold text-white">{role.title}</h4>
                            {formData.role === role.id && (
                              <span className="text-green-400 text-xl">✅</span>
                            )}
                          </div>
                          <p className="text-sm text-blue-200">{role.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {roleError && (
                <div className="mt-2 flex items-center gap-2 text-sm text-red-300">
                  <span>⚠️</span>
                  {roleError}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className={`w-full bg-gray-600 hover:bg-gray-500 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
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
            <div className="mt-4 p-3 bg-red-500/20 border border-red-400/30 rounded-xl flex items-center gap-2">
              <span className="text-red-300">⚠️</span>
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}
        </div>

        {/* Register Link */}
        <div className="text-center p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl">
          <p className="text-sm text-blue-200">
            Don't have an account? {' '}
            <button 
              className="text-white hover:text-blue-200 font-medium hover:underline transition-colors duration-200"
              onClick={() => !loading && navigate('/register')}
              disabled={loading}
            >
              Create one here
            </button>
          </p>
        </div>

        {/* Demo Notice */}
        <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-xl">⭐</span>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-1">Demo Mode Active</h4>
              <p className="text-xs text-blue-200 leading-relaxed">
                You can sign in with any email and password. Just select your role and click "Sign In" to explore the platform.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Access */}
        <div className="mt-4 text-center">
          <button 
            className="text-sm text-blue-200 hover:text-white flex items-center gap-1 mx-auto transition-colors duration-200"
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
