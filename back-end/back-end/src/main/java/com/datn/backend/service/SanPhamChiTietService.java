package com.datn.backend.service;

import com.datn.backend.dto.request.AddSpctRequest;
import com.datn.backend.dto.request.CapNhatNhanhSpctReq;
import com.datn.backend.dto.request.CapNhatSpctRequest;
import com.datn.backend.dto.request.FilterSPCTParams;
import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.dto.response.SpctResponse;
import com.datn.backend.model.san_pham.SanPhamChiTiet;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;

public interface SanPhamChiTietService {

    void addSpctList(AddSpctRequest request, MultipartFile[] multipartFiles) throws IOException;

    PagedResponse<SanPhamChiTiet> getByPage(int pageNumber, int pageSize, String search, int spId);

    PagedResponse<SanPhamChiTiet> filterByPage(FilterSPCTParams params);

    SanPhamChiTiet getOneById(int spctId);

    SanPhamChiTiet getAnyBySanPhamId(int spId);

    void updateSpctNhanh(CapNhatNhanhSpctReq req);

    String update(CapNhatSpctRequest req);
    
    PagedResponse<SpctResponse> getAll(int pageNumber, int pageSize, String search);

    BigDecimal[] getMinAndMaxPrice(int productId);

    void changeStatus(int id);

    boolean checkExist(int spId, int mauSacId, int sizeId);

    void updateImages(MultipartFile[] files, int spId, int mauSacId) throws IOException;

    Integer getQuantityOfOne(int productId, int colorId, int sizeId);

    BigDecimal getPriceOfOne(int productId, int colorId, int sizeId);

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
