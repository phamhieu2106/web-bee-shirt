package com.datn.backend.repository;

import com.datn.backend.model.phieu_giam_gia.PhieuGiamGiaKhachHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface PhieuGiamGiaKhachHangRepository extends JpaRepository<PhieuGiamGiaKhachHang, Integer> {

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM phieu_giam_gia_kh pgg WHERE pgg.phieu_giam_gia_id = :id",
            nativeQuery = true)
    void deleteAllPhieu(Integer id);

    @Modifying
    @Query(value = """
                   UPDATE phieu_giam_gia_kh
                   SET is_used = 1
                   WHERE khach_hang_id = :custId
                   AND phieu_giam_gia_id = :discountId 
                   """, nativeQuery = true)
    void updateIsUsed(@Param("custId") int custId,
                      @Param("discountId") int discountId);

    Optional<PhieuGiamGiaKhachHang> findByPhieuGiamGiaId(Integer id);
}
