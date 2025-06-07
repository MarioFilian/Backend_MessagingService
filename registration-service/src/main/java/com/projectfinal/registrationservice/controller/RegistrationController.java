package com.projectfinal.registrationservice.controller;

import com.projectfinal.registrationservice.dto.UserDTO;
import com.projectfinal.registrationservice.service.RegistrationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/register")
public class RegistrationController {

    private final RegistrationService registrationService;

    public RegistrationController(RegistrationService registrationService) {
        this.registrationService = registrationService;
    }

    /**
     * Endpoint to register a new user.
     * @param userDTO user registration info
     * @return success message or specific error
     */
    @PostMapping
    public ResponseEntity<String> registerUser(@Valid @RequestBody UserDTO userDTO) {
        try {
            registrationService.register(userDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body("✅ User registered successfully.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("⚠️ " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("❌ Unexpected error: " + e.getMessage());
        }
    }
}
