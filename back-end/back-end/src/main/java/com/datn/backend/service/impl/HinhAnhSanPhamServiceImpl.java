package com.datn.backend.service.impl;

import com.datn.backend.model.san_pham.HinhAnh;
import com.datn.backend.repository.HinhAnhRepository;
import com.datn.backend.service.HinhAnhSanPhamService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HinhAnhSanPhamServiceImpl implements HinhAnhSanPhamService {

    private final HinhAnhRepository hinhAnhRepo;

    @Override
    public List<HinhAnh> getByMauSac(String tenMau, int sanPhamID) {
        return hinhAnhRepo.getByMauSac(tenMau, sanPhamID);
    }
}
