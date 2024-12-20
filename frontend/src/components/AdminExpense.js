import React from 'react';
import '../styles/AdminExpenses.css'
const AdminExpenses = () => {
  return (
    <div className="page-container">
      <h2>Manage Expenses</h2>
      <div className="filter-options">
        {/* Implement filters for categories, date range, etc. */}
        <button>Filter by Date</button>
        <button>Filter by Category</button>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John Doe</td>
            <td>Food</td>
            <td>$50</td>
            <td>2024-12-15</td>
            <td><button>Edit</button></td>
          </tr>
          {/* More rows will be added dynamically */}
        </tbody>
      </table>
    </div>
  );
};

export default AdminExpenses;
