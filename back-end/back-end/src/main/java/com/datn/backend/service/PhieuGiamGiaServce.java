package com.datn.backend.service;

import com.datn.backend.dto.request.PhieuGiamGiaRequest;
import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.dto.response.PhieuGiamGiaResponse;
import com.datn.backend.model.phieu_giam_gia.PhieuGiamGia;

import java.util.List;

public interface PhieuGiamGiaServce {

    PhieuGiamGiaResponse getOne(Integer id);

    PhieuGiamGia add(PhieuGiamGiaRequest phieu);

    PhieuGiamGia update(Integer id, PhieuGiamGiaRequest phieu);

    PhieuGiamGia remove(Integer id);

    PhieuGiamGia changeStatus(Integer id);

    List<PhieuGiamGia> getAll();


    PagedResponse<PhieuGiamGia> getPagination(int pageNumber, int pageSize, String search ,List<Integer> kieu,List<Integer> loai,List<String> trangThai);

    PagedResponse<PhieuGiamGia> getFilter(int pageNumber, int pageSize, String search,List<Integer> kieu,List<Integer> loai,List<String> trangThai,String thoiGianBatDau,String thoiGianKetThuc);
}
