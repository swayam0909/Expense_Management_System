import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSave, FaUndo, FaMoon, FaSun } from 'react-icons/fa';
import axios from 'axios';
import '../styles/AdminSettings.css';

const AdminSettings = () => {
  const navigate = useNavigate();

  const [adminDetails, setAdminDetails] = useState({
    email: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check if admin is logged in
    const adminEmail = localStorage.getItem('adminEmail');
    if (!adminEmail) {
      navigate('/adminLogin');
    } else {
      // Fetch admin email (you can adjust this to your real API)
      axios.get('http://localhost:8080/api/admin/settings', { params: { email: adminEmail } })
        .then(response => {
          setAdminDetails({ email: response.data.email });
        })
        .catch(err => {
          setError('Failed to fetch admin details.');
        });
    }
  }, [navigate]);

  const handleToggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await axios.put('http://localhost:8080/api/admin/settings', {
        email: adminDetails.email
      });

      setLoading(false);
      alert('Settings updated successfully!');
    } catch (err) {
      setLoading(false);
      setError('Failed to update settings.');
    }
  };

  const handleReset = () => {
    setAdminDetails({ email: '' });
    setError('');
  };

  return (
    <div className={`admin-settings ${darkMode ? 'dark-mode' : ''}`}>
      <h2>Admin Settings</h2>
      {error && <div className="error-message">{error}</div>}

      <div className="settings-form">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={adminDetails.email}
            onChange={(e) => setAdminDetails({ email: e.target.value })}
            placeholder="Enter your email"
            disabled
          />
        </div>

        <div className="form-actions">
          <button onClick={handleSave} disabled={loading}>
            <FaSave /> {loading ? 'Saving...' : 'Save'}
          </button>
          <button onClick={handleReset}>
            <FaUndo /> Reset
          </button>
        </div>

        <div className="dark-mode-toggle">
          <button onClick={handleToggleDarkMode}>
            {darkMode ? <FaSun /> : <FaMoon />} {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
