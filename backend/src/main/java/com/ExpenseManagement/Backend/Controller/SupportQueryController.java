package com.ExpenseManagement.Backend.Controller;

import com.ExpenseManagement.Backend.Model.SupportQuery;
import com.ExpenseManagement.Backend.Service.SupportQueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class SupportQueryController {

    private final SupportQueryService supportQueryService;

    @Autowired
    public SupportQueryController(SupportQueryService supportQueryService) {
        this.supportQueryService = supportQueryService;
    }

    // Endpoint to submit a support query
    @PostMapping("/support-query")
    public ResponseEntity<?> submitSupportQuery(@RequestBody SupportQuery supportQuery) {
        // Validate request body fields
        if (supportQuery.getName() == null || supportQuery.getName().isEmpty()) {
            return ResponseEntity.badRequest().body(createErrorResponse("Required parameter 'name' is not present."));
        }
        if (supportQuery.getEmail() == null || supportQuery.getEmail().isEmpty()) {
            return ResponseEntity.badRequest().body(createErrorResponse("Required parameter 'email' is not present."));
        }
        if (supportQuery.getPhone() == null || supportQuery.getPhone().isEmpty()) {
            return ResponseEntity.badRequest().body(createErrorResponse("Required parameter 'phone' is not present."));
        }
        if (supportQuery.getQuery() == null || supportQuery.getQuery().isEmpty()) {
            return ResponseEntity.badRequest().body(createErrorResponse("Required parameter 'query' is not present."));
        }

        // Save the support query to the database
        supportQueryService.save(supportQuery);

        // Return success response in JSON format
        return ResponseEntity.ok().body(createSuccessResponse("Support query submitted successfully!"));
    }

    // Endpoint for admin to get all support queries
    @GetMapping("/get-all-queries")
    public ResponseEntity<?> getAllQueries() {
        List<SupportQuery> queries = supportQueryService.getAllQueries();

        // Return all queries as JSON
        return ResponseEntity.ok(createSuccessResponse(queries));
    }

    // Helper method to create error response in JSON format
    private Map<String, Object> createErrorResponse(String message) {
        return Map.of("status", "error", "message", message);
    }

    // Helper method to create success response in JSON format
    private Map<String, Object> createSuccessResponse(Object data) {
        return Map.of("status", "success", "data", data);
    }
}
