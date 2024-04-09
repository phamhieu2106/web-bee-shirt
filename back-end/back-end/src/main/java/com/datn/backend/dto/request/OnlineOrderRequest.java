package com.datn.backend.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
public class OnlineOrderRequest {

    private BigDecimal tongTien;
    private BigDecimal tienGiam;
    private BigDecimal phiVanChuyen;
    private boolean paymentMethod;
    private List<OrderDetailsReq> hoaDonChiTiets;
    private Integer khachHangId;
    private Integer phieuGiamGiaId;
    private String tenNguoiNhan;
    private String sdtNguoiNhan;
    private String emailNguoiNhan;
    private String diaChiNguoiNhan;
    private String ghiChu;
}
