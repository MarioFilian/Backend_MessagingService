package com.projectfinal.profileupdateservice.service;

import com.projectfinal.profileupdateservice.model.User;
import com.projectfinal.profileupdateservice.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    @Transactional
    public User updateUserFields(Long id, Map<String, Object> fields) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Por cada campo que exista en el Map, actualizamos el user si el setter existe
        fields.forEach((key, value) -> {
            if (value != null) {
                switch (key) {
                    case "username":
                        user.setUsername(value.toString());
                        break;
                    case "email":
                        user.setEmail(value.toString());
                        break;
                    case "firstName":
                        user.setFirstName(value.toString());
                        break;
                    case "lastName":
                        user.setLastName(value.toString());
                        break;
                    case "role":
                        user.setRole(value.toString());
                        break;
                    case "enabled":
                        user.setEnabled(Boolean.valueOf(value.toString()));
                        break;
                    case "password":
                        user.setPassword(value.toString());
                        break;
                    // añade más campos según modelo si necesitas
                }
            }
        });

        return userRepository.save(user);
    }
}

