package com.datn.backend.service;

import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.model.san_pham.SanPham;

import java.util.List;

public interface SanPhamService {

    // admin
    SanPham add(SanPham sanPham);

    PagedResponse<SanPham> getByPage(int pageNumber, int pageSize, String search, List<Integer> status);

    SanPham getById(int id);

    void changeStatus(int id, boolean value);

    SanPham update(SanPham sanPham);

    // client
    PagedResponse<SanPham> getByPageClient(int pageNumber, int pageSize);
}
