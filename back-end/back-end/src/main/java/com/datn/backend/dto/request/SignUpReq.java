package com.datn.backend.dto.request;

import lombok.Getter;

import java.time.LocalDate;

@Getter
public class SignUpReq {

    private String hoTen;
    private String sdt;
    private String email;
    private LocalDate ngaySinh;
    private boolean gioiTinh;
    private String matKhau;
    private String tinh;
    private String huyen;
    private String xa;
    private String duong;
}
