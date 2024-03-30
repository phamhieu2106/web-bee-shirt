package com.datn.backend.dto.response;

import lombok.*;

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
public class PhieuGiamGiaHoaDonResponse {
    private Integer id;
    private String maPhieuGiamGia;
    private String tenPhieuGiamGia;
    private Integer kieu;
    private Integer loai;
    private BigDecimal dieuKienGiam;
    private BigDecimal giaTri;
    private BigDecimal giaTriMax;
}
