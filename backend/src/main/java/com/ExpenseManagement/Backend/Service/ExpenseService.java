package com.ExpenseManagement.Backend.Service;

import com.ExpenseManagement.Backend.Model.Expense;
import com.ExpenseManagement.Backend.Repository.ExpenseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepo expenseRepo;

    // Add an Expense
    public void addExpense(Expense expense) {
        expenseRepo.save(expense);  // Save the expense
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
}
