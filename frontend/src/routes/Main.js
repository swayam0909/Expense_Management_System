import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from '../pages/App';
import Dashboard from '../components/Dashboard';
import ForgotPassword from '../components/forgot-password';
import Expense from '../components/Expense';
import Income from '../components/Income';
import Report from '../components/Report';
import ResetPassword from '../components/ResetPassword';  // Import ResetPassword component

const Main = () => {
  return (
    <Router>
      <div className="App">
        {/* Routes */}
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} /> {/* New route for Reset Password */}
          <Route path="/expense" element={<Expense />} />
          <Route path="/income" element={<Income />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </div>
    </Router>
  );
};

export default Main;
