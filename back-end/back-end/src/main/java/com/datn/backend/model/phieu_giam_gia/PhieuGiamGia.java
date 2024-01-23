package com.datn.backend.model.phieu_giam_gia;

import com.datn.backend.model.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "phieu_giam_gia")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PhieuGiamGia extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
}
