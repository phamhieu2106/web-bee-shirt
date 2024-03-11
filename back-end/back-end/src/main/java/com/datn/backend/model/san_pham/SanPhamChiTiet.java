package com.datn.backend.model.san_pham;

import com.datn.backend.model.BaseEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "san_pham_chi_tiet")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class SanPhamChiTiet extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private BigDecimal giaNhap;
    private BigDecimal giaBan;
    private int soLuongTon; //
    private boolean trangThai;

    @ManyToOne
    @JoinColumn(name = "san_pham_id")
    @JsonIgnore
    private SanPham sanPham;

    @ManyToOne
    @JoinColumn(name = "mau_sac_id")
    private MauSac mauSac; //

    @ManyToOne
    @JoinColumn(name = "kich_co_id")
    private KichCo kichCo; //

    @ManyToOne
    @JoinColumn(name = "kieu_dang_id")
    private KieuDang kieuDang;

    @ManyToOne
    @JoinColumn(name = "thiet_ke_id")
    private KieuThietKe thietKe;

    @ManyToOne
    @JoinColumn(name = "tay_ao_id")
    private TayAo tayAo;

    @ManyToOne
    @JoinColumn(name = "co_ao_id")
    private CoAo coAo;

    @ManyToOne
    @JoinColumn(name = "chat_lieu_id")
    private ChatLieu chatLieu;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "spct_hinhanh",
            joinColumns = @JoinColumn(name = "spct_id"),
            inverseJoinColumns = @JoinColumn(name = "hinhanh_id"))
    private List<HinhAnh> hinhAnhs = new ArrayList<>();

    @Override
    public String toString() {
        return "SanPhamChiTiet{" +
                "id=" + id +
                ", giaNhap=" + giaNhap +
                ", giaBan=" + giaBan +
                ", soLuongTon=" + soLuongTon +
                ", trangThai=" + trangThai +
                ", sanPham=" + sanPham.getTen() +
                ", mauSac=" + mauSac.getTen() +
                ", kichCo=" + kichCo.getTen() +
                ", kieuDang=" + kieuDang.getTen() +
                ", thietKe=" + thietKe.getTen() +
                ", tayAo=" + tayAo.getTen() +
                ", coAo=" + coAo.getTen() +
                ", chatLieu=" + chatLieu.getTen() +
                '}';
    }

    public void setHinhAnh(HinhAnh hinhAnh) {
        if (hinhAnh != null) {
            this.hinhAnhs.add(hinhAnh);
        }
    }
}
