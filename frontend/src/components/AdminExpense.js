import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/AdminExpenses.css';  // Import the CSS file scoped for this page

const AdminExpense = () => {
  const [userExpenses, setUserExpenses] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the admin is logged in by checking localStorage
    const adminEmail = localStorage.getItem('adminEmail');
    if (!adminEmail) {
      navigate('/adminLogin'); // Redirect to login page if not logged in
    }

    // Fetch user expenses from the API
    fetch('http://localhost:8080/api/admin/userExpenses')
      .then(response => response.json())
      .then(data => {
        setUserExpenses(data.userExpenses); // Update state with user expenses data
      })
      .catch(error => {
        console.error('Error fetching user expenses:', error);
      });
  }, [navigate]);

  return (
    <div className="admin-expenses">
      <h1>User Expenses Breakdown</h1>
      <table>
        <thead>
          <tr>
            <th>User Email</th>
            <th>Expense Amount</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(userExpenses).map(([email, expense]) => (
            <tr key={email}>
              <td>{email}</td>
              <td>₹{expense}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => navigate('/admin-dashboard')}>Back to Dashboard</button>
    </div>
  );
};

export default AdminExpense;
