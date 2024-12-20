package com.ExpenseManagement.Backend.Controller;

import com.ExpenseManagement.Backend.Model.Users;
import com.ExpenseManagement.Backend.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminDashboardController {
    @Autowired
    private UserRepo userRepository;

    @GetMapping("/Users")
    public ResponseEntity<List<Users>> getAllUsers() {
        List<Users> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }
}

