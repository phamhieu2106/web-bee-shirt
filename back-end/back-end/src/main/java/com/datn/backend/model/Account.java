package com.datn.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table(name = "account")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "ten_dang_nhap")
    @NotBlank(message = "Tên đăng nhập không được trống")
    private String tenDangNhap;

    @JsonIgnore
    @Column(name = "mat_khau")
    @NotBlank(message = "Mật khẩu không được trống")
    private String matKhau;

    @Column(name = "trang_thai")
    private boolean trangThai;

    @Column(name = "role")
    private String role;
//    private String[] authorities;
}
