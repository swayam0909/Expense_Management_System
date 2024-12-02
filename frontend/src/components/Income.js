import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom
import '../styles/IncomeForm.css';  // Import the CSS file for styling
import { addIncome, getAllIncomes } from '../apiService';  

const IncomeForm = ({ userEmail }) => {
  const navigate = useNavigate();  // Create navigate function to navigate programmatically
  const [income, setIncome] = useState({
    source: '',
    amount: '',
    description: '',
    date: '',
  });
  const [incomeHistory, setIncomeHistory] = useState([]);  // Ensure incomeHistory is initialized as an empty array
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch income history when the component mounts
  useEffect(() => {
    const fetchIncomeHistory = async () => {
      try {
        const data = await getAllIncomes(userEmail);  // Assuming you have a service to fetch incomes by email
        // Ensure the fetched data is an array before setting it to state
        if (Array.isArray(data)) {
          setIncomeHistory(data);
        } else {
          setIncomeHistory([]);  // If data is not an array, initialize it as an empty array
        }
      } catch (error) {
        console.error('Error fetching income history:', error);
        setIncomeHistory([]);  // Initialize as empty array in case of error
      }
    };
    fetchIncomeHistory();
  }, [userEmail]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIncome({
      ...income,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newIncome = { 
      ...income, 
      email: userEmail,
      date: income.date ? new Date(income.date).toISOString() : new Date().toISOString(),
    };

    try {
      await addIncome(newIncome);  // API call to save the income
      setSuccessMessage('Income added successfully!');
      setIncome({
        source: '',
        amount: '',
        description: '',
        date: '',
      });

      // Fetch updated income history
      const updatedIncomeHistory = await getAllIncomes(userEmail);
      if (Array.isArray(updatedIncomeHistory)) {
        setIncomeHistory(updatedIncomeHistory);
      } else {
        setIncomeHistory([]);  // Handle non-array data response
      }

      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);

    } catch (error) {
      console.error('Error adding income:', error);
      setSuccessMessage('Error adding income. Please try again.');
    }
  };

  // Handle back to dashboard functionality
  const handleBackToDashboard = () => {
    navigate('/dashboard');  // Navigate to the '/dashboard' route
  };

  return (
    <div className="income-form-wrapper"> {/* Updated wrapper class */}
      <div className="income-form-container">
        <h2>Add Income</h2>
  
        {successMessage && <div className="success-message">{successMessage}</div>}
  
        <form onSubmit={handleSubmit} className="income-form">
          <div className="form-group">
            <label htmlFor="source">Source</label>
            <input
              type="text"
              id="source"
              name="source"
              value={income.source}
              onChange={handleChange}
              placeholder="Enter source of income"
              required
            />
          </div>
  
          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={income.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              required
            />
          </div>
  
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={income.description}
              onChange={handleChange}
              placeholder="Enter description"
              required
            />
          </div>
  
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="datetime-local"
              id="date"
              name="date"
              value={income.date}
              onChange={handleChange}
              required
            />
          </div>
  
          <button type="submit" className="submit-btn">Submit Income</button>
        </form>
      </div>
  
      <div className="history-container">
        <h2>Income History</h2>
        <div className="income-history">
          {incomeHistory.length === 0 ? (
            <p>No income records found.</p>
          ) : (
            incomeHistory.map((item, index) => (
              <div key={index} className="income-item">
                <p><strong>Source:</strong> {item.source}</p>
                <p><strong>Amount:</strong> ${item.amount}</p>
                <p><strong>Description:</strong> {item.description}</p>
                <p><strong>Date:</strong> {new Date(item.date).toLocaleString()}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Back to Dashboard Button */}
      <div className="back-button-container">
        <button onClick={handleBackToDashboard} className="back-btn">Back to Dashboard</button>
      </div>
    </div>
  );
};

export default IncomeForm;
