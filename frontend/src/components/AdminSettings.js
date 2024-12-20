// src/pages/Settings.js
import React from 'react';
import '../styles/AdminSettings.css'
const Settings = () => {
  return (
    <div className="page-container">
      <h2>Settings</h2>
      <div className="setting">
        <label>
          Enable Email Notifications:
          <input type="checkbox" />
        </label>
      </div>
      <div className="setting">
        <label>
          System Theme:
          <select>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
      </div>
      <div className="setting">
        <button>Save Changes</button>
      </div>
    </div>
  );
};

export default Settings;
