package com.datn.backend.model.san_pham;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "spct_hinh_anh")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class SanPhamCtHinhAnh {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "spct_id")
    private SanPhamChiTiet spct;

    @ManyToOne
    @JoinColumn(name = "hinh_anh_id")
    private HinhAnh hinhAnh;
}
