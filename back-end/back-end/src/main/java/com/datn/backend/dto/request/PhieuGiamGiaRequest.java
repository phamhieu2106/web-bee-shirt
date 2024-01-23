package com.datn.backend.dto.request;

import com.datn.backend.model.phieu_giam_gia.PhieuGiamGia;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class PhieuGiamGiaRequest {
    private Integer id;

    private String maPhieuGiamGia;

    private String tenPhieuGiamGia;

    private String kieu;

    private String loai;

    private BigDecimal giaTri;

    private BigDecimal giaTriMax;

    private BigDecimal dieuKienGiam;

    private int soLuong;

    private LocalDateTime thoiGianBatDau;

    private LocalDateTime thoiGianKetThuc;

    private boolean trangThai;

    public PhieuGiamGia giamGia(PhieuGiamGia phieu) {
        phieu.setId(this.id);
        phieu.setMaPhieuGiamGia(this.maPhieuGiamGia);
        phieu.setTenPhieuGiamGia(this.tenPhieuGiamGia);
        phieu.setKieu(this.kieu);
        phieu.setLoai(this.loai);
        phieu.setGiaTri(this.giaTri);
        phieu.setGiaTriMax(this.giaTriMax);
        phieu.setDieuKienGiam(this.dieuKienGiam);
        phieu.setSoLuong(this.soLuong);
        phieu.setThoiGianBatDau(this.thoiGianBatDau);
        phieu.setThoiGianKetThuc(this.thoiGianKetThuc);
        phieu.setTrangThai(this.trangThai);

        return phieu;
    }
}