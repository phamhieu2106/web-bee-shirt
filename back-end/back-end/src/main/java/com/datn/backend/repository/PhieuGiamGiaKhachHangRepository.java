package com.datn.backend.repository;

import com.datn.backend.model.phieu_giam_gia.PhieuGiamGiaKhachHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PhieuGiamGiaKhachHangRepository extends JpaRepository<PhieuGiamGiaKhachHang,Integer> {
    @Query(value = "SELECT pgg.phieu_giam_gia_id, pgg.khach_hang_id,kh.id, kh.ho_ten, kh.ngay_sinh,pgg.mo_ta\n" +
            "FROM phieu_giam_gia_kh pgg\n" +
            "LEFT  JOIN khach_hang kh ON pgg.khach_hang_id = kh.id where pgg.phieu_giam_gia_id=:id1",nativeQuery = true)
    List<PhieuGiamGiaKhachHang> getAllPhieu(@Param("id1") Integer id);

    @Query(value = "SELECT pgg.phieu_giam_gia_id, pgg.khach_hang_id,kh.id, kh.ho_ten, kh.ngay_sinh,pgg.mo_ta\n" +
            "FROM phieu_giam_gia_kh pgg\n" +
            "INNER JOIN khach_hang kh ON pgg.khach_hang_id = kh.id \n" +
            "WHERE kh.id NOT IN (\n" +
            "    SELECT khnew.id\n" +
            "    FROM phieu_giam_gia_kh pgg\n" +
            "    INNER JOIN khach_hang khnew ON pgg.khach_hang_id = khnew.id\n" +
            "    WHERE pgg.phieu_giam_gia_id = :id\n" +
            ");",nativeQuery = true)
    List<PhieuGiamGiaKhachHang> getAllPhieuKhongCo(@Param("id") Integer id);
}
