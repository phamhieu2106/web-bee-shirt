package com.datn.backend.resource;


import com.datn.backend.dto.request.PhieuKhachHangRequest;
import com.datn.backend.model.khach_hang.KhachHang;
import com.datn.backend.model.phieu_giam_gia.PhieuGiamGia;
import com.datn.backend.model.phieu_giam_gia.PhieuGiamGiaKhachHang;
import com.datn.backend.repository.KhachHangRepository;
import com.datn.backend.repository.PhieuGiamGiaKhachHangRepository;
import com.datn.backend.repository.PhieuGiamGiaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/phieu-giam-gia-khach-hang")
public class PhieuKhachHangResource {
    private final KhachHangRepository khachHangRepository;
    private final PhieuGiamGiaRepository phieuGiamGiaRepository;
    private final PhieuGiamGiaKhachHangRepository phieuGiamGiaKhachHangRepository;

    @Autowired
    public PhieuKhachHangResource(
            KhachHangRepository khachHangRepository,
            PhieuGiamGiaRepository phieuGiamGiaRepository,
            PhieuGiamGiaKhachHangRepository phieuGiamGiaKhachHangRepository) {
        this.khachHangRepository = khachHangRepository;
        this.phieuGiamGiaRepository = phieuGiamGiaRepository;
        this.phieuGiamGiaKhachHangRepository = phieuGiamGiaKhachHangRepository;
    }

    @PostMapping("/add")
    public ResponseEntity<?> themPhieuGiamGiaChoNhieuKhachHang(@RequestBody PhieuKhachHangRequest request) {
        try {
            List<Integer> khachHangIds = request.getKhachHangIds();
            Integer idPhieuGiamGia = request.getIdPhieuGiamGia();

            for (Integer khachHangId : khachHangIds) {
                KhachHang khachHang = khachHangRepository.findById(khachHangId)
                        .orElseThrow(() -> new RuntimeException("Không tìm thấy khách hàng với ID: " + khachHangId));

                PhieuGiamGiaKhachHang phieuGiamGiaKhachHang = new PhieuGiamGiaKhachHang();
                phieuGiamGiaKhachHang.setKhachHang(khachHang);

                PhieuGiamGia phieuGiamGia = phieuGiamGiaRepository.findById(idPhieuGiamGia)
                        .orElseThrow(() -> new RuntimeException("Không tìm thấy phiếu giảm giá với ID: " + idPhieuGiamGia));

                phieuGiamGiaKhachHang.setPhieuGiamGia(phieuGiamGia);
                phieuGiamGiaKhachHangRepository.save(phieuGiamGiaKhachHang);
            }

            return new ResponseEntity<>("Thêm phiếu giảm giá cho nhiều khách hàng thành công", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Lỗi khi thêm phiếu giảm giá cho nhiều khách hàng", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
