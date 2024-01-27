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
public class ThanhToanResponse extends BaseResponse {

    private Integer id;
    private String moTa;
    private String maGiaoDich;
    private BigDecimal soTien;
    private boolean trangThai;
    private HinhThucThanhToanResponse hinhThucThanhToan;
}
