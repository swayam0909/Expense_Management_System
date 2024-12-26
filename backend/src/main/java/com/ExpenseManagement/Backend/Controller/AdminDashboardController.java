package com.ExpenseManagement.Backend.Controller;

import com.ExpenseManagement.Backend.Model.Expense;
import com.ExpenseManagement.Backend.Model.Users;
import com.ExpenseManagement.Backend.Repository.ExpenseRepo;
import com.ExpenseManagement.Backend.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminDashboardController {
    @Autowired
    private UserRepo userRepository;

    @Autowired
    private ExpenseRepo expenseRepository;

    @GetMapping("/Users")
    public ResponseEntity<List<Users>> getAllUsers() {
        List<Users> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/userCounts")
    public ResponseEntity<Map<String, Long>> getUserCounts() {
        // Get total number of users (enabled + disabled)
        long totalUsers = userRepository.count();

        // Create a map to hold the counts
        Map<String, Long> userCounts = new HashMap<>();
        userCounts.put("totalUsers", totalUsers);

        // Return the response as a JSON object
        return ResponseEntity.ok(userCounts);
    }
    @GetMapping("/userExpenses")
    public ResponseEntity<?> getUserExpenses() {
        // Fetch all users
        List<Users> users = userRepository.findAll();

        if (users.isEmpty()) {
            return ResponseEntity.ok("No users found.");
        }

        // Calculate expenses for each user
        Map<String, Double> userExpenseMap = new HashMap<>();
        double totalExpenses = 0;

        for (Users user : users) {
            List<Expense> expenses = expenseRepository.findByEmail(user.getEmail());
            double userTotalExpense = expenses.stream()
                    .mapToDouble(Expense::getAmount)
                    .sum();

            userExpenseMap.put(user.getEmail(), userTotalExpense);
            totalExpenses += userTotalExpense;
        }

        // Prepare the response
        Map<String, Object> response = new HashMap<>();
        response.put("userExpenses", userExpenseMap);
        response.put("totalExpenses", totalExpenses);

        return ResponseEntity.ok(response);
    }
}

