package com.projectfinal.registrationservice.service;

import com.projectfinal.registrationservice.dto.TokenResponseDTO;
import com.projectfinal.registrationservice.dto.UserDTO;
import com.projectfinal.registrationservice.entity.User;
import com.projectfinal.registrationservice.repository.UserRepository;
import com.projectfinal.registrationservice.util.JwtUtil;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
public class RegistrationService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder passwordEncoder;
    private final StringRedisTemplate redisTemplate;

    public RegistrationService(UserRepository userRepository, JwtUtil jwtUtil, StringRedisTemplate redisTemplate) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = new BCryptPasswordEncoder();
        this.redisTemplate = redisTemplate;
    }

    public TokenResponseDTO register(UserDTO userDTO) {
        if (userRepository.existsByUsername(userDTO.getUsername())) {
            throw new IllegalArgumentException("Username is already taken.");
        }
        if (userRepository.existsByEmail(userDTO.getEmail())) {
            throw new IllegalArgumentException("Email is already in use.");
        }

        String hashedPassword = passwordEncoder.encode(userDTO.getPassword());

        User newUser = User.builder()
                .username(userDTO.getUsername())
                .password(hashedPassword)
                .email(userDTO.getEmail())
                .firstName(userDTO.getFirstName())
                .lastName(userDTO.getLastName())
                .role(userDTO.getRole() != null ? userDTO.getRole() : "USER")
                .enabled(true)
                .build();

        userRepository.save(newUser);

        String accessToken = jwtUtil.generateAccessToken(newUser.getUsername(), newUser.getRole());
        String refreshToken = jwtUtil.generateRefreshToken(newUser.getUsername(), newUser.getRole());

        ValueOperations<String, String> ops = redisTemplate.opsForValue();
        ops.set(refreshToken, newUser.getUsername(), Duration.ofDays(7));

        return new TokenResponseDTO(accessToken, refreshToken);
    }
}

