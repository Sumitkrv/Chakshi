import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../lib/api'; // Import the loginUser function
import { supabase } from '../lib/supabaseClient'; // Import the Supabase client
import './Auth.css';

const Login = () => {
<<<<<<< HEAD
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: ''
  });
  const [roleError, setRoleError] = useState('');
  const navigate = useNavigate();

  const roles = [
    {
      id: 'advocate',
      title: 'Advocate',
      icon: '⚖️',
      route: '/advocate/dashboard'
    },
    {
      id: 'clerk',
      title: 'Legal Clerk',
      icon: '📋',
      route: '/clerk/dashboard'
    },
    {
      id: 'student',
      title: 'Law Student',
      icon: '🎓',
      route: '/student/dashboard'
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.role) {
      setRoleError('Please select your role');
      return;
    }

    // Add your authentication logic here
    console.log('Login attempt with:', formData);
    
    // Store user data
    localStorage.setItem('userData', JSON.stringify({
      email: formData.email,
      role: formData.role
    }));
    
    // Get the selected role's route
    const selectedRole = roles.find(role => role.id === formData.role);
    // Redirect to appropriate dashboard
    navigate(selectedRole.route);
=======
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State for error messages
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    try {
      // 1. Authenticate with Supabase
      const { data: supabaseAuthData, error: supabaseAuthError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (supabaseAuthError) {
        throw supabaseAuthError;
      }

      const supabaseToken = supabaseAuthData.session.access_token;

      // 2. Send Supabase JWT to your backend
      const backendResponse = await loginUser(supabaseToken);
      console.log('Backend Login successful:', backendResponse);

      // Store token or user info in localStorage/sessionStorage if needed
      localStorage.setItem('token', supabaseToken); // Store the Supabase token
      navigate('/dashboard');
    } catch (err) {
      console.error('Login failed:', err);
      setError(err.message || 'Login failed. Please check your credentials.');
    }
>>>>>>> cde8218252e5c5496e3c9509cc58099b69c51082
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Log In to Your Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="auth-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              className="auth-input"
            />
          </div>
          <div className="form-group">
            <label>Select Your Role</label>
            <div className="role-options">
              {roles.map((role) => (
                <div
                  key={role.id}
                  className={`role-option ${formData.role === role.id ? 'selected' : ''}`}
                  onClick={() => handleChange({ target: { name: 'role', value: role.id } })}
                >
                  <span className="role-icon">{role.icon}</span>
                  <span className="role-title">{role.title}</span>
                </div>
              ))}
            </div>
            {roleError && <p className="error-message">{roleError}</p>}
          </div>
          <button type="submit" className="auth-btn">
            Log In
          </button>
        </form>
        {error && <p className="error-message">{error}</p>} {/* Display error message */}
        <p className="auth-link">
          Don't have an account? <span onClick={() => navigate('/register')}>Register now</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
