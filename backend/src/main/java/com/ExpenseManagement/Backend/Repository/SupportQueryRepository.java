package com.ExpenseManagement.Backend.Repository;

import com.ExpenseManagement.Backend.Model.SupportQuery;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SupportQueryRepository extends MongoRepository<SupportQuery, String> {
    // You can add custom queries if needed in the future
}