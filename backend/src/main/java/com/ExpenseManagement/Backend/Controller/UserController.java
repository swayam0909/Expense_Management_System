package com.ExpenseManagement.Backend.Controller;

import com.ExpenseManagement.Backend.Model.Users;
import com.ExpenseManagement.Backend.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class UserController {

    @Autowired
    private UserRepo userRepository;

    // Register API
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Users user) {
        // Check if email already exists
        if (userRepository.findByEmail(user.getEmail()) != null) {
            return ResponseEntity.badRequest().body("Email already exists.");
        }

        // Save user
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully.");
    }

    // Login API
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> loginDetails) {
        String email = loginDetails.get("email");
        String password = loginDetails.get("password");

        // Validate email
        Users user = userRepository.findByEmail(email);
        if (user == null) {
            return ResponseEntity.badRequest().body("Invalid email.");
        }

        // Validate password
        if (!user.getPassword().equals(password)) {
            return ResponseEntity.badRequest().body("Invalid password.");
        }

        // Successful login response
        Map<String, String> response = new HashMap<>();
        response.put("message", "Login successful.");
        response.put("role", user.getRole()); // Return role or other user data
        response.put("email", user.getEmail()); // Include email in the response

        return ResponseEntity.ok(response);
    }

    // Forgot Password API
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");

        // Find user by email
        Users user = userRepository.findByEmail(email);
        if (user == null) {
            return ResponseEntity.badRequest().body("No user found with the provided email.");
        }

        // Generate a reset token and expiry
        String resetToken = java.util.UUID.randomUUID().toString();
        user.setResetToken(resetToken);
        user.setResetTokenExpiry(java.time.LocalDateTime.now().plusMinutes(15)); // Token valid for 15 minutes
        userRepository.save(user);

        // You can send an email with the reset token here (mock response)
        return ResponseEntity.ok("Reset token generated. Please check your email.");
    }

    // Reset Password API
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        String resetToken = request.get("resetToken");
        String newPassword = request.get("newPassword");

        // Find user by reset token
        Users user = userRepository.findByResetToken(resetToken);
        if (user == null || user.getResetTokenExpiry().isBefore(java.time.LocalDateTime.now())) {
            return ResponseEntity.badRequest().body("Invalid or expired reset token.");
        }

        // Update password and clear reset token
        user.setPassword(newPassword);
        user.setResetToken(null);
        user.setResetTokenExpiry(null);
        userRepository.save(user);

        return ResponseEntity.ok("Password reset successfully.");
    }
}
