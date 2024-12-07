import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const ReportPage = () => {
  // Sample data
  const dailyBarData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Income",
        data: [500, 700, 300, 400, 600, 200, 800],
        backgroundColor: "rgba(75, 192, 192, 0.7)",
      },
      {
        label: "Expense",
        data: [300, 400, 200, 500, 700, 100, 600],
        backgroundColor: "rgba(255, 99, 132, 0.7)",
      },
    ],
  };

  const monthlyBarData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Income",
        data: [12000, 15000, 10000, 14000, 16000, 12000, 18000, 15000, 17000, 19000, 20000, 25000],
        backgroundColor: "rgba(75, 192, 192, 0.7)",
      },
      {
        label: "Expense",
        data: [10000, 13000, 9000, 12000, 15000, 11000, 16000, 14000, 15000, 17000, 18000, 22000],
        backgroundColor: "rgba(255, 99, 132, 0.7)",
      },
    ],
  };

  const pieData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [150000, 120000],
        backgroundColor: ["rgba(75, 192, 192, 0.7)", "rgba(255, 99, 132, 0.7)"],
      },
    ],
  };

  const categoryPieData = {
    labels: ["Rent", "Food", "Shopping", "Entertainment", "Miscellaneous"],
    datasets: [
      {
        data: [40000, 30000, 20000, 10000, 5000],
        backgroundColor: [
          "rgba(255, 205, 86, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 159, 64, 0.7)",
          "rgba(153, 102, 255, 0.7)",
          "rgba(201, 203, 207, 0.7)",
        ],
      },
    ],
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Expense Report</h1>
        <div style={styles.totals}>
          <div style={styles.totalBox}>
            <h2>Total Income</h2>
            <p style={styles.totalAmount}>₹150,000</p>
          </div>
          <div style={styles.totalBox}>
            <h2>Total Expense</h2>
            <p style={styles.totalAmount}>₹120,000</p>
          </div>
        </div>
      </header>

      <div style={styles.charts}>
        <div style={styles.chartBox}>
          <h3>Daily Bar Graph</h3>
          <Bar data={dailyBarData} />
        </div>

        <div style={styles.chartBox}>
          <h3>Monthly Bar Graph</h3>
          <Bar data={monthlyBarData} />
        </div>

        <div style={styles.chartBox}>
          <h3>Pie Chart</h3>
          <Pie data={pieData} />
        </div>

        <div style={styles.chartBox}>
          <h3>Category-Based Pie Chart</h3>
          <Pie data={categoryPieData} />
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    backgroundColor: "#f4f4f9",
    minHeight: "100vh",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  totals: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "20px",
  },
  totalBox: {
    textAlign: "center",
    backgroundColor: "#fff",
    padding: "10px 20px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  totalAmount: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#333",
  },
  charts: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },
  chartBox: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
};

export default ReportPage;
