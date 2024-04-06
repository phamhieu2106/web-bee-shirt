package com.datn.backend.repository;

import com.datn.backend.model.hoa_don.HoaDonTraHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HoaDonTraHangModelRepository extends JpaRepository<HoaDonTraHang, Integer> {
}
