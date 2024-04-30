package com.datn.backend.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

import java.time.LocalDate;

@Data
public class AddNhanVienRequest {

    private String imageUrl;

    @NotBlank(message = "CCCD không được trống")
    private String cccd;

    @NotBlank(message = "Họ tên không được trống")
    private String hoTen;

    @Past(message = "Ngày sinh không được sau ngày hiện tại")
    @NotNull(message = "Ngày sinh không được trống")
    private LocalDate ngaySinh;

    @NotBlank(message = "Sdt không được trống")
    @Pattern(regexp = "0[0-9]{9}", message = "Sđt không đúng định dạng")
    private String sdt;

    private boolean gioiTinh;

    @NotBlank(message = "Email không được trống")
    @Email(message = "Email không đúng định dạng")
    private String email;

    @NotBlank(message = "Địa chỉ không được trống")
    private String diaChi;

    @NotBlank(message = "Mật khẩu không được trống")
    private String matKhau;

    private String role;
}
