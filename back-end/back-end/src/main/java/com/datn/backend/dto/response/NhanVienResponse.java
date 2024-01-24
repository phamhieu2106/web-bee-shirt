package com.datn.backend.dto.response;

import java.time.LocalDate;

public interface NhanVienResponse {

    Integer getId();
    String getHoTen();
    LocalDate getNgaySinh();
    String getSdt();
    boolean getGioiTinh();
    String getEmail();
    String getDiaChi();
    String getTenDangNhap();
    String geMatKhau();
    boolean getTrangThai();
    String getRole();
}
