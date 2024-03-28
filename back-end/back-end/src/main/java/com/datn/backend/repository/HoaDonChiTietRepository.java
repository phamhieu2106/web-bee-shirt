package com.datn.backend.repository;

import com.datn.backend.model.hoa_don.HoaDon;
import com.datn.backend.model.hoa_don.HoaDonChiTiet;
import com.datn.backend.model.san_pham.SanPhamChiTiet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigDecimal;
import java.util.Optional;

/**
 * @author HungDV
 */
public interface HoaDonChiTietRepository extends JpaRepository<HoaDonChiTiet,Integer> {
    Optional<HoaDonChiTiet> findByHoaDonAndSanPhamChiTietAndGiaBan(HoaDon hoaDon, SanPhamChiTiet sanPhamChiTiet, BigDecimal giaBan);
}
