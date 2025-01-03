package com.ExpenseManagement.Backend.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document (collection = "query")
public class SupportQuery {
    @Id
    private String id;

    private String name;
    private String email;
    private String phone;
    private String query;

    // Constructors, getters, and setters
    public SupportQuery() {}

    public SupportQuery(String name, String email, String phone, String query) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.query = query;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getQuery() {
        return query;
    }

    public void setQuery(String query) {
        this.query = query;
    }
}
