package com.ExpenseManagement.Backend.Service;

import com.ExpenseManagement.Backend.Model.SupportQuery;
import com.ExpenseManagement.Backend.Repository.SupportQueryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class SupportQueryService {
    private final SupportQueryRepository supportQueryRepository;

    @Autowired
    public SupportQueryService(SupportQueryRepository supportQueryRepository) {
        this.supportQueryRepository = supportQueryRepository;
    }

    // Method to save support query
    public SupportQuery saveQuery(SupportQuery supportQuery) {
        return supportQueryRepository.save(supportQuery);
    }
    public SupportQuery save(SupportQuery supportQuery) {
        return supportQueryRepository.save(supportQuery);
    }

    // Method to fetch all queries (for admin purposes)
    public List<SupportQuery> getAllQueries() {
        return supportQueryRepository.findAll();
    }
}
