package com.datn.backend.repository;


import com.datn.backend.model.san_pham.SanPham;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;

public interface SanPhamRepository extends JpaRepository<SanPham, Integer> {

    boolean existsByTen(String ten);

    boolean existsByMa(String ma);

    SanPham getByTen(String ten);

    SanPham getByMa(String ma);

    @Query(value =
            """
            SELECT *
            FROM san_pham s
            WHERE s.trang_thai IN (:status)
            AND (s.ten LIKE %:search% OR s.ma LIKE %:search%)
            ORDER BY s.created_at DESC
            """, nativeQuery = true)
    Page<SanPham> getByPage(Pageable pageable,
                            @Param("search") String search,
                            @Param("status") List<Integer> status);

    @Query(value = """
                   SELECT DISTINCT sp.id, sp.ma, sp.ten, sp.trang_thai, sp.mo_ta, sp.created_at, sp.created_by, sp.updated_at, sp.last_updated_by
                   FROM san_pham sp
                   JOIN san_pham_chi_tiet ct ON sp.id = ct.san_pham_id
                   WHERE (sp.ten like %:search% or sp.ma like %:search%) and sp.trang_thai = 1
                   """, nativeQuery = true)
    Page<SanPham> getByPageClient(Pageable pageable,String search);

    @Query(value = """
            SELECT DISTINCT sp.id
            FROM san_pham sp
            JOIN san_pham_chi_tiet spct ON sp.id = spct.san_pham_id
            WHERE (
            	spct.mau_sac_id IN (:colorIds)
                OR spct.kich_co_id IN (:sizeIds)
                OR spct.kieu_dang_id IN (:formIds)
                OR spct.thiet_ke_id IN (:designIds)
                OR spct.co_ao_id IN (:collarIds)
                OR spct.tay_ao_id IN (:sleeveIds)
                OR spct.chat_lieu_id IN (:materialIds)
            )
            AND spct.gia_ban >= :minPrice
            AND spct.gia_ban <= :maxPrice
            ORDER BY sp.id DESC
            """, nativeQuery = true)
    Page<Integer> getByFilterForClient(Pageable pageable,
                                       @Param("colorIds") List<Integer> colorIds,
                                       @Param("sizeIds") List<Integer> sizeIds,
                                       @Param("formIds") List<Integer> formIds,
                                       @Param("designIds") List<Integer> designIds,
                                       @Param("collarIds") List<Integer> collarIds,
                                       @Param("sleeveIds") List<Integer> sleeveIds,
                                       @Param("materialIds") List<Integer> materialIds,
                                       @Param("minPrice") BigDecimal minPrice,
                                       @Param("maxPrice") BigDecimal maxPrice);

    @Query(value = """
            SELECT *
            FROM san_pham sp
            WHERE sp.id IN (:ids)
            """, nativeQuery = true)
    List<SanPham> getProductsByIds(@Param("ids") List<Integer> ids);

    @Query(value = """
            SELECT sp.id, sp.ma, sp.ten, sp.trang_thai, sp.mo_ta, sp.created_at, sp.created_by, sp.updated_at, sp.last_updated_by
            FROM san_pham_chi_tiet ct
            JOIN san_pham sp ON sp.id = ct.san_pham_id
            WHERE ct.id = :id
            """, nativeQuery = true)
    SanPham getProductByProductDetailsId(@Param("id") int id);


    @Query(value = "SELECT sp FROM SanPham sp ORDER BY sp.createdAt DESC ")
    List<SanPham> findAllOrderByCreatedAt();
}
