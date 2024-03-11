package com.datn.backend.repository;

import com.datn.backend.model.san_pham.SanPhamChiTiet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;

public interface SanPhamChiTietRepository extends JpaRepository<SanPhamChiTiet, Integer> {

    @Query(value =
            """
            SELECT *
            FROM san_pham_chi_tiet spct
            WHERE spct.san_pham_id = :spId
            ORDER BY spct.created_at DESC
            """, nativeQuery = true)
    Page<SanPhamChiTiet> getByPage(Pageable pageable,
                                   @Param("spId") int spId);

    @Query(value = """
                   :sql
                   """, nativeQuery = true)
    Page<SanPhamChiTiet> filterByPage(Pageable pageable, @Param("sql") String sql);

    @Query("""
            select spct from SanPhamChiTiet spct
            where spct.sanPham.ma like %:search% or 
            spct.sanPham.ten like %:search% or 
            spct.kieuDang.ten like %:search% or 
            spct.thietKe.ten like %:search% or 
            spct.tayAo.ten like %:search% or 
            spct.coAo.ten like %:search% or 
            spct.chatLieu.ten like %:search%
            """)
    Page<SanPhamChiTiet> getAllBySearch(String search, Pageable pageable);

    @Query(value = """
                   SELECT MIN(ct.gia_ban)
                   FROM san_pham_chi_tiet ct
                   WHERE ct.san_pham_id = :productId
                   """, nativeQuery = true)
    BigDecimal getMinPrice(@Param("productId") int productId);

    @Query(value = """
                   SELECT MAX(ct.gia_ban)
                   FROM san_pham_chi_tiet ct
                   WHERE ct.san_pham_id = :productId
                   """, nativeQuery = true)
    BigDecimal getMaxPrice(@Param("productId") int productId);

    SanPhamChiTiet findBySanPhamIdAndMauSacIdAndKichCoId(int sanPhamId, int mauSacId, int kichCoId);

    boolean existsByKieuDangIdAndSanPhamId(int kieuDangId, int sanPhamId);

    boolean existsByThietKeIdAndSanPhamId(int thietKeId, int sanPhamId);

    boolean existsByTayAoIdAndSanPhamId(int tayAoId, int sanPhamId);

    boolean existsByCoAoIdAndSanPhamId(int coAoId, int sanPhamId);

    boolean existsByChatLieuIdAndSanPhamId(int chatLieuId, int sanPhamId);

    int countBySanPhamId(int sanPhamId);

    List<SanPhamChiTiet> findBySanPhamId(int sanPhamId);

    SanPhamChiTiet findFirstBySanPhamIdAndMauSacId(int sanPhamId, int mauSacId);
}
