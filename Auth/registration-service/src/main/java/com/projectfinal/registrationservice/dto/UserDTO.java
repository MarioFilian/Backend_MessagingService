package com.projectfinal.registrationservice.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class UserDTO {

    @NotBlank(message = "Username is mandatory")
    @Schema(example = "johndoe123", description = "Unique username")
    private String username;

    @NotBlank(message = "Password is mandatory")
    @Size(min = 6, message = "Password must have at least 6 characters")
    @Schema(example = "secretPass123", description = "Password with minimum 6 characters")
    private String password;

    @NotBlank(message = "Email is mandatory")
    @Email(message = "Email should be valid")
    @Schema(example = "john.doe@example.com", description = "Valid email address")
    private String email;

    @NotBlank(message = "First name is mandatory")
    @Schema(example = "John", description = "User's first name")
    private String firstName;

    @NotBlank(message = "Last name is mandatory")
    @Schema(example = "Doe", description = "User's last name")
    private String lastName;

    @Schema(example = "USER", description = "User role (e.g., USER, ADMIN)")
    private String role;

    // Constructors
    public UserDTO() {}

    public UserDTO(String username, String password, String email, String firstName, String lastName, String role) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role != null ? role : "USER";
    }

    // Getters and setters
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}
