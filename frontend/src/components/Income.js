import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/IncomeForm.css';  // Import the CSS file for styling

const IncomeForm = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [income, setIncome] = useState({
    source: '',
    amount: '',
    date: '',
    description: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [incomeHistory, setIncomeHistory] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);

  // Automatically fetch the email from local storage or backend
  useEffect(() => {
    const fetchEmail = () => {
      const savedEmail = localStorage.getItem('userEmail');
      if (savedEmail) {
        setUserEmail(savedEmail);
      } else {
        setUserEmail('');
      }
    };

    fetchEmail();
  }, []);

  const fetchIncomes = async () => {
    if (!userEmail) {
      console.error('User email is required to fetch incomes.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:8080/income/all?email=${userEmail}`);
      if (response.ok) {
        const data = await response.json();
        setIncomeHistory(data);
      } else {
        console.error('Failed to fetch incomes');
      }
    } catch (error) {
      console.error('Error fetching incomes:', error);
    }
  };

  const fetchTotalIncome = async () => {
    if (!userEmail) {
      console.error('User email is required to fetch total income.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:8080/income/total?email=${userEmail}`);
      if (response.ok) {
        const data = await response.json();
        setTotalIncome(data.totalIncome);
      } else {
        console.error('Failed to fetch total income');
      }
    } catch (error) {
      console.error('Error fetching total income:', error);
    }
  };

  useEffect(() => {
    if (userEmail) {
      fetchIncomes();
      fetchTotalIncome();
    }
  }, [userEmail]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIncome({
      ...income,
      [name]: value,
    });
  };

  const handleEmailChange = (e) => {
    setUserEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userEmail) {
      setSuccessMessage('User email is required to add income.');
      return;
    }

    const newIncome = {
      ...income,
      email: userEmail,
      date: income.date ? new Date(income.date).toISOString() : new Date().toISOString(),
    };

    try {
      const response = await fetch('http://localhost:8080/income/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newIncome),
      });

      if (response.ok) {
        setSuccessMessage('Income added successfully!');
        setIncome({
          source: '',
          amount: '',
          date: '',
          description: '',
        });

        // Refresh data
        fetchIncomes();
        fetchTotalIncome();

        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      } else {
        setSuccessMessage('Error creating income. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting income:', error);
      setSuccessMessage('Error creating income. Please try again.');
    }
  };


  const handleBack = () => {
    navigate(-1); // Navigates to the previous page
  };

  return (
    <div className="income-form-wrapper">
      <button className="back-button" onClick={handleBack}>
        &#8592; Back
      </button>
      <div className="income-form-container">
        <h2>Create Income</h2>
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

          <button type="submit" className="submit-btn">Submit Income</button>
        </form>
      </div>

      <div className="history-container">
        <h3>Total Income: ₹{totalIncome}</h3>

        <h2>Income History</h2>
        {incomeHistory.length === 0 ? (
          <p>No income records found.</p>
        ) : (
          incomeHistory.map((item, index) => (
            <div key={index} className="income-item">
              <p><strong>Source:</strong> {item.source}</p>
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

export default IncomeForm;
