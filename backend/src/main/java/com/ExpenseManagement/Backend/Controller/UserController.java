package com.ExpenseManagement.Backend.Controller;

import com.ExpenseManagement.Backend.Model.Users;
import com.ExpenseManagement.Backend.Repository.UserRepo;
import com.ExpenseManagement.Backend.Service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
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

            // Generate reset token and set expiry
            String resetToken = UUID.randomUUID().toString();
            user.setResetToken(resetToken);
            user.setResetTokenExpiry(LocalDateTime.now().plusMinutes(15));  // 15 minutes expiry
            userRepository.save(user);

            // Create the password reset link
            String resetLink = "http://localhost:3000/reset-password?token=" + resetToken;

            // Create the email body (HTML format)
            String emailBody = "<html><body>"
                    + "<h3>Forgot Password Request</h3>"
                    + "<p>To reset your password, click the following link:</p>"
                    + "<a href=\"" + resetLink + "\">Reset Password</a>"
                    + "<p>This link will expire in 15 minutes.</p>"
                    + "</body></html>";

            // Send the email with the reset link
            emailService.sendEmail(email, "Password Reset Request", emailBody);

            return ResponseEntity.ok("Password reset email sent successfully.");
        } catch (Exception e) {
            e.printStackTrace(); // Logs the full error
            return ResponseEntity.status(500).body("An error occurred: " + e.getMessage());
        }
    }

    // Reset Password Page (GET method) - Redirect to React frontend
    @GetMapping("/reset-password")
    public ResponseEntity<String> showResetPage(@RequestParam String token) {
        // Find the user by the reset token
        Users user = userRepository.findByResetToken(token);

        // If no user found or the token is expired, return an error message
        if (user == null || user.getResetTokenExpiry().isBefore(LocalDateTime.now())) {
            return ResponseEntity.status(404).body("Invalid or expired token.");
        }

        // Redirect the user to the frontend page where they can input the new password
        return ResponseEntity.status(HttpStatus.FOUND)
                .header(HttpHeaders.LOCATION, "http://localhost:3000/reset-password?token=" + token)
                .build();
    }

    // Reset Password (POST method)
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        String resetToken = request.get("resetToken");
        String newPassword = request.get("newPassword");

        // Validate the input
        if (resetToken == null || newPassword == null) {
            return ResponseEntity.badRequest().body("Reset token and new password are required.");
        }

        // Find the user by reset token
        Users user = userRepository.findByResetToken(resetToken);
        if (user == null) {
            return ResponseEntity.badRequest().body("Invalid reset token.");
        }

        // Check if the token has expired
        if (user.getResetTokenExpiry().isBefore(LocalDateTime.now())) {
            return ResponseEntity.badRequest().body("Reset token has expired.");
        }

        // Check if the new password is the same as the old one
        if (passwordEncoder.matches(newPassword, user.getPassword())) {
            return ResponseEntity.badRequest().body("New password cannot be the same as the old one.");
        }

        // Set the new password and clear the reset token and expiry
        user.setPassword(passwordEncoder.encode(newPassword));  // Hash the new password
        user.setResetToken(null);  // Clear the reset token after it’s used
        user.setResetTokenExpiry(null);  // Clear the token expiry

        // Save the user with the updated password
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
