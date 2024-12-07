package com.ExpenseManagement.Backend.Repository;

import com.ExpenseManagement.Backend.Model.Event;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends MongoRepository<Event, String> {
}
