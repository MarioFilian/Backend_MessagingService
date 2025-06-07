package com.projectfinal.registrationservice.service;

import com.projectfinal.registrationservice.dto.UserDTO;
import com.projectfinal.registrationservice.entity.User;
import com.projectfinal.registrationservice.repository.UserRepository;
import com.projectfinal.registrationservice.util.JwtUtil;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class RegistrationService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public RegistrationService(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
        this.jwtUtil = jwtUtil;
    }

    public String register(UserDTO userDTO) {
        if (userRepository.existsByUsername(userDTO.getUsername())) {
            throw new IllegalArgumentException("Username is already taken.");
        }
        if (userRepository.existsByEmail(userDTO.getEmail())) {
            throw new IllegalArgumentException("Email is already in use.");
        }

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

        return jwtUtil.generateToken(newUser.getUsername());
    }
}
