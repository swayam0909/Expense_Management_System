import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Handle loading state
  const [error, setError] = useState(null); // Handle error messages
  const navigate = useNavigate();

  // Handle login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset error message on new submission
    setError(null);

    // Set loading to true while making the API request
    setLoading(true);

    try {
      // Making the POST request to backend (Spring Boot)
      const response = await fetch('http://localhost:8080/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // Log status and raw response for debugging
      console.log('Response Status:', response.status); // Log status code
      const data = await response.json();  // Get the response as JSON

      console.log('Parsed Response:', data); // Log parsed response for debugging

      // Handle different response scenarios
      if (response.ok) {
        // Successfully logged in
        localStorage.setItem('adminToken', data.token); // Store token in localStorage or sessionStorage
        navigate('/admin-dashboard'); // Redirect to the dashboard on success
      } else {
        // If response is not OK, show an error message
        setError(data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false); // Set loading to false after request completion
    }
  };

  // Inline CSS styles
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f4f8',
    },
    formContainer: {
      backgroundColor: 'white',
      padding: '40px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '400px',
      textAlign: 'center',
      transition: 'transform 0.3s ease-in-out',
    },
    title: {
      fontSize: '28px',
      color: '#333',
      marginBottom: '20px',
      fontWeight: '600',
    },
    input: {
      width: '100%',
      padding: '12px',
      marginBottom: '20px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '16px',
      color: '#333',
      outline: 'none',
      transition: 'border-color 0.3s ease',
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#512da8',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    buttonDisabled: {
      backgroundColor: '#6c757d',
      cursor: 'not-allowed',
    },
    error: {
      color: 'red',
      marginBottom: '10px',
    },
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.formContainer}>
        <h1 style={styles.title}>Admin Login</h1>
        {error && <div style={styles.error}>{error}</div>} {/* Display error message if exists */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        <button
          type="submit"
          style={loading ? { ...styles.button, ...styles.buttonDisabled } : styles.button}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
