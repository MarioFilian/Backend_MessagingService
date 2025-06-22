package com.projectfinal.profileupdateservice.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.projectfinal.profileupdateservice.service.UserService;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class RawWebSocketHandler extends TextWebSocketHandler {

    private final UserService userService;

    public RawWebSocketHandler(UserService userService) {
        this.userService = userService;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        System.out.println("🔗 Connected: " + session.getId());
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        System.out.println("📩 Received: " + message.getPayload());

        try {
            // Parsear el mensaje JSON
            ObjectMapper mapper = new ObjectMapper();
            Map<String, Object> payload = mapper.readValue(message.getPayload(), Map.class);

            Long id = Long.valueOf(payload.get("id").toString());

            // Actualizar el usuario usando el método flexible que recibe el Map completo
            userService.updateUserFields(id, payload);

            // Confirmar al cliente
            session.sendMessage(new TextMessage("✅ Profile update received: " + message.getPayload()));
        } catch (Exception e) {
            e.printStackTrace();
            session.sendMessage(new TextMessage("❌ Error processing update: " + e.getMessage()));
        }
    }
}
