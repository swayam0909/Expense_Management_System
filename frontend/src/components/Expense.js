import React, { useState } from 'react';
import '../styles/ExpenseForm.css';  // Import the CSS file for styling

const ExpenseForm = () => {
  const [expense, setExpense] = useState({
    name: '',
    amount: '',
    category: '',
    date: '',
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense({
      ...expense,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the form data (e.g., save to database or state)
    console.log('Expense Created:', expense);
    // Clear the form
    setExpense({
      name: '',
      amount: '',
      category: '',
      date: '',
    });
  };

  return (
    <div className="expense-form-container">
      <h2>Create Expense</h2>
      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-group">
          <label htmlFor="name">Expense Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={expense.name}
            onChange={handleChange}
            placeholder="Enter expense name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={expense.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={expense.category}
            onChange={handleChange}
            required
          >
            <option value="">Select category</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Miscellaneous">Miscellaneous</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={expense.date}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">Submit Expense</button>
      </form>
    </div>
  );
};

export default ExpenseForm;
