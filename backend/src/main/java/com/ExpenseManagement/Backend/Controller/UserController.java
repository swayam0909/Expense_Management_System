package com.ExpenseManagement.Backend.Controller;

import com.ExpenseManagement.Backend.Model.Users;
import com.ExpenseManagement.Backend.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class UserController {

    @Autowired
    private UserRepo userRepository;

    // Register API
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Users user) {
        if (userRepository.findByUsername(user.getUsername()) != null) {
            return ResponseEntity.badRequest().body("Username already exists.");
        }

        // Check if email exists
        for (Users existingUser : userRepository.findAll()) {
            if (existingUser.getEmail().equals(user.getEmail())) {
                return ResponseEntity.badRequest().body("Email already exists.");
            }
        }

        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully.");
    }

    // Login API
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> loginDetails) {
        String username = loginDetails.get("username");
        String password = loginDetails.get("password");

        Users user = userRepository.findByUsername(username);

        if (user == null || !user.getPassword().equals(password)) {
            return ResponseEntity.badRequest().body("Invalid username or password.");
        }

        // Success
        Map<String, String> response = new HashMap<>();
        response.put("message", "Login successful.");
        response.put("role", user.getRole()); // You can add more details here if needed

        return ResponseEntity.ok(response);
    }
}
