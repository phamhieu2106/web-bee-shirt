package com.datn.backend.repository;

import com.datn.backend.model.khach_hang.DiaChi;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface DiaChiRepository extends JpaRepository<DiaChi,Integer> {
    @Query(value =
            """
            SELECT * FROM dia_chi
            """, nativeQuery = true)
    Page<DiaChi> getAll(Pageable pageable);
}
