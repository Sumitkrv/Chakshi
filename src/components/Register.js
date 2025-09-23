import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  });
  const [error, setError] = useState('');
  const [roleError, setRoleError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const roles = [
    {
      id: 'advocate',
      title: 'Advocate',
      description: 'Legal professional managing cases and clients',
      route: '/advocate/dashboard'
    },
    {
      id: 'student',
      title: 'Law Student',
      description: 'Student pursuing legal education',
      route: '/student/dashboard'
    },
    {
      id: 'clerk',
      title: 'Court Clerk',
      description: 'Court administrative professional',
      route: '/clerk/dashboard'
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

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, text: '', color: 'gray' };
    
    let score = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      numbers: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    
    score = Object.values(checks).filter(Boolean).length;
    
    if (score < 2) return { strength: score, text: 'Weak', color: 'red' };
    if (score < 4) return { strength: score, text: 'Medium', color: 'yellow' };
    return { strength: score, text: 'Strong', color: 'green' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (!formData.role) {
      setRoleError('Please select your role');
      return false;
    }
    return true;
  };

  // Demo registration - replace with actual API call
  const registerUser = async (userData) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For demo purposes, accept any valid data
    // In production, this should make a real API call
    if (userData.name && userData.email && userData.password && userData.role) {
      return {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        role: userData.role,
        token: `demo-token-${Date.now()}`,
        isAuthenticated: true,
        registeredAt: new Date().toISOString()
      };
    } else {
      throw new Error('Registration failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setRoleError('');
    setLoading(true);
    
    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      // Register user (replace with actual API call)
      const userData = await registerUser(formData);
      
      // Store user data in context and localStorage
      login(userData);
      
      // Get the selected role's route
      const selectedRole = roles.find(role => role.id === formData.role);
      navigate(selectedRole.route);
      
    } catch (err) {
      console.error('Registration failed:', err);
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1E3A8A] flex items-center justify-center p-4">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none"></div>
      
      <div className="w-full max-w-md relative z-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#FFFFFF] rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-[#1E3A8A] font-bold text-lg">Register</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Create Your Account</h1>
          <p className="text-base text-white opacity-90">Join our legal platform and get started</p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white p-8 rounded-lg shadow-lg mb-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">Name:</span>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  className="w-full p-3 pl-16 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] transition-colors duration-200"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">Email:</span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email address"
                  className="w-full p-3 pl-16 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] transition-colors duration-200"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">Pass:</span>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Create a password (min 6 characters)"
                  className="w-full p-3 pl-16 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] transition-colors duration-200"
                  disabled={loading}
                  minLength="6"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600">Password Strength</span>
                    <span className={`text-xs font-medium ${
                      passwordStrength.color === 'red' ? 'text-red-600' :
                      passwordStrength.color === 'yellow' ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {passwordStrength.text}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-lg h-2">
                    <div 
                      className={`h-2 rounded-lg transition-all duration-300 ${
                        passwordStrength.color === 'red' ? 'bg-red-500' :
                        passwordStrength.color === 'yellow' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">Confirm:</span>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Confirm your password"
                  className="w-full p-3 pl-20 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] transition-colors duration-200"
                  disabled={loading}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
              
              {/* Password Match Indicator */}
              {formData.confirmPassword && (
                <div className="mt-2 flex items-center gap-2">
                  {formData.password === formData.confirmPassword ? (
                    <>
                      <span className="text-green-500">✓</span>
                      <span className="text-xs text-green-600">Passwords match</span>
                    </>
                  ) : (
                    <>
                      <span className="text-red-500">✗</span>
                      <span className="text-xs text-red-600">Passwords don't match</span>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Your Role
              </label>
              <div className="space-y-3">
                {roles.map((role) => {
                  return (
                    <div
                      key={role.id}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                        formData.role === role.id 
                          ? `border-[#1E3A8A] bg-blue-50 ring-2 ring-blue-200` 
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => !loading && handleChange({ target: { name: 'role', value: role.id } })}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 bg-${formData.role === role.id ? '[#1E3A8A]' : '[#374151]'} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <span className="text-white font-bold text-sm">{role.title.charAt(0)}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-lg font-semibold text-gray-900">{role.title}</h4>
                            {formData.role === role.id && (
                              <span className="text-[#1E3A8A] font-bold">✓</span>
                            )}
                          </div>
                          <p className="text-xs text-gray-600">{role.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {roleError && (
                <div className="mt-2 flex items-center gap-2 text-sm text-red-600">
                  <span className="font-bold">!</span>
                  {roleError}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className={`w-full p-4 bg-[#1E3A8A] text-white rounded-lg font-semibold hover:bg-[#1E3A8A]/90 transition-all duration-300 flex items-center justify-center gap-2 ${
                loading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="animate-pulse">●</span>
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                </>
              )}
            </button>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
              <span className="text-red-500 font-bold">!</span>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
        </div>

        {/* Login Link */}
        <div className="text-center p-4 bg-white border border-gray-200 rounded-lg">
          <p className="text-sm text-gray-600">
            Already have an account? {' '}
            <button 
              className="text-[#1E3A8A] hover:text-[#1E3A8A]/80 font-medium hover:underline transition-colors duration-200"
              onClick={() => !loading && navigate('/login')}
              disabled={loading}
            >
              Sign in here
            </button>
          </p>
        </div>

        {/* Demo Notice */}
        <div className="mt-6 p-4 bg-white border border-[#1E3A8A] rounded-lg">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-[#1E3A8A] rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold">i</span>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-1">Demo Mode Active</h4>
              <p className="text-xs text-gray-700 leading-relaxed">
                Registration will create a demo account. Fill in all fields and select your role to get started exploring the platform.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Access */}
        <div className="mt-4 text-center">
          <button 
            className="text-sm text-white hover:text-white/80 flex items-center gap-1 mx-auto transition-colors duration-200"
            onClick={() => navigate('/')}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;