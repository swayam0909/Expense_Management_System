import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for API requests
import { Line, Pie, Bar } from "react-chartjs-2";
import "chart.js/auto"; // Required for charts to render

const OverallReportPage = () => {
  // State for charts and summary data
  const [lineData, setLineData] = useState(null);
  const [pieData, setPieData] = useState(null);
  const [barData, setBarData] = useState(null);
  const [totals, setTotals] = useState({
    income: 0,
    expenses: 0,
    savings: 0,
  });

  // State for selected period
  const [selectedPeriod, setSelectedPeriod] = useState("lastMonth");

  // Mock data for the different time periods
  const dataForPeriod = {
    lastMonth: {
      trends: {
        labels: ["2024-11-01", "2024-11-02", "2024-11-03", "2024-11-04", "2024-11-05"],
        data: [200, 400, 300, 500, 600],
      },
      expenseBreakdown: {
        labels: ["Food", "Transport", "Entertainment", "Others"],
        data: [200, 300, 100, 400],
      },
      frequentCategories: {
        labels: ["Food", "Transport", "Entertainment", "Others"],
        data: [600, 400, 300, 500],
      },
      totals: {
        income: 5000,
        expenses: 2500,
        savings: 2500,
      },
    },
    last6Months: {
      trends: {
        labels: ["2024-06", "2024-07", "2024-08", "2024-09", "2024-10", "2024-11"],
        data: [1500, 1600, 1700, 1800, 1900, 2000],
      },
      expenseBreakdown: {
        labels: ["Food", "Transport", "Entertainment", "Others"],
        data: [800, 1000, 400, 600],
      },
      frequentCategories: {
        labels: ["Food", "Transport", "Entertainment", "Others"],
        data: [5000, 3000, 1000, 2000],
      },
      totals: {
        income: 30000,
        expenses: 15000,
        savings: 15000,
      },
    },
    lastYear: {
      trends: {
        labels: ["2023-12", "2024-01", "2024-02", "2024-03", "2024-04", "2024-05", "2024-06", "2024-07", "2024-08", "2024-09", "2024-10", "2024-11"],
        data: [2500, 2600, 2700, 2800, 2900, 3000, 3100, 3200, 3300, 3400, 3500, 3600],
      },
      expenseBreakdown: {
        labels: ["Food", "Transport", "Entertainment", "Others"],
        data: [2000, 3000, 1200, 1500],
      },
      frequentCategories: {
        labels: ["Food", "Transport", "Entertainment", "Others"],
        data: [12000, 8000, 4000, 5000],
      },
      totals: {
        income: 60000,
        expenses: 30000,
        savings: 30000,
      },
    },
  };

  // Effect to load data for the selected period
  useEffect(() => {
    const selectedData = dataForPeriod[selectedPeriod];

    // Update charts and totals based on the selected period's data
    setLineData({
      labels: selectedData.trends.labels,
      datasets: [
        {
          label: "Spending Over Time",
          data: selectedData.trends.data,
          borderColor: "#512da8",
          backgroundColor: "rgba(81, 45, 168, 0.2)",
          borderWidth: 2,
          fill: true,
        },
      ],
    });

    setPieData({
      labels: selectedData.expenseBreakdown.labels,
      datasets: [
        {
          label: "Category Distribution",
          data: selectedData.expenseBreakdown.data,
          backgroundColor: ["#512da8", "#673ab7", "#9575cd", "#d1c4e9"],
          hoverOffset: 4,
        },
      ],
    });

    setBarData({
      labels: selectedData.frequentCategories.labels,
      datasets: [
        {
          label: "Frequent Categories",
          data: selectedData.frequentCategories.data,
          backgroundColor: "#673ab7",
        },
      ],
    });

    setTotals(selectedData.totals);
  }, [selectedPeriod]);

  // Handle period selection
  const handlePeriodChange = (e) => {
    setSelectedPeriod(e.target.value);
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", color: "#333" }}>
      {/* Header */}
      <h1 style={{ color: "#512da8", textAlign: "center", marginBottom: "20px" }}>
        Overall Expense Report
      </h1>

      {/* Period Selection */}
      <div style={{ marginBottom: "30px", textAlign: "center" }}>
        <label style={{ marginRight: "10px" }}>Select Time Period:</label>
        <select value={selectedPeriod} onChange={handlePeriodChange}>
          <option value="lastMonth">Last Month</option>
          <option value="last6Months">Last 6 Months</option>
          <option value="lastYear">Last Year</option>
        </select>
      </div>

      {/* Overview Section */}
      <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "30px" }}>
        <div>
          <h3>Total Income</h3>
          <p style={{ color: "#512da8", fontWeight: "bold" }}>${totals.income}</p>
        </div>
        <div>
          <h3>Total Expenses</h3>
          <p style={{ color: "#d32f2f", fontWeight: "bold" }}>${totals.expenses}</p>
        </div>
        <div>
          <h3>Net Savings</h3>
          <p style={{ color: "#388e3c", fontWeight: "bold" }}>${totals.savings}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
        <div style={{ width: "45%", marginBottom: "30px" }}>
          <h3 style={{ color: "#512da8" }}>Spending Over Time</h3>
          {lineData && <Line data={lineData} />}
        </div>

        <div style={{ width: "45%", marginBottom: "30px" }}>
          <h3 style={{ color: "#512da8" }}>Expense Breakdown</h3>
          {pieData && <Pie data={pieData} />}
        </div>

        <div style={{ width: "45%", marginBottom: "30px" }}>
          <h3 style={{ color: "#512da8" }}>Frequent Categories</h3>
          {barData && <Bar data={barData} />}
        </div>
      </div>

      {/* Export Options Section */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <h3 style={{ color: "#512da8" }}>Export Report</h3>
        <button
          style={{
            margin: "10px",
            padding: "10px 20px",
            backgroundColor: "#512da8",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => alert("Exporting overall report as PDF")}
        >
          Export as PDF
        </button>
      </div>
    </div>
  );
};

export default OverallReportPage;
