package com.datn.backend.dto.response;

import com.datn.backend.constant.ApplicationConstant;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.time.LocalDateTime;

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
    private BigDecimal tienGiam;
    private BigDecimal phiVanChuyen;

    private String loaiHoaDon;

    private String trangThai;

    private String ghiChu;

    @DateTimeFormat(pattern = ApplicationConstant.DEFAULT_DATE_TIME_FORMAT)
    private LocalDateTime createdAt;

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
