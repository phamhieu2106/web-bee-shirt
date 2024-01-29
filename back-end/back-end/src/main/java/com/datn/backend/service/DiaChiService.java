package com.datn.backend.service;

import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.model.khach_hang.DiaChi;

import java.util.List;

public interface DiaChiService {
    DiaChi add(DiaChi dc);
    DiaChi updateDC(DiaChi dc);
    List<DiaChi> getAllDC(int id);
    DiaChi getDCById(int id);
}
