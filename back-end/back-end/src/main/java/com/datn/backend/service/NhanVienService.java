package com.datn.backend.service;

import com.datn.backend.dto.request.AddNhanVienRequest;
import com.datn.backend.dto.response.NhanVienResponse;
import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.model.NhanVien;
import org.springframework.data.domain.Page;

import java.util.List;

public interface NhanVienService {

    NhanVien add(AddNhanVienRequest request);

    PagedResponse<NhanVienResponse> getAll(int pageNumber, int pageSize, String search);

    NhanVienResponse getOneById(Integer id);

    NhanVien update(AddNhanVienRequest request, Integer id);

    NhanVien delete(Integer id);

    PagedResponse<NhanVienResponse> filter(int pageNumber, int pageSize, List<Integer> gioiTinhFilter, List<Integer> trangThaiFilter);
}
