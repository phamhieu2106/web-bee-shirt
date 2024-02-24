package com.datn.backend.service;

import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.model.san_pham.KieuDang;

import java.util.List;

public interface KieuDangService {

    KieuDang add(KieuDang kieuDang);

    PagedResponse<KieuDang> getByPage(int pageNumber, int pageSize, String search);

    List<KieuDang> getAll();

    KieuDang getById(int id);

    void changeStatus(int id);

    KieuDang update(KieuDang kieuDang);
}
