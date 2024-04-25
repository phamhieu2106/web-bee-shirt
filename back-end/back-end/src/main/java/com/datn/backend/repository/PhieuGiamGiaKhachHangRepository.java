package com.datn.backend.repository;

import com.datn.backend.model.khach_hang.KhachHang;
import com.datn.backend.model.phieu_giam_gia.PhieuGiamGiaKhachHang;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
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



    @Query(value = """
    select pgg from PhieuGiamGiaKhachHang pgg join KhachHang kh on pgg.khachHang.id = kh.id
    where kh.trangThai !=0 and pgg.phieuGiamGia.id=:id and pgg.trangThai !=0
""")
    Page<PhieuGiamGiaKhachHang> getCoPhieu(Pageable pageable, @Param("id") String id);


    @Query("""
            select pggkh.khachHang from PhieuGiamGiaKhachHang pggkh
            where pggkh.phieuGiamGia.id = :phieuGiamGiaId
            """)
    List<KhachHang> getKhachHangsByPhieuGiamGiaId(Integer phieuGiamGiaId);

    PhieuGiamGiaKhachHang findByPhieuGiamGiaIdAndKhachHangId(Integer phieuGiamGia_id, Integer khachHang_id);

}
