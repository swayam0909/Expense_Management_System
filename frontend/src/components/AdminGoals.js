// src/pages/Goals.js
import React from 'react';
import '../styles/AdminGoals.css'

const AdminGoals = () => {
  return (
    <div className="page-container">
      <h2>Manage Goals</h2>
      <div className="goal-container">
        <h3>Create a New Goal</h3>
        <form>
          <label>
            Goal Name:
            <input type="text" name="goalName" />
          </label>
          <label>
            Target Amount:
            <input type="number" name="targetAmount" />
          </label>
          <label>
            Deadline:
            <input type="date" name="deadline" />
          </label>
          <button type="submit">Create Goal</button>
        </form>
      </div>
      <h3>Active Goals</h3>
      <table className="data-table">
        <thead>
          <tr>
            <th>Goal Name</th>
            <th>Target Amount</th>
            <th>Progress</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Buy Laptop</td>
            <td>$1000</td>
            <td>50%</td>
            <td>Active</td>
          </tr>
          {/* More rows can be added here */}
        </tbody>
      </table>
    </div>
  );
};

export default AdminGoals;
