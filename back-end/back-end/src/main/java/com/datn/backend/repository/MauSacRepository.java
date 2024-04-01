package com.datn.backend.repository;

import com.datn.backend.model.san_pham.MauSac;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MauSacRepository extends JpaRepository<MauSac, Integer> {

    boolean existsByTen(String ten);

    boolean existsByMa(String ma);

    MauSac getMauSacByTen(String ten);

    MauSac getMauSacByMa(String ma);

    @Query(value =
           """
           SELECT *
           FROM mau_sac m
           WHERE m.trang_thai = 1
           ORDER BY m.ten
           """, nativeQuery = true)
    List<MauSac> getAllActiveColors();

    @Query(value =
            """
            SELECT *
            FROM mau_sac m
            WHERE m.ten LIKE %:search%
            OR m.ma LIKE %:search%
            ORDER BY m.created_at DESC
            """, nativeQuery = true)
    Page<MauSac> getByPage(Pageable pageable,
                           @Param("search") String search);

    @Query(value =
            """
            SELECT *
            FROM mau_sac ms
            WHERE ms.id IN (
                SELECT ct.mau_sac_id
                FROM san_pham_chi_tiet ct
                WHERE ct.san_pham_id = :productId
            )
            """, nativeQuery = true)
    List<MauSac> getAllColorOfProduct(@Param("productId") int productId);

    @Query(value =
            """
            SELECT ms.id
            FROM mau_sac ms
            WHERE ms.trang_thai = 1
            """, nativeQuery = true)
    List<Integer> getAllActiveColorIds();
}
