package com.datn.backend.dto.request;

import com.datn.backend.dto.DiaChiVaPhiVanChuyenDto;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class PlaceOrderRequest {

    @DecimalMin(value = "1", message = "Tổng tiền không hợp lệ")
    @NotNull(message = "Tổng tiền không hợp lệ")
    private BigDecimal tongTien;

    @DecimalMin(value = "0", message = "Tiền giảm không hợp lệ")
    @NotNull(message = "Tiền giảm không hợp lệ")
    private BigDecimal tienGiam;

    @DecimalMin(value = "0", message = "Phí vận chuyển không hợp lệ")
    @NotNull(message = "Phí vận chuyển không hợp lệ")
    private BigDecimal phiVanChuyen;

    @Pattern(regexp = "^(TAI_QUAY|GIAO_HANG)$", message = "Loại hóa đơn không hợp lệ")
    private String loaiHoaDon;

    @NotEmpty(message = "Vui lòng thêm sản phẩm vào đơn hàng")
    private List<HoaDonChiTietRequest> hoaDonChiTiets;

    private Integer nhanVienId;

    private Integer khachHangId;

    private Integer phieuGiamGiaId;

    private List<ThanhToanRequest> thanhToans;

    private String tenNguoiNhan;

    private String sdtNguoiNhan;

    private String emailNguoiNhan;

    private String diaChiNguoiNhan;

    private String ghiChu;

    private DiaChiVaPhiVanChuyenDto diaChiVaPhiVanChuyen;
}
