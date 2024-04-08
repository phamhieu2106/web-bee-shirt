package com.datn.backend.service;

import com.datn.backend.dto.response.ProductDiscountSummaryResponse;
import com.datn.backend.dto.response.SanPhamResponse;

import java.util.List;

public interface SanPhamService2 {

    List<Integer> check();

    List<ProductDiscountSummaryResponse> getProductInDiscount(Integer id);

    SanPhamResponse getNameSanPhamBySanPhamChiTietId(int id);
}
