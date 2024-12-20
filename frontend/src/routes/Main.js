import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from '../pages/App';
import Dashboard from '../components/Dashboard';
import ForgotPassword from '../components/forgot-password';
import Expense from '../components/Expense';
import Income from '../components/Income';
import SettingsPage from '../components/SettingsPage.js';
import Report from '../components/Report';
import TotalExpenses from '../components/TotalExpenses.js';
import TotalIncome from '../components/TotalIncome.js';
import ResetPassword from '../components/ResetPassword';  // Import ResetPassword component
import Home from '../pages/landingPage.js'
import AdminLogin from '../components/AdminLogin.js';
import AdminDashboard from '../components/AdminDashboard.js';
import UserManagement from '../components/UserManagement';
import AdminAnalytics from '../components/AdminAnalytics.js';
import AdminExpenses from '../components/AdminExpense.js';
import AdminGoals from '../components/AdminGoals.js';
import AdminNotifications from '../components/AdminNotifications.js';
import AdminSettings from '../components/AdminSettings.js'

const Main = () => {
  return (
    <Router>
      <div className="landingPage">
        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<App />} />
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/total-income" element={<TotalIncome />} />
          <Route path="/total-expenses" element={<TotalExpenses />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path='/settings' element={<SettingsPage/>}/>
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} /> {/* New route for Reset Password */}
          <Route path="/expense" element={<Expense />} />
          <Route path="/income" element={<Income />} />
          <Route path="/report" element={<Report />} />

          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/user-management" element={<UserManagement/>}/>

          <Route path="/admin-expenses" element={<AdminExpenses />} />
        <Route path="/admin-analytics" element={<AdminAnalytics />} />
        <Route path="/admin-goals" element={<AdminGoals />} />
        <Route path="/admin-notifications" element={<AdminNotifications />} />
        <Route path="/admin-settings" element={<AdminSettings />} />
        </Routes>
      </div>
    </Router>
  );
};

export default Main;
