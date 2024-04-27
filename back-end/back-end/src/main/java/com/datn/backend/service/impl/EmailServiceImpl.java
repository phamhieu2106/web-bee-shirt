package com.datn.backend.service.impl;

import com.datn.backend.model.hoa_don.HoaDon;
import com.datn.backend.model.khach_hang.KhachHang;
import com.datn.backend.service.EmailService;
import com.datn.backend.utility.UtilityFunction;
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

    @Override
    public void sendEmailStatusOrder(HoaDon hoaDon) {
        if (hoaDon == null || UtilityFunction.isNullOrEmpty(hoaDon.getEmailNguoiNhan())) {
            return;
        }

        String template ="  <div\n" +
                "    style=\"\n" +
                "      font-family: Arial, sans-serif;\n" +
                "      margin: 0;\n" +
                "      padding: 20px;\n" +
                "      background-color: #f7f7f7;\n" +
                "    \"\n" +
                "    <div\n" +
                "      style=\"\n" +
                "        max-width: 600px;\n" +
                "        margin: auto;\n" +
                "        padding: 20px;\n" +
                "        background-color: white;\n" +
                "        border-radius: 10px;\n" +
                "        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);\n" +
                "      \"\n" +
                "      <h2 style=\"text-align: center; color: #333; margin-bottom: 20px\">\n" +
                "        Cập Nhật Trạng Thái Đơn Hàng\n" +
                "      </h2>\n" +
                "      <p>Chào "+hoaDon.getTenNguoiNhan() +",</p>\n" +
                "      <div style=\"margin-bottom: 20px\">\n" +
                "        <p><strong>Mã đơn hàng:</strong> "+hoaDon.getMa()+"</p>\n" +
                "        <p><strong>Ngày đặt hàng:</strong> "+UtilityFunction.dateToString(hoaDon.getCreatedAt())+"</p>\n" +
                "        <p><strong>Trạng thái đơn hàng:</strong> "+hoaDon.getTrangThai().getTitle()+"</p>\n" +
                "      </div>\n" +
                "      <div style=\"margin-bottom: 20px\">\n" +
                "        <a\n" +
                "          href=\"http://localhost:4201/profile/order-tracking/"+hoaDon.getMa()+"\"\n" +
                "          style=\"\n" +
                "            background-color: #4caf50;\n" +
                "            color: white;\n" +
                "            padding: 15px 20px;\n" +
                "            text-align: center;\n" +
                "            text-decoration: none;\n" +
                "            display: inline-block;\n" +
                "            font-size: 16px;\n" +
                "            border-radius: 5px;\n" +
                "          \"\n" +
                "          >Xem chi tiết</a\n" +
                "        >\n" +
                "      </div>\n" +
                "      <p>\n" +
                "        Nếu bạn có bất kỳ câu hỏi nào hoặc cần hỗ trợ, vui lòng\n" +
                "        <a href=\"http://localhost:4201/lien-he\" style=\"color: #4caf50\"\n" +
                "          >liên hệ với chúng tôi</a\n" +
                "        >.\n" +
                "      </p>\n" +
                "      <p style=\"margin-top: 20px\">Cảm ơn bạn đã chọn cửa hàng của chúng tôi!</p>\n" +
                "      <p style=\"text-align: center; color: #888888\">Trân trọng !</p>\n" +
                "    </div>\n" +
                "  </div>";
        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            helper.setSubject("Thông báo cập nhật đơn hàng #" + hoaDon.getMa());
            helper.setFrom(String.format("Bee Shirt <%s>", fromEmail));
            helper.setTo(hoaDon.getEmailNguoiNhan());
            helper.setText(template, true);

            javaMailSender.send(mimeMessage);
        } catch (MessagingException ex) {
            System.out.println(ex);
        }
    }
}
