package com.datn.backend.model.dot_giam_gia;

import com.datn.backend.model.BaseEntity;
import com.datn.backend.model.san_pham.SanPhamChiTiet;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
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
@Builder
public class DotGiamGiaSanPham extends BaseEntity {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "gia_cu")
    private BigDecimal giaCu;

    @Column(name = "gia_moi")
    private BigDecimal giaMoi;

    @Column(name = "giam_gia")
    private Integer giamGia;

    @Column(name = "thoi_gian_bat_dau")
    private LocalDateTime thoiGianBatDau;

    @Column(name = "thoi_gian_ket_thuc")
    private LocalDateTime thoiGianKetThuc;

    @Column(name = "trang_thai")
    private Boolean trangThai;

    @ManyToOne
    @JoinColumn(name = "san_pham_chi_tiet_id", referencedColumnName = "id")
    private SanPhamChiTiet sanPhamChiTiet;

    @ManyToOne
    @JoinColumn(name = "dot_giam_gia_id", referencedColumnName = "id")
    private DotGiamGia dotGiamGia;
}
