package com.ExpenseManagement.Backend.Model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "goals")
public class Goal {
    @Id
    private String goalId;  // Unique ID for each goal
    private String email;    // User email to link goals
    private String goalName;
    private double targetAmount;
    private double savedAmount;  // Amount the user has saved towards the goal

    // Getters and setters
    public String getGoalId() {
        return goalId;
    }

    public void setGoalId(String goalId) {
        this.goalId = goalId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getGoalName() {
        return goalName;
    }

    public void setGoalName(String goalName) {
        this.goalName = goalName;
    }

    public double getTargetAmount() {
        return targetAmount;
    }

    public void setTargetAmount(double targetAmount) {
        this.targetAmount = targetAmount;
    }

    public double getSavedAmount() {
        return savedAmount;
    }

    public void setSavedAmount(double savedAmount) {
        this.savedAmount = savedAmount;
    }
}
