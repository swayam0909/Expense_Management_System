import React, { useState } from 'react';

const Income = () => {
  const [incomeList, setIncomeList] = useState([]);
  const [income, setIncome] = useState({ source: '', amount: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIncome((prev) => ({ ...prev, [name]: value }));
  };

  const addIncome = () => {
    if (!income.source || !income.amount) {
      alert('Please fill all fields!');
      return;
    }

    setIncomeList((prev) => [...prev, income]);
    setIncome({ source: '', amount: '' });
  };

  return (
    <div>
      <h2>Income</h2>
      <input
        type="text"
        name="source"
        placeholder="Income Source"
        value={income.source}
        onChange={handleChange}
      />
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={income.amount}
        onChange={handleChange}
      />
      <button onClick={addIncome}>Add Income</button>

      <ul>
        {incomeList.map((item, index) => (
          <li key={index}>
            {item.source}: ₹{item.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Income;
