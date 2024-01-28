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
            select dc.tinh,dc.huyen,dc.xa,dc.duong,dc.mac_dinh,dc.id,kh.ho_ten,kh.sdt 
            from dia_chi dc 
            join khach_hang kh 
            on dc.khach_hang_id = kh.id 
            where kh.id= :id
            """, nativeQuery = true)
    DiaChi getAll(int id);
}
