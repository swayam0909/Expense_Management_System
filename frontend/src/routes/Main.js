import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import App from '../pages/App';
import Dashboard from '../components/Dashboard';
import ForgotPassword from '../components/forgot-password'; // Import the ForgotPassword component
import Expense from '../components/Expense'; // Import Expense component
import Income from '../components//Income';   // Import Income component
import Report from '../components//Report';   // Import Report component
// import Settings from './Settings'; // Import Settings component

const Main = () => {
  return (
    <Router>
      <div className="App">
        {/* Navigation Links
        <div className="nav-links">
          <Link to="/expense">Expenses</Link>
          <Link to="/income">Income</Link>
          <Link to="/report">Report</Link>
          <Link to="/settings">Settings</Link>
        </div> */}

        {/* Routes */}
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/forgot-password" element={<ForgotPassword />} /> {/* New route for Forgot Password */}
          
          {/* Your new routes */}
          <Route path="/expense" element={<Expense />} />
          <Route path="/income" element={<Income />} />
          <Route path="/report" element={<Report />} />
          {/* <Route path="/settings" element={<Settings />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default Main;
