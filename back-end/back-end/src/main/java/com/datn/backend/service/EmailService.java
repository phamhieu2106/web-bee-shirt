package com.datn.backend.service;

public interface EmailService {

    void sendSimpleMailMessage(String custName, String to, String token);
}
