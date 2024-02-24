package com.datn.backend.service;

import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.model.san_pham.KieuThietKe;

import java.util.List;

public interface KieuThietKeService {

    KieuThietKe add(KieuThietKe thietKe);

    PagedResponse<KieuThietKe> getByPage(int pageNumber, int pageSize, String search);

    List<KieuThietKe> getAll();

    KieuThietKe getById(int id);

    void changeStatus(int id);

    KieuThietKe update(KieuThietKe thietKe);
}
