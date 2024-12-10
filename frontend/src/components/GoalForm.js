import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';

const GoalForm = ({ closeForm }) => {
  const [goalName, setGoalName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [email, setEmail] = useState(''); // Rename to match the backend

  // Fetch email from localStorage when the component mounts
  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      setEmail(userEmail); // Set the email state
    } else {
      console.error('User email not found in localStorage');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const goalData = {
      goalName,
      targetAmount: parseFloat(targetAmount), // Ensure numeric value
      email, // Match backend key
    };

    console.log('Submitting goal:', goalData); // Debug: log the data being sent

    try {
      const response = await fetch('http://localhost:8080/goals/set', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(goalData),
      });

      if (response.ok) {
        console.log('Goal added successfully!'); // Debug: Success log
        closeForm(); // Close the form
      } else {
        console.error('Failed to add goal. Response:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error while adding goal:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} className="goal-form">
      <TextField
        label="Goal Name"
        variant="outlined"
        fullWidth
        value={goalName}
        onChange={(e) => setGoalName(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Target Amount"
        variant="outlined"
        fullWidth
        type="number"
        value={targetAmount}
        onChange={(e) => setTargetAmount(e.target.value)}
        margin="normal"
      />
      <TextField
        label="User Email"
        variant="outlined"
        fullWidth
        value={email} // Dynamically display the email
        InputProps={{
          readOnly: true, // Make it read-only
        }}
        margin="normal"
      />
      <Box display="flex" justifyContent="space-between" marginTop="20px">
        <Button variant="outlined" color="secondary" onClick={closeForm}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" type="submit">
          Add Goal
        </Button>
      </Box>
    </Box>
  );
};

export default GoalForm;
