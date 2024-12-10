import React, { useState } from 'react';
import { Button, TextField, Paper, Typography } from '@mui/material';

const GoalItem = ({ goal, handleUpdateGoal, handleDeleteGoal, handleAddMoney, calculateGoalProgress }) => {
  const [moneyToAdd, setMoneyToAdd] = useState('');
  const [editingGoal, setEditingGoal] = useState(false);
  const [updatedGoal, setUpdatedGoal] = useState({ ...goal });

  // Handle add money submit
  const handleAddMoneySubmit = async (e) => {
    e.preventDefault();
    const amountToAdd = parseFloat(moneyToAdd);
    
    if (isNaN(amountToAdd) || amountToAdd <= 0) {
      alert('Please enter a valid amount to add.');
      return;
    }

    const updatedGoalWithMoney = { ...goal, savedAmount: goal.savedAmount + amountToAdd };
    
    // Call the function to update the goal in the backend
    await handleAddMoney(updatedGoalWithMoney);
    setMoneyToAdd(''); // Reset the input field after adding money
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    await handleUpdateGoal(updatedGoal);
    setEditingGoal(false); // Close the edit form after submitting
  };

  return (
    <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
      {!editingGoal ? (
        <>
          <Typography variant="h6">{goal.goalName}</Typography>
          <div className="goal-progress my-2">
            <progress className="w-full" value={goal.savedAmount} max={goal.targetAmount}></progress>
            <Typography>{`Progress: ${calculateGoalProgress(goal)}%`}</Typography>
          </div>
          <Typography>{`Target: ₹${goal.targetAmount}`}</Typography>
          <Typography>{`Saved: ₹${goal.savedAmount}`}</Typography>

          {/* Add money form */}
          <form onSubmit={handleAddMoneySubmit} style={{ marginTop: '16px' }}>
            <TextField
              label="Add Money"
              type="number"
              value={moneyToAdd}
              onChange={(e) => setMoneyToAdd(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: '#512da8', // Add button color
                color: 'white',
                '&:hover': {
                  backgroundColor: '#031224', // Hover color
                },
                marginTop: '8px',
                marginBottom:'4px'
              }}
            >
              Add Money
            </Button>
          </form>

          <div className="mt-2">
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#512da8', // Update button color
                color: 'white',
                '&:hover': {
                  backgroundColor: '#031224', // Hover color
                },
                marginRight: '7px',
              }}
              onClick={() => setEditingGoal(true)}
            >
              Update Goal
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#512da8', // Delete button color
                color: 'white',
                '&:hover': {
                  backgroundColor: '#031224', // Hover color
                },
              }}
              onClick={() => handleDeleteGoal(goal.goalId)}
            >
              Delete Goal
            </Button>
          </div>
        </>
      ) : (
        <form onSubmit={handleUpdateSubmit}>
          <Typography variant="h6">Update Goal</Typography>
          <TextField
            label="Goal Name"
            value={updatedGoal.goalName}
            onChange={(e) => setUpdatedGoal({ ...updatedGoal, goalName: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Target Amount"
            type="number"
            value={updatedGoal.targetAmount}
            onChange={(e) => setUpdatedGoal({ ...updatedGoal, targetAmount: e.target.value })}
            fullWidth
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: '#512da8', // Update button color
              color: 'white',
              '&:hover': {
                backgroundColor: '#031224', // Hover color
              },
              marginTop: '8px',
            }}
          >
            Update Goal
          </Button>
          <Button
            type="button"
            variant="contained"
            sx={{
              backgroundColor: '#031224', // Cancel button color (dark blue)
              color: 'white',
              '&:hover': {
                backgroundColor: '#512da8', // Hover color for cancel
              },
              marginTop: '8px',
              marginLeft: '8px',
            }}
            onClick={() => setEditingGoal(false)}
          >
            Cancel
          </Button>
        </form>
      )}
    </Paper>
  );
};

export default GoalItem;
