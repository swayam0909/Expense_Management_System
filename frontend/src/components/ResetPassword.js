import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenFromUrl = queryParams.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl); // Save token
    } else {
      setError('Invalid or expired reset token.');
    }
  }, [location.search]);

  const handlePasswordReset = () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    // Call API to reset the password
    fetch('http://localhost:8080/auth/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        resetToken: token,
        newPassword: newPassword,
      }),
    })
      .then((response) => {
        if (response.ok) {
          setSuccess(true);
          setTimeout(() => navigate('/'), 3000); // Redirect to login page after 3 seconds
        } else {
          return response.json().then((data) => {
            setError(data.message || 'Failed to reset password');
          });
        }
      })
      .catch(() => {
        setError('An error occurred while resetting password');
      });
  };

  const styles = {
    container: {
      maxWidth: '400px',
      margin: '50px auto',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '10px',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
    },
    heading: {
      textAlign: 'center',
      color: '#512da8',
      marginBottom: '20px',
    },
    inputGroup: {
      marginBottom: '15px',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: 'bold',
      color: '#333',
    },
    input: {
      width: '100%',
      padding: '10px',
      fontSize: '16px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      outlineColor: '#512da8',
    },
    button: {
      width: '100%',
      padding: '10px',
      fontSize: '16px',
      backgroundColor: '#512da8',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      marginTop: '10px',
    },
    buttonHover: {
      backgroundColor: '#3b1b98',
    },
    error: {
      color: 'red',
      marginBottom: '10px',
    },
    success: {
      color: 'green',
      marginBottom: '10px',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Reset Password</h2>
      {error && <p style={styles.error}>{error}</p>}
      {success ? (
        <p style={styles.success}>Password reset successfully! Redirecting to login...</p>
      ) : (
        <>
          <div style={styles.inputGroup}>
            <label style={styles.label}>New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={styles.input}
            />
          </div>
          <button
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
            onClick={handlePasswordReset}
          >
            Reset Password
          </button>
        </>
      )}
    </div>
  );
};

export default ResetPassword;
