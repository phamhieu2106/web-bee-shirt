package com.datn.backend.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class CapNhatSpctRequest {

    private int id;
    private int sanPhamId;
    private int mauSacId;
    private int kichCoId;
    private int kieuDangId;
    private int thietKeId;
    private int tayAoId;
    private int coAoId;
    private int chatLieuId;
    private BigDecimal giaNhap;
    private BigDecimal giaBan;
    private int soLuong;
}
