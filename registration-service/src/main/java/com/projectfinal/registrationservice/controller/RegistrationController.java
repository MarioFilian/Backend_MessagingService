package com.projectfinal.registrationservice.controller;

import com.projectfinal.registrationservice.dto.UserDTO;
import com.projectfinal.registrationservice.service.RegistrationService;
import jakarta.validation.Valid;
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
     * @param userDTO User data transfer object with registration info.
     * @return ResponseEntity with success message or error.
     */
    @PostMapping
    public ResponseEntity<String> registerUser(@Valid @RequestBody UserDTO userDTO) {
        registrationService.register(userDTO);
        return ResponseEntity.ok("User registered successfully.");
    }
}
