import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaQuestionCircle,
  FaMoneyBillWave,
  FaCogs,
  FaHome,
  FaSignOutAlt
} from "react-icons/fa";
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { useSpring, animated } from 'react-spring';
import "../styles/AdminDashboard.css"; // Ensure correct path to the CSS file

// Register the chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [monthlyExpenses, setMonthlyExpenses] = useState(Array(12).fill(0)); // Array to hold expenses for each month
  const [expenseCategories, setExpenseCategories] = useState({
    Food: 0,
    Transport: 0,
    Utilities: 0,
    Entertainment: 0,
    Miscellaneous: 0
  });
  const [queries, setQueries] = useState([]); // Initialize as an empty array

  useEffect(() => {
    // Check if the email exists in localStorage (to verify if the admin is logged in)
    const adminEmail = localStorage.getItem('adminEmail');
    if (!adminEmail) {
      navigate('/adminLogin'); // Redirect to login page if not logged in
    }

    // Fetch total users count from the API
    fetch('http://localhost:8080/api/admin/userCounts')
      .then(response => response.json())
      .then(data => {
        setTotalUsers(data.totalUsers); // Update the total users state
      })
      .catch(error => {
        console.error('Error fetching user count:', error);
      });

    // Fetch user expenses and categories from the API
    fetch('http://localhost:8080/api/admin/userExpenses')
      .then(response => response.json())
      .then(data => {
        setTotalExpenses(data.totalExpenses); // Update the total expenses state

        // Process the expenses data to calculate monthly expenses and expense categories
        const monthlyExpensesData = Array(12).fill(0);
        const categoryExpensesData = {
          Food: 0,
          Transport: 0,
          Utilities: 0,
          Entertainment: 0,
          Miscellaneous: 0
        };

        // Iterating over the user expenses data
        Object.entries(data.userExpenses).forEach(([email, expenses]) => {
          const expenseDate = new Date(); // Defaulting to current month as there's no date in the data
          const month = expenseDate.getMonth(); // Get month (0-11)

          // Sum up monthly expenses (assuming all expenses belong to the current month)
          monthlyExpensesData[month] += expenses.total;

          // Aggregate expenses based on their category
          Object.entries(expenses.categories).forEach(([category, expense]) => {
            categoryExpensesData[category] = (categoryExpensesData[category] || 0) + expense;
          });
        });

        setMonthlyExpenses(monthlyExpensesData);
        setExpenseCategories(categoryExpensesData);
      })
      .catch(error => {
        console.error('Error fetching total expenses:', error);
      });

    // Fetch recent queries from the backend
    fetch('http://localhost:8080/api/admin/queries')
      .then(response => response.json())
      .then(data => {
        setQueries(data.queries || []); // Ensure queries is always an array
      })
      .catch(error => {
        console.error('Error fetching queries:', error);
      });
  }, [navigate]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('adminEmail');
    navigate("/"); // Redirect to login page
  };

  // Spring animation for dashboard elements
  const fadeIn = useSpring({ opacity: 1, from: { opacity: 0 }, config: { duration: 1000 } });
  const fadeUp = useSpring({ opacity: 1, transform: 'translateY(0)', from: { opacity: 0, transform: 'translateY(20px)' }, config: { duration: 1000 } });

  // Bar chart data for monthly expenses
  const barData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Monthly Expenses (₹)',
        data: monthlyExpenses,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  // Pie chart data for expense categories
  const pieData = {
    labels: Object.keys(expenseCategories),
    datasets: [
      {
        data: Object.values(expenseCategories),
        backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0', '#ff9f40'],
        hoverOffset: 4
      }
    ]
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <h2 className="admin-logo">Expense Manager</h2>
        <nav className="admin-nav">
          <ul>
            <li><Link to="/admin-dashboard"><FaHome /> Home</Link></li>
            <li><Link to="/user-management"><FaUsers /> Users</Link></li>
            <li><Link to="/admin-expenses"><FaMoneyBillWave /> Expenses</Link></li>
            <li><Link to="/admin-queries"><FaQuestionCircle /> Queries</Link></li>
            <li><Link to="/admin-settings"><FaCogs /> Settings</Link></li>
          </ul>
        </nav>
        <div className="admin-logout" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main-content">
        <animated.header className="admin-header" style={fadeIn}>
          <h1>Admin Dashboard</h1>
        </animated.header>

        {/* Widgets */}
        <section className="admin-widgets" style={fadeUp}>
          <div className="admin-widget">
            <h3>Total Users</h3>
            <p>{totalUsers}</p>
          </div>
          <div className="admin-widget" onClick={() => navigate('/admin-expenses')}>
            <h3>Total Expenses</h3>
            <p>₹{totalExpenses}</p>
          </div>
          <div className="admin-widget">
            <h3>Total Queries</h3>
            <p>{queries.length}</p> {/* Dynamically display the number of queries */}
          </div>
        </section>

        {/* Analytics Section */}
        <animated.section className="admin-analytics" style={fadeUp}>
          <h2>Expense Trends</h2>
          <div className="admin-charts">
            <div className="admin-chart">
              <Bar data={barData} options={{ responsive: true }} />
            </div>
            <div className="admin-chart">
              <Pie data={pieData} options={{ responsive: true }} />
            </div>
          </div>
        </animated.section>

        {/* Recent Queries Section */}
        <section className="admin-queries">
          <h2>Recent Queries</h2>
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Query</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {queries.length > 0 ? (
                queries.map(query => (
                  <tr key={query.id}>
                    <td>{query.user}</td>
                    <td>{query.text}</td>
                    <td>{query.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No queries available</td>
                </tr>
              )}
            </tbody>
          </table>
          <button className="admin-see-more-btn">See More</button>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
