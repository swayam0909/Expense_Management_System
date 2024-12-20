// src/pages/Notifications.js
import React from 'react';
import '../styles/AdminNotificatoins.css'
const AdminNotifications = () => {
  return (
    <div className="page-container">
      <h2>Notifications</h2>
      <div className="notification">
        <h3>System Update</h3>
        <p>New updates available for the system. Please review the details.</p>
      </div>
      <div className="notification">
        <h3>New Expense Submitted</h3>
        <p>John Doe has submitted a new expense of $50 for food.</p>
      </div>
      {/* More notifications can be added */}
    </div>
  );
};

export default AdminNotifications;
