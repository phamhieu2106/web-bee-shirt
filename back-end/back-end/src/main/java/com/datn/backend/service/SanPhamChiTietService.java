package com.datn.backend.service;

import com.datn.backend.dto.request.AddSanPhamChiTietRequest;
import com.datn.backend.dto.request.CapNhatNhanhSanPhamChiTietReq;
import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.dto.response.SpctResponse;
import com.datn.backend.model.san_pham.SanPhamChiTiet;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface SanPhamChiTietService {

    void addSpctList(AddSanPhamChiTietRequest request, MultipartFile[] multipartFiles) throws IOException;

    PagedResponse<SanPhamChiTiet> getByPage(int pageNumber, int pageSize, String search, int spId);
<<<<<<< HEAD

    void updateSpctNhanh(CapNhatNhanhSanPhamChiTietReq req);
=======
    PagedResponse<SpctResponse> getAll(int pageNumber, int pageSize, String search);
>>>>>>> 7775ecdd1e387780538a72deaba7a279a74e3d4a
}
