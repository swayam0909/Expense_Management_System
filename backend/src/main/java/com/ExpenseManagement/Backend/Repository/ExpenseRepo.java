package com.ExpenseManagement.Backend.Repository;

import com.ExpenseManagement.Backend.Model.Expense;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ExpenseRepo extends MongoRepository<Expense,String> {
    List<Expense> findByUserId(int userId);
}
