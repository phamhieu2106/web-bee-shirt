package com.datn.backend.dto.response;

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
public class PhieuGiamGiaHoaDonResponse {
    private Integer id;
    private String maPhieuGiamGia;
    private String tenPhieuGiamGia;
    private Integer kieu;
    private Integer loai;
    private BigDecimal giaTri;
    private BigDecimal giaTriMax;
}
