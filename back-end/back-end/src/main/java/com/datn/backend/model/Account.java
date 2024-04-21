package com.datn.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.*;


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

    private String tenDangNhap;

    @JsonIgnore
    private String matKhau;

    private boolean trangThai;

    private String role;

    private String forgetPwdVerifyCode;

    // private String[] authorities;
}
