package com.datn.backend.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DiscountValidRequest {

    @NotNull
    private BigDecimal giaTriDonHang;
    private Integer khachHangId;
    private long giaDangGiam;
}
