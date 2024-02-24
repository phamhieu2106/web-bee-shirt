package com.datn.backend.dto.request;

import lombok.Getter;

import java.math.BigDecimal;

@Getter
public class AddSanPhamChiTietRequest {

    private Integer id;
    private BigDecimal giaNhap;
    private BigDecimal giaBan;
    private int sanPhamId;
    private int kieuDangId;
    private int thietKeId;
    private int tayAoId;
    private int coAoId;
    private int chatLieuId;
    private AddSanPhamChiTietSubRequest requests;

    @Override
    public String toString() {
        return "AddSanPhamChiTietRequest{" +
                "id=" + id +
                ", giaNhap=" + giaNhap +
                ", giaBan=" + giaBan +
                ", sanPhamId=" + sanPhamId +
                ", kieuDangId=" + kieuDangId +
                ", thietKeId=" + thietKeId +
                ", tayAoId=" + tayAoId +
                ", coAoId=" + coAoId +
                ", chatLieuId=" + chatLieuId +
                ", requests=" + requests +
                '}';
    }
}
