package com.datn.backend.dto.request;

import com.datn.backend.model.phieu_giam_gia.PhieuGiamGia;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class PhieuGiamGiaRequest {

    private String maPhieuGiamGia;

    private String tenPhieuGiamGia;

    private Integer kieu;

    private Integer loai;

    private BigDecimal giaTri;

    private BigDecimal giaTriMax;

    private BigDecimal dieuKienGiam;

    private int soLuong;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime thoiGianBatDau;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime thoiGianKetThuc;

    private String trangThai;

    public PhieuGiamGia giamGia(PhieuGiamGia phieu) {

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
