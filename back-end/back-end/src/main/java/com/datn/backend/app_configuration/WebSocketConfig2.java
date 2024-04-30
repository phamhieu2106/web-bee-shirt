package com.datn.backend.app_configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig2 implements WebSocketConfigurer {

    private final static String NOTIFICATION_ENDPOINT2 = "/notification2";

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry webSocketHandlerRegistry) {
        webSocketHandlerRegistry.addHandler(getNotificationWebSocketHandler2(), NOTIFICATION_ENDPOINT2).setAllowedOrigins("*");
    }

    @Bean
    public WebSocketHandler getNotificationWebSocketHandler2() {
        return new NotificationWebSocketHandle2();
    }
}
