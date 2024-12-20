import React, { useState, useEffect } from "react";
import { FaUsers, FaToggleOn, FaToggleOff, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "../styles/UserManagement.css"; // New CSS file for user management styling

const UserManagement = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch users from the backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/admin/Users");
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  // Fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle status toggle (enable/disable)
  const handleToggleStatus = async (userEmail, currentStatus) => {
    try {
      // Determine the new status in uppercase to match backend (ACTIVE/DISABLED)
      const newStatus = currentStatus === "ACTIVE" ? "DISABLED" : "ACTIVE";

      // Update the status in the frontend state
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.email === userEmail
            ? { ...user, status: newStatus } // Toggle status
            : user
        )
      );

      // Make a PUT request to update the status on the backend using email
      await axios.put(`http://localhost:8080/auth/set-status?email=${userEmail}&status=${newStatus}`);
    } catch (error) {
      console.error("Error toggling status:", error);
      // Optionally, revert status update in case of error
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.email === userEmail
            ? { ...user, status: currentStatus } // Revert back to original status
            : user
        )
      );
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="user-management-container">
      <aside className="sidebar-new">
        <h2 className="logo">Expense Manager</h2>
        <nav className="nav">
          <ul>
            <li className="nav-item"><FaUsers className="icon" /> Users</li>
          </ul>
        </nav>
      </aside>

      <main className="main-content-new">
        <header className="header-new">
          <h1>User Management</h1>
        </header>

        <section className="management-new">
          <button className="back-btn" onClick={handleBackClick}><FaArrowLeft /> Back</button>
          <h2>All Users</h2>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className="data-table-new">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Registration Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.email}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.resetTokenExpiry ? new Date(user.resetTokenExpiry).toLocaleDateString() : "N/A"}</td>
                    <td>{user.status === "ACTIVE" ? "Active" : "Disabled"}</td> {/* Display user-friendly status */}
                    <td>
                      <button
                        className={`action-btn ${user.status === "ACTIVE" ? "disable-btn" : "enable-btn"}`}
                        onClick={() => handleToggleStatus(user.email, user.status)}
                      >
                        {user.status === "ACTIVE" ? <FaToggleOff /> : <FaToggleOn />} 
                        {user.status === "ACTIVE" ? "Disable" : "Enable"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>
    </div>
  );
};

export default UserManagement;
