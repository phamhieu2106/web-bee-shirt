package com.datn.backend.service;

import com.datn.backend.dto.request.AddNhanVienRequest;
import com.datn.backend.dto.response.NhanVienResponse;
import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.model.nhan_vien.NhanVien;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface NhanVienService {

    NhanVien add(AddNhanVienRequest request, MultipartFile multipartFile) throws IOException;

    PagedResponse<NhanVienResponse> getAll(int pageNumber, int pageSize, String search);

    NhanVienResponse getOneById(Integer id);

    NhanVien update(AddNhanVienRequest request, Integer id, MultipartFile multipartFile);

    NhanVien delete(Integer id);

    PagedResponse<NhanVienResponse> filter(int pageNumber, int pageSize, List<Integer> gioiTinhFilter, List<Integer> trangThaiFilter, String search);
}
