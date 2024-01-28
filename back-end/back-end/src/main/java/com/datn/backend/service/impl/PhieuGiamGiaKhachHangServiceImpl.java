package com.datn.backend.service.impl;

import com.datn.backend.model.phieu_giam_gia.PhieuGiamGiaKhachHang;
import com.datn.backend.repository.KhachHangRepository;
import com.datn.backend.repository.PhieuGiamGiaKhachHangRepository;
import com.datn.backend.repository.PhieuGiamGiaRepository;
import com.datn.backend.service.PhieuGiamGiaKhachHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PhieuGiamGiaKhachHangServiceImpl implements PhieuGiamGiaKhachHangService {


    private final PhieuGiamGiaKhachHangRepository phieuGiamGiaKhachHangRepository;
    private final KhachHangRepository khachHangRepository;
    private final PhieuGiamGiaRepository phieuGiamGiaRepository;
    @Autowired
    public PhieuGiamGiaKhachHangServiceImpl(PhieuGiamGiaKhachHangRepository phieuGiamGiaKhachHangRepository,
                                            KhachHangRepository khachHangRepository,
                                            PhieuGiamGiaRepository phieuGiamGiaRepository) {
        super();
        this.phieuGiamGiaKhachHangRepository = phieuGiamGiaKhachHangRepository;
        this.khachHangRepository = khachHangRepository;
        this.phieuGiamGiaRepository = phieuGiamGiaRepository;
    }

    @Override
    public void addPhieu(PhieuGiamGiaKhachHang phieu) {


       phieuGiamGiaKhachHangRepository.save(phieu);
    }
}
