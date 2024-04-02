package com.datn.backend.model.danh_sach;

import com.datn.backend.model.BaseEntity;
import com.datn.backend.model.khach_hang.KhachHang;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "danh_sach_chi_tiet")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class FavouriteList extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "khach_hang_id")
    private KhachHang khachHang;

    public FavouriteList(KhachHang khachHang) {
        this.khachHang = khachHang;
    }
}
