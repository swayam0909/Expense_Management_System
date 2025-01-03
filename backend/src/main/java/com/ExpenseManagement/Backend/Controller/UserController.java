package com.ExpenseManagement.Backend.Controller;

import com.ExpenseManagement.Backend.Model.Users;
import com.ExpenseManagement.Backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class UserController {

    @Autowired
    private UserService userService;

    // Register API
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Users user) {
        String message = userService.registerUser(user);
        return ResponseEntity.ok(Map.of("message", message));
    }

    // Login API
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> loginDetails) {
        String email = loginDetails.get("email");
        String password = loginDetails.get("password");

        String message = userService.loginUser(email, password);
        return ResponseEntity.ok(Map.of("message", message));
    }

    // Forgot Password API
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String message = userService.forgotPassword(email);
        return ResponseEntity.ok(Map.of("message", message));
    }

    // Reset Password API
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        String resetToken = request.get("resetToken");
        String newPassword = request.get("newPassword");

        String message = userService.resetPassword(resetToken, newPassword);
        return ResponseEntity.ok(Map.of("message", message));
    }

    // Set User Status API
    @PutMapping("/set-status")
    public ResponseEntity<?> setUserStatus(@RequestParam String email, @RequestParam String status) {
        String message = userService.setUserStatus(email, status);
        return ResponseEntity.ok(Map.of("message", message));
    }

    // Get User Status API
    @GetMapping("/get-status")
    public ResponseEntity<?> getUserStatus(@RequestParam String email) {
        String message = userService.getUserStatus(email);
        return ResponseEntity.ok(Map.of("message", message));
    }

    // Fetch User Info API
    @GetMapping("/user-info")
    public ResponseEntity<?> getUserInfo(@RequestParam String email) {
        Users user = userService.getUserInfo(email);
        if (user == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "User not found."));
        }
        return ResponseEntity.ok(Map.of("username", user.getUsername(),"email", user.getEmail()));
    }

    // Edit Profile API (Only username)
    @PutMapping("/edit-username")
    public ResponseEntity<?> editUsername(@RequestParam String email, @RequestParam String username) {
        // Validate that the username is provided and not empty
        if (username == null || username.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Username cannot be empty."));
        }

        // Call the service to update the username
        String message = userService.editUsername(email, username);
        return ResponseEntity.ok(Map.of("message", message));
    }


}
