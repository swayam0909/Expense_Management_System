package com.ExpenseManagement.Backend.Service;
import com.ExpenseManagement.Backend.Model.Income;
import com.ExpenseManagement.Backend.Repository.IncomeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class IncomeService {

    @Autowired
    private IncomeRepo incomeRepo;

    // Add an Income
    public void addIncome(Income income) {
        incomeRepo.save(income);  // Save the income
    }

    // Get all Incomes by email
    public List<Income> getAllIncomes(String email) {
        return incomeRepo.findByEmail(email);  // Fetch incomes by email
    }

    // Get Total Income by email
    public double getTotalIncome(String email) {
        List<Income> incomes = incomeRepo.findByEmail(email);
        return incomes.stream().mapToDouble(Income::getAmount).sum();  // Sum up all incomes
    }

    // Get Incomes for a specific date range
    public List<Income> getIncomesByDateRange(String email, LocalDateTime startDate, LocalDateTime endDate) {
        List<Income> incomes = incomeRepo.findByEmail(email);
        return incomes.stream()
                .filter(income -> income.getDate() != null &&
                        !income.getDate().isBefore(startDate) &&
                        !income.getDate().isAfter(endDate))
                .collect(Collectors.toList());
    }

    // Get Incomes for the last 1 month
    public List<Income> getIncomesLastMonth(String email) {
        LocalDateTime endDate = LocalDateTime.now();
        LocalDateTime startDate = endDate.minusMonths(1);
        return getIncomesByDateRange(email, startDate, endDate);
    }

    // Get Incomes for the last 6 months
    public List<Income> getIncomesLast6Months(String email) {
        LocalDateTime endDate = LocalDateTime.now();
        LocalDateTime startDate = endDate.minusMonths(6);
        return getIncomesByDateRange(email, startDate, endDate);
    }

    // Get Incomes for the last 1 year
    public List<Income> getIncomesLastYear(String email) {
        LocalDateTime endDate = LocalDateTime.now();
        LocalDateTime startDate = endDate.minusYears(1);
        return getIncomesByDateRange(email, startDate, endDate);
    }

    // Method to calculate total Income for the last 1 month
    public double getTotalIncomeLast1M(String email) {
        LocalDateTime oneMonthAgo = LocalDateTime.now().minusMonths(1);
        List<Income> income = incomeRepo.findByEmailAndDateAfter(email, oneMonthAgo);
        return income.stream().mapToDouble(Income::getAmount).sum();
    }

    // Method to calculate total Income for the last 6 months
    public double getTotalIncomeLast6M(String email) {
        LocalDateTime sixMonthsAgo = LocalDateTime.now().minusMonths(6);
        List<Income> income = incomeRepo.findByEmailAndDateAfter(email, sixMonthsAgo);
        return income.stream().mapToDouble(Income::getAmount).sum();
    }

    // Method to calculate total Income for the last 1 year
    public double getTotalIncomeLast1Y(String email) {
        LocalDateTime oneYearAgo = LocalDateTime.now().minusYears(1);
        List<Income> income = incomeRepo.findByEmailAndDateAfter(email, oneYearAgo);
        return income.stream().mapToDouble(Income::getAmount).sum();
    }

}
