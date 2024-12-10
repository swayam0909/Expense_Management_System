package com.ExpenseManagement.Backend.Service;
import com.ExpenseManagement.Backend.Model.Goal;
import com.ExpenseManagement.Backend.Repository.GoalRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GoalService {

    @Autowired
    private GoalRepo goalRepo;

    // Save a new goal
    public void setGoal(Goal goal) {
        goalRepo.save(goal);  // Save the goal to the MongoDB collection
    }

    // Get all goals for a user
    public List<Goal> getAllGoals(String email) {
        return goalRepo.findByEmail(email);  // Fetch goals by user email
    }

    // Update an existing goal
    public void updateGoal(Goal goal) {
        Goal existingGoal = goalRepo.findById(goal.getGoalId()).orElse(null);
        if (existingGoal != null) {
            existingGoal.setGoalName(goal.getGoalName());
            existingGoal.setTargetAmount(goal.getTargetAmount());
            existingGoal.setSavedAmount(goal.getSavedAmount());  // Update the savedAmount
            goalRepo.save(existingGoal);  // Save the updated goal
        }
    }

    // Delete a goal
    public void deleteGoal(String goalId) {
        goalRepo.deleteById(goalId);  // Delete goal by ID
    }

    // Check if any goal has been achieved
    public void checkGoalAchievement(String email) {
        List<Goal> goals = goalRepo.findByEmail(email);
        for (Goal goal : goals) {
            if (goal.getSavedAmount() >= goal.getTargetAmount()) {
                // Notify user goal has been achieved
                System.out.println("Congratulations! You've achieved your goal: " + goal.getGoalName());
            }
        }
    }
}

