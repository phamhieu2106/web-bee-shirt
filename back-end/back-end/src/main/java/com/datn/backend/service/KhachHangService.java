package com.datn.backend.service;

import com.datn.backend.dto.request.KhachHangRequest;
import com.datn.backend.dto.response.KhachHangResponse;
import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.model.khach_hang.KhachHang;

public interface KhachHangService {
    KhachHang add(KhachHangRequest kh);
    PagedResponse<KhachHangResponse> getAll(int pageNumber, int pageSize, String search);
    KhachHang update(int id, KhachHangRequest kh);
    KhachHang delete(Integer id);
    KhachHangResponse getById(int id);


}
