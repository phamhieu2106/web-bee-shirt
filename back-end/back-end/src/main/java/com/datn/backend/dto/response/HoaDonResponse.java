package com.datn.backend.dto.response;

import com.datn.backend.enumeration.LoaiHoaDon;
import com.datn.backend.enumeration.TrangThaiHoaDon;
import com.datn.backend.model.NhanVien;
import com.datn.backend.model.hoa_don.HoaDonChiTiet;
import com.datn.backend.model.hoa_don.LichSuHoaDon;
import com.datn.backend.model.hoa_don.ThanhToan;
import com.datn.backend.model.khach_hang.KhachHang;
import com.datn.backend.model.phieu_giam_gia.PhieuGiamGia;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.util.List;

/**
 * @author HungDV
 */
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class HoaDonResponse {
    private Integer id;

    private String ma;
    private String tenNguoiNhan;
    private String sdtNguoiNhan;
    private String emailNguoiNhan;
    private String diaChiNguoiNhan;
    private BigDecimal tongTien;
    private BigDecimal phiVanChuyen;

    private String loaiHoaDon;

    private String trangThai;

    private String ghiChu;

//    private NhanVien nhanVien;
//
//    private KhachHang khachHang;
//
//    private PhieuGiamGia phieuGiamGia;
//
//    private List<HoaDonChiTiet> hoaDonChiTiets;
//
//    private List<LichSuHoaDon> lichSuHoaDons;
//
//    private List<ThanhToan> thanhToans;
}
