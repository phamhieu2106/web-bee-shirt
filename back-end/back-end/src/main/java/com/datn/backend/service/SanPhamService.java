package com.datn.backend.service;

import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.model.san_pham.SanPham;

public interface SanPhamService {

    SanPham add(SanPham sanPham);

    PagedResponse<SanPham> getAll(int pageNumber, int pageSize, String search);

    SanPham getById(int id);

    void changeStatus(int id);

    SanPham update(SanPham sanPham);
}
