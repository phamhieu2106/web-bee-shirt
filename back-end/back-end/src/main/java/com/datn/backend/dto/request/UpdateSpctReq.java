package com.datn.backend.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class UpdateSpctReq {

    private int id;
    private int sanPhamId;
    private int mauSacId;
    private int kichCoId;
    private BigDecimal giaNhap;
    private BigDecimal giaBan;
    private int soLuong;
}
