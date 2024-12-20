// src/pages/Analytics.js
import React from 'react';
import { Bar } from 'react-chartjs-2'; // Assuming you're using Chart.js
import { Pie } from 'react-chartjs-2';
import '../styles/AdminAnalytics.css'
const AdminAnalytics = () => {
  // Sample data for charts
  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Expenses',
        data: [300, 500, 700, 200, 600],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  const pieChartData = {
    labels: ['Food', 'Transport', 'Utilities', 'Entertainment'],
    datasets: [
      {
        data: [400, 200, 150, 100],
        backgroundColor: ['red', 'blue', 'green', 'yellow']
      }
    ]
  };

  return (
    <div className="page-container">
      <h2>Expense Analytics</h2>
      <div className="charts-container">
        <div className="chart">
          <h3>Expense Trends</h3>
          <Bar data={barChartData} />
        </div>
        <div className="chart">
          <h3>Expense Distribution</h3>
          <Pie data={pieChartData} />
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
