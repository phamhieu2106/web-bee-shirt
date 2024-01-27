package com.datn.backend.dto.response;

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
public class HoaDonResponse extends BaseResponse {

    private Integer id;
    private String ma;
    private String tenNguoiNhan;
    private String sdtNguoiNhan;
    private String emailNguoiNhan;
    private String diaChiNguoiNhan;
    private BigDecimal tongTien;
    private BigDecimal tienGiam;
    private BigDecimal phiVanChuyen;
    private String loaiHoaDon;
    private String trangThai;
    private String ghiChu;

//    private NhanVien nhanVien;
//    private KhachHang khachHang;
//    private PhieuGiamGia phieuGiamGia;
    private List<HoaDonChiTietResponse> hoaDonChiTiets;
    private List<LichSuHoaDonResponse> lichSuHoaDons;
    private List<ThanhToanResponse> thanhToans;
}
