package com.datn.backend.repository;

import com.datn.backend.model.san_pham.KichCo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface KichCoRepository extends JpaRepository<KichCo, Integer> {

    boolean existsByTen(String ten);

    KichCo getKichCoByTen(String ten);

    @Query(value =
            """
            SELECT *
            FROM kich_co k
            WHERE k.ten LIKE %:search%
            ORDER BY k.created_at DESC
            """, nativeQuery = true)
    Page<KichCo> getAll(Pageable pageable,
                        @Param("search") String search);

    @Query(value =
            """
            SELECT *
            FROM kich_co k
            WHERE k.id IN (
                SELECT ct.kich_co_id
                FROM san_pham_chi_tiet ct
                WHERE ct.san_pham_id = :productId
                AND ct.mau_sac_id = :colorId
            )
            ORDER BY k.id
            """, nativeQuery = true)
    List<KichCo> getAllByProductAndColor(@Param("productId") int productId,
                                         @Param("colorId") int colorId);

    @Query(value =
            """
            SELECT kc.id
            FROM kich_co kc
            WHERE kc.trang_thai = 1
            """, nativeQuery = true)
    List<Integer> getAllActiveSizeIds();
}
