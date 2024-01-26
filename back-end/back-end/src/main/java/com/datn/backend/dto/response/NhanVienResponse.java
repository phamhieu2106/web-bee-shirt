package com.datn.backend.dto.response;

import java.time.LocalDate;

public interface NhanVienResponse {

    Integer getId();
    String getHoTen();
    LocalDate getNgaySinh();
    String getSdt();
    Boolean getGioiTinh();
    String getEmail();
    String getDiaChi();
    String getTenDangNhap();
    String getMatKhau();
    Boolean getTrangThai();
    String getRole();
}
