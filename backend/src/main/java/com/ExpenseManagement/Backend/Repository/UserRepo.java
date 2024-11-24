package com.ExpenseManagement.Backend.Repository;

import com.ExpenseManagement.Backend.Model.Users;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepo extends MongoRepository<Users, String> {
    Users findByUsername(String username);
}
