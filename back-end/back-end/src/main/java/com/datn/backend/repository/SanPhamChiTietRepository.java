package com.datn.backend.repository;

import com.datn.backend.model.san_pham.HinhAnh;
import com.datn.backend.model.san_pham.SanPhamChiTiet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

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

    @Query("""
            select spct from SanPhamChiTiet spct
            where (spct.sanPham.ma like %:search% or 
            spct.sanPham.ten like %:search% or 
            spct.kieuDang.ten like %:search% or 
            spct.thietKe.ten like %:search% or 
            spct.tayAo.ten like %:search% or 
            spct.coAo.ten like %:search% or 
            spct.chatLieu.ten like %:search% ) and
            (spct.trangThai = true and spct.soLuongTon > 0 )
            """)
    Page<SanPhamChiTiet> getAllBySearch(String search, Pageable pageable);

    @Query(value = """
            SELECT MIN(ct.gia_ban)
            FROM san_pham_chi_tiet ct
            WHERE ct.san_pham_id = :productId
            """, nativeQuery = true)
    BigDecimal getMinPriceOf1Product(@Param("productId") int productId);

    @Query(value = """
            SELECT MAX(ct.gia_ban)
            FROM san_pham_chi_tiet ct
            WHERE ct.san_pham_id = :productId
            """, nativeQuery = true)
    BigDecimal getMaxPriceOf1Product(@Param("productId") int productId);

    @Query(value = """
            SELECT MIN(ct.gia_ban)
            FROM san_pham_chi_tiet ct
            """, nativeQuery = true)
    BigDecimal getMinPrice();

    @Query(value = """
            SELECT MAX(ct.gia_ban)
            FROM san_pham_chi_tiet ct
            """, nativeQuery = true)
    BigDecimal getMaxPrice();

    @Query(value = """
            UPDATE san_pham_chi_tiet ct
            SET ct.trang_thai = :value
            WHERE ct.san_pham_id = :sanPhamId
            """, nativeQuery = true)
    @Modifying
    void updateStatusAllBySpId(@Param("sanPhamId") int sanPhamId,
                               @Param("value") boolean value);

    SanPhamChiTiet findBySanPhamIdAndMauSacIdAndKichCoId(int sanPhamId, int mauSacId, int kichCoId);

    boolean existsByKieuDangIdAndSanPhamId(int kieuDangId, int sanPhamId);

    boolean existsByThietKeIdAndSanPhamId(int thietKeId, int sanPhamId);

    boolean existsByTayAoIdAndSanPhamId(int tayAoId, int sanPhamId);

    boolean existsByCoAoIdAndSanPhamId(int coAoId, int sanPhamId);

    boolean existsByChatLieuIdAndSanPhamId(int chatLieuId, int sanPhamId);

    int countBySanPhamId(int sanPhamId);

    List<SanPhamChiTiet> findBySanPhamId(int sanPhamId);

    SanPhamChiTiet findFirstBySanPhamIdAndMauSacId(int sanPhamId, int mauSacId);

    SanPhamChiTiet findFirstBySanPhamId(int spId);

    List<SanPhamChiTiet> findBySanPhamIdAndMauSacId(int sanPhamId, int mauSacId);

    @Query(value = """
            SELECT ct.so_luong_ton
            FROM san_pham_chi_tiet ct
            WHERE ct.san_pham_id = :productId
            AND ct.mau_sac_id = :colorId
            AND ct.kich_co_id = :sizeId
            """, nativeQuery = true)
    Integer getQuantityOfOne(@Param("productId") int productId,
                             @Param("colorId") int colorId,
                             @Param("sizeId") int sizeId);

    @Query(value = """
            SELECT ct.gia_ban
            FROM san_pham_chi_tiet ct
            WHERE ct.san_pham_id = :productId
            AND ct.mau_sac_id = :colorId
            AND ct.kich_co_id = :sizeId
            """, nativeQuery = true)
    BigDecimal getPriceOfOne(@Param("productId") int productId,
                             @Param("colorId") int colorId,
                             @Param("sizeId") int sizeId);

    @Query(value = """
            SELECT sp.ten
            FROM san_pham_chi_tiet ct
            JOIN san_pham sp ON ct.san_pham_id = sp.id
            WHERE ct.id = :productDetailsId
            """, nativeQuery = true)
    String getProductNameByProductDetails(@Param("productDetailsId") int productDetailsId);

    @Query(value = """
            UPDATE san_pham_chi_tiet
            SET kieu_dang_id = :kieuDangId,
                thiet_ke_id = :thietKeId,
            	co_ao_id = :coAoId,
            	tay_ao_id = :tayAoId,
            	chat_lieu_id = :chatLieuId
            WHERE san_pham_id = :sanPhamId
            """, nativeQuery = true)
    @Modifying
    void updateCommonProperties(@Param("sanPhamId") int sanPhamId,
                                @Param("kieuDangId") int kieuDangId,
                                @Param("thietKeId") int thietKeId,
                                @Param("coAoId") int coAoId,
                                @Param("tayAoId") int tayAoId,
                                @Param("chatLieuId") int chatLieuId);



    @Query("""
            select spct from SanPhamChiTiet spct
            where (spct.sanPham.ten like %:search% or spct.sanPham.ma like %:search%) and
            spct.mauSac.ten like %:mauSac% and
            (spct.giaBan between :giaMin and :giaMax) and
            spct.kichCo.ten like %:kichCo% and
            spct.kieuDang.ten like %:kieuDang% and
            spct.thietKe.ten like %:thietKe% and
            spct.tayAo.ten like %:tayAo% and
            spct.coAo.ten like %:coAo% and
            spct.chatLieu.ten like %:chatLieu% and 
            spct.trangThai = true
            """)
    Page<SanPhamChiTiet> findDetailAll(Pageable pageable, String search, String mauSac, String kichCo, String kieuDang, String thietKe, String tayAo, String coAo, String chatLieu,BigDecimal giaMin,BigDecimal giaMax);

    @Query("select min(spct.giaBan),max(spct.giaBan)from SanPhamChiTiet spct")
    long[][] getMixMaxPrice();

    Optional<SanPhamChiTiet> findByIdAndTrangThai(Integer id,boolean trangThai);
}
