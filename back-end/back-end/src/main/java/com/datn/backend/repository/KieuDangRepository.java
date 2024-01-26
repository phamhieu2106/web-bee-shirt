package com.datn.backend.repository;

import com.datn.backend.model.san_pham.KieuDang;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface KieuDangRepository extends JpaRepository<KieuDang, Integer> {

    boolean existsByTen(String ten);

    @Query(value =
            """
            SELECT *
            FROM kieu_dang d
            WHERE d.ten LIKE %:search%
            ORDER BY d.created_at DESC
            """, nativeQuery = true)
    Page<KieuDang> getAll(Pageable pageable,
                          @Param("search") String search);
}
