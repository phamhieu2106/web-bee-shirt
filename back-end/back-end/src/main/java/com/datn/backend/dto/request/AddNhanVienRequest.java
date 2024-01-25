package com.datn.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;

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
