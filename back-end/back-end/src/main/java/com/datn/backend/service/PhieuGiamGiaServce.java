package com.datn.backend.service;

import com.datn.backend.dto.request.PhieuGiamGiaRequest;
import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.dto.response.PhieuGiamGiaResponse;
import com.datn.backend.model.phieu_giam_gia.PhieuGiamGia;

import java.util.List;

public interface PhieuGiamGiaServce {
    List<PhieuGiamGiaResponse> getAll();

    PhieuGiamGiaResponse getOne(Integer id);

    PhieuGiamGia add(PhieuGiamGiaRequest phieu);

    PhieuGiamGia update(Integer id, PhieuGiamGiaRequest phieu);

    PhieuGiamGia remove(Integer id);

    void changeStatus(int id);

    PagedResponse<PhieuGiamGiaResponse> getPagination(int pageNumber, int pageSize, String search);
}
