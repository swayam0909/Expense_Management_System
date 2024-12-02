package com.ExpenseManagement.Backend.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "incomes")
public class Income {

    @Id
    private String id;
    private String userId;  // Link to a particular user
    private String email;    // Add email directly to Income
    private String source;
    private double amount;
    private LocalDateTime date;
    private String description;

    // Constructors, getters, and setters
    public Income() {}

    public Income(String userId, String email, String source, double amount, LocalDateTime date, String description) {
        this.userId = userId;
        this.email = email;  // Set email
        this.source = source;
        this.amount = amount;
        this.date = date;
        this.description = description;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
