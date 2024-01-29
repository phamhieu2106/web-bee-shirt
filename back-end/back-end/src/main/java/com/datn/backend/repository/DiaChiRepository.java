package com.datn.backend.repository;

import com.datn.backend.model.khach_hang.DiaChi;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DiaChiRepository extends JpaRepository<DiaChi,Integer> {
    @Query(value =
            """
             select
                 dc.*
             from dia_chi dc
             join khach_hang kh on dc.khach_hang_id = kh.id
             where kh.id = :id
            """, nativeQuery = true)
    List<DiaChi> getAll(int id);
}
