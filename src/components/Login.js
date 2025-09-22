import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabaseClient';
import { loginUser } from '../lib/api';
import { 
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
  LogIn,
  UserCheck
} from 'lucide-react';

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
      icon: Scale,
      route: '/advocate/dashboard',
      description: 'Legal professional',
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'student',
      title: 'Law Student',
      icon: GraduationCap,
      route: '/student/dashboard',
      description: 'Pursuing legal education',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      id: 'clerk',
      title: 'Court Clerk',
      icon: FileText,
      route: '/clerk/dashboard',
      description: 'Court administration',
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
      // 1. Authenticate with Supabase
      const { data, error: supabaseError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (supabaseError) {
        throw new Error(supabaseError.message);
      }

      if (!data.session) {
        throw new Error('Supabase session not found after sign-in.');
      }

      const supabaseAccessToken = data.session.access_token;

      // 2. Call backend login API with Supabase JWT
      const backendResponse = await loginUser(supabaseAccessToken);
      
      if (!backendResponse.success) {
        throw new Error(backendResponse.message || 'Backend login failed.');
      }

      const userData = backendResponse.data.user;
      const backendToken = supabaseAccessToken; // Use Supabase token for frontend session

      // Store user data in context and localStorage
      login({ ...userData, token: backendToken });
      
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pro-flex items-center justify-center pro-p-4">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      
      <div className="w-full max-w-md relative z-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 pro-rounded-xl pro-flex-center mx-auto mb-4">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <h1 className="pro-heading-xl text-gray-900 mb-2">Welcome Back</h1>
          <p className="pro-text-body text-gray-600">Sign in to your legal platform account</p>
        </div>

        {/* Main Form Card */}
        <div className="pro-dashboard-card pro-p-8 mb-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            
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
                  placeholder="Enter your email"
                  className="w-full pro-p-3 pl-12 border border-gray-300 pro-rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
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
                  placeholder="Enter your password"
                  className="w-full pro-p-3 pl-12 pr-12 border border-gray-300 pro-rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  disabled={loading}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
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
                          ? `border-blue-500 bg-blue-50 ring-2 ring-blue-200` 
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => !loading && handleChange({ target: { name: 'role', value: role.id } })}
                    >
                      <div className="pro-flex items-center pro-gap-3">
                        <div className={`w-12 h-12 bg-gradient-to-r ${role.gradient} pro-rounded-lg pro-flex-center flex-shrink-0`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="pro-flex items-center justify-between">
                            <h4 className="pro-heading-sm text-gray-900">{role.title}</h4>
                            {formData.role === role.id && (
                              <CheckCircle className="w-5 h-5 text-blue-500" />
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
              className={`w-full pro-btn pro-btn-primary pro-flex items-center justify-center pro-gap-2 ${
                loading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  <UserCheck className="w-5 h-5" />
                  Sign In
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

        {/* Register Link */}
        <div className="text-center pro-p-4 bg-white border border-gray-200 pro-rounded-lg">
          <p className="pro-text-sm text-gray-600">
            Don't have an account? {' '}
            <button 
              className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors duration-200"
              onClick={() => !loading && navigate('/register')}
              disabled={loading}
            >
              Create one here
            </button>
          </p>
        </div>

        {/* Demo Notice */}
        <div className="mt-6 pro-p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 pro-rounded-lg">
          <div className="pro-flex items-start pro-gap-3">
            <div className="w-8 h-8 bg-blue-500 pro-rounded-lg pro-flex-center flex-shrink-0">
              <Star className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="pro-text-sm font-semibold text-blue-900 mb-1">Demo Mode Active</h4>
              <p className="pro-text-xs text-blue-700 leading-relaxed">
                You can sign in with any email and password. Just select your role and click "Sign In" to explore the platform.
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

export default Login;
