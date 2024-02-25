package com.datn.backend.repository;


import com.datn.backend.model.san_pham.SanPham;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SanPhamRepository extends JpaRepository<SanPham, Integer> {

    boolean existsByTen(String ten);

    @Query(value =
            """
            SELECT *
            FROM san_pham s
            WHERE s.ten LIKE %:search%
            OR s.ma LIKE %:search%
            ORDER BY s.created_at DESC
            """, nativeQuery = true)
    Page<SanPham> getByPage(Pageable pageable,
                            @Param("search") String search);
}
