package com.ExpenseManagement.Backend.Service;

import com.ExpenseManagement.Backend.Model.Expense;
import com.ExpenseManagement.Backend.Model.Goal;
import com.ExpenseManagement.Backend.Repository.ExpenseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepo expenseRepo;

    @Autowired
    private GoalService goalService;

    // Add an Expense and update goal progress
    public void addExpense(Expense expense) {
        expenseRepo.save(expense);  // Save the expense

//        // Update goal progress
//        List<Goal> userGoals = goalService.getAllGoals(email);
//        for (Goal goal : userGoals) {
//            // Check if the expense amount can contribute to the goal
//            if (expense.getAmount() <= goal.getTargetAmount() - goal.getSavedAmount()) {
//                goal.setSavedAmount(goal.getSavedAmount() + expense.getAmount());
//                goalService.updateGoal(goal);  // Update the goal saved amount
//            }
//        }
//
//        // Check for any achieved goals
//        goalService.checkGoalAchievement(email);
    }

    // Get all Expenses by email
    public List<Expense> getAllExpenses(String email) {
        return expenseRepo.findByEmail(email);  // Fetch expenses by email
    }

    // Get Total Expense by email
    public double getTotalExpense(String email) {
        List<Expense> expenses = expenseRepo.findByEmail(email);
        return expenses.stream().mapToDouble(Expense::getAmount).sum();  // Sum up all expenses
    }

    // Get Expenses for a specific date range
    public List<Expense> getExpensesByDateRange(String email, LocalDateTime startDate, LocalDateTime endDate) {
        List<Expense> expenses = expenseRepo.findByEmail(email);
        return expenses.stream()
                .filter(expense -> expense.getDate() != null &&
                        !expense.getDate().isBefore(startDate) &&
                        !expense.getDate().isAfter(endDate))
                .collect(Collectors.toList());
    }

    // Get Expenses for the last 1 month
    public List<Expense> getExpensesLastMonth(String email) {
        LocalDateTime endDate = LocalDateTime.now();
        LocalDateTime startDate = endDate.minusMonths(1);
        return getExpensesByDateRange(email, startDate, endDate);
    }

    // Get Expenses for the last 6 months
    public List<Expense> getExpensesLast6Months(String email) {
        LocalDateTime endDate = LocalDateTime.now();
        LocalDateTime startDate = endDate.minusMonths(6);
        return getExpensesByDateRange(email, startDate, endDate);
    }

    // Get Expenses for the last 1 year
    public List<Expense> getExpensesLastYear(String email) {
        LocalDateTime endDate = LocalDateTime.now();
        LocalDateTime startDate = endDate.minusYears(1);
        return getExpensesByDateRange(email, startDate, endDate);
    }

    // Method to calculate total expense for the last 1 month
    public double getTotalExpenseLast1M(String email) {
        LocalDateTime oneMonthAgo = LocalDateTime.now().minusMonths(1);
        List<Expense> expenses = expenseRepo.findByEmailAndDateAfter(email, oneMonthAgo);
        return expenses.stream().mapToDouble(Expense::getAmount).sum();
    }

    // Method to calculate total expense for the last 6 months
    public double getTotalExpenseLast6M(String email) {
        LocalDateTime sixMonthsAgo = LocalDateTime.now().minusMonths(6);
        List<Expense> expenses = expenseRepo.findByEmailAndDateAfter(email, sixMonthsAgo);
        return expenses.stream().mapToDouble(Expense::getAmount).sum();
    }

    // Method to calculate total expense for the last 1 year
    public double getTotalExpenseLast1Y(String email) {
        LocalDateTime oneYearAgo = LocalDateTime.now().minusYears(1);
        List<Expense> expenses = expenseRepo.findByEmailAndDateAfter(email, oneYearAgo);
        return expenses.stream().mapToDouble(Expense::getAmount).sum();
    }

    public Map<String, Double> getWeeklyExpenses(String email) {
        // Get start and end dates for the current week
        LocalDateTime today = LocalDateTime.now();
        LocalDateTime startOfWeek = today.with(java.time.DayOfWeek.MONDAY).withHour(0).withMinute(0).withSecond(0); // Monday
        LocalDateTime endOfWeek = startOfWeek.plusDays(6).withHour(23).withMinute(59).withSecond(59); // Sunday

        // Fetch expenses for the week
        List<Expense> weeklyExpenses = expenseRepo.findByEmailAndDateBetween(email, startOfWeek, endOfWeek);

        // Group expenses by day of the week
        Map<String, Double> dailyExpenses = new HashMap<>();
        for (int i = 0; i < 7; i++) {
            LocalDateTime currentDay = startOfWeek.plusDays(i);
            String dayName = currentDay.getDayOfWeek().toString(); // E.g., MONDAY
            double totalForDay = weeklyExpenses.stream()
                    .filter(exp -> exp.getDate().toLocalDate().equals(currentDay.toLocalDate()))
                    .mapToDouble(Expense::getAmount)
                    .sum();
            dailyExpenses.put(dayName, totalForDay);
        }

        return dailyExpenses;
    }
}
