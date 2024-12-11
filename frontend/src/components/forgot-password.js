import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ForgotPassword.css';

const App = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' }); // Feedback message

  const navigate = useNavigate();

  const handleToggle = () => {
    setIsSignUp((prev) => !prev);
    setMessage({ type: '', text: '' }); // Clear feedback messages on toggle
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(forgotEmail)) {
      setMessage({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail }),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Password reset link sent to your email.' });
        setIsForgotPassword(false);
      } else {
        const errorText = await response.text();
        setMessage({ type: 'error', text: `Error: ${errorText}` });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Something went wrong. Please try again later.' });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (isSignUp && formData.password !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match!' });
      return;
    }

    const url = isSignUp
      ? 'http://localhost:8080/auth/register'
      : 'http://localhost:8080/auth/login';
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
        navigate('/dashboard');
      } else {
        const errorText = await response.text();
        setMessage({ type: 'error', text: `Error: ${errorText}` });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Something went wrong. Please try again later.' });
    }
  };

  return (
    <div className={`container ${isSignUp ? 'active' : ''}`} id="container">
      {!isForgotPassword ? (
        <>
          <div className="form-container sign-up">
            <form onSubmit={handleSubmit}>
              <h1>Create Account</h1>
              <span>or use your email for registration</span>
              <input
                type="text"
                name="username"
                placeholder="Name"
                value={formData.username}
                onChange={handleChange}
                required
              />
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
              <input
                type="password"
                name="confirmPassword"
                placeholder="Retype Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              {message.text && <p className={`message ${message.type}`}>{message.text}</p>}
              <button type="submit">Sign Up</button>
            </form>
          </div>
          <div className="form-container sign-in">
            <form onSubmit={handleSubmit}>
              <h1>Sign In</h1>
              <span>or use your email and password</span>
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
              <a href="#" onClick={() => setIsForgotPassword(true)}>
                Forgot Your Password?
              </a>
              {message.text && <p className={`message ${message.type}`}>{message.text}</p>}
              <button type="submit">Sign In</button>
            </form>
          </div>
          <div className="toggle-container">
            <div className="toggle">
              <div className="toggle-panel toggle-left">
                <h1>Welcome Back!</h1>
                <p>Enter your personal details to use all site features</p>
                <button className="hidden" onClick={handleToggle}>
                  Sign In
                </button>
              </div>
              <div className="toggle-panel toggle-right">
                <h1>Hello User!</h1>
                <p>Register with your personal details to use all site features</p>
                <button className="hidden" onClick={handleToggle}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="form-container forgot-password">
          <form onSubmit={handleForgotPassword}>
            <h1>Forgot Password</h1>
            <span>Enter your email to reset your password</span>
            <input
              type="email"
              placeholder="Email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              required
            />
            {message.text && <p className={`message ${message.type}`}>{message.text}</p>}
            <button type="submit">Send Reset Link</button>
            <button type="button" onClick={() => setIsForgotPassword(false)}>
              Back to Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default App;
