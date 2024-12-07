import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/totalIncome.css"; // Add relevant CSS here

const TotalIncome = () => {
  const navigate = useNavigate();
  const [incomeHistory, setIncomeHistory] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch income data
  useEffect(() => {
    const fetchIncomeData = async () => {
      try {
        const response = await fetch("http://localhost:8080/income/all");
        if (response.ok) {
          const data = await response.json();
          setIncomeHistory(data);

          // Calculate total income
          const total = data.reduce((sum, item) => sum + item.amount, 0);
          setTotalIncome(total);
        } else {
          console.error("Failed to fetch income data");
        }
      } catch (error) {
        console.error("Error fetching income data:", error);
      }
    };

    fetchIncomeData();
  }, []);

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const handleAddIncome = () => {
    navigate('/add-income'); // Adjust the route as needed for adding new income
  };

  return (
    <div className="total-income-page">
      {/* Header Section */}
      <header className="income-header">
        <h1>Your Total Income</h1>
        <p>Track and manage all your income sources in one place.</p>
      </header>

      {/* Summary Section */}
      <section className="income-summary">
        <h2>Total Income This Month</h2>
        <p className="income-amount">₹{totalIncome}</p>
        <button onClick={handleAddIncome} className="add-income-btn">Add New Income</button>
      </section>

      {/* Success Message */}
      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}

      {/* Income History Section */}
      <section className="income-history">
        <h2>Income History</h2>
        {incomeHistory.length > 0 ? (
          <table className="income-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Source</th>
                <th>Amount (₹)</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {incomeHistory.map((entry, index) => (
                <tr key={index}>
                  <td>{new Date(entry.date).toLocaleString()}</td>
                  <td>{entry.source}</td>
                  <td>{entry.amount}</td>
                  <td>{entry.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No income history available.</p>
        )}
      </section>

      {/* Back Button */}
      <div className="back-button-container">
        <button onClick={handleBackToDashboard} className="back-btn">Back to Dashboard</button>
      </div>
    </div>
  );
};

export default TotalIncome;
