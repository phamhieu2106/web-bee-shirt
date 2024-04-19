package com.datn.backend.service.impl;

import com.datn.backend.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    @Value("${spring.mail.host}")
    private String host;

    @Value("${spring.mail.username}")
    private String fromEmail;

    private final JavaMailSender javaMailSender;

    @Override
    public void sendSimpleMailMessage(String custName, String to, String code) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setSubject("Mã xác nhận quên mật khẩu");
            message.setFrom(fromEmail);
            message.setTo(to);
            message.setText("Xin chào " + custName + ", đây là mã xác nhận quên mật khẩu: " + code);
            javaMailSender.send(message);
        } catch (Exception ex) {
            System.out.println(ex);
        }
    }
}
