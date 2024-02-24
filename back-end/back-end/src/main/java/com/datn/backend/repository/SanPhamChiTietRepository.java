package com.datn.backend.repository;

import com.datn.backend.model.san_pham.SanPhamChiTiet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SanPhamChiTietRepository extends JpaRepository<SanPhamChiTiet, Integer> {

    @Query(value =
            """
            SELECT *
            FROM san_pham_chi_tiet spct
            WHERE spct.san_pham_id = :spId
            ORDER BY spct.created_at DESC
            """, nativeQuery = true)
    Page<SanPhamChiTiet> getByPage(Pageable pageable,
                                   @Param("spId") int spId);
}
