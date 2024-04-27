package com.datn.backend.service;

import com.datn.backend.model.hoa_don.HoaDon;
import com.datn.backend.model.khach_hang.KhachHang;

public interface EmailService {

    void sendSimpleMailMessage(String custName, String to, String token);
    void sendPasswordCustomer(KhachHang khachHang, String matKhau);
    void sendEmailStatusOrder(HoaDon hoaDon);
}
