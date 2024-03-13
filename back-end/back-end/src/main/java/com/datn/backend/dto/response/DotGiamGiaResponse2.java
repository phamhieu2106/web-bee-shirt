package com.datn.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * @author HungDV
 */
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class DotGiamGiaResponse2 {
    private Integer id;

    private LocalDateTime thoiGianBatDau;

    private LocalDateTime thoiGianKetThuc;

    private Integer giaTriPhanTram;

    private Boolean trangThai;

}
