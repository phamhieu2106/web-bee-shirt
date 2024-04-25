package com.datn.backend.service.impl;

import com.datn.backend.model.khach_hang.KhachHang;
import com.datn.backend.service.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
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

    @Override
    public void sendPasswordCustomer(KhachHang khachHang, String matKhau) {
        String template = "<div>\n" +
                "  <p>Xin chào " + khachHang.getHoTen() + ",</p>\n" +
                "  <p>Mình đến từ Bee Shirt</p>\n" +
                "  <p style=\"padding: 12px; border-left: 4px solid #d0d0d0; font-style: italic\">\n" +
                "    Tài khoản của bạn là: " + khachHang.getAccount().getTenDangNhap() + "<br />\n" +
                "    Mật khẩu của bạn là: " + matKhau + "<br />\n" +
                "  </p>\n" +
                "  <p>Thân mến,<br />Bee Shirt</p>\n" +
                "</div>";

        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            helper.setSubject("Thông báo mật khẩu từ Bee Shirt");
            helper.setFrom(String.format("Bee Shirt <%s>", fromEmail));
            helper.setTo(khachHang.getEmail());
            helper.setText(template, true);

            javaMailSender.send(mimeMessage);
        } catch (MessagingException ex) {
            System.out.println(ex);
        }
    }
}
