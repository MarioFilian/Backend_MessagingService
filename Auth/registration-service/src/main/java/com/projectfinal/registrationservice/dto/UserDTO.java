package com.projectfinal.registrationservice.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {

    @Schema(description = "Unique username", example = "johndoe123")
    private String username;

    @Schema(description = "Password with minimum 6 characters", example = "secretPass123")
    private String password;

    @Schema(description = "Valid email address", example = "john.doe@example.com")
    private String email;

    @Schema(description = "User's first name", example = "John")
    private String firstName;

    @Schema(description = "User's last name", example = "Doe")
    private String lastName;

    @Schema(description = "User role (e.g., USER, ADMIN)", example = "USER")
    private String role;
}
