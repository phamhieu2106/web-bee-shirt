package com.datn.backend.model.san_pham;

import com.datn.backend.model.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "san_pham_chi_tiet")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class SanPhamChiTiet extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String ma;
    private BigDecimal giaNhap;
    private BigDecimal giaBan;
    private int soLuongTon;
    private boolean trangThai;

    @ManyToOne
    @JoinColumn(name = "san_pham_id")
    private SanPham sanPham;

    @ManyToOne
    @JoinColumn(name = "mau_sac_id")
    private MauSac mauSac;

    @ManyToOne
    @JoinColumn(name = "kich_co_id")
    private KichCo kichCo;

    @ManyToOne
    @JoinColumn(name = "kieu_dang_id")
    private KieuDang kieuDang;

    @ManyToOne
    @JoinColumn(name = "thiet_ke_id")
    private ThietKe thietKe;

    @ManyToOne
    @JoinColumn(name = "tay_ao_id")
    private TayAo tayAo;

    @ManyToOne
    @JoinColumn(name = "co_ao_id")
    private CoAo coAo;

    @ManyToOne
    @JoinColumn(name = "chat_lieu_id")
    private ChatLieu chatLieu;

}
