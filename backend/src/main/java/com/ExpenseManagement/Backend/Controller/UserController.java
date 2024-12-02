package com.ExpenseManagement.Backend.Controller;

import com.ExpenseManagement.Backend.Model.Users;
import com.ExpenseManagement.Backend.Repository.UserRepo;
import com.ExpenseManagement.Backend.Service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/auth")
public class UserController {

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private EmailService emailService;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // Register API
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Users user) {
        if (userRepository.findByEmail(user.getEmail()) != null) {
            return ResponseEntity.badRequest().body("Email already exists.");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword())); // Hash password
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully.");
    }

    // Login API
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> loginDetails) {
        String email = loginDetails.get("email");
        String password = loginDetails.get("password");

        Users user = userRepository.findByEmail(email);
        if (user == null || !passwordEncoder.matches(password, user.getPassword())) {
            return ResponseEntity.badRequest().body("Invalid email or password.");
        }

        return ResponseEntity.ok("Login successful.");
    }

    // Forgot Password API
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        try {
            Users user = userRepository.findByEmail(email);
            if (user == null) {
                return ResponseEntity.badRequest().body("No user found with the provided email.");
            }

            String resetToken = UUID.randomUUID().toString();
            user.setResetToken(resetToken);
            user.setResetTokenExpiry(LocalDateTime.now().plusMinutes(15));
            userRepository.save(user);

            String emailBody = "Your password reset token is: " + resetToken;
            emailService.sendEmail(email, "Password Reset Request", emailBody);

            return ResponseEntity.ok("Reset token sent to your email.");
        } catch (Exception e) {
            e.printStackTrace(); // Logs the full error
            return ResponseEntity.status(500).body("An error occurred: " + e.getMessage());
        }
    }

    // Reset Password API
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        String resetToken = request.get("resetToken");
        String newPassword = request.get("newPassword");

        Users user = userRepository.findByResetToken(resetToken);
        if (user == null || user.getResetTokenExpiry().isBefore(LocalDateTime.now())) {
            return ResponseEntity.badRequest().body("Invalid or expired reset token.");
        }

        user.setPassword(passwordEncoder.encode(newPassword)); // Hash new password
        user.setResetToken(null);
        user.setResetTokenExpiry(null);
        userRepository.save(user);

        return ResponseEntity.ok("Password reset successfully.");
    }

    // Fetch User Details API
    @GetMapping("/user-info")
    public ResponseEntity<?> getUserInfo(@RequestParam String email) {
        Users user = userRepository.findByEmail(email);

        if (user == null) {
            return ResponseEntity.badRequest().body("User not found.");
        }

        // Return only necessary information (like username)
        return ResponseEntity.ok(Map.of("username", user.getUsername()));
    }

}
