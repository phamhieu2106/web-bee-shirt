package com.datn.backend.repository;

import com.datn.backend.model.san_pham.KichCo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

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
}
