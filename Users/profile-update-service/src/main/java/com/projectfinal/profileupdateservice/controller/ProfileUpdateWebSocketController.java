package com.projectfinal.profileupdateservice.controller;

import com.projectfinal.profileupdateservice.model.User;
import com.projectfinal.profileupdateservice.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.util.Map;

@Controller
@RequiredArgsConstructor
public class ProfileUpdateWebSocketController {

    private final UserService userService;

    @MessageMapping("/update-profile")
    @SendTo("/topic/profile-updates")
    public User updateProfile(Map<String, Object> payload) {
        Long id = Long.valueOf(payload.get("id").toString());
        return userService.updateUserFields(id, payload);
    }
}
