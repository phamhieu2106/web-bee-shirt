package com.datn.backend.service;

import com.datn.backend.dto.request.AddNhanVienRequest;
import com.datn.backend.dto.response.NhanVienResponse;
import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.model.NhanVien;

public interface NhanVienService {

    NhanVien add(AddNhanVienRequest request);

    PagedResponse<NhanVienResponse> getAll(int pageNumber, int pageSize, String search);
}
