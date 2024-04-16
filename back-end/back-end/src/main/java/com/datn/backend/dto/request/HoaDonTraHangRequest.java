package com.datn.backend.dto.request;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class HoaDonTraHangRequest {

    @DecimalMin(value = "1", message = "Tổng tiền không hợp lệ")
    @NotNull(message = "Tổng tiền không hợp lệ")
    private BigDecimal tongTien;

    private BigDecimal tongTienPhieuGiamGiaCu;

    private BigDecimal tongTienPhieuGiamGiaMoi;

    private BigDecimal tongTienTraKhach;

    private Integer hoaDonId;

    private Integer nhanVienId;

    private Integer khachHangId;

    private String tenNguoiNhan;

    private String sdtNguoiNhan;

    private String emailNguoiNhan;

    private String diaChiNguoiNhan;

    private String ghiChu;

    @NotEmpty(message = "Vui lòng thêm sản phẩm vào đơn hàng")
    private List<HoaDonChiTietRequest> hoaDonChiTiets;
}
