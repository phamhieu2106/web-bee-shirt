package com.datn.backend.repository;

import com.datn.backend.dto.response.DotGiamGiaReponse;
import com.datn.backend.model.dot_giam_gia.DotGiamGia;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface DotGiamGiaRepository extends JpaRepository<DotGiamGia,Integer> {

    boolean existsByTenDotGiamGia(String tenDotGiamGia);

    boolean existsByMaDotGiamGia(String maDotGiamGia);

    @Query(value = "SELECT dgg.ma_dot_giam_gia as MaDotGiamGia, dgg.ten_dot_giam_gia as TenDotGiamGia,\n" +
            "dgg.gia_tri_phan_tram as GiaTriPhanTram, dggsp.thoi_gian_bat_dau as NgayBatDau, dggsp.thoi_gian_ket_thuc as NgayKetThuc,\n" +
            "COUNT(dggsp.id) as SoLuongSanPham, dgg.trang_thai as TrangThai\n" +
            "FROM dot_giam_gia dgg\n" +
            "JOIN dot_giam_gia_san_pham dggsp ON dggsp.dot_giam_gia_id = dgg.id\n" +
            "WHERE dgg.trang_thai = 1\n" +
            "GROUP BY dgg.ma_dot_giam_gia, dgg.ten_dot_giam_gia, dgg.gia_tri_phan_tram, dggsp.thoi_gian_bat_dau, dggsp.thoi_gian_ket_thuc, dgg.trang_thai",nativeQuery = true)
    List<DotGiamGiaReponse> getAll();

    @Query(value = "SELECT dgg.ma_dot_giam_gia as MaDotGiamGia, dgg.ten_dot_giam_gia as TenDotGiamGia,\n" +
            "dgg.gia_tri_phan_tram as GiaTriPhanTram, dggsp.thoi_gian_bat_dau as NgayBatDau, dggsp.thoi_gian_ket_thuc as NgayKetThuc,\n" +
            "COUNT(dggsp.id) as SoLuongSanPham, dgg.trang_thai as TrangThai\n" +
            "FROM dot_giam_gia dgg\n" +
            "JOIN dot_giam_gia_san_pham dggsp ON dggsp.dot_giam_gia_id = dgg.id\n" +
            "WHERE dgg.trang_thai = 1" +
            "AND dgg.ma_dot_giam_gia LIKE %:search% " +
            "OR dgg.ten_dot_giam_gia LIKE %:search% \n" +
            "OR dgg.gia_tri_phan_tram = :search \n" +
            "GROUP BY dgg.ma_dot_giam_gia, dgg.ten_dot_giam_gia, dgg.gia_tri_phan_tram, dggsp.thoi_gian_bat_dau, dggsp.thoi_gian_ket_thuc, dgg.trang_thai"
            ,nativeQuery = true)
    List<DotGiamGiaReponse> getPagination(Pageable pageable, @Param("search")String search);

    @Query(value = "SELECT dgg.ma_dot_giam_gia as MaDotGiamGia, dgg.ten_dot_giam_gia as TenDotGiamGia,\n" +
            "dgg.gia_tri_phan_tram as GiaTriPhanTram, dggsp.thoi_gian_bat_dau as NgayBatDau, dggsp.thoi_gian_ket_thuc as NgayKetThuc,\n" +
            "COUNT(dggsp.id) as SoLuongSanPham, dgg.trang_thai as TrangThai\n" +
            "FROM dot_giam_gia dgg\n" +
            "JOIN dot_giam_gia_san_pham dggsp ON dggsp.dot_giam_gia_id = dgg.id\n" +
            "WHERE dgg.id = :id and dgg.trang_thai = 1\n" +
            "GROUP BY dgg.ma_dot_giam_gia, dgg.ten_dot_giam_gia, dgg.gia_tri_phan_tram, dggsp.thoi_gian_bat_dau, dggsp.thoi_gian_ket_thuc, dgg.trang_thai",nativeQuery = true)
    DotGiamGiaReponse getOneById(@Param("id")Integer id);


}
