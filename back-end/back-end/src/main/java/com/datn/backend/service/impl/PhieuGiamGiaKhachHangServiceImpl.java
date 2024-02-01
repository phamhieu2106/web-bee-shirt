package com.datn.backend.service.impl;

import com.datn.backend.dto.request.KhachHangRequest;
import com.datn.backend.dto.request.PhieuKhachHangRequest;
import com.datn.backend.model.khach_hang.DiaChi;
import com.datn.backend.model.khach_hang.KhachHang;
import com.datn.backend.model.phieu_giam_gia.PhieuGiamGia;
import com.datn.backend.model.phieu_giam_gia.PhieuGiamGiaKhachHang;
import com.datn.backend.repository.KhachHangRepository;
import com.datn.backend.repository.PhieuGiamGiaKhachHangRepository;
import com.datn.backend.repository.PhieuGiamGiaRepository;
import com.datn.backend.service.PhieuGiamGiaKhachHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PhieuGiamGiaKhachHangServiceImpl implements PhieuGiamGiaKhachHangService {

    @Autowired
    private PhieuGiamGiaRepository phieuGiamGiaRepository;

    @Autowired
    private PhieuGiamGiaKhachHangRepository repository;

    @Autowired
    private KhachHangRepository khachHangRepository;

    @Override
    public List<PhieuGiamGiaKhachHang> getAll() {
        return repository.findAll();
    }

    @Override
    public void addPhieu(PhieuKhachHangRequest request) {
        PhieuGiamGia phieuGiamGia = phieuGiamGiaRepository.findById(request.getPhieuGiamGiaId()).get();
        List<Integer> listIdKhachHang= request.getSelectedIds();
        for (Integer idKhach: listIdKhachHang ) {
            KhachHang kh = khachHangRepository.findById(idKhach).get();
            PhieuGiamGiaKhachHang phieuKH = new PhieuGiamGiaKhachHang();
            phieuKH.setKhachHang(kh);
            phieuKH.setPhieuGiamGia(phieuGiamGia);
            repository.save(phieuKH);
        }
    }
}
