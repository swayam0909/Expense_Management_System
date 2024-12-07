import React, { useState, useEffect } from "react";
import '../styles/totalExpenses.css'; // Add your styles here if needed

const TotalExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Mock API call to fetch expense data
    const fetchExpenses = async () => {
      const data = [
        { date: "2024-12-01", category: "Food", amount: 50 },
        { date: "2024-12-02", category: "Shopping", amount: 150 },
        { date: "2024-12-03", category: "Transport", amount: 30 },
        { date: "2024-12-04", category: "Utilities", amount: 80 },
      ];
      setExpenses(data);
    };

    fetchExpenses();
  }, []);

  const filteredExpenses = expenses.filter(expense =>
    expense.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="total-expenses-container">
      <h1>Total Expenses</h1>
      <div className="summary">
        <h2>Total Expenses This Month: ₹
          {expenses.reduce((total, expense) => total + expense.amount, 0)}
        </h2>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table className="expenses-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.map((expense, index) => (
            <tr key={index}>
              <td>{expense.date}</td>
              <td>{expense.category}</td>
              <td>{expense.amount}</td>
            </tr>
          ))}
          {filteredExpenses.length === 0 && (
            <tr>
              <td colSpan="3" className="no-data">No expenses found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TotalExpenses;
