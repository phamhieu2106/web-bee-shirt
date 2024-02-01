package com.datn.backend.repository;

import com.datn.backend.dto.response.PhieuGiamGiaResponse;
import com.datn.backend.model.phieu_giam_gia.PhieuGiamGia;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PhieuGiamGiaRepository extends JpaRepository<PhieuGiamGia, Integer> {

    @Query(value = "select pgg.id  as id,  pgg.ma_phieu_giam_gia as MaPhieuGiamGia," +
            " pgg.ten_phieu_giam_gia  as TenPhieuGiamGia ," +
            "pgg.kieu as Kieu," +
            "pgg.gia_tri as GiaTri," +
            "pgg.gia_tri_max as GiaTriMax," +
            "pgg.dieu_kien_giam as DieuKienGiam," +
            "pgg.so_luong as SoLuong," +
            "pgg.thoi_gian_bat_dau as ThoiGianBatDau," +
            "pgg.thoi_gian_ket_thuc as ThoiGianKetThuc," +
            "pgg.trang_thai as TrangThai from phieu_giam_gia pgg where pgg.id=:id"
            , nativeQuery = true)
    PhieuGiamGiaResponse getOneById(@Param("id") Integer id);

    @Query(value = "select * from phieu_giam_gia pgg " +
            "where  pgg.ten_phieu_giam_gia LIKE %:search%  ORDER BY pgg.created_at DESC"
            , nativeQuery = true)
    Page<PhieuGiamGia> getPagination(Pageable pageable, @Param("search") String search);

}
