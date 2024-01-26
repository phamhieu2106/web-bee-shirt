package com.datn.backend.service;

import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.model.san_pham.KieuThietKe;

public interface KieuThietKeService {

    KieuThietKe add(KieuThietKe thietKe);

    PagedResponse<KieuThietKe> getAll(int pageNumber, int pageSize, String search);

    KieuThietKe getById(int id);

    void changeStatus(int id);

    KieuThietKe update(KieuThietKe thietKe);
}
