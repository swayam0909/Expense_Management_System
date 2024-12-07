package com.ExpenseManagement.Backend.Repository;
import com.ExpenseManagement.Backend.Model.Income;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface IncomeRepo extends MongoRepository<Income, String> {
    List<Income> findByEmail(String email);  // Query for incomes by userId

    List<Income> findByEmailAndDateAfter(String email, LocalDateTime date);

    // Find Income by email and date within a specific range (optional)
    List<Income> findByEmailAndDateBetween(String email, LocalDateTime startDate, LocalDateTime endDate);
}
