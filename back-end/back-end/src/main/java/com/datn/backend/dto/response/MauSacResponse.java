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
public class MauSacResponse {

    private Integer id;
    private String ten;
    private String ma;
    private boolean trangThai;
}
