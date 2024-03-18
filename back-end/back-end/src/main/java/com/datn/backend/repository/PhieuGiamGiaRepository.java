package com.datn.backend.repository;

import com.datn.backend.dto.response.PhieuGiamGiaResponse;
import com.datn.backend.model.phieu_giam_gia.PhieuGiamGia;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface PhieuGiamGiaRepository extends JpaRepository<PhieuGiamGia, Integer> {

    boolean existsByMaPhieuGiamGia(String maPhieu);


    @Query(value = "select pgg.id  as id,  pgg.ma_phieu_giam_gia as MaPhieuGiamGia," +
            " pgg.ten_phieu_giam_gia  as TenPhieuGiamGia ," +
            "pgg.kieu as Kieu," +
            "pgg.loai as Loai," +
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
            "where  (pgg.ten_phieu_giam_gia LIKE :search% OR pgg.ma_phieu_giam_gia LIKE :search%)  " +
            "AND pgg.kieu IN (:kieu) " +
            "AND pgg.loai IN (:loai) " +
            "AND pgg.trang_thai IN (:trangThai) " +
            "ORDER BY pgg.created_at DESC",
            nativeQuery = true)
    Page<PhieuGiamGia> getPagination(Pageable pageable, @Param("search") String search,
                                     @Param("kieu")List<Integer> kieu,
                                     @Param("loai")List<Integer> loai,
                                     @Param("trangThai")List<String> trangThai);

    @Query(value = "select * from phieu_giam_gia pgg " +
            "where  (pgg.ten_phieu_giam_gia LIKE :search% OR pgg.ma_phieu_giam_gia LIKE :search%)  " +
            "AND pgg.kieu IN (:kieu) " +
            "AND pgg.loai IN (:loai) " +
            "AND pgg.trang_thai IN (:trangThai) " +
            "AND ( pgg.thoi_gian_bat_dau >= :thoiGianBatDau) " +
            "AND ( pgg.thoi_gian_ket_thuc <= :thoiGianKetThuc) " +
            "ORDER BY pgg.created_at DESC",
            nativeQuery = true)
    Page<PhieuGiamGia> getFilter(Pageable pageable, @Param("search") String search,
                                     @Param("kieu")List<Integer> kieu,
                                     @Param("loai")List<Integer> loai,
                                     @Param("trangThai")List<String> trangThai,
                                     @Param("thoiGianBatDau") String thoiGianBatDau,
                                     @Param("thoiGianKetThuc") String thoiGianKetThuc);
    @Query("""
            select pgg from PhieuGiamGia pgg
            where 
            (current_timestamp() between pgg.thoiGianBatDau and pgg.thoiGianKetThuc)and
             :giaTriDonHang >= pgg.dieuKienGiam and
             pgg.loai = 1 and 
             pgg.soLuong > 0
            """)
    List<PhieuGiamGia> getDiscountValidNotCustomer(BigDecimal giaTriDonHang);

    @Query("""
            select pgg from PhieuGiamGia pgg
            join PhieuGiamGiaKhachHang pggkh on pgg.id = pggkh.phieuGiamGia.id
            where (current_timestamp() between pgg.thoiGianBatDau and pgg.thoiGianKetThuc)
            and pgg.soLuong >0 
            and :giaTriDonHang >= pgg.dieuKienGiam
            and pgg.loai = 0
            and pggkh.khachHang.id = :khachHangId
            """)
    List<PhieuGiamGia> getDiscountValidByCustomer(BigDecimal giaTriDonHang,Integer khachHangId);

    @Query("""
            select pgg from PhieuGiamGia pgg
            where 
            (current_timestamp() between pgg.thoiGianBatDau and pgg.thoiGianKetThuc)and
             pgg.dieuKienGiam > :giaTriDonHang and
             pgg.loai = 1 and 
             pgg.soLuong > 0
             order by pgg.dieuKienGiam asc 
            """)
    List<PhieuGiamGia> getDiscountSuggestNotCustomer(BigDecimal giaTriDonHang);

    @Query("""
            select pgg from PhieuGiamGia pgg
            join PhieuGiamGiaKhachHang pggkh on pgg.id = pggkh.phieuGiamGia.id
            where (current_timestamp() between pgg.thoiGianBatDau and pgg.thoiGianKetThuc)
            and pgg.soLuong >0 
            and pgg.dieuKienGiam > :giaTriDonHang 
            and pgg.loai = 0
            and pggkh.khachHang.id = :khachHangId
            order by pgg.dieuKienGiam asc 
            """)
    List<PhieuGiamGia> getDiscountSuggestByCustomer(BigDecimal giaTriDonHang,Integer khachHangId);

}
