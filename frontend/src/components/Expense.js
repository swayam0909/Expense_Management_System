import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ExpenseForm.css';

const ExpenseForm = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [expense, setExpense] = useState({
    category: '',
    amount: '',
    date: '',
    description: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [expenseHistory, setExpenseHistory] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);

  // Automatically fetch the email from local storage or backend
  useEffect(() => {
    const fetchEmail = () => {
      // Fetch email from local storage or cookies as an example
      const savedEmail = localStorage.getItem('userEmail');
      if (savedEmail) {
        setUserEmail(savedEmail);
      } else {
        // Default to an empty string if no email is found
        setUserEmail('');
      }
    };

    fetchEmail();
  }, []);

  const fetchExpenses = async () => {
    if (!userEmail) {
      console.error('User email is required to fetch expenses.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:8080/expense/all?email=${userEmail}`);
      if (response.ok) {
        const data = await response.json();
        setExpenseHistory(data);
      } else {
        console.error('Failed to fetch expenses');
      }
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const fetchTotalExpense = async () => {
    if (!userEmail) {
      console.error('User email is required to fetch total expense.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:8080/expense/total?email=${userEmail}`);
      if (response.ok) {
        const data = await response.json();
        setTotalExpense(data.totalExpense);
      } else {
        console.error('Failed to fetch total expense');
      }
    } catch (error) {
      console.error('Error fetching total expense:', error);
    }
  };

  useEffect(() => {
    if (userEmail) {
      fetchExpenses();
      fetchTotalExpense();
    }
  }, [userEmail]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense({
      ...expense,
      [name]: value,
    });
  };

  const handleEmailChange = (e) => {
    setUserEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userEmail) {
      setSuccessMessage('User email is required to add an expense.');
      return;
    }

    const newExpense = {
      ...expense,
      email: userEmail,
      date: expense.date ? new Date(expense.date).toISOString() : new Date().toISOString(),
    };

    try {
      const response = await fetch('http://localhost:8080/expense/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newExpense),
      });

      if (response.ok) {
        setSuccessMessage('Expense added successfully!');
        setExpense({
          category: '',
          amount: '',
          date: '',
          description: '',
        });

        // Refresh data
        fetchExpenses();
        fetchTotalExpense();

        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      } else {
        setSuccessMessage('Error creating expense. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting expense:', error);
      setSuccessMessage('Error creating expense. Please try again.');
    }
  };
  const handleBack = () => {
    navigate(-1); // Navigates to the previous page
  };

  return (
    <div className="expense-form-wrapper">
      <button className="back-button" onClick={handleBack}>
        &#8592; Back
      </button>
      <div className="expense-form-container">
        <h2>Create Expense</h2>
        {successMessage && <div className="success-message">{successMessage}</div>}

        {/* Email Input */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userEmail}
            onChange={handleEmailChange}
            readOnly
            placeholder="Enter your email"
            required
          />
        </div>

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

      <div className="history-container">
        <h3>Total Expense: ₹{totalExpense}</h3>

        <h2>Expense History</h2>
        {expenseHistory.length === 0 ? (
          <p>No expense records found.</p>
        ) : (
          expenseHistory.map((item, index) => (
            <div key={index} className="expense-item">
              <p><strong>Category:</strong> {item.category}</p>
              <p><strong>Amount:</strong> ₹{item.amount}</p>
              <p><strong>Description:</strong> {item.description}</p>
              <p><strong>Date:</strong> {new Date(item.date).toLocaleString()}</p>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default ExpenseForm;
