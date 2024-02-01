package com.datn.backend.repository;

import com.datn.backend.enumeration.LoaiHinhThuc;
import com.datn.backend.model.hoa_don.HinhThucThanhToan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * @author HungDV
 */
public interface HinhThucThanhToanRepository extends JpaRepository<HinhThucThanhToan,Integer> {
    Optional<HinhThucThanhToan> findByHinhThuc(LoaiHinhThuc hinhThuc);
}
