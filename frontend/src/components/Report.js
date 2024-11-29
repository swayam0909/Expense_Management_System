import React from 'react';

const Report = () => {
  // Example data
  const totalIncome = 50000;
  const totalExpense = 20000;
  const balance = totalIncome - totalExpense;

  return (
    <div>
      <h2>Report</h2>
      <p>Total Income: ₹{totalIncome}</p>
      <p>Total Expense: ₹{totalExpense}</p>
      <p>Balance: ₹{balance}</p>
    </div>
  );
};

export default Report;
