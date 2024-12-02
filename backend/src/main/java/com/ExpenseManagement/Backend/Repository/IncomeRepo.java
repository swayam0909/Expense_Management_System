package com.ExpenseManagement.Backend.Repository;

import com.ExpenseManagement.Backend.Model.Income;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface IncomeRepo extends MongoRepository<Income, String> {
    List<Income> findByEmail(String email);  // Query for incomes by userId
}
