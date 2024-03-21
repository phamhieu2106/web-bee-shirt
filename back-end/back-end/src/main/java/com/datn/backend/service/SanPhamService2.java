package com.datn.backend.service;

import com.datn.backend.dto.response.ProductDiscountSummaryResponse;

import java.util.List;

public interface SanPhamService2 {

    List<Integer> check();

    List<ProductDiscountSummaryResponse> getProductInDiscount(Integer id);
}
