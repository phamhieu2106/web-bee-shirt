package com.datn.backend.service;


import com.datn.backend.dto.request.PhieuKhachHangRequest;
import com.datn.backend.model.khach_hang.KhachHang;
import com.datn.backend.model.phieu_giam_gia.PhieuGiamGiaKhachHang;

import java.util.List;

public interface PhieuGiamGiaKhachHangService {
    List<PhieuGiamGiaKhachHang> getAll();

    void addPhieu(PhieuKhachHangRequest request);



}
