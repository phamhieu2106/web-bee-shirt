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

        boolean existsByTenPhieuGiamGia(String tenPhieu);

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
                        "pgg.trang_thai as TrangThai from phieu_giam_gia pgg where pgg.id=:id", nativeQuery = true)
        PhieuGiamGiaResponse getOneById(@Param("id") Integer id);

        @Query(value = "select * from phieu_giam_gia pgg " +
                        "where  (pgg.ten_phieu_giam_gia LIKE %:search% OR pgg.ma_phieu_giam_gia LIKE %:search%)  " +
                        "AND pgg.kieu IN (:kieu) " +
                        "AND pgg.loai IN (:loai) " +
                        "AND pgg.trang_thai IN (:trangThai) " +
                        "ORDER BY pgg.created_at DESC", nativeQuery = true)
        Page<PhieuGiamGia> getPagination(Pageable pageable, @Param("search") String search,
                        @Param("kieu") List<Integer> kieu,
                        @Param("loai") List<Integer> loai,
                        @Param("trangThai") List<String> trangThai);

        @Query(value = "select * from phieu_giam_gia pgg " +
                        "where  (pgg.ten_phieu_giam_gia LIKE %:search% OR pgg.ma_phieu_giam_gia LIKE %:search%)  " +
                        "AND pgg.kieu IN (:kieu) " +
                        "AND pgg.loai IN (:loai) " +
                        "AND pgg.trang_thai IN (:trangThai) " +
                        "AND ( pgg.thoi_gian_bat_dau >= :thoiGianBatDau) " +
                        "AND ( pgg.thoi_gian_ket_thuc <= :thoiGianKetThuc) " +
                        "ORDER BY pgg.created_at DESC", nativeQuery = true)
        Page<PhieuGiamGia> getFilter(Pageable pageable, @Param("search") String search,
                        @Param("kieu") List<Integer> kieu,
                        @Param("loai") List<Integer> loai,
                        @Param("trangThai") List<String> trangThai,
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
        List<PhieuGiamGia> getDiscountValidByCustomer(BigDecimal giaTriDonHang, Integer khachHangId);

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
        List<PhieuGiamGia> getDiscountSuggestByCustomer(BigDecimal giaTriDonHang, Integer khachHangId);

        // use for client
        @Query(value = """
                        SELECT pgg.id, pgg.ma_phieu_giam_gia, pgg.ten_phieu_giam_gia, pgg.kieu, pgg.loai, pgg.gia_tri,
                               pgg.gia_tri_max, pgg.dieu_kien_giam, pgg.so_luong, pgg.thoi_gian_bat_dau, pgg.thoi_gian_ket_thuc, pgg.trang_thai,
                               pgg.created_at, pgg.created_by, pgg.updated_at, pgg.last_updated_by
                        FROM phieu_giam_gia pgg
                        LEFT JOIN phieu_giam_gia_kh pgg_kh ON pgg.id = pgg_kh.phieu_giam_gia_id
                        WHERE pgg.dieu_kien_giam <= :priceCondition
                        AND (pgg_kh.khach_hang_id IS NULL OR pgg_kh.khach_hang_id = :customerId)
                        AND (CURRENT_TIMESTAMP() BETWEEN pgg.thoi_gian_bat_dau AND pgg.thoi_gian_ket_thuc)
                        AND pgg.so_luong > 0
                        AND (pgg_kh.is_used = 0 OR pgg_kh.is_used IS NULL)
                        """, nativeQuery = true)
        List<PhieuGiamGia> getDiscountsForCheckOut(@Param("priceCondition") BigDecimal priceCondition,
                        @Param("customerId") int customerId);

        @Query(value = """
                        SELECT t2.is_used
                        FROM phieu_giam_gia t1
                        JOIN phieu_giam_gia_kh t2 ON t1.id = t2.phieu_giam_gia_id
                        WHERE t1.id = :discountId
                        AND t2.khach_hang_id = :customerId
                        """, nativeQuery = true)
        boolean checkPrivateDiscountUsedOrNot(@Param("discountId") int discountId,
                        @Param("customerId") int customerId);

        @Query("""
                        select CASE WHEN COUNT(hd) > 0 THEN true ELSE false END
                        from HoaDon hd
                        where hd.phieuGiamGia.id = :discountId
                        and hd.khachHang.id = :customerId
                        """)
        Boolean isDiscountUsedByCustomerId(Integer discountId, Integer customerId);

        @Query(value = """
                        SELECT pgg.id, pgg.ma_phieu_giam_gia, pgg.ten_phieu_giam_gia, pgg.kieu, pgg.loai, pgg.gia_tri,
                               pgg.gia_tri_max, pgg.dieu_kien_giam, pgg.so_luong, pgg.thoi_gian_bat_dau, pgg.thoi_gian_ket_thuc, pgg.trang_thai,
                               pgg.created_at, pgg.created_by, pgg.updated_at, pgg.last_updated_by
                        FROM phieu_giam_gia pgg
                        LEFT JOIN phieu_giam_gia_kh pgg_kh ON pgg.id = pgg_kh.phieu_giam_gia_id
                        AND (pgg_kh.khach_hang_id IS NULL OR pgg_kh.khach_hang_id = :custId)
                        AND (CURRENT_TIMESTAMP() BETWEEN pgg.thoi_gian_bat_dau AND pgg.thoi_gian_ket_thuc)
                        AND pgg.so_luong > 0
                        AND (pgg_kh.is_used = 0 OR pgg_kh.is_used IS NULL)
                        """, nativeQuery = true)
        List<PhieuGiamGia> getAllDiscountsOf1Cust(@Param("custId") int custId);

        List<PhieuGiamGia> findAllBySoLuongGreaterThanAndTrangThaiIs(int soLuong, String trangThai);
}
