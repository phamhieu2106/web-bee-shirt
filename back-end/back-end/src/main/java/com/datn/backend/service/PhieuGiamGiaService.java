package com.datn.backend.service;

import com.datn.backend.dto.request.DiscountValidRequest;
import com.datn.backend.dto.request.PhieuGiamGiaRequest;
import com.datn.backend.dto.response.DiscountValidResponse;
import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.dto.response.PhieuGiamGiaResponse;
import com.datn.backend.model.phieu_giam_gia.PhieuGiamGia;

import java.math.BigDecimal;
import java.util.List;

public interface PhieuGiamGiaService {

    PhieuGiamGiaResponse getOne(Integer id);

    PhieuGiamGia add(PhieuGiamGiaRequest phieu);

    PhieuGiamGia update(Integer id, PhieuGiamGiaRequest phieu);

    PhieuGiamGia remove(PhieuGiamGia phieu);

    PhieuGiamGia changeStatus(Integer id);

    List<PhieuGiamGia> getAll();

    List<PhieuGiamGia> getChange();

    PhieuGiamGia get1Phieu(Integer id);

    PagedResponse<PhieuGiamGia> getPagination(int pageNumber, int pageSize, String search ,List<Integer> kieu,List<Integer> loai,List<String> trangThai);

    PagedResponse<PhieuGiamGia> getFilter(int pageNumber, int pageSize, String search,List<Integer> kieu,List<Integer> loai,List<String> trangThai,String thoiGianBatDau,String thoiGianKetThuc);

    DiscountValidResponse getDiscountValid(DiscountValidRequest discountValidRequest);

    List<PhieuGiamGia> getDiscountsForLoggedCheckOut(BigDecimal dieuKien, int custId);

    List<PhieuGiamGia> getDiscountsForNoneLoggedCheckOut(BigDecimal priceCondition);

    DiscountValidResponse getDiscountValidUpdateHDCT(Integer hoaDonId, DiscountValidRequest discountValidRequest);

    List<PhieuGiamGia> getAllDiscountsOf1Cust(int custId);

    List<PhieuGiamGia> getAllDiscountsForNoneLog();

    PhieuGiamGia getDiscountMax(List<PhieuGiamGia> phieuGiamGias, BigDecimal giaTriDonHang);

    long getDiscountValue(PhieuGiamGia pgg, BigDecimal giaTriDonHang);
}
