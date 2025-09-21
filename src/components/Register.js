import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../lib/api'; // Import loginUser for backend registration via JWT
import { supabase } from '../lib/supabaseClient'; // Import the Supabase client
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  });
<<<<<<< HEAD
  const [roleError, setRoleError] = useState('');
=======
  const [error, setError] = useState(''); // State for error messages
>>>>>>> cde8218252e5c5496e3c9509cc58099b69c51082
  const navigate = useNavigate();

  const roles = [
    {
      id: 'advocate',
      title: 'Advocate',
      icon: '⚖️',
      route: '/advocate/dashboard'
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

  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
    
    // Basic validation
    if (!formData.role) {
      setRoleError('Please select your role');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters long!');
=======
    setError(''); // Clear previous errors

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
>>>>>>> cde8218252e5c5496e3c9509cc58099b69c51082
      return;
    }

    try {
<<<<<<< HEAD
      console.log('Registration attempt with:', formData);
      
      // Store user data in localStorage
      localStorage.setItem('userData', JSON.stringify({
        name: formData.name,
        email: formData.email,
        role: formData.role
      }));

      // Find selected role and redirect to appropriate dashboard
      const selectedRole = roles.find(role => role.id === formData.role);
      navigate(selectedRole.route);
      
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
=======
      // 1. Sign up with Supabase
      const { data: supabaseAuthData, error: supabaseAuthError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name, // Store full name in Supabase user metadata
          },
        },
      });

      if (supabaseAuthError) {
        throw supabaseAuthError;
      }

      // If user is created but not confirmed (e.g., email verification needed)
      if (!supabaseAuthData.session) {
        setError('Registration successful! Please check your email to verify your account.');
        // Optionally redirect to a verification message page
        // navigate('/verify-email');
        return;
      }

      const supabaseToken = supabaseAuthData.session.access_token;

      // 2. Send Supabase JWT to your backend for user creation/login
      const backendResponse = await loginUser(supabaseToken);
      console.log('Backend Registration/Login successful:', backendResponse);

      // Optionally, store token or user info in localStorage/sessionStorage
      // localStorage.setItem('token', supabaseToken); // Store the Supabase token if needed for immediate login
      navigate('/login'); // Redirect to login after successful registration
    } catch (err) {
      console.error('Registration failed:', err);
      setError(err.message || 'Registration failed. Please try again.');
>>>>>>> cde8218252e5c5496e3c9509cc58099b69c51082
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Create Your Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
              className="auth-input"
            />
          </div>
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
              placeholder="Create a password"
              className="auth-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm your password"
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
            Register Now
          </button>
        </form>
        {error && <p className="error-message">{error}</p>} {/* Display error message */}
        <p className="auth-link">
          Already have an account? <span onClick={() => navigate('/login')}>Log in</span>
        </p>
      </div>
    </div>
  );
};

export default Register;
