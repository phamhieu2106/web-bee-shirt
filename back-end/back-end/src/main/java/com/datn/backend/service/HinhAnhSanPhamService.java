package com.datn.backend.service;

import com.datn.backend.model.san_pham.HinhAnh;

import java.util.List;

public interface HinhAnhSanPhamService {

    List<HinhAnh> getByMauSac(String tenMau, int sanPhamID);

    List<String> getAllUrlBySanPhamAndMauSac(int productId, int colorId);
}
