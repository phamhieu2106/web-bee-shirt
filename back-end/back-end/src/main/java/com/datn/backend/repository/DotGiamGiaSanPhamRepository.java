package com.datn.backend.repository;

import com.datn.backend.model.dot_giam_gia.DotGiamGiaSanPham;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DotGiamGiaSanPhamRepository extends JpaRepository<DotGiamGiaSanPham,Integer> {
}
