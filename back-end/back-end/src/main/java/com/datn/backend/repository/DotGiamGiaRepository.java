package com.datn.backend.repository;

import com.datn.backend.dto.response.DotGiamGiaResponse;
import com.datn.backend.dto.response.SanPhamChiTietResponse;
import com.datn.backend.model.dot_giam_gia.DotGiamGia;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DotGiamGiaRepository extends JpaRepository<DotGiamGia, Integer> {

    boolean existsByTenDotGiamGiaAndTrangThai(String tenDotGiamGia, Integer trangThai);

    DotGiamGia getDotGiamGiaByMaDotGiamGia(String maDotGiamGia);

    @Query(value = """
            SELECT dgg.id as Id ,dgg.ma_dot_giam_gia as MaDotGiamGia, dgg.ten_dot_giam_gia as TenDotGiamGia,
                                    dgg.gia_tri_phan_tram as GiaTriPhanTram, dggsp.thoi_gian_bat_dau as ThoiGianBatDau, dggsp.thoi_gian_ket_thuc as ThoiGianKetThuc,
                                    COUNT(dggsp.id) as SoLuongSanPham, dgg.trang_thai as TrangThai
                                    FROM dot_giam_gia dgg
                                    JOIN dot_giam_gia_san_pham dggsp ON dggsp.dot_giam_gia_id = dgg.id
                                    AND dgg.trang_thai < 3
                                    AND (dgg.ma_dot_giam_gia LIKE %:search%
            							OR dgg.ten_dot_giam_gia LIKE %:search%
                                        OR dgg.gia_tri_phan_tram LIKE %:search%)
                                    GROUP BY dgg.id, dgg.ma_dot_giam_gia, dgg.ten_dot_giam_gia, dgg.gia_tri_phan_tram, dggsp.thoi_gian_bat_dau, dggsp.thoi_gian_ket_thuc, dgg.trang_thai
                                    ORDER BY CASE WHEN dgg.trang_thai = 1 THEN 0 WHEN dgg.trang_thai = 2 THEN 1 ELSE 2 END,dgg.id DESC
                        """
            , nativeQuery = true)
    Page<DotGiamGiaResponse> getPagination(Pageable pageable,
                                           @Param("search") String search);

    @Query(value = """
            SELECT dgg.id as Id, dgg.ma_dot_giam_gia as MaDotGiamGia, dgg.ten_dot_giam_gia as TenDotGiamGia,
              dgg.gia_tri_phan_tram as GiaTriPhanTram, dggsp.thoi_gian_bat_dau as ThoiGianBatDau,
              dggsp.thoi_gian_ket_thuc as ThoiGianKetThuc, COUNT(dggsp.id) as SoLuongSanPham, dgg.trang_thai as TrangThai
            FROM dot_giam_gia dgg
            JOIN dot_giam_gia_san_pham dggsp ON dggsp.dot_giam_gia_id = dgg.id
            WHERE dggsp.thoi_gian_bat_dau >= :startDate AND dggsp.thoi_gian_ket_thuc <= :endDate
            AND dgg.trang_thai < 3
            AND (dgg.ma_dot_giam_gia LIKE %:search%
            							OR dgg.ten_dot_giam_gia LIKE %:search%
                                        OR dgg.gia_tri_phan_tram LIKE %:search%)
            GROUP BY dgg.id, dgg.ma_dot_giam_gia, dgg.ten_dot_giam_gia, dgg.gia_tri_phan_tram, dggsp.thoi_gian_bat_dau, dggsp.thoi_gian_ket_thuc, dgg.trang_thai
            ORDER BY CASE WHEN dgg.trang_thai = 1 THEN 0 WHEN dgg.trang_thai = 2 THEN 1 ELSE 2 END,dgg.id DESC
                        """
            , nativeQuery = true)
    Page<DotGiamGiaResponse> getStatusAll(Pageable pageable,
                                          @Param("startDate") String startDate,
                                          @Param("endDate") String endDate,
                                          @Param("search") String search);

    @Query(value = """

            SELECT dgg.id as Id, dgg.ma_dot_giam_gia as MaDotGiamGia, dgg.ten_dot_giam_gia as TenDotGiamGia,
              dgg.gia_tri_phan_tram as GiaTriPhanTram, dggsp.thoi_gian_bat_dau as ThoiGianBatDau,
              dggsp.thoi_gian_ket_thuc as ThoiGianKetThuc, COUNT(dggsp.id) as SoLuongSanPham, dgg.trang_thai as TrangThai
            FROM dot_giam_gia dgg
            JOIN dot_giam_gia_san_pham dggsp ON dggsp.dot_giam_gia_id = dgg.id
            WHERE dgg.trang_thai = :status 
            AND (dgg.ma_dot_giam_gia LIKE %:search%
            							OR dgg.ten_dot_giam_gia LIKE %:search%
                                        OR dgg.gia_tri_phan_tram LIKE %:search%)
             AND (dggsp.thoi_gian_bat_dau >= :startDate AND dggsp.thoi_gian_ket_thuc <= :endDate )
            GROUP BY dgg.id, dgg.ma_dot_giam_gia, dgg.ten_dot_giam_gia, dgg.gia_tri_phan_tram, dggsp.thoi_gian_bat_dau, dggsp.thoi_gian_ket_thuc, dgg.trang_thai
            ORDER BY CASE WHEN dgg.trang_thai = 1 THEN 0 WHEN dgg.trang_thai = 2 THEN 1 ELSE 2 END,dgg.id DESC
                        """,
            nativeQuery = true)
    Page<DotGiamGiaResponse> getStatusWithDate(Pageable pageable,
                                               @Param("status") Integer status,
                                               @Param("startDate") String startDate,
                                               @Param("endDate") String endDate,
                                               @Param("search") String search);

    @Query(value = """
            SELECT\s
                dgg.id AS Id,
                dgg.ma_dot_giam_gia AS MaDotGiamGia,
                dgg.ten_dot_giam_gia AS TenDotGiamGia,
                dgg.gia_tri_phan_tram AS GiaTriPhanTram,
                dggsp.thoi_gian_bat_dau AS ThoiGianBatDau,
                dggsp.thoi_gian_ket_thuc AS ThoiGianKetThuc,
                dgg.created_at as NgayTao,
                dgg.updated_at as NgayCapNhat,
                dgg.created_by as NguoiTao,
                dgg.last_updated_by as NguoiCapNhatGanNhat,
                dgg.trang_thai AS TrangThai
            FROM dot_giam_gia dgg
            JOIN dot_giam_gia_san_pham dggsp ON dggsp.dot_giam_gia_id = dgg.id
            JOIN san_pham_chi_tiet spct ON spct.id = dggsp.san_pham_chi_tiet_id
            JOIN san_pham sp ON sp.id = spct.san_pham_id
            WHERE dgg.id = :id
            GROUP BY dgg.id, dgg.ma_dot_giam_gia, dgg.ten_dot_giam_gia, dgg.gia_tri_phan_tram, dggsp.thoi_gian_bat_dau, dggsp.thoi_gian_ket_thuc, dgg.trang_thai
            """
            , nativeQuery = true)
    DotGiamGiaResponse getOneById(@Param("id") Integer id);


    @Query(value = """
                SELECT spct.id as Id, ha.image_url as HinhAnhSanPham, sp.ma as MaSanPham ,sp.ten as TenSanPham, spct.gia_ban as GiaBan, spct.so_luong_ton as SoLuongTon, spct.trang_thai as TrangThai,
                													cl.ten as TenChatLieu, ca.ten as TenCoAo, kc.ten as TenKichCo, kd.ten as TenKieuDang , ms.ma as MaMauSac, ta.Ten as TenTayAo,
                													tk.ten as TenThietKe
                													FROM san_pham_chi_tiet spct
                													LEFT JOIN chat_lieu cl ON cl.id = spct.chat_lieu_id
                													LEFT JOIN co_ao ca ON ca.id = spct.co_ao_id
                													LEFT JOIN kich_co kc ON kc.id = spct.kich_co_id
                													LEFT JOIN kieu_dang kd ON kd.id = spct.kieu_dang_id
                													LEFT JOIN mau_sac ms ON ms.id = spct.mau_sac_id
                													LEFT JOIN san_pham sp ON sp.id = spct.san_pham_id
                													LEFT JOIN tay_ao ta ON ta.id = spct.tay_ao_id
                													LEFT JOIN kieu_thiet_ke tk ON tk.id = spct.thiet_ke_id
                													LEFT JOIN spct_hinhanh spctha ON spctha.spct_id = spct.id
                													LEFT JOIN hinh_anh ha ON ha.id = spctha.hinhanh_id
                													LEFT JOIN dot_giam_gia_san_pham dggsp ON dggsp.san_pham_chi_tiet_id = spct_id
                													LEFT JOIN dot_giam_gia dgg ON dgg.id = dggsp.dot_giam_gia_id
                													WHERE sp.id IN ( :id )
                													AND spct.so_luong_ton > 0 AND spct.trang_thai = 1
                													AND sp.trang_thai = 1
                                                                    AND NOT EXISTS (SELECT 1
                                                    							FROM dot_giam_gia_san_pham dggsp
                                                                                LEFT JOIN dot_giam_gia dgg ON dgg.id = dggsp.dot_giam_gia_id
                                                    							WHERE dggsp.san_pham_chi_tiet_id = spct.id
                                                                                AND spct.san_pham_id IN ( :id )
                                                                                AND dgg.id != :idDotGiamGia AND dgg.trang_thai != 0)
            """, nativeQuery = true)
    Page<SanPhamChiTietResponse> getAllSanPhamChiTietBySanPhamIdForUpdate(Pageable pageable,
                                                                          @Param("id") List<Integer> id,
                                                                          @Param("idDotGiamGia") Integer idDotGiamGia);


    @Query(value = """
            SELECT spct.id as Id, ha.image_url as HinhAnhSanPham, sp.ma as MaSanPham ,sp.ten as TenSanPham, spct.gia_ban as GiaBan, spct.so_luong_ton as SoLuongTon, spct.trang_thai as TrangThai,
                                                cl.ten as TenChatLieu, ca.ten as TenCoAo, kc.ten as TenKichCo, kd.ten as TenKieuDang , ms.ma as MaMauSac, ta.Ten as TenTayAo,
                                                tk.ten as TenThietKe
                                                FROM san_pham_chi_tiet spct
                                                LEFT JOIN chat_lieu cl ON cl.id = spct.chat_lieu_id
                                                LEFT JOIN co_ao ca ON ca.id = spct.co_ao_id
                                                LEFT JOIN kich_co kc ON kc.id = spct.kich_co_id
                                                LEFT JOIN kieu_dang kd ON kd.id = spct.kieu_dang_id
                                                LEFT JOIN mau_sac ms ON ms.id = spct.mau_sac_id
                                                LEFT JOIN san_pham sp ON sp.id = spct.san_pham_id
                                                LEFT JOIN tay_ao ta ON ta.id = spct.tay_ao_id
                                                LEFT JOIN kieu_thiet_ke tk ON tk.id = spct.thiet_ke_id
                                                LEFT JOIN spct_hinhanh spctha ON spctha.spct_id = spct.id
                                                LEFT JOIN hinh_anh ha ON ha.id = spctha.hinhanh_id
                                                WHERE sp.id IN ( :id )
                                                AND spct.so_luong_ton > 0 AND spct.trang_thai = 1
                                                AND sp.trang_thai = 1
                                                AND NOT EXISTS (SELECT 1
                                    							FROM dot_giam_gia_san_pham dggsp
                                    							LEFT JOIN dot_giam_gia dgg ON dgg.id = dggsp.dot_giam_gia_id
                                    							WHERE dggsp.san_pham_chi_tiet_id = spct.id
                                                                    AND spct.san_pham_id IN ( :id ) AND dgg.trang_thai != 0
                                        )
            """, nativeQuery = true)
    Page<SanPhamChiTietResponse> getAllSanPhamChiTietBySanPhamIdForAdd(Pageable pageable, @Param("id") List<Integer> id);


    @Query(value = """
                SELECT sp.id FROM san_pham sp
                JOIN san_pham_chi_tiet spct ON spct.san_pham_id = sp.id
                WHERE spct.id IN ( :ids )
                GROUP BY sp.id;
            """, nativeQuery = true)
    List<Integer> getIdSanPhamIdBySanPhamChiTietId(@Param("ids") List<Integer> ids);

    @Query(value = """
            SELECT san_pham_chi_tiet_id
                        FROM dot_giam_gia_san_pham
                        JOIN san_pham_chi_tiet ON san_pham_chi_tiet.id = dot_giam_gia_san_pham.san_pham_chi_tiet_id
                        JOIN dot_giam_gia ON dot_giam_gia.id = dot_giam_gia_san_pham.dot_giam_gia_id
                        WHERE dot_giam_gia.id = :id
            """, nativeQuery = true)
    List<Integer> getListIdSanPhamChiTiet(@Param("id") Integer id);

    @Query(value = """
            SELECT spct.id FROM san_pham_chi_tiet spct
            JOIN san_pham sp ON sp.id = spct.san_pham_id
            WHERE sp.id = :id
            """, nativeQuery = true)
    List<Integer> getListIdSanPhamChiTietByIdSanPham(@Param("id") Integer id);

    // client query
    @Query(value = """
            SELECT DISTINCT t4.id, t4.gia_tri_phan_tram, t4.ma_dot_giam_gia, t4.ten_dot_giam_gia, t4.trang_thai,
                            t4.created_at, t4.created_by, t4.updated_at, t4.last_updated_by
            FROM dot_giam_gia_san_pham t1
            JOIN san_pham_chi_tiet t2 ON t1.san_pham_chi_tiet_id = t2.id
            JOIN san_pham t3 ON t2.san_pham_id = t3.id
            JOIN dot_giam_gia t4 ON t1.dot_giam_gia_id = t4.id
            WHERE t3.id = :prodId
            AND CURRENT_TIMESTAMP() <= t1.thoi_gian_ket_thuc
            AND t4.trang_thai = 1
            """, nativeQuery = true)
    DotGiamGia getSaleEventByProd(@Param("prodId") int prodId);

    @Query(value = """
            SELECT DISTINCT t4.id, t4.gia_tri_phan_tram, t4.ma_dot_giam_gia, t4.ten_dot_giam_gia, t4.trang_thai,
                            t4.created_at, t4.created_by, t4.updated_at, t4.last_updated_by
            FROM dot_giam_gia_san_pham t1
            JOIN san_pham_chi_tiet t2 ON t1.san_pham_chi_tiet_id = t2.id
            JOIN san_pham t3 ON t2.san_pham_id = t3.id
            JOIN dot_giam_gia t4 ON t1.dot_giam_gia_id = t4.id
            WHERE t2.id = :prodId
            AND CURRENT_TIMESTAMP() <= t1.thoi_gian_ket_thuc
            AND t4.trang_thai = 1
            """, nativeQuery = true)
    DotGiamGia getSaleEventByProdDetails(@Param("prodId") int prodId);

    @Query(value = """
            SELECT DISTINCT t4.id, t4.gia_tri_phan_tram, t4.ma_dot_giam_gia, t4.ten_dot_giam_gia, t4.trang_thai,
                            t4.created_at, t4.created_by, t4.updated_at, t4.last_updated_by
            FROM dot_giam_gia_san_pham t1
            JOIN san_pham_chi_tiet t2 ON t1.san_pham_chi_tiet_id = t2.id
            JOIN san_pham t3 ON t2.san_pham_id = t3.id
            JOIN dot_giam_gia t4 ON t1.dot_giam_gia_id = t4.id
            WHERE t2.id = (
                SELECT id
                FROM san_pham_chi_tiet ct
                WHERE ct.san_pham_id = :prodId
                AND ct.mau_sac_id = :colorId
                AND ct.kich_co_id = :sizeId
            )
            AND CURRENT_TIMESTAMP() <= t1.thoi_gian_ket_thuc
            AND t4.trang_thai = 1
            """, nativeQuery = true)
    DotGiamGia getSaleEventByProdDetails2(@Param("prodId") int prodId,
                                          @Param("colorId") int colorId,
                                          @Param("sizeId") int sizeId);
}
