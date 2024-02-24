package com.datn.backend.dto.request;

import com.datn.backend.dto.response.HinhThucThanhToanResponse;
import com.datn.backend.enumeration.LoaiHinhThuc;
import com.datn.backend.model.hoa_don.HinhThucThanhToan;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

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
public class ThanhToanRequest {
    @NotNull(message = "Vui lòng thử lại, hóa đơn không hợp lệ")
    private Integer idHoaDon;

    @NotBlank(message = "Bạn chưa chọn hình thức thanh toán")
    private String hinhThucThanhToan;

    private String moTa;

    private String maGiaoDich;

    @DecimalMin(value = "1.00", message = "Số tiền phải lớn hơn 1")
    @NotNull(message = "Số tiền phải lớn hơn 1")
    private BigDecimal soTien;

//    private boolean trangThai;
}
