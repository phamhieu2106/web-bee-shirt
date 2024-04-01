package com.datn.backend.repository;

import com.datn.backend.model.san_pham.CoAo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CoAoRepository extends JpaRepository<CoAo, Integer> {

    boolean existsByTen(String ten);

    CoAo getCoAoByTen(String ten);

    @Query(value =
            """
            SELECT *
            FROM co_ao c
            WHERE c.ten LIKE %:search%
            ORDER BY c.created_at DESC
            """, nativeQuery = true)
    Page<CoAo> getAll(Pageable pageable,
                      @Param("search") String search);

    @Query(value =
            """
            SELECT ca.id
            FROM co_ao ca
            WHERE ca.trang_thai = 1
            """, nativeQuery = true)
    List<Integer> getAllActiveCollarIds();
}
