package com.ExpenseManagement.Backend.Repository;

import com.ExpenseManagement.Backend.Model.Users;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepo extends MongoRepository<Users, String> {
    Users findByEmail(String email);  // For email-based operations
    Users findByResetToken(String resetToken); // Optional, for reset-password functionality
}
