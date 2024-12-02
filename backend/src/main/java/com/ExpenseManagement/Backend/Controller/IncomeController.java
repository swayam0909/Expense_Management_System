package com.ExpenseManagement.Backend.Controller;

import com.ExpenseManagement.Backend.Model.Income;
import com.ExpenseManagement.Backend.Service.IncomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/income")
public class IncomeController {

    @Autowired
    private IncomeService incomeService;

    // Add an Income
    @PostMapping("/add")
    public ResponseEntity<?> addIncome(@RequestBody Income income) {
        // Ensure email is passed correctly in the request body
        incomeService.addIncome(income);
        return ResponseEntity.ok(Map.of("message", "Income added successfully."));
    }

    // Get all Incomes by email
    @GetMapping("/all")
    public ResponseEntity<List<Income>> getAllIncomes(@RequestParam String email) {
        List<Income> incomes = incomeService.getAllIncomes(email);
        return ResponseEntity.ok(incomes);
    }

    // Get Total Income by email
    @GetMapping("/total")
    public ResponseEntity<?> getTotalIncome(@RequestParam String email) {
        double total = incomeService.getTotalIncome(email);
        return ResponseEntity.ok(Map.of("totalIncome", total));
    }
}
