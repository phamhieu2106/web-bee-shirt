package com.datn.backend.service;

import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.model.khach_hang.DiaChi;

public interface DiaChiService {
    DiaChi add(DiaChi dc);
    PagedResponse<DiaChi> getAll(int pageNumber, int pageSize);
    DiaChi getDCById(int id);
}
