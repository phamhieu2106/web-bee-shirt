package com.datn.backend.model.phieu_giam_gia;

import com.datn.backend.model.khach_hang.KhachHang;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "phieu_giam_gia_kh")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class PhieuGiamGiaKhachHang {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private boolean isUsed;

    private Integer trangThai;


    @ManyToOne
    @JoinColumn(name = "khach_hang_id")
    private KhachHang khachHang;

    @ManyToOne
    @JoinColumn(name = "phieu_giam_gia_id")
    private PhieuGiamGia phieuGiamGia;
}
