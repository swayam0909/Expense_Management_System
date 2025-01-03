package com.ExpenseManagement.Backend.Service;

import com.ExpenseManagement.Backend.Model.Users;
import com.ExpenseManagement.Backend.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private EmailService emailService;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // Register user
    public String registerUser(Users user) {
        if (userRepository.findByEmail(user.getEmail()) != null) {
            return "Email already exists.";
        }

        // Set status to ACTIVE when a user is registered
        user.setStatus("ACTIVE");

        // Hash the password and set it
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Save the user to the repository
        userRepository.save(user);
        return "User registered successfully.";
    }

    // Login user
    public String loginUser(String email, String password) {
        Users user = userRepository.findByEmail(email);
        if (user == null) {
            return "Invalid email or password.";
        }

        if (user.getStatus().equals("DISABLED")) {
            return "Your account is disabled. Please contact the admin.";
        }

        if (!passwordEncoder.matches(password, user.getPassword())) {
            return "Invalid email or password.";
        }

        return "Login successful.";
    }

    // Forgot password functionality
    public String forgotPassword(String email) {
        Users user = userRepository.findByEmail(email);
        if (user == null) {
            return "No user found with the provided email.";
        }

        String resetToken = UUID.randomUUID().toString();
        user.setResetToken(resetToken);
        user.setResetTokenExpiry(LocalDateTime.now().plusMinutes(15)); // 15 minutes expiry
        userRepository.save(user);

        String resetLink = "http://localhost:3000/reset-password?token=" + resetToken;
        String emailBody = "<html><body>"
                + "<h3>Forgot Password Request</h3>"
                + "<p>To reset your password, click the following link:</p>"
                + "<a href=\"" + resetLink + "\">Reset Password</a>"
                + "<p>This link will expire in 15 minutes.</p>"
                + "</body></html>";

        emailService.sendEmail(email, "Password Reset Request", emailBody);
        return "Password reset email sent successfully.";
    }

    // Reset password
    public String resetPassword(String resetToken, String newPassword) {
        Users user = userRepository.findByResetToken(resetToken);
        if (user == null || user.getResetTokenExpiry().isBefore(LocalDateTime.now())) {
            return "Invalid or expired token.";
        }

        if (passwordEncoder.matches(newPassword, user.getPassword())) {
            return "New password cannot be the same as the old one.";
        }

        user.setPassword(passwordEncoder.encode(newPassword)); // Hash the new password
        user.setResetToken(null); // Clear the reset token after it’s used
        user.setResetTokenExpiry(null); // Clear the token expiry
        userRepository.save(user);

        return "Password reset successfully.";
    }

    // Set user status (ACTIVE/DISABLED)
    public String setUserStatus(String email, String status) {
        if (!status.equals("ACTIVE") && !status.equals("DISABLED")) {
            return "Invalid status. Use 'ACTIVE' or 'DISABLED'.";
        }

        Users user = userRepository.findByEmail(email);
        if (user == null) {
            return "User not found.";
        }

        user.setStatus(status);
        userRepository.save(user);
        return "User status updated successfully.";
    }

    // Get user status
    public String getUserStatus(String email) {
        Users user = userRepository.findByEmail(email);
        if (user == null) {
            return "User not found.";
        }
        return "User status: " + user.getStatus();
    }

    // Fetch user info (e.g., username)
    public Users getUserInfo(String email) {
        Users user = userRepository.findByEmail(email);
        if (user == null) {
            return null;  // User not found
        }
        return user;  // Return the full user object
    }

    // Edit Profile (only username)
    public String editUsername(String email, String username) {
        Users user = userRepository.findByEmail(email);
        if (user == null) {
            return "User not found.";
        }

        // Update the username
        user.setUsername(username);

        // Save the updated user
        userRepository.save(user);

        return "Username updated successfully.";
    }

}
