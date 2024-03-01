package com.datn.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * @author HungDV
 */
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class DotGiamGiaSanPhamResponse {
    private Integer id;

    private BigDecimal giaCu;

    private BigDecimal giaMoi;

    private Integer giamGia;

    private LocalDateTime thoiGianBatDau;

    private LocalDateTime thoiGianKetThuc;
}
