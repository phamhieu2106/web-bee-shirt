package com.datn.backend.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class OrderDetailsReq {

    private int soLuong;
    private BigDecimal giaBan;
    private BigDecimal giaNhap;
    private Integer sanPhamChiTietId;
}
