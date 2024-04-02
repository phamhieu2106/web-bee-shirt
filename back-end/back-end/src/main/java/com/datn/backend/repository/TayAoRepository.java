package com.datn.backend.repository;

import com.datn.backend.model.san_pham.TayAo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TayAoRepository extends JpaRepository<TayAo, Integer> {

    boolean existsByTen(String ten);

    TayAo getTayAoByTen(String ten);

    @Query(value =
            """
            SELECT *
            FROM tay_ao t
            WHERE t.ten LIKE %:search%
            ORDER BY t.created_at DESC
            """, nativeQuery = true)
    Page<TayAo> getAll(Pageable pageable,
                          @Param("search") String search);

    @Query(value =
            """
            SELECT ta.id
            FROM tay_ao ta
            WHERE ta.trang_thai = 1
            """, nativeQuery = true)
    List<Integer> getAllActiveSleeveIds();
}
