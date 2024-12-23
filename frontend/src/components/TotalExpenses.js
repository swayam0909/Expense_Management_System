import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/totalExpenses.css";

const TotalExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    // Fetch expenses from the backend
    const fetchExpenses = async () => {
      const userEmail = localStorage.getItem("userEmail");

      if (!userEmail) {
        setError("User email not found in localStorage. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:8080/expense/all", {
          params: { email: userEmail }, // Use email from localStorage
        });
        // Sort expenses by date (most recent first)
        const sortedExpenses = response.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setExpenses(sortedExpenses);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch expenses. Please try again later.");
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  const filteredExpenses =
    activeCategory === "All"
      ? expenses
      : expenses.filter((expense) => expense.category === activeCategory);

  // Calculate total expense for the filtered data
  useEffect(() => {
    const total = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    setTotalExpense(total);
  }, [filteredExpenses]);

  return (
    <div className="total-expenses-container">
      <div className="total-expenses-fixed-header">
        {/* Back Button */}
        <button className="total-expenses-back-button" onClick={() => window.history.back()}>
          ⬅ Back
        </button>

        {/* Title */}
        <h1 className="total-expenses-title">Expense History</h1>

        {/* Category Filters */}
        <div className="total-expenses-categories">
          {["All", "Food", "Transport", "Utilities", "Entertainment", "Miscellaneous"].map(
            (category) => (
              <button
                key={category}
                className={`total-expenses-category-button ${
                  activeCategory === category ? "active" : ""
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            )
          )}
        </div>
      </div>

      {/* Main Content Section */}
      <div className="total-expenses-content">
        {/* Error or Loading State */}
        {loading && <p className="total-expenses-loading">Loading expenses...</p>}
        {error && <p className="total-expenses-error">{error}</p>}

        {!loading && !error && (
          <>
            {/* Total Expense */}
            <div className="total-expenses-total-expense">
              <h3>Total Expense: ₹{totalExpense.toFixed(2)}</h3>
            </div>

            {/* Expense List */}
            <div className="total-expenses-list">
              {filteredExpenses.length > 0 ? (
                <table className="total-expenses-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Category</th>
                      <th>Description</th>
                      <th>Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredExpenses.map((expense) => (
                      <tr key={expense.id}>
                        <td>{new Date(expense.date).toLocaleDateString()}</td>
                        <td>{expense.category}</td>
                        <td>{expense.description || "No description provided"}</td>
                        <td>{expense.amount.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="total-expenses-no-expenses">No expenses found for this category.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TotalExpenses;
