package com.datn.backend.model.dot_giam_gia;

import com.datn.backend.model.BaseEntity;
import com.datn.backend.model.san_pham.SanPhamChiTiet;
import jakarta.persistence.*;
import lombok.*;

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

    @Column(name = "thoi_gian_bat_dau")
    private LocalDateTime thoiGianBatDau;

    @Column(name = "thoi_gian_ket_thuc")
    private LocalDateTime thoiGianKetThuc;

    @ManyToOne
    @JoinColumn(name = "san_pham_chi_tiet_id", referencedColumnName = "id")
    private SanPhamChiTiet sanPhamChiTiet;

    @ManyToOne
    @JoinColumn(name = "dot_giam_gia_id", referencedColumnName = "id")
    private DotGiamGia dotGiamGia;
}
