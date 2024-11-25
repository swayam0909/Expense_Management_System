import React, { useState } from 'react';
import './style.css';

const App = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleToggle = () => {
    setIsSignUp((prev) => !prev);
  };

  return (
    <div className={`container ${isSignUp ? 'active' : ''}`} id="container">
      {/* Sign Up Form */}
      <div className="form-container sign-up">
        <form>
          <h1>Create Account</h1>
          <span>or use your email for registration</span>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="number" placeholder="Phone Number" />
          <input type="password" placeholder="Password" />
          <input type="password" placeholder="Retype Password" />
          <button type="submit">Sign Up</button>
        </form>
      </div>

      {/* Sign In Form */}
      <div className="form-container sign-in">
        <form>
          <h1>Sign In</h1>
          <span>or use your email and password</span>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <a href="#">Forgot Your Password?</a>
          <button type="submit">Sign In</button>
        </form>
      </div>

      {/* Toggle Panels */}
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all site features</p>
            <button className="hidden" onClick={handleToggle}>Sign In</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hello User!</h1>
            <p>Register with your personal details to use all site features</p>
            <button className="hidden" onClick={handleToggle}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
