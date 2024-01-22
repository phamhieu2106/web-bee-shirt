package com.datn.backend.model.dot_giam_gia;

import com.datn.backend.model.BaseEntity;
import com.datn.backend.model.san_pham.SanPhamChiTiet;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "dot_giam_gia_san_pham")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class DotGiamGiaSanPham extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private BigDecimal giaCu;
    private BigDecimal giaMoi;
    private int giamGia;
    private LocalDateTime thoiGianBatDau;
    private LocalDateTime thoiGianKetThuc;
    private boolean trangThai;

    @ManyToOne
    @JoinColumn(name = "san_pham_chi_tiet_id")
    private SanPhamChiTiet sanPhamChiTiet;

    @ManyToOne
    @JoinColumn(name = "dot_giam_gia_id")
    private DotGiamGia dotGiamGia;
}
