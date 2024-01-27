package com.datn.backend.dto.request;

import lombok.Getter;
import lombok.ToString;

import java.time.LocalDate;
@Getter
@ToString
public class KhachHangRequest {
//    private Integer id;
    private String ho_ten;
    private LocalDate ngay_sinh;
    private String sdt;
    private String email;
    private boolean gioi_tinh;
    private int trang_thai;
    private String image_url;
    private String ten_dang_nhap;
    private String mat_khau;
    private String tinh;
    private String huyen;
    private String xa;
    private String duong;

}
