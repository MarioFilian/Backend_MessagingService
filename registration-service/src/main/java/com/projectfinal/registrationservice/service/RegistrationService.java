package com.projectfinal.registrationservice.service;

import com.projectfinal.registrationservice.dto.UserDTO;
import com.projectfinal.registrationservice.entity.User;
import com.projectfinal.registrationservice.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class RegistrationService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public RegistrationService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    /**
     * Register a new user in the system.
     * @param userDTO user registration data
     * @throws IllegalArgumentException if username or email already exists
     */
    public void register(UserDTO userDTO) {
        validateUserUniqueness(userDTO);

        String hashedPassword = passwordEncoder.encode(userDTO.getPassword());

        User newUser = new User(
                userDTO.getUsername(),
                hashedPassword,
                userDTO.getEmail(),
                userDTO.getFirstName(),
                userDTO.getLastName(),
                userDTO.getRole()
        );

        userRepository.save(newUser);
    }

    private void validateUserUniqueness(UserDTO userDTO) {
        if (userRepository.existsByUsername(userDTO.getUsername())) {
            throw new IllegalArgumentException("Username is already taken.");
        }
        if (userRepository.existsByEmail(userDTO.getEmail())) {
            throw new IllegalArgumentException("Email is already in use.");
        }
    }
}
