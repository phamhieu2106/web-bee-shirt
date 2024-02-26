package com.datn.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author HungDV
 */
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class SanPhamResponse {
    private Integer id;
    private String ten;
    private String ma;
    private String moTa;
    private boolean trangThai;
}
