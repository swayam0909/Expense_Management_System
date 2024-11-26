import React from 'react';
import Expense from '../components/Expense.js';
import Income from '../components/Income.js';
import Report from '../components/Report.js';
import Profile from '../components/Profile.js';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Welcome to your Dashboard</h1>
      <div className="sections">
        <Expense />
        <Income />
        <Report />
        <Profile />
      </div>
    </div>
  );
};

export default Dashboard;
