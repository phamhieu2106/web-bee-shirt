package com.datn.backend.service;

import com.datn.backend.dto.request.AddSanPhamChiTietRequest;
import com.datn.backend.dto.request.CapNhatNhanhSanPhamChiTietReq;
import com.datn.backend.dto.request.FilterSPCTParams;
import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.dto.response.SpctResponse;
import com.datn.backend.model.san_pham.SanPhamChiTiet;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;

public interface SanPhamChiTietService {

    void addSpctList(AddSanPhamChiTietRequest request, MultipartFile[] multipartFiles) throws IOException;

    PagedResponse<SanPhamChiTiet> getByPage(int pageNumber, int pageSize, String search, int spId);

    PagedResponse<SanPhamChiTiet> filterByPage(FilterSPCTParams params);

    void updateSpctNhanh(CapNhatNhanhSanPhamChiTietReq req);
    
    PagedResponse<SpctResponse> getAll(int pageNumber, int pageSize, String search);

    BigDecimal[] getMinAndMaxPrice(int productId);

    void changeStatus(int id);
}
