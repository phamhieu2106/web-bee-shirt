package com.datn.backend.dto.response;

import java.time.LocalDate;
import java.time.LocalDateTime;

public interface NhanVienResponse {

    Integer getId();
    String getImageUrl();
    String getCccd();
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
    LocalDateTime getCreatedAt();
    String getCreatedBy();
    LocalDateTime getUpdatedAt();
    String getLastUpdatedBy();
}
