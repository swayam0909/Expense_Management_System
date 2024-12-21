package com.ExpenseManagement.Backend.Controller;

import com.ExpenseManagement.Backend.Model.Income;
import com.ExpenseManagement.Backend.Service.IncomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
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

    // Get Incomes for a specific date range (using LocalDate)
    @GetMapping("/range")
    public ResponseEntity<List<Income>> getIncomesInRange(
            @RequestParam String email,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {

        System.out.println("Received request for incomes in range");

        // Convert LocalDate to LocalDateTime (midnight)
        LocalDateTime startDateTime = startDate.atStartOfDay();
        LocalDateTime endDateTime = endDate.atTime(23, 59, 59); // end of the day

        List<Income> incomes = incomeService.getIncomesByDateRange(email, startDateTime, endDateTime);

        if (incomes.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(incomes);
    }

    // Get Incomes for the last 1 month
    @GetMapping("/lastMonth")
    public ResponseEntity<List<Income>> getIncomesLastMonth(@RequestParam String email) {
        List<Income> incomes = incomeService.getIncomesLastMonth(email);
        return ResponseEntity.ok(incomes);
    }

    // Get Incomes for the last 6 months
    @GetMapping("/last6Months")
    public ResponseEntity<List<Income>> getIncomesLast6Months(@RequestParam String email) {
        List<Income> incomes = incomeService.getIncomesLast6Months(email);
        return ResponseEntity.ok(incomes);
    }

    // Get Incomes for the last 1 year
    @GetMapping("/lastYear")
    public ResponseEntity<List<Income>> getIncomesLastYear(@RequestParam String email) {
        List<Income> incomes = incomeService.getIncomesLastYear(email);
        return ResponseEntity.ok(incomes);
    }

    // Get Total Income for last 1 month
    @GetMapping("/1M")
    public ResponseEntity<?> getTotalIncomeLastMonth(@RequestParam String email) {
        double total = incomeService.getTotalIncomeLast1M(email);
        return ResponseEntity.ok(Map.of("totalIncomeLast1M", total));
    }

    // Get Total Income for last 6 months
    @GetMapping("/6M")
    public ResponseEntity<?> getTotalIncomeLast6Months(@RequestParam String email) {
        double total = incomeService.getTotalIncomeLast6M(email);
        return ResponseEntity.ok(Map.of("totalIncomeLast6M", total));
    }

    // Get Total Income for last 1 year
    @GetMapping("/1Y")
    public ResponseEntity<?> getTotalIncomeLastYear(@RequestParam String email) {
        double total = incomeService.getTotalIncomeLast1Y(email);
        return ResponseEntity.ok(Map.of("totalIncomeLast1Y", total));
    }
}
