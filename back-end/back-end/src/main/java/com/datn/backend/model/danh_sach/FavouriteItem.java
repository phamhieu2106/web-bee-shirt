package com.datn.backend.model.danh_sach;

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

@Entity
@Table(name = "ds_yeu_thich_chi_tiet")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class FavouriteItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private int soLuong;

    @ManyToOne
    @JoinColumn(name = "spct_id")
    private SanPhamChiTiet spct;

    @ManyToOne
    @JoinColumn(name = "gio_hang_id")
    private FavouriteList gioHang;
}
