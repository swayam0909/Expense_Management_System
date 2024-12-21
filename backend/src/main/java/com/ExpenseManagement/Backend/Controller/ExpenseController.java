package com.ExpenseManagement.Backend.Controller;

import com.ExpenseManagement.Backend.Model.Expense;
import com.ExpenseManagement.Backend.Service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
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
        if (expense.getEmail() == null || expense.getEmail().isEmpty()) {
            return ResponseEntity.badRequest().body("User email is required");
        }
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

    // Get Expenses for last 1 month
    @GetMapping("/last-month")
    public ResponseEntity<List<Expense>> getExpensesLastMonth(@RequestParam String email) {
        List<Expense> expenses = expenseService.getExpensesLastMonth(email);
        return ResponseEntity.ok(expenses);
    }

    // Get Expenses for last 6 months
    @GetMapping("/last-6-months")
    public ResponseEntity<List<Expense>> getExpensesLast6Months(@RequestParam String email) {
        List<Expense> expenses = expenseService.getExpensesLast6Months(email);
        return ResponseEntity.ok(expenses);
    }

    // Get Expenses for last 1 year
    @GetMapping("/last-year")
    public ResponseEntity<List<Expense>> getExpensesLastYear(@RequestParam String email) {
        List<Expense> expenses = expenseService.getExpensesLastYear(email);
        return ResponseEntity.ok(expenses);
    }

    // Get Total Expense for last 1 month
    @GetMapping("/1M")
    public ResponseEntity<?> getTotalExpenseLastMonth(@RequestParam String email) {
        double total = expenseService.getTotalExpenseLast1M(email);
        return ResponseEntity.ok(Map.of("totalExpenseLast1M", total));
    }

    // Get Total Expense for last 6 months
    @GetMapping("6M")
    public ResponseEntity<?> getTotalExpenseLast6Months(@RequestParam String email) {
        double total = expenseService.getTotalExpenseLast6M(email);
        return ResponseEntity.ok(Map.of("totalExpenseLast6M", total));
    }

    // Get Total Expense for last 1 year
    @GetMapping("1Y")
    public ResponseEntity<?> getTotalExpenseLastYear(@RequestParam String email) {
        double total = expenseService.getTotalExpenseLast1Y(email);
        return ResponseEntity.ok(Map.of("totalExpenseLast1Y", total));
    }

    @GetMapping("/weekly")
    public ResponseEntity<Map<String, Double>> getWeeklyExpenses(@RequestParam String email) {
        Map<String, Double> weeklyExpenses = expenseService.getWeeklyExpenses(email);
        return ResponseEntity.ok(weeklyExpenses);
    }

    // Get Expenses within a custom date range
    @GetMapping("/range")
    public ResponseEntity<List<Expense>> getExpensesInRange(
            @RequestParam String email,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {

        // Convert LocalDate to LocalDateTime (midnight)
        LocalDateTime startDateTime = startDate.atStartOfDay();
        LocalDateTime endDateTime = endDate.atTime(23, 59, 59); // end of the day

        List<Expense> expenses = expenseService.getExpensesByDateRange(email, startDateTime, endDateTime);

        if (expenses.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(expenses);
    }
}
