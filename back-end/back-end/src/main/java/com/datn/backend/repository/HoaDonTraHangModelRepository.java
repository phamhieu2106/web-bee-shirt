package com.datn.backend.repository;

import com.datn.backend.dto.response.HoaDonTraHangResponse;
import com.datn.backend.model.hoa_don.HoaDonTraHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface HoaDonTraHangModelRepository extends JpaRepository<HoaDonTraHang, Integer> {

    Optional<HoaDonTraHang> findByHoaDonId(Integer id);

    boolean existsByMa(String maHD);
}
