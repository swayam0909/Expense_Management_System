package com.ExpenseManagement.Backend.Repository;

import com.ExpenseManagement.Backend.Model.PaymentMethod;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PaymentMethodRepo extends MongoRepository<PaymentMethod,String> {
    List<PaymentMethod>findByUserId(int userId);
}
