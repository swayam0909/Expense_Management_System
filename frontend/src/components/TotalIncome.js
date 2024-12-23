import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/totalIncome.css"; // Scoped CSS for TotalIncome

const TotalIncome = () => {
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalIncome, setTotalIncome] = useState(0);

  const [searchTerm, setSearchTerm] = useState({
    source: "",
    amount: "",
    date: "",
  });

  useEffect(() => {
    // Fetch income data from the backend
    const fetchIncomes = async () => {
      const userEmail = localStorage.getItem("userEmail");

      if (!userEmail) {
        setError("User email not found in localStorage. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:8080/income/all", {
          params: { email: userEmail }, // Use email from localStorage
        });
        // Sort incomes by date (most recent first)
        const sortedIncomes = response.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setIncomes(sortedIncomes);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch incomes. Please try again later.");
        setLoading(false);
      }
    };

    fetchIncomes();
  }, []);

  const filteredIncomes = incomes.filter((income) => {
    const matchesSource =
      income.source.toLowerCase().includes(searchTerm.source.toLowerCase());
    const matchesAmount =
      income.amount.toString().includes(searchTerm.amount);
    const matchesDate =
      income.date && income.date.includes(searchTerm.date);

    return matchesSource && matchesAmount && matchesDate;
  });

  // Calculate total income for the filtered data
  useEffect(() => {
    const total = filteredIncomes.reduce((sum, income) => sum + income.amount, 0);
    setTotalIncome(total);
  }, [filteredIncomes]);

  return (
    <div className="income-history-container">
      <div className="fixed-header">
        {/* Back Button */}
        <button className="income-back-button" onClick={() => window.history.back()}>
          ⬅ Back
        </button>

        {/* Title */}
        <h1 className="income-title">Income History</h1>

        {/* Search Inputs */}
        <div className="income-search">
          <input
            type="text"
            placeholder="Search by source"
            value={searchTerm.source}
            onChange={(e) =>
              setSearchTerm({ ...searchTerm, source: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Search by amount"
            value={searchTerm.amount}
            onChange={(e) =>
              setSearchTerm({ ...searchTerm, amount: e.target.value })
            }
          />
          <input
            type="date"
            placeholder="Search by date"
            value={searchTerm.date}
            onChange={(e) =>
              setSearchTerm({ ...searchTerm, date: e.target.value })
            }
          />
        </div>
      </div>

      {/* Main Content Section */}
      <div className="income-content">
        {/* Error or Loading State */}
        {loading && <p className="loading">Loading incomes...</p>}
        {error && <p className="error">{error}</p>}

        {!loading && !error && (
          <>
            {/* Total Income */}
            <div className="total-income">
              <h3>Total Income: ₹{totalIncome.toFixed(2)}</h3>
            </div>

            {/* Income List */}
            <div className="income-list">
              {filteredIncomes.length > 0 ? (
                <table className="income-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Source</th>
                      <th>Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredIncomes.map((income) => (
                      <tr key={income.id}>
                        <td>{new Date(income.date).toLocaleDateString()}</td>
                        <td>{income.source}</td>
                        <td>{income.amount.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="no-incomes">No incomes found.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TotalIncome;
