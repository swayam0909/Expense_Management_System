import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaChartPie,
  FaMoneyBillWave,
  FaCogs,
  FaBell,
  FaChartBar,
  FaHome,
  FaSignOutAlt
} from "react-icons/fa";
import "../styles/AdminDashboard.css"; // Assuming a CSS file for styling

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    // Clear any session or authentication data here (e.g., localStorage)
    localStorage.removeItem('authToken'); // Example, modify based on your actual token/key
    navigate("/"); // Redirect to the login page after logout
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar-new">
        <h2 className="logo">Expense Manager</h2>
        <nav className="nav">
          <ul>
            <li className="nav-item"><FaHome className="icon" /> Home</li>
            <Link to="/user-management">
              <li className="nav-item"><FaUsers className="icon" /> Users</li>
            </Link>
            <Link to="/admin-expenses">
              <li className="nav-item"><FaMoneyBillWave className="icon" /> Expenses</li>
            </Link>
            <Link to="/admin-analytics">
              <li className="nav-item"><FaChartBar className="icon" /> Analytics</li>
            </Link>
            <Link to="/admin-goals">
              <li className="nav-item"><FaChartPie className="icon" /> Goals</li>
            </Link>
            <Link to="/admin-notifications">
              <li className="nav-item"><FaBell className="icon" /> Notifications</li>
            </Link>
            <Link to="/admin-settings">
              <li className="nav-item"><FaCogs className="icon" /> Settings</li>
            </Link>
          </ul>
        </nav>
        <div className="logout" onClick={handleLogout}>
          <FaSignOutAlt className="icon" /> Logout
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content-new">
        {/* Header */}
        <header className="header-new">
          <h1>Admin Dashboard</h1>
        </header>

        {/* Dashboard Summary Widgets */}
        <section className="widgets-new">
          <div className="widget-new">
            <h3>Total Users</h3>
            <button className="widget-btn">View More</button>
            <p>120</p>
          </div>
          <div className="widget-new">
            <h3>Total Expenses</h3>
            <button className="widget-btn">View Details</button>
            <p>$25,000</p>
          </div>
          <div className="widget-new">
            <h3>Active Goals</h3>
            <button className="widget-btn">Track Goals</button>
            <p>15</p>
          </div>
          <div className="widget-new">
            <h3>Pending Actions</h3>
            <button className="widget-btn">Check Actions</button>
            <p>3</p>
          </div>
        </section>

        {/* Analytics Section */}
        <section className="analytics-new">
          <h2>Expense Trends</h2>
          <div className="charts">
            <div className="chart-new">Bar Chart Placeholder</div>
            <div className="chart-new">Pie Chart Placeholder</div>
          </div>
        </section>

        {/* User and Expense Management Tables */}
        <section className="management-new">
          <h2>Recent Users</h2>
          <table className="data-table-new">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Registration Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>John Doe</td>
                <td>john.doe@example.com</td>
                <td>2024-12-01</td>
                <td>Active</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="management-new">
          <h2>Recent Expenses</h2>
          <table className="data-table-new">
            <thead>
              <tr>
                <th>User</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>John Doe</td>
                <td>Food</td>
                <td>$50</td>
                <td>2024-12-15</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
