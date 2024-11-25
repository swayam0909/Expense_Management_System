package com.ExpenseManagement.Backend.Controller;

import com.ExpenseManagement.Backend.Model.Expense;
import com.ExpenseManagement.Backend.Repository.ExpenseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Expense")
public class ExpenseController {
    @Autowired
    private ExpenseRepo expenseRepo;

    @PostMapping
    public Expense addExpense(@RequestBody Expense expense) {
        return expenseRepo.save(expense);  // Save expense to MongoDB
    }

    @GetMapping("/Users/userId")
    public List<Expense> getExpensesByUserId(@PathVariable int userId) {
        return expenseRepo.findByUserId(userId);  // Get all expenses for a user
    }

    @GetMapping
    public List<Expense> getAllExpenses() {
        return expenseRepo.findAll();  // Get all expenses
    }
}
