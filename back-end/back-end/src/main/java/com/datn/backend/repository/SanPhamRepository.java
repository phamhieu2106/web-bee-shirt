package com.datn.backend.repository;


import com.datn.backend.model.san_pham.SanPham;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SanPhamRepository extends JpaRepository<SanPham, Integer> {

    boolean existsByTen(String ten);

    boolean existsByMa(String ma);

    SanPham getByTen(String ten);

    SanPham getByMa(String ma);

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

    @Query(value = """
                   SELECT DISTINCT sp.id, sp.ma, sp.ten, sp.trang_thai, sp.mo_ta, sp.created_at, sp.created_by, sp.updated_at, sp.last_updated_by
                   FROM san_pham sp
                   JOIN san_pham_chi_tiet ct ON sp.id = ct.san_pham_id
                   """, nativeQuery = true)
    Page<SanPham> getByPageClient(Pageable pageable);
}
