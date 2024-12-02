import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/style.css';


const App = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [email, setEmail] = useState('');
  
   
  const [isForgotPassword, setIsForgotPassword] = useState(false); // New state for Forgot Password
  const [forgotEmail, setForgotEmail] = useState(""); // Email input for Forgot Password

  const navigate = useNavigate();

  const handleToggle = () => {
    setIsSignUp((prev) => !prev);
  };

  

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail }),
      });

      if (response.ok) {
        alert('Password reset link sent to your email.');
        setIsForgotPassword(false); // Return to login screen
      } else {
        alert('Error: ' + (await response.text()));
      }
    } catch (error) {
      console.error('Error during password reset:', error);
      alert('Something went wrong!');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignUp && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
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
        localStorage.setItem('userEmail', formData.email);
        navigate('/dashboard');
      } else {
        alert('Error: ' + (await response.text()));
      }
    } catch (error) {
      console.error('Error during submit:', error);
      alert('Something went wrong!');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f5f5f5',
  }}>
    <div className={`container ${isSignUp ? 'active' : ''}`} >
      {!isForgotPassword ? (
        <>
          {/* Sign Up Form */}
          <div className='overallForm'>
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
              <button type="submit">Sign Up</button>
            </form>
          </div>

          {/* Sign In Form */}
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
              <button type="submit">Sign In</button>
            </form>
          </div>

          {/* Toggle Panels */}
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
            <button type="submit">Send Reset Link</button>
            <button type="button" onClick={() => setIsForgotPassword(false)}>
              Back to Login
            </button>
          </form>
        </div>
      )}
    </div>
    </div>
  );
};

export default App;
