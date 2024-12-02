package com.ExpenseManagement.Backend.Service;

import com.ExpenseManagement.Backend.Model.Income;
import com.ExpenseManagement.Backend.Repository.IncomeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
}
