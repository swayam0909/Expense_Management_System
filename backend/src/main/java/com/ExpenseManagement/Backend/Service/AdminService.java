package com.ExpenseManagement.Backend.Service;

import com.ExpenseManagement.Backend.Model.Admin;
import com.ExpenseManagement.Backend.Repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;  // Inject PasswordEncoder (which will be BCryptPasswordEncoder)

    public String login(String email, String password) {
        Optional<Admin> adminOptional = adminRepository.findByEmail(email);

        if (adminOptional.isPresent()) {
            Admin admin = adminOptional.get();
            if (passwordEncoder.matches(password, admin.getPassword())) {
                return "Login successful";
            } else {
                throw new RuntimeException("Invalid password");
            }
        } else {
            throw new RuntimeException("Admin not found");
        }
    }
}
