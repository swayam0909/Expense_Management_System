import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
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
          alert('Password reset successfully!');
          navigate('/'); // Redirect to login page
        } else {
          return response.json().then((data) => {
            setError(data.message || 'Failed to reset password');
          });
        }
      })
      .catch((err) => {
        setError('An error occurred while resetting password');
      });
  };

  return (
    <div>
      <h2>Reset Password</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label>New Password:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div>
        <label>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button onClick={handlePasswordReset}>Reset Password</button>
    </div>
  );
};

export default ResetPassword;
