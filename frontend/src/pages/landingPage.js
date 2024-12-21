import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './landingPage.css';

function LandingPage() {
  const navigate = useNavigate();

  // State to track the current image index for the carousel
  const [currentImage, setCurrentImage] = useState(0);
  const [loading, setLoading] = useState(false); // State to handle loader visibility

  // Array of local image paths for the carousel
  const images = [
    require('../assets/dashboard.png'),
    require('../assets/income.png'),
    require('../assets/report.png'),
    require('../assets/expense.png'),
    require('../assets/Screenshot 2024-12-18 182310.png')
  ];

  // useEffect to automatically change the image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length); // Cycle through images
    }, 5000); // Change image every 5 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Handle navigation to the login page
  const handleSignUp = () => {
    setLoading(true); // Show loader
    setTimeout(() => {
      setLoading(false); // Hide loader
      navigate('/login'); // Redirect to login page
    }, 2000); // Simulate delay (2 seconds)
  };

  const handleGetStarted = () => {
    setLoading(true); // Show loader
    setTimeout(() => {
      setLoading(false); // Hide loader
      navigate('/login'); // Redirect to login page
    }, 2000); // Simulate delay (2 seconds)
  };

  const handleGetStartedAdmin = () => {
    setLoading(true); // Show loader
    setTimeout(() => {
      setLoading(false); // Hide loader
      navigate('/adminLogin'); // Redirect to admin login
    }, 2000); // Simulate delay (2 seconds)
  };

  return (
    <div className="landingPage">
      {/* Loader */}
      {loading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Take Control of Your Finances</h1>
          <p>Track your expenses, set budgets, and achieve your financial goals with ease.</p>
          <div className="cta-buttons">
            <button className="cta-button" onClick={handleSignUp}>Login & SignUp</button>
            <button className="cta-button secondary" onClick={handleGetStartedAdmin}>Admin</button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Key Features</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <h3>Track Expenses</h3>
            <p>Keep a log of your daily spending.</p>
          </div>
          <div className="feature-card">
            <h3>Set Budgets</h3>
            <p>Create and monitor monthly budgets.</p>
          </div>
          <div className="feature-card">
            <h3>Goal Setting</h3>
            <p>Save for specific goals with progress tracking.</p>
          </div>
          <div className="feature-card">
            <h3>Reports</h3>
            <p>View detailed charts and reports of your spending habits.</p>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="demo">
        <h2>See it in Action</h2>
        <div className="demo-content">
          <img src={images[currentImage]} alt="App Demo" />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial">
          <p>"This app changed the way I manage my finances. It's simple and effective!"</p>
          <span>- Ananya Sharma</span>
          <p>"It's simple and effective!"</p>
          <span>- Krish</span>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing">
        <h2>Pricing Plans</h2>
        <div className="pricing-plans">
          <div className="pricing-card">
            <h3>Free Plan</h3>
            <p>Basic expense tracking.</p>
            <button className="cta-button secondary" onClick={handleSignUp}>Try Free</button>
          </div>
          <div className="pricing-card">
            <h3>Pro Plan</h3>
            <p>Advanced analytics and goal setting.</p>
            <button className="cta-button secondary" onClick={handleGetStarted}>Get Started</button>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2024 Expense Tracker</p>
          <div className="social-links">
            <a href="https://www.linkedin.com/in/swayam-raj-8091aa202/" target="_blank" rel="noopener noreferrer">
              <i className="fa fa-linkedin"></i> LinkedIn
            </a>
            <a href="https://github.com/swayam0909" target="_blank" rel="noopener noreferrer">
              <i className="fa fa-github"></i> GitHub
            </a>
            <a href="https://www.instagram.com/_._swayam__/" target="_blank" rel="noopener noreferrer">
              <i className="fa fa-instagram"></i> Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
