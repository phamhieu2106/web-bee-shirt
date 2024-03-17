package com.datn.backend.service;

import com.datn.backend.dto.request.AddSanPhamChiTietRequest;
import com.datn.backend.dto.request.CapNhatNhanhSpctReq;
import com.datn.backend.dto.request.CapNhatSpctRequest;
import com.datn.backend.dto.request.FilterSPCTParams;
import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.dto.response.SpctResponse;
import com.datn.backend.model.san_pham.SanPhamChiTiet;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;

public interface SanPhamChiTietService {

    void addSpctList(AddSanPhamChiTietRequest request, MultipartFile[] multipartFiles) throws IOException;

    PagedResponse<SanPhamChiTiet> getByPage(int pageNumber, int pageSize, String search, int spId);

    PagedResponse<SanPhamChiTiet> filterByPage(FilterSPCTParams params);

    SanPhamChiTiet getOneById(int spctId);

    SanPhamChiTiet getAnyBySanPhamId(int spId);

    void updateSpctNhanh(CapNhatNhanhSpctReq req);

    SanPhamChiTiet update(CapNhatSpctRequest req);
    
    PagedResponse<SpctResponse> getAll(int pageNumber, int pageSize, String search);

    BigDecimal[] getMinAndMaxPrice(int productId);

    void changeStatus(int id);

    boolean checkExist(int spId, int mauSacId, int sizeId);

    long[][] minMaxPrice();
    PagedResponse<SpctResponse> getDetailSpct(
            int pageSize, int pageNumber,
            String search,String mauSac,
            String kichCo,String kieuDang,
            String thietKe,String tayAo,
            String coAo,String chatLieu,
            BigDecimal giaMin,BigDecimal giaMax
    );
}
