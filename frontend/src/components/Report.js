import React, { useState, useEffect } from "react";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "../styles/Report.css";

// Register required chart elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement // Registering the ArcElement for pie charts
);

const Report = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [summary, setSummary] = useState({ income: 0, expenses: 0, netBalance: 0 });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetching user email from local storage (this should be dynamically handled)
  const userEmail = localStorage.getItem("userEmail") || "user@example.com";

  // Function to format the date to a readable string
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(); // Format to 'MM/DD/YYYY'
  };

  // Fetch data when date filters are changed
  useEffect(() => {
    if (startDate && endDate) {
      setError(""); // Clear previous errors
      setLoading(true); // Set loading state to true

      // Fetch income data
      axios
        .get(`http://localhost:8080/income/range?email=${userEmail}&startDate=${startDate}&endDate=${endDate}`)
        .then((response) => {
          setIncomeData(Array.isArray(response.data) ? response.data : []);
        })
        .catch((error) => {
          console.error("Error fetching income data:", error);
          setError("Failed to fetch income data.");
        });

      // Fetch expense data
      axios
        .get(`http://localhost:8080/expense/range?email=${userEmail}&startDate=${startDate}&endDate=${endDate}`)
        .then((response) => {
          setExpenseData(Array.isArray(response.data) ? response.data : []);
        })
        .catch((error) => {
          console.error("Error fetching expense data:", error);
          setError("Failed to fetch expense data.");
        })
        .finally(() => {
          setLoading(false); // Set loading state to false after API call is finished
        });
    }
  }, [startDate, endDate, userEmail]);

  // Calculate summary (income, expenses, netBalance)
  useEffect(() => {
    const totalIncome = Array.isArray(incomeData) 
      ? incomeData.reduce((sum, income) => sum + income.amount, 0)
      : 0; // Check if incomeData is an array before calling reduce
  
    const totalExpenses = Array.isArray(expenseData) 
      ? expenseData.reduce((sum, expense) => sum + expense.amount, 0)
      : 0; // Check if expenseData is an array before calling reduce
  
    setSummary({
      income: totalIncome,
      expenses: totalExpenses,
      netBalance: totalIncome - totalExpenses,
    });
  }, [incomeData, expenseData]);
  

  // Handle PDF export with charts
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Expense Report", 14, 10);
  
    // Add summary to PDF
    doc.setFontSize(12);
    doc.text("Summary", 14, 20);
    doc.text(`Income: ₹${summary.income}`, 14, 30);
    doc.text(`Expenses: ₹${summary.expenses}`, 14, 40);
    doc.text(`Net Balance: ₹${summary.netBalance}`, 14, 50);
  
    // Add charts as images to PDF
    // For Pie Chart
    const pieChart = document.getElementById("pie-chart"); // Get the pie chart canvas element
    if (pieChart) {
      const pieChartImage = pieChart.toDataURL("image/png"); // Convert to base64 image
      doc.addImage(pieChartImage, "PNG", 14, 60, 180, 100); // Add image to PDF at specific coordinates
    }
  
    // For Bar Chart
    const barChart = document.getElementById("bar-chart"); // Get the bar chart canvas element
    if (barChart) {
      const barChartImage = barChart.toDataURL("image/png"); // Convert to base64 image
      doc.addImage(barChartImage, "PNG", 14, 170, 180, 100); // Add image to PDF at specific coordinates
    }
  
    // Combine income and expense data for the table
    const tableData = [
      ...incomeData.map((txn) => [
        formatDate(txn.date),
        txn.source || "Income", // Use 'source' for income data
        "Income",
        `₹${txn.amount}`],
      ),
      ...expenseData.map((txn) => [
        formatDate(txn.date),
        txn.category,
        "Expense",
        `₹${txn.amount}`],
      ),
    ];
  
    // Add table to PDF
    doc.autoTable({
      head: [["Date", "Category/Source", "Type", "Amount"]],
      body: tableData,
      startY: 280,
    });
  
    // Save the PDF
    doc.save("Expense_Report.pdf");
  };

  // Group expenses by category and calculate total per category
  const categoryColors = {
    Food: "#4B0082",         // Indigo
    Transport: "#FF8C00",    // Dark Orange
    Utilities: "#008080",    // Teal
    Entertainment: "#DC143C", // Crimson
    Miscellaneous: "#4285F4", // Google Blue
  };

  const expenseSummary = expenseData.reduce((acc, expense) => {
    if (!acc[expense.category]) {
      acc[expense.category] = 0;
    }
    acc[expense.category] += expense.amount;
    return acc;
  }, {});

  // Pie chart data
  const pieChartData = {
    labels: Object.keys(expenseSummary).map((category) => `${category} - ₹${expenseSummary[category]}`),
    datasets: [
      {
        data: Object.values(expenseSummary),
        backgroundColor: Object.keys(expenseSummary).map((category) => categoryColors[category]),
      },
    ],
  };

  return (
    <div className="report-page-container">
      {/* Back Button */}
      <button className="back-button" onClick={() => window.history.back()}>
      &#8592; Back
      </button>

      <h1 className="report-title">Expense Report</h1>

      {/* Date Filters */}
      <div className="date-filters">
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <button className="generate-report-btn" onClick={generatePDF} disabled={loading}>
          Generate Report
        </button>
      </div>

      {/* Error Handling */}
      {error && <div className="error-message">{error}</div>}

      {/* Summary Section */}
      <div className="summary-section">
        <p>Income: ₹{summary.income}</p>
        <p>Expenses: ₹{summary.expenses}</p>
        <p>Net Balance: ₹{summary.netBalance}</p>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        {/* Pie Chart for Expenses Breakdown */}
        {expenseData.length > 0 && (
          <div className="chart">
            <h2>Expense Breakdown</h2>
            <Pie 
            
              id="pie-chart" // Give the Pie chart an ID to reference later
              data={pieChartData}
            />
          </div>
        )}

        {/* Bar Chart for Income vs Expenses */}
        {incomeData.length > 0 && expenseData.length > 0 && (
          <div className="chart">
            <h2>Income vs Expenses</h2>
            <Bar  
              id="bar-chart" // Give the Bar chart an ID to reference later
              data={{
                labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
                datasets: [
                  {
                    label: "Income",
                    data: incomeData.map((e) => e.amount),
                    backgroundColor: "#4169E1",
                  },
                  {
                    label: "Expenses",
                    data: expenseData.map((e) => e.amount),
                    backgroundColor: "#FFD700",
                  },
                ],
              }}
            />
          </div>
        )}
      </div>

      {/* Transactions Table Section */}
      <div className="transactions-section">
        <h2>Transactions</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Type</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {expenseData.map((txn, index) => (
              <tr key={index}>
                <td>{formatDate(txn.date)}</td>
                <td>{txn.category}</td>
                <td>Expense</td>
                <td>₹{txn.amount}</td>
              </tr>
            ))}
            {incomeData.map((txn, index) => (
              <tr key={index + expenseData.length}>
                <td>{formatDate(txn.date)}</td>
                <td>{txn.source}</td>
                <td>Income</td>
                <td>₹{txn.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Report;
