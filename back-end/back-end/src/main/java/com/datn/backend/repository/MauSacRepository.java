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
}
