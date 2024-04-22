package com.datn.backend.repository;

import com.datn.backend.model.khach_hang.DiaChi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AddressRepository extends JpaRepository<DiaChi,Integer> {

    @Query(value =
            """
             select
                 dc.*
             from dia_chi dc
             join khach_hang kh on dc.khach_hang_id = kh.id
             where kh.id = :id order by dc.mac_dinh desc 
            """, nativeQuery = true)
    List<DiaChi> getAllAddressOf1Customer(int id);

    @Query(value = """
                   UPDATE dia_chi dc
                   SET dc.mac_dinh = 0
                   WHERE dc.id != :id
                   AND dc.khach_hang_id = :custId
                   """, nativeQuery = true)
    @Modifying
    void setUnDefaultValue(@Param("id") int id,
                           @Param("custId") int custId);
}
