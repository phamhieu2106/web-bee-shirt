package com.datn.backend.service;


import com.datn.backend.dto.request.PhieuKhachHangRequest;
import com.datn.backend.dto.response.KhachHangResponse;
import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.model.khach_hang.KhachHang;
import com.datn.backend.model.phieu_giam_gia.PhieuGiamGia;
import com.datn.backend.model.phieu_giam_gia.PhieuGiamGiaKhachHang;

import java.util.List;

public interface PhieuGiamGiaKhachHangService {
    List<PhieuGiamGiaKhachHang> getAll();


    void addPhieu(PhieuKhachHangRequest request);



    void deletePhieu(Integer id);


    PagedResponse<KhachHang> getPagination(int pageNumber, int pageSize, String id );

    PagedResponse<PhieuGiamGiaKhachHang> getPhieuCo(int pageNumber, int pageSize, String id );

    List<KhachHang> getPhieuKhachHang( String id ,Boolean check);

    PagedResponse<KhachHang> getAllActive(int pageNumber, int pageSize, String search);





}
