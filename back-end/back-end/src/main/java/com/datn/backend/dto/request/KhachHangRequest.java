package com.datn.backend.dto.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;

@Getter
@Setter
@ToString
public class KhachHangRequest {

    private Integer id;
    private String hoTen;
    private LocalDate ngaySinh;
    private String sdt;
    private String email;
    private boolean gioiTinh;
    private int trangThai;
    private String imageUrl;
    private String tenDangNhap;
    private String matKhau;
    private String tinh;
    private String huyen;
    private String xa;
    private String duong;
}
