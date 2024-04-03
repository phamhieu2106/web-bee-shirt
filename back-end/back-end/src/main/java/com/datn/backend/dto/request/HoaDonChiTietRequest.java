package com.datn.backend.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

import java.math.BigDecimal;

/**
 * @author HungDV
 */
@Data
@ToString
@Builder
public class HoaDonChiTietRequest {

    @NotNull(message = "Bạn phải truyền id của hóa đơn chi tiết")
    private Integer id;

    @Min(value = 1, message = "Số lượng phải lớn hơn 1")
    private int soLuong;

    private BigDecimal giaBan;
    private BigDecimal giaNhap;
    private Integer sanPhamChiTietId;
}
