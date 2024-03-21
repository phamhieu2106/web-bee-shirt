package com.datn.backend.service.impl;

import com.datn.backend.dto.response.ProductDiscountSummaryResponse;
import com.datn.backend.repository.SanPhamRepository2;
import com.datn.backend.service.SanPhamService2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SanPhamServiceImpl2 implements SanPhamService2 {

    private final SanPhamRepository2 repository;


    @Autowired
    public SanPhamServiceImpl2(SanPhamRepository2 repository) {
        super();
        this.repository = repository;
    }

    @Override
    public List<Integer> check() {
        return repository.checkInDiscount();
    }

    @Override
    public List<ProductDiscountSummaryResponse> getProductInDiscount(Integer id) {
        return repository.getProductDiscountSummary(id);
    }
}
