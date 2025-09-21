import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Scale, 
  GraduationCap, 
  FileText, 
  ArrowRight, 
  AlertCircle,
  CheckCircle,
  Shield,
  Loader,
  Star,
  Home,
  UserPlus,
  Check,
  X
} from 'lucide-react';

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
      icon: Scale,
      description: 'Legal professional managing cases and clients',
      route: '/advocate/dashboard',
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'student',
      title: 'Law Student',
      icon: GraduationCap,
      description: 'Student pursuing legal education',
      route: '/student/dashboard',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      id: 'clerk',
      title: 'Court Clerk',
      icon: FileText,
      description: 'Court administrative professional',
      route: '/clerk/dashboard',
      gradient: 'from-purple-500 to-violet-600'
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 pro-flex items-center justify-center pro-p-4">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      
      <div className="w-full max-w-md relative z-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 pro-rounded-xl pro-flex-center mx-auto mb-4">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <h1 className="pro-heading-xl text-gray-900 mb-2">Create Your Account</h1>
          <p className="pro-text-body text-gray-600">Join our legal platform and get started</p>
        </div>

        {/* Main Form Card */}
        <div className="pro-dashboard-card pro-p-8 mb-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block pro-text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  className="w-full pro-p-3 pl-12 border border-gray-300 pro-rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block pro-text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email address"
                  className="w-full pro-p-3 pl-12 border border-gray-300 pro-rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block pro-text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Create a password (min 6 characters)"
                  className="w-full pro-p-3 pl-12 pr-12 border border-gray-300 pro-rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                  disabled={loading}
                  minLength="6"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="pro-flex items-center justify-between mb-1">
                    <span className="pro-text-xs text-gray-600">Password Strength</span>
                    <span className={`pro-text-xs font-medium ${
                      passwordStrength.color === 'red' ? 'text-red-600' :
                      passwordStrength.color === 'yellow' ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {passwordStrength.text}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 pro-rounded-lg h-2">
                    <div 
                      className={`h-2 pro-rounded-lg transition-all duration-300 ${
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
              <label htmlFor="confirmPassword" className="block pro-text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Confirm your password"
                  className="w-full pro-p-3 pl-12 pr-12 border border-gray-300 pro-rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                  disabled={loading}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {/* Password Match Indicator */}
              {formData.confirmPassword && (
                <div className="mt-2 pro-flex items-center pro-gap-2">
                  {formData.password === formData.confirmPassword ? (
                    <>
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="pro-text-xs text-green-600">Passwords match</span>
                    </>
                  ) : (
                    <>
                      <X className="w-4 h-4 text-red-500" />
                      <span className="pro-text-xs text-red-600">Passwords don't match</span>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Role Selection */}
            <div>
              <label className="block pro-text-sm font-medium text-gray-700 mb-3">
                Select Your Role
              </label>
              <div className="space-y-3">
                {roles.map((role) => {
                  const IconComponent = role.icon;
                  return (
                    <div
                      key={role.id}
                      className={`pro-p-4 border-2 pro-rounded-lg cursor-pointer transition-all duration-300 ${
                        formData.role === role.id 
                          ? `border-green-500 bg-green-50 ring-2 ring-green-200` 
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => !loading && handleChange({ target: { name: 'role', value: role.id } })}
                    >
                      <div className="pro-flex items-center pro-gap-3">
                        <div className={`w-12 h-12 bg-gradient-to-r ${role.gradient} pro-rounded-lg pro-flex-center flex-shrink-0`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="pro-flex items-center justify-between mb-1">
                            <h4 className="pro-heading-sm text-gray-900">{role.title}</h4>
                            {formData.role === role.id && (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            )}
                          </div>
                          <p className="pro-text-xs text-gray-600">{role.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {roleError && (
                <div className="mt-2 pro-flex items-center pro-gap-2 pro-text-sm text-red-600">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {roleError}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className={`w-full pro-btn pro-btn-primary bg-gradient-to-r from-green-500 to-blue-600 border-0 hover:from-green-600 hover:to-blue-700 pro-flex items-center justify-center pro-gap-2 ${
                loading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  Create Account
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mt-4 pro-p-3 bg-red-50 border border-red-200 pro-rounded-lg pro-flex items-center pro-gap-2">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="pro-text-sm text-red-700">{error}</p>
            </div>
          )}
        </div>

        {/* Login Link */}
        <div className="text-center pro-p-4 bg-white border border-gray-200 pro-rounded-lg">
          <p className="pro-text-sm text-gray-600">
            Already have an account? {' '}
            <button 
              className="text-green-600 hover:text-green-700 font-medium hover:underline transition-colors duration-200"
              onClick={() => !loading && navigate('/login')}
              disabled={loading}
            >
              Sign in here
            </button>
          </p>
        </div>

        {/* Demo Notice */}
        <div className="mt-6 pro-p-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 pro-rounded-lg">
          <div className="pro-flex items-start pro-gap-3">
            <div className="w-8 h-8 bg-green-500 pro-rounded-lg pro-flex-center flex-shrink-0">
              <Star className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="pro-text-sm font-semibold text-green-900 mb-1">Demo Mode Active</h4>
              <p className="pro-text-xs text-green-700 leading-relaxed">
                Registration will create a demo account. Fill in all fields and select your role to get started exploring the platform.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Access */}
        <div className="mt-4 text-center">
          <button 
            className="pro-text-sm text-gray-500 hover:text-gray-700 pro-flex items-center pro-gap-1 mx-auto transition-colors duration-200"
            onClick={() => navigate('/')}
          >
            <Home className="w-4 h-4" />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;