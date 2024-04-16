package com.datn.backend.dto.response;

import java.time.LocalDate;

public interface KhachHangResponse {

    Integer getId();

    String getHoTen();

    String getSdt();

    LocalDate getNgaySinh();

    boolean getGioiTinh();

    String getEmail();

    String getTenDangNhap();

    // String getMatKhau();

    String getTinh();

    String getHuyen();

    String getXa();

    String getDuong();
    int getTrangThai();

    String getAnhUrl();
}
