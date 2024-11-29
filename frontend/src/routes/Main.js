import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from '../pages/App';
import Dashboard from '../components/Dashboard';
import ForgotPassword from '../components/forgot-password'; // Import the ForgotPassword component

const Main = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />

        <Route path="/dashboard" element={<Dashboard />} />
      
        <Route path="/forgot-password" element={<ForgotPassword />} /> {/* New route for Forgot Password */}
      </Routes>
    </Router>
  );
};

export default Main;
