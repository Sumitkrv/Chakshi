import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: ''
  });
  const [error, setError] = useState('');
  const [roleError, setRoleError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

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
    setError('');
    setRoleError('');
    
    if (!formData.role) {
      setRoleError('Please select your role');
      return;
    }

    try {
      await login(formData);
      
      // Get the selected role's route
      const selectedRole = roles.find(role => role.id === formData.role);
      navigate(selectedRole.route);
    } catch (err) {
      console.error('Login failed:', err);
      setError(err.message || 'Login failed. Please check your credentials.');
    }
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
        {error && <p className="error-message">{error}</p>}
        <p className="auth-link">
          Don't have an account? <span onClick={() => navigate('/register')}>Register now</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
