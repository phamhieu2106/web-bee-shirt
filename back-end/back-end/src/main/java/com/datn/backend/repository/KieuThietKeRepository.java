package com.datn.backend.repository;

import com.datn.backend.model.san_pham.KieuThietKe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface KieuThietKeRepository extends JpaRepository<KieuThietKe, Integer> {

    boolean existsByTen(String ten);

    KieuThietKe getKieuThietKeByTen(String ten);

    @Query(value =
            """
            SELECT *
            FROM kieu_thiet_ke tk
            WHERE tk.ten LIKE %:search%
            ORDER BY tk.created_at DESC
            """, nativeQuery = true)
    Page<KieuThietKe> getAll(Pageable pageable,
                             @Param("search") String search);
}
