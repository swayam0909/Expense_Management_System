import React, { useState } from 'react';

const Expense = () => {
  const [expenseList, setExpenseList] = useState([]);
  const [expense, setExpense] = useState({ category: '', amount: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense((prev) => ({ ...prev, [name]: value }));
  };

  const addExpense = () => {
    if (!expense.category || !expense.amount) {
      alert('Please fill all fields!');
      return;
    }

    setExpenseList((prev) => [...prev, expense]);
    setExpense({ category: '', amount: '' });
  };

  return (
    <div>
      <h2>Expenses</h2>
      <input
        type="text"
        name="category"
        placeholder="Expense Category"
        value={expense.category}
        onChange={handleChange}
      />
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={expense.amount}
        onChange={handleChange}
      />
      <button onClick={addExpense}>Add Expense</button>

      <ul>
        {expenseList.map((item, index) => (
          <li key={index}>
            {item.category}: ₹{item.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Expense;
