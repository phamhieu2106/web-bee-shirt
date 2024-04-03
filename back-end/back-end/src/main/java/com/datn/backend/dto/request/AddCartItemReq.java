package com.datn.backend.dto.request;

import com.datn.backend.model.san_pham.SanPhamChiTiet;
import lombok.Getter;

@Getter
public class AddCartItemReq {

    private int quantity;
    private SanPhamChiTiet productDetails;
    private int customerId;
}
