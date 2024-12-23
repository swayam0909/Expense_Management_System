import React,{useEffect} from "react";
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
  useEffect(() => {
    // Check if the email exists in localStorage (to verify if the admin is logged in)
    const adminEmail = localStorage.getItem('adminEmail');
    if (!adminEmail) {
      navigate('/adminLogin'); // Redirect to login page if not logged in
    }
  }, [navigate]);
  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('adminEmail');
    navigate("/"); // Redirect to login page
  };

  // Bar chart data and options
  const barData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Monthly Expenses ($)',
        data: [1200, 1400, 1000, 1600, 2000, 1800],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  const barOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Monthly Expenses'
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `$${tooltipItem.raw}`
        }
      }
    }
  };

  // Pie chart data and options
  const pieData = {
    labels: ['Rent', 'Groceries', 'Utilities', 'Entertainment', 'Others'],
    datasets: [
      {
        data: [40, 20, 15, 10, 15],
        backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0', '#ff9f40'],
        hoverOffset: 4
      }
    ]
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Expense Categories Breakdown'
      }
    }
  };

  // Spring animation for dashboard elements
  const fadeIn = useSpring({ opacity: 1, from: { opacity: 0 }, config: { duration: 1000 } });
  const fadeUp = useSpring({ opacity: 1, transform: 'translateY(0)', from: { opacity: 0, transform: 'translateY(20px)' }, config: { duration: 1000 } });

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
            <p>120</p>
          </div>
          <div className="admin-widget">
            <h3>Total Expenses</h3>
            <p>$25,000</p>
          </div>
          <div className="admin-widget">
            <h3>Active Goals</h3>
            <p>15</p>
          </div>
        </section>

        {/* Analytics Section */}
        <animated.section className="admin-analytics" style={fadeUp}>
          <h2>Expense Trends</h2>
          <div className="admin-charts">
            <div className="admin-chart">
              <Bar data={barData} options={barOptions} />
            </div>
            <div className="admin-chart">
              <Pie data={pieData} options={pieOptions} />
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
              <tr>
                <td>John Doe</td>
                <td>How to set a goal?</td>
                <td>Pending</td>
              </tr>
              <tr>
                <td>Jane Smith</td>
                <td>Expense report not updating</td>
                <td>Resolved</td>
              </tr>
              <tr>
                <td>Mike Johnson</td>
                <td>How to track expenses?</td>
                <td>Pending</td>
              </tr>
              <tr>
                <td>Anna Lee</td>
                <td>Unable to login</td>
                <td>Pending</td>
              </tr>
            </tbody>
          </table>
          <button className="admin-see-more-btn">See More</button>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
