package com.datn.backend.service.impl;

import com.datn.backend.dto.response.ProductDiscountSummaryResponse;
import com.datn.backend.dto.response.SanPhamResponse;
import com.datn.backend.model.san_pham.SanPham;
import com.datn.backend.repository.SanPhamRepository2;
import com.datn.backend.service.SanPhamService2;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SanPhamServiceImpl2 implements SanPhamService2 {

    private final SanPhamRepository2 repository;
    private final ModelMapper modelMapper;

    @Autowired
    public SanPhamServiceImpl2(SanPhamRepository2 repository,
                               ModelMapper modelMapper) {
        super();
        this.repository = repository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<Integer> check() {
        return repository.checkInDiscount();
    }

    @Override
    public List<ProductDiscountSummaryResponse> getProductInDiscount(Integer id) {
        return repository.getProductDiscountSummary(id);
    }

    @Override
    public SanPhamResponse getNameSanPhamBySanPhamChiTietId(int id) {
        return modelMapper.map(repository.getNameBuySanPhamChiTietId(id),SanPhamResponse.class);
    }
}
