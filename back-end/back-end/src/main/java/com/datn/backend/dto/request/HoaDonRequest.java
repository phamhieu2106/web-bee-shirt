package com.datn.backend.dto.request;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.validator.constraints.Length;

import java.math.BigDecimal;

/**
 * @author HungDV
 */
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class HoaDonRequest {
    @NotNull(message = "Id hóa đơn không hơp lệ")
    private Integer id;

//    @NotBlank(message = "Mã hóa đơn không được trống")
//    private String ma;

    private String tenNguoiNhan;

    //    @Length( max =10, message = "Số điện thoại không hợp lệ")
    private String sdtNguoiNhan;

    private String emailNguoiNhan;

    private String diaChiNguoiNhan;

    @DecimalMin(value = "0", message = "Tổng tiền lớn hơn hoặc bằng 0")
    @NotNull(message = "Tổng tiền lớn hơn hoặc bằng 0")
    private BigDecimal tongTien;

    @DecimalMin(value = "0", message = "Tiền giảm lớn hơn hoặc bằng 0")
    @NotNull(message = "Tiền giảm lớn hơn hoặc bằng 0")
    private BigDecimal tienGiam;

    @DecimalMin(value = "0", message = "Phí vận chuyển lớn hơn hoặc bằng 0")
    @NotNull(message = "Phí vận chuyển lớn hơn hoặc bằng 0")
    private BigDecimal phiVanChuyen;

    private String loaiHoaDon;
    //    private String trangThai;
    private String ghiChu;
}
