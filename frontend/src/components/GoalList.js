import React, { useState, useEffect, useRef } from 'react';
import { CircularProgress, Typography, TextField, Button } from '@mui/material';
import GoalItem from './GoalItem';

const GoalsList = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const goalsListRef = useRef(null);

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      console.error('No user email found in localStorage');
      setLoading(false);
      return;
    }

    const fetchGoals = async () => {
      try {
        const response = await fetch(`http://localhost:8080/goals/all/${userEmail}`);
        if (response.ok) {
          const data = await response.json();
          setGoals(data);
        } else {
          console.error('Failed to fetch goals. Response:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error fetching goals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, []);

  const handleUpdateGoal = async (updatedGoal) => {
    try {
      const response = await fetch('http://localhost:8080/goals/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedGoal),
      });

      if (response.ok) {
        setGoals((prevGoals) =>
          prevGoals.map((goal) => (goal.goalId === updatedGoal.goalId ? updatedGoal : goal))
        );
        scrollToGoal(updatedGoal.goalId);
      } else {
        console.error('Failed to update goal. Response:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error updating goal:', error);
    }
  };

  const handleDeleteGoal = async (goalId) => {
    try {
      const response = await fetch(`http://localhost:8080/goals/delete/${goalId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setGoals((prevGoals) => prevGoals.filter((goal) => goal.goalId !== goalId));
      } else {
        console.error('Failed to delete goal. Response:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };

  const handleAddMoney = async (updatedGoal) => {
    try {
      const response = await fetch('http://localhost:8080/goals/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedGoal),
      });

      if (response.ok) {
        setGoals((prevGoals) =>
          prevGoals.map((goal) => (goal.goalId === updatedGoal.goalId ? updatedGoal : goal))
        );
        scrollToGoal(updatedGoal.goalId);
      } else {
        console.error('Failed to update goal. Response:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error updating goal:', error);
    }
  };

  const calculateGoalProgress = (goal) => {
    const savedAmount = parseFloat(goal.savedAmount);
    const targetAmount = parseFloat(goal.targetAmount);

    if (targetAmount === 0) return 0;
    return ((savedAmount / targetAmount) * 100).toFixed(2);
  };

  const scrollToGoal = (goalId) => {
    const goalElement = document.getElementById(goalId);
    if (goalElement) {
      goalElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const filteredGoals = goals.filter((goal) =>
    goal.goalName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div ref={goalsListRef}>
      <Typography variant="h4" gutterBottom>
        Your Goals
      </Typography>

      {/* Search bar for filtering goals */}
      <TextField
        label="Search Goals"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        margin="normal"
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#512da8',
            },
            '&:hover fieldset': {
              borderColor: '#031224',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#512da8',
            },
          },
        }}
      />

      {filteredGoals.length === 0 ? (
        <Typography>No goals found matching your search.</Typography>
      ) : (
        filteredGoals.map((goal) => (
          <GoalItem
            key={goal.goalId}
            goal={goal}
            handleUpdateGoal={handleUpdateGoal}
            handleDeleteGoal={handleDeleteGoal}
            handleAddMoney={handleAddMoney}
            calculateGoalProgress={calculateGoalProgress}
          />
        ))
      )}

    </div>
  );
};

export default GoalsList;
