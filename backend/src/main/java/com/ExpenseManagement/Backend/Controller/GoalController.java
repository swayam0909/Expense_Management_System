package com.ExpenseManagement.Backend.Controller;

import com.ExpenseManagement.Backend.Model.Goal;
import com.ExpenseManagement.Backend.Service.GoalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/goals")
public class GoalController {

    @Autowired
    private GoalService goalService;

    // Endpoint to set a new goal
    @PostMapping("/set")
    public String setGoal(@RequestBody Goal goal) {
        if (goal.getTargetAmount() <= 0) {
            return "Target amount must be greater than 0.";
        }
        if (goal.getGoalName() == null || goal.getGoalName().trim().isEmpty()) {
            return "Goal name cannot be empty.";
        }
        goalService.setGoal(goal);  // Save the goal to MongoDB
        return "Goal set successfully!";
    }

    // Endpoint to get all goals for a user
    @GetMapping("/all/{email}")
    public List<Goal> getAllGoals(@PathVariable String email) {
        return goalService.getAllGoals(email);  // Get all goals for a user
    }

    // Endpoint to update an existing goal
    @PutMapping("/update")
    public String updateGoal(@RequestBody Goal goal) {
        goalService.updateGoal(goal);
        return "Goal updated successfully!";
    }

    // Endpoint to delete a goal by ID
    @DeleteMapping("/delete/{goalId}")
    public String deleteGoal(@PathVariable String goalId) {
        goalService.deleteGoal(goalId);
        return "Goal deleted successfully!";
    }
}

