import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/style.css';

const AuthForm = ({ isSignUp, toggleForm }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match for signup
    if (isSignUp && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const url = isSignUp ? '/auth/register' : '/auth/login'; // Update with your backend endpoints
    const payload = isSignUp
      ? { username: formData.username, email: formData.email, password: formData.password }
      : { email: formData.email, password: formData.password };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        navigate('/dashboard'); // Redirect to dashboard on success
      } else {
        const errorText = await response.text(); // Get the error message as text
        setErrorMessage(errorText); // Set the error message to be displayed
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong!');
    }
  };

  return (
    <div className={`form-container ${isSignUp ? 'sign-up' : 'sign-in'}`}>
      <form onSubmit={handleSubmit}>
        <h1>{isSignUp ? 'Create Account' : 'Sign In'}</h1>
        <span>{isSignUp ? 'or use your email for registration' : 'or use your email and password'}</span>

        {isSignUp && (
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        )}
        
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {isSignUp && (
          <input
            type="password"
            name="confirmPassword"
            placeholder="Retype Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        )}

        <button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
      </form>

      {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Display error message */}

      <div className="toggle-container">
        <button onClick={toggleForm}>{isSignUp ? 'Sign In' : 'Sign Up'}</button>
      </div>
    </div>
  );
};

export default AuthForm;
