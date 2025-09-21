import React, { useState } from 'react';import React, { useState } from 'react';import React, { useState } from 'react';import React, { useState } from 'react';import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';import { useNavigate } from 'react-router-dom';

import './Auth.css';

import { useAuth } from '../contexts/AuthContext';import { useNavigate } from 'react-router-dom';

const Register = () => {

  const [formData, setFormData] = useState({import './Auth.css';

    name: '',

    email: '',import { useAuth } from '../contexts/AuthContext';import { useNavigate } from 'react-router-dom';import { useNavigate } from 'react-router-dom';

    password: '',

    confirmPassword: '',const Register = () => {

    role: ''

  });  const [formData, setFormData] = useState({import './Auth.css';

  const [error, setError] = useState('');

  const [roleError, setRoleError] = useState('');    name: '',

  const navigate = useNavigate();

  const { register } = useAuth();    email: '',import { useAuth } from '../contexts/AuthContext';import { useAuth } from '../contexts/AuthContext';



  const roles = [    password: '',

    {

      id: 'advocate',    confirmPassword: '',const Register = () => {

      title: 'Advocate',

      icon: '⚖️',    role: ''

      route: '/advocate/dashboard'

    },  });  const [formData, setFormData] = useState({import './Auth.css';import './Auth.css';

    {

      id: 'student',  const [error, setError] = useState('');

      title: 'Law Student',

      icon: '🎓',  const [roleError, setRoleError] = useState('');    name: '',

      route: '/student/dashboard'

    }  const navigate = useNavigate();

  ];

  const { register } = useAuth();    email: '',

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value  const roles = [    password: '',

    });

    if (e.target.name === 'role') {    {

      setRoleError('');

    }      id: 'advocate',    confirmPassword: '',const Register = () => {const Register = () => {

  };

      title: 'Advocate',

  const handleSubmit = async (e) => {

    e.preventDefault();      icon: '⚖️',    role: ''

    setError('');

    setRoleError('');      route: '/advocate/dashboard'



    if (!formData.role) {    },  });  const [formData, setFormData] = useState({  const [formData, setFormData] = useState({

      setRoleError('Please select your role');

      return;    {

    }

      id: 'student',  const [error, setError] = useState('');

    if (formData.password !== formData.confirmPassword) {

      setError('Passwords do not match');      title: 'Law Student',

      return;

    }      icon: '🎓',  const [roleError, setRoleError] = useState('');    name: '',    name: '',



    if (formData.password.length < 6) {      route: '/student/dashboard'

      setError('Password must be at least 6 characters long');

      return;    }  const navigate = useNavigate();

    }

  ];

    try {

      await register(formData);  const { register } = useAuth();    email: '',    email: '',

      const selectedRole = roles.find(role => role.id === formData.role);

      navigate(selectedRole.route);  const handleChange = (e) => {

    } catch (err) {

      console.error('Registration failed:', err);    setFormData({

      setError(err.message || 'Registration failed. Please try again.');

    }      ...formData,

  };

      [e.target.name]: e.target.value  const roles = [    password: '',    password: '',

  return React.createElement('div', { className: 'auth-container' },

    React.createElement('div', { className: 'auth-form' },    });

      React.createElement('h2', null, 'Create Your Account'),

      React.createElement('form', { onSubmit: handleSubmit },    if (e.target.name === 'role') {    {

        React.createElement('div', { className: 'form-group' },

          React.createElement('label', { htmlFor: 'name' }, 'Full Name'),      setRoleError('');

          React.createElement('input', {

            type: 'text',    }      id: 'advocate',    confirmPassword: '',    confirmPassword: '',

            id: 'name',

            name: 'name',  };

            value: formData.name,

            onChange: handleChange,      title: 'Advocate',

            required: true,

            placeholder: 'Enter your full name',  const handleSubmit = async (e) => {

            className: 'auth-input'

          })    e.preventDefault();      icon: '⚖️',    role: ''    role: ''

        ),

        React.createElement('div', { className: 'form-group' },    setError('');

          React.createElement('label', { htmlFor: 'email' }, 'Email'),

          React.createElement('input', {    setRoleError('');      route: '/advocate/dashboard'

            type: 'email',

            id: 'email',

            name: 'email',

            value: formData.email,    // Basic validation    },  });  });

            onChange: handleChange,

            required: true,    if (!formData.role) {

            placeholder: 'Enter your email',

            className: 'auth-input'      setRoleError('Please select your role');    {

          })

        ),      return;

        React.createElement('div', { className: 'form-group' },

          React.createElement('label', { htmlFor: 'password' }, 'Password'),    }      id: 'student',  const [error, setError] = useState('');  const [error, setError] = useState('');

          React.createElement('input', {

            type: 'password',

            id: 'password',

            name: 'password',    if (formData.password !== formData.confirmPassword) {      title: 'Law Student',

            value: formData.password,

            onChange: handleChange,      setError('Passwords do not match');

            required: true,

            minLength: 6,      return;      icon: '🎓',  const [roleError, setRoleError] = useState('');  const [roleError, setRoleError] = useState('');

            placeholder: 'Create a password (min. 6 characters)',

            className: 'auth-input'    }

          })

        ),      route: '/student/dashboard'

        React.createElement('div', { className: 'form-group' },

          React.createElement('label', { htmlFor: 'confirmPassword' }, 'Confirm Password'),    if (formData.password.length < 6) {

          React.createElement('input', {

            type: 'password',      setError('Password must be at least 6 characters long');    }  const navigate = useNavigate();  const navigate = useNavigate();

            id: 'confirmPassword',

            name: 'confirmPassword',      return;

            value: formData.confirmPassword,

            onChange: handleChange,    }  ];

            required: true,

            placeholder: 'Confirm your password',

            className: 'auth-input'

          })    try {  const { register } = useAuth();  const { register } = useAuth();

        ),

        React.createElement('div', { className: 'form-group' },      await register(formData);

          React.createElement('label', null, 'Select Your Role'),

          React.createElement('div', { className: 'role-options' },        const handleChange = (e) => {

            roles.map(role =>

              React.createElement('div', {      // Find selected role and redirect to appropriate dashboard

                key: role.id,

                className: `role-option ${formData.role === role.id ? 'selected' : ''}`,      const selectedRole = roles.find(role => role.id === formData.role);    setFormData({

                onClick: () => handleChange({ target: { name: 'role', value: role.id } })

              },      navigate(selectedRole.route);

                React.createElement('span', { className: 'role-icon' }, role.icon),

                React.createElement('span', { className: 'role-title' }, role.title)    } catch (err) {      ...formData,

              )

            )      console.error('Registration failed:', err);

          ),

          roleError && React.createElement('p', { className: 'error-message' }, roleError)      setError(err.message || 'Registration failed. Please try again.');      [e.target.name]: e.target.value  const roles = [  const roles = [

        ),

        React.createElement('button', { type: 'submit', className: 'auth-btn' }, 'Register Now')    }

      ),

      error && React.createElement('p', { className: 'error-message' }, error),  };    });

      React.createElement('p', { className: 'auth-link' },

        'Already have an account? ',

        React.createElement('span', { onClick: () => navigate('/login') }, 'Log in')

      )  return (    if (e.target.name === 'role') {    {    {

    )

  );    <div className="auth-container">

};

      <div className="auth-form">      setRoleError('');

export default Register;
        <h2>Create Your Account</h2>

        <form onSubmit={handleSubmit}>    }      id: 'advocate',      id: 'advocate',

          <div className="form-group">

            <label htmlFor="name">Full Name</label>  };

            <input

              type="text"      title: 'Advocate',      title: 'Advocate',

              id="name"

              name="name"  const handleSubmit = async (e) => {

              value={formData.name}

              onChange={handleChange}    e.preventDefault();      icon: '⚖️',      icon: '⚖️',

              required

              placeholder="Enter your full name"    setError('');

              className="auth-input"

            />    setRoleError('');      route: '/advocate/dashboard'      route: '/advocate/dashboard'

          </div>

          <div className="form-group">

            <label htmlFor="email">Email</label>

            <input    // Basic validation    },    },

              type="email"

              id="email"    if (!formData.role) {

              name="email"

              value={formData.email}      setRoleError('Please select your role');    {    {

              onChange={handleChange}

              required      return;

              placeholder="Enter your email"

              className="auth-input"    }      id: 'student',      id: 'student',

            />

          </div>

          <div className="form-group">

            <label htmlFor="password">Password</label>    if (formData.password !== formData.confirmPassword) {      title: 'Law Student',      title: 'Law Student',

            <input

              type="password"      setError('Passwords do not match');

              id="password"

              name="password"      return;      icon: '🎓',      icon: '🎓',

              value={formData.password}

              onChange={handleChange}    }

              required

              minLength="6"      route: '/student/dashboard'      route: '/student/dashboard'

              placeholder="Create a password (min. 6 characters)"

              className="auth-input"    if (formData.password.length < 6) {

            />

          </div>      setError('Password must be at least 6 characters long');    }    }

          <div className="form-group">

            <label htmlFor="confirmPassword">Confirm Password</label>      return;

            <input

              type="password"    }  ];  ];  const handleSubmit = async (e) => {

              id="confirmPassword"

              name="confirmPassword"

              value={formData.confirmPassword}

              onChange={handleChange}    try {    e.preventDefault();

              required

              placeholder="Confirm your password"      await register(formData);

              className="auth-input"

            />        const handleChange = (e) => {    setError('');

          </div>

          <div className="form-group">      // Find selected role and redirect to appropriate dashboard

            <label>Select Your Role</label>

            <div className="role-options">      const selectedRole = roles.find(role => role.id === formData.role);    setFormData({    setRoleError('');

              {roles.map((role) => (

                <div      navigate(selectedRole.route);

                  key={role.id}

                  className={`role-option ${formData.role === role.id ? 'selected' : ''}`}    } catch (err) {      ...formData,

                  onClick={() => handleChange({ target: { name: 'role', value: role.id } })}

                >      console.error('Registration failed:', err);

                  <span className="role-icon">{role.icon}</span>

                  <span className="role-title">{role.title}</span>      setError(err.message || 'Registration failed. Please try again.');      [e.target.name]: e.target.value    // Validation

                </div>

              ))}    }

            </div>

            {roleError && <p className="error-message">{roleError}</p>}  };    });    if (formData.password !== formData.confirmPassword) {

          </div>

          <button type="submit" className="auth-btn">

            Register Now

          </button>  return (    if (e.target.name === 'role') {      setError('Passwords do not match');

        </form>

        {error && <p className="error-message">{error}</p>}    <div className="auth-container">

        <p className="auth-link">

          Already have an account? <span onClick={() => navigate('/login')}>Log in</span>      <div className="auth-form">      setRoleError('');      return;

        </p>

      </div>        <h2>Create Your Account</h2>

    </div>

  );        <form onSubmit={handleSubmit}>    }    }

};

          <div className="form-group">

export default Register;
            <label htmlFor="name">Full Name</label>  };

            <input

              type="text"    if (!formData.role) {

              id="name"

              name="name"  const handleSubmit = async (e) => {      setRoleError('Please select a role');

              value={formData.name}

              onChange={handleChange}    e.preventDefault();      return;

              required

              placeholder="Enter your full name"    setError('');    }

              className="auth-input"

            />    setRoleError('');

          </div>

          <div className="form-group">    try {

            <label htmlFor="email">Email</label>

            <input    // Basic validation      await register(formData);

              type="email"

              id="email"    if (!formData.role) {      

              name="email"

              value={formData.email}      setRoleError('Please select your role');      // Find selected role and redirect to appropriate dashboard

              onChange={handleChange}

              required      return;      const selectedRole = roles.find(role => role.id === formData.role);

              placeholder="Enter your email"

              className="auth-input"    }      navigate(selectedRole.route);

            />

          </div>    } catch (err) {

          <div className="form-group">

            <label htmlFor="password">Password</label>    if (formData.password !== formData.confirmPassword) {      console.error('Registration failed:', err);

            <input

              type="password"      setError('Passwords do not match');      setError(err.message || 'Registration failed. Please try again.');

              id="password"

              name="password"      return;    }

              value={formData.password}

              onChange={handleChange}    }  };

              required

              minLength="6"

              placeholder="Create a password (min. 6 characters)"

              className="auth-input"    if (formData.password.length < 6) {  const handleChange = (e) => {

            />

          </div>      setError('Password must be at least 6 characters long');    setFormData({

          <div className="form-group">

            <label htmlFor="confirmPassword">Confirm Password</label>      return;      ...formData,

            <input

              type="password"    }      [e.target.name]: e.target.value

              id="confirmPassword"

              name="confirmPassword"    });

              value={formData.confirmPassword}

              onChange={handleChange}    try {    if (e.target.name === 'role') {

              required

              placeholder="Confirm your password"      await register(formData);      setRoleError('');

              className="auth-input"

            />          }

          </div>

          <div className="form-group">      // Find selected role and redirect to appropriate dashboard  };

            <label>Select Your Role</label>

            <div className="role-options">      const selectedRole = roles.find(role => role.id === formData.role);

              {roles.map((role) => (

                <div      navigate(selectedRole.route);  return (

                  key={role.id}

                  className={`role-option ${formData.role === role.id ? 'selected' : ''}`}    } catch (err) {    <div className="auth-container">

                  onClick={() => handleChange({ target: { name: 'role', value: role.id } })}

                >      console.error('Registration failed:', err);      <div className="auth-form">

                  <span className="role-icon">{role.icon}</span>

                  <span className="role-title">{role.title}</span>      setError(err.message || 'Registration failed. Please try again.');        <h2>Create Your Account</h2>

                </div>

              ))}    }        <form onSubmit={handleSubmit}>

            </div>

            {roleError && <p className="error-message">{roleError}</p>}  };          <div className="form-group">

          </div>

          <button type="submit" className="auth-btn">            <label htmlFor="name">Full Name</label>

            Register Now

          </button>  return (            <input

        </form>

        {error && <p className="error-message">{error}</p>}    <div className="auth-container">              type="text"

        <p className="auth-link">

          Already have an account? <span onClick={() => navigate('/login')}>Log in</span>      <div className="auth-form">              id="name"

        </p>

      </div>        <h2>Create Your Account</h2>              name="name"

    </div>

  );        <form onSubmit={handleSubmit}>              value={formData.name}

};

          <div className="form-group">              onChange={handleChange}

export default Register;
            <label htmlFor="name">Full Name</label>              required

            <input              placeholder="Enter your full name"

              type="text"              className="auth-input"

              id="name"            />

              name="name"          </div>

              value={formData.name}          <div className="form-group">

              onChange={handleChange}            <label htmlFor="email">Email</label>

              required            <input

              placeholder="Enter your full name"              type="email"

              className="auth-input"              id="email"

            />              name="email"

          </div>              value={formData.email}

          <div className="form-group">              onChange={handleChange}

            <label htmlFor="email">Email</label>              required

            <input              placeholder="Enter your email"

              type="email"              className="auth-input"

              id="email"            />

              name="email"          </div>

              value={formData.email}          <div className="form-group">

              onChange={handleChange}            <label htmlFor="password">Password</label>

              required            <input

              placeholder="Enter your email"              type="password"

              className="auth-input"              id="password"

            />              name="password"

          </div>              value={formData.password}

          <div className="form-group">              onChange={handleChange}

            <label htmlFor="password">Password</label>              required

            <input              minLength="6"

              type="password"              placeholder="Create a password (min. 6 characters)"

              id="password"              className="auth-input"

              name="password"            />

              value={formData.password}          </div>

              onChange={handleChange}          <div className="form-group">

              required            <label htmlFor="confirmPassword">Confirm Password</label>

              minLength="6"            <input

              placeholder="Create a password (min. 6 characters)"              type="password"

              className="auth-input"              id="confirmPassword"

            />              name="confirmPassword"

          </div>              value={formData.confirmPassword}

          <div className="form-group">              onChange={handleChange}

            <label htmlFor="confirmPassword">Confirm Password</label>              required

            <input              placeholder="Confirm your password"

              type="password"              className="auth-input"

              id="confirmPassword"            />

              name="confirmPassword"          </div>

              value={formData.confirmPassword}          <div className="form-group">

              onChange={handleChange}            <label>Select Your Role</label>

              required            <div className="role-options">

              placeholder="Confirm your password"              {roles.map((role) => (

              className="auth-input"                <div

            />                  key={role.id}

          </div>                  className={`role-option ${formData.role === role.id ? 'selected' : ''}`}

          <div className="form-group">                  onClick={() => handleChange({ target: { name: 'role', value: role.id } })}

            <label>Select Your Role</label>                >

            <div className="role-options">                  <span className="role-icon">{role.icon}</span>

              {roles.map((role) => (                  <span className="role-title">{role.title}</span>

                <div                </div>

                  key={role.id}              ))}

                  className={`role-option ${formData.role === role.id ? 'selected' : ''}`}            </div>

                  onClick={() => handleChange({ target: { name: 'role', value: role.id } })}            {roleError && <p className="error-message">{roleError}</p>}

                >          </div>

                  <span className="role-icon">{role.icon}</span>          <button type="submit" className="auth-btn">

                  <span className="role-title">{role.title}</span>            Register Now

                </div>          </button>

              ))}        </form>

            </div>        {error && <p className="error-message">{error}</p>}

            {roleError && <p className="error-message">{roleError}</p>}        <p className="auth-link">

          </div>          Already have an account? <span onClick={() => navigate('/login')}>Log in</span>

          <button type="submit" className="auth-btn">        </p>

            Register Now      </div>

          </button>    </div>

        </form>  );

        {error && <p className="error-message">{error}</p>}};

        <p className="auth-link">

          Already have an account? <span onClick={() => navigate('/login')}>Log in</span>export default Register;
        </p>
      </div>
    </div>
  );
};

export default Register;