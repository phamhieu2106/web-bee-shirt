package com.datn.backend.service;

import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.model.san_pham.KieuDang;

public interface KieuDangService {

    KieuDang add(KieuDang kieuDang);

    PagedResponse<KieuDang> getAll(int pageNumber, int pageSize, String search);

    KieuDang getById(int id);

    void changeStatus(int id);

    KieuDang update(KieuDang kieuDang);
}
