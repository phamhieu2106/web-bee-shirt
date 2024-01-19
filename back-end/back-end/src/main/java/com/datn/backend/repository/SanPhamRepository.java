package com.datn.backend.repository;

import com.datn.backend.model.san_pham.SanPham;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SanPhamRepository extends JpaRepository<SanPham, Integer> {
}
