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

    @Override
    public String toString() {
        return "CapNhatSpctRequest{" +
                "id=" + id +
                ", sanPhamId=" + sanPhamId +
                ", mauSacId=" + mauSacId +
                ", kichCoId=" + kichCoId +
                ", kieuDangId=" + kieuDangId +
                ", thietKeId=" + thietKeId +
                ", tayAoId=" + tayAoId +
                ", coAoId=" + coAoId +
                ", chatLieuId=" + chatLieuId +
                ", giaNhap=" + giaNhap +
                ", giaBan=" + giaBan +
                ", soLuong=" + soLuong +
                '}';
    }
}
