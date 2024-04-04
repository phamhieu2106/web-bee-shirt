package com.datn.backend.dto.response;

import com.datn.backend.model.phieu_giam_gia.PhieuGiamGia;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class DiscountValidResponse {

    private PhieuGiamGia phieuGiamGia;
    private String message;
}
