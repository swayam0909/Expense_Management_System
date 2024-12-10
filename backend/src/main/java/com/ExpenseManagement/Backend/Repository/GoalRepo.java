package com.ExpenseManagement.Backend.Repository;

import com.ExpenseManagement.Backend.Model.Goal;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface GoalRepo extends MongoRepository<Goal, String> {
    List<Goal> findByEmail(String email);  // Get all goals for a user
}
