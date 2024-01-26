package com.datn.backend.dto.response;

import lombok.ToString;

import java.time.LocalDate;

public interface KhachHangResponse {

    Integer getId();
    String getHo_ten();
    String getSdt();
    LocalDate getNgay_sinh();
    boolean getGioi_tinh();
    String getEmail();
    String getTen_dang_nhap();
    String getMat_khau();
    String getTinh();
    String getHuyen();
    String getXa();
    String getDuong();

}
