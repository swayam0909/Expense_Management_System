package com.ExpenseManagement.Backend.Controller;

import com.ExpenseManagement.Backend.Service.AdminService;
import com.ExpenseManagement.Backend.dto.AdminLoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AdminLoginRequest request) {
        try {
            // Call service method to validate login
            String message = adminService.login(request.getEmail(), request.getPassword());

            // Return a JSON response with the message
            return ResponseEntity.ok().body(new LoginResponse(message));  // Wrap the message in a LoginResponse object
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new LoginResponse(e.getMessage()));  // Wrap the error message in a LoginResponse object
        }
    }

    // Create a response DTO class to return the message in JSON format
    public static class LoginResponse {
        private String message;

        public LoginResponse(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }
}
