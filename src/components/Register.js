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
    <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center p-3 md:p-4">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none"></div>
      
      <div className="w-full max-w-md lg:max-w-lg relative z-10">
        
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-[#374151] border border-[#E5E7EB] rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4">
            <span className="text-[#FFFFFF] font-bold text-sm md:text-lg">📝</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#374151] mb-2">Create Your Account</h1>
          <p className="text-sm md:text-base text-[#6B7280]">Join our legal platform and get started</p>
        </div>

        {/* Main Form Card */}
        <div className="bg-[#FFFFFF] border border-[#E5E7EB] p-6 md:p-8 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 mb-4 md:mb-6">
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#374151] mb-2">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9CA3AF] text-xs md:text-sm">👤</span>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  className="w-full p-3 pl-10 md:pl-12 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#374151] focus:border-[#374151] hover:border-[#6B7280] transition-colors duration-200 text-sm md:text-base"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#374151] mb-2">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9CA3AF] text-xs md:text-sm">📧</span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email address"
                  className="w-full p-3 pl-10 md:pl-12 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#374151] focus:border-[#374151] hover:border-[#6B7280] transition-colors duration-200 text-sm md:text-base"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#374151] mb-2">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9CA3AF] text-xs md:text-sm">🔒</span>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Create a password (min 6 characters)"
                  className="w-full p-3 pl-10 md:pl-12 pr-12 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#374151] focus:border-[#374151] hover:border-[#6B7280] transition-colors duration-200 text-sm md:text-base"
                  disabled={loading}
                  minLength="6"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280] transition-colors text-xs md:text-sm"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "👁️‍🗨️" : "👁️"}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-[#6B7280]">Password Strength</span>
                    <span className={`text-xs font-medium ${
                      passwordStrength.color === 'red' ? 'text-red-600' :
                      passwordStrength.color === 'yellow' ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {passwordStrength.text}
                    </span>
                  </div>
                  <div className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg h-2">
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
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#374151] mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9CA3AF] text-xs md:text-sm">🔐</span>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Confirm your password"
                  className="w-full p-3 pl-10 md:pl-12 pr-12 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#374151] focus:border-[#374151] hover:border-[#6B7280] transition-colors duration-200 text-sm md:text-base"
                  disabled={loading}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280] transition-colors text-xs md:text-sm"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? "👁️‍🗨️" : "👁️"}
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
              <label className="block text-sm font-medium text-[#374151] mb-3">
                Select Your Role
              </label>
              <div className="space-y-2 md:space-y-3">
                {roles.map((role) => {
                  return (
                    <div
                      key={role.id}
                      className={`p-3 md:p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                        formData.role === role.id 
                          ? `border-[#374151] bg-[#F9FAFB] ring-2 ring-[#374151]/20` 
                          : 'border-[#E5E7EB] hover:border-[#6B7280] hover:bg-[#F9FAFB]'
                      } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => !loading && handleChange({ target: { name: 'role', value: role.id } })}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 md:w-12 md:h-12 ${formData.role === role.id ? 'bg-[#374151]' : 'bg-[#6B7280]'} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <span className="text-[#FFFFFF] font-bold text-xs md:text-sm">{role.title.charAt(0)}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-base md:text-lg font-semibold text-[#374151]">{role.title}</h4>
                            {formData.role === role.id && (
                              <span className="text-[#374151] font-bold">✓</span>
                            )}
                          </div>
                          <p className="text-xs md:text-sm text-[#6B7280]">{role.description}</p>
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
              className={`w-full p-3 md:p-4 bg-[#374151] text-[#FFFFFF] rounded-lg font-semibold hover:bg-[#6B7280] hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-base ${
                loading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="animate-pulse">⏳</span>
                  Creating Account...
                </>
              ) : (
                <>
                  🚀 Create Account
                </>
              )}
            </button>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
              <span className="text-red-500 font-bold">⚠️</span>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
        </div>

        {/* Login Link */}
        <div className="text-center p-3 md:p-4 bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg hover:bg-[#F9FAFB] transition-colors">
          <p className="text-xs md:text-sm text-[#6B7280]">
            Already have an account? {' '}
            <button 
              className="text-[#374151] hover:text-[#6B7280] font-medium hover:underline transition-colors duration-200"
              onClick={() => !loading && navigate('/login')}
              disabled={loading}
            >
              Sign in here
            </button>
          </p>
        </div>

        {/* Demo Notice */}
        <div className="mt-4 md:mt-6 p-3 md:p-4 bg-[#FFFFFF] border border-[#374151] rounded-lg hover:shadow-sm transition-all duration-300">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 md:w-8 md:h-8 bg-[#374151] rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-[#FFFFFF] font-bold text-xs md:text-sm">ℹ️</span>
            </div>
            <div>
              <h4 className="text-xs md:text-sm font-semibold text-[#374151] mb-1">Demo Mode Active</h4>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Registration will create a demo account. Fill in all fields and select your role to get started exploring the platform.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Access */}
        <div className="mt-3 md:mt-4 text-center">
          <button 
            className="text-xs md:text-sm text-[#6B7280] hover:text-[#374151] flex items-center gap-1 mx-auto transition-colors duration-200"
            onClick={() => navigate('/')}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;