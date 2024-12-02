package com.ExpenseManagement.Backend.Controller;

import com.ExpenseManagement.Backend.Model.Expense;
import com.ExpenseManagement.Backend.Service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/expense")
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    // Add an Expense
    @PostMapping("/add")
    public ResponseEntity<?> addExpense(@RequestBody Expense expense) {
        // Ensure email is passed correctly in the request body
        expenseService.addExpense(expense);
        return ResponseEntity.ok(Map.of("message", "Expense added successfully."));
    }

    // Get all Expenses by email
    @GetMapping("/all")
    public ResponseEntity<List<Expense>> getAllExpenses(@RequestParam String email) {
        List<Expense> expenses = expenseService.getAllExpenses(email);
        return ResponseEntity.ok(expenses);
    }

    // Get Total Expense by email
    @GetMapping("/total")
    public ResponseEntity<?> getTotalExpense(@RequestParam String email) {
        double total = expenseService.getTotalExpense(email);
        return ResponseEntity.ok(Map.of("totalExpense", total));
    }
}
