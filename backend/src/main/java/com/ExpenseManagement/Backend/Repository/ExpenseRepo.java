package com.ExpenseManagement.Backend.Repository;

import com.ExpenseManagement.Backend.Model.Expense;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface ExpenseRepo extends MongoRepository<Expense, String> {
    // Find expenses by user email
    List<Expense> findByEmail(String email);

    // Find expenses by email and a date after a certain date
    List<Expense> findByEmailAndDateAfter(String email, LocalDateTime date);

    // Find expenses by email and date within a specific range (optional)
    List<Expense> findByEmailAndDateBetween(String email, LocalDateTime startDate, LocalDateTime endDate);

}
