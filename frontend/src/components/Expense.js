import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom
import '../styles/ExpenseForm.css';  // Import the CSS file for styling
import { addExpense } from '../apiService';  // Assuming you have an apiService to handle API calls

const ExpenseForm = ({ userEmail, expenseHistory = [] }) => {  // Provide a fallback for expenseHistory
  const navigate = useNavigate();  // Create a navigate function to navigate programmatically
  const [expense, setExpense] = useState({
    category: '',
    amount: '',
    date: '',
    description: '',
  });
  const [successMessage, setSuccessMessage] = useState('');  // State for success message
  const [historyVisible, setHistoryVisible] = useState(false);  // State for showing expense history

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense({
      ...expense,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create the expense object, including the email
    const newExpense = { 
      ...expense, 
      email: userEmail,  // Attach the email to the expense
      date: expense.date ? new Date(expense.date).toISOString() : new Date().toISOString(),  // Ensure date is in ISO format
    };

    try {
      await addExpense(newExpense);  // API call to save the expense
      console.log('Expense Created:', newExpense);
      
      // Display success message
      setSuccessMessage('Expense added successfully!');
      
      // Clear the form after submission
      setExpense({
        category: '',
        amount: '',
        date: '',
        description: '',
      });
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);

    } catch (error) {
      console.error('Error creating expense:', error);
      setSuccessMessage('Error creating expense. Please try again.');
    }
  };

  // Handle back to dashboard functionality
  const handleBackToDashboard = () => {
    navigate('/dashboard');  // Navigate to the '/dashboard' route
  };

  return (
    <div className="expense-form-wrapper">
      <div className="expense-form-container">
        <h2>Create Expense</h2>

        {/* Success Message */}
        {successMessage && <div className="success-message">{successMessage}</div>}

        <form onSubmit={handleSubmit} className="expense-form">
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
            <label htmlFor="date">Date</label>
            <input
              type="datetime-local"
              id="date"
              name="date"
              value={expense.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={expense.description}
              onChange={handleChange}
              placeholder="Enter description"
              required
            />
          </div>

          <button type="submit" className="submit-btn">Submit Expense</button>
        </form>
      </div>

      {/* Expense History Section */}
      <div className="history-container">
        <h2 onClick={() => setHistoryVisible(!historyVisible)} className="history-header">
          {historyVisible ? 'Hide Expense History' : 'Show Expense History'}
        </h2>

        {historyVisible && (
          <div className="expense-history">
            {expenseHistory.length === 0 ? (
              <p>No expense records found.</p>
            ) : (
              expenseHistory.map((item, index) => (
                <div key={index} className="expense-item">
                  <p><strong>Category:</strong> {item.category}</p>
                  <p><strong>Amount:</strong> ${item.amount}</p>
                  <p><strong>Description:</strong> {item.description}</p>
                  <p><strong>Date:</strong> {new Date(item.date).toLocaleString()}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Back to Dashboard Button */}
      <div className="back-button-container">
        <button onClick={handleBackToDashboard} className="back-btn">Back to Dashboard</button>
      </div>
    </div>
  );
};

export default ExpenseForm;
