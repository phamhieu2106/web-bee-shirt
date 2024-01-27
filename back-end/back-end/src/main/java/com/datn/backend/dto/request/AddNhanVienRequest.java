package com.datn.backend.dto.request;

import lombok.Data;

import java.time.LocalDate;

@Data
public class AddNhanVienRequest {

    private String hoTen;

    private LocalDate ngaySinh;

    private String sdt;

    private boolean gioiTinh;

    private String email;

    private String diaChi;

    private String tenDangNhap;

    private String matKhau;
}
