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

    boolean existsByTenDotGiamGia(String tenDotGiamGia);

    DotGiamGia getDotGiamGiaByMaDotGiamGia(String maDotGiamGia);

    @Query(value = """
            SELECT dgg.id as Id ,dgg.ma_dot_giam_gia as MaDotGiamGia, dgg.ten_dot_giam_gia as TenDotGiamGia,
            dgg.gia_tri_phan_tram as GiaTriPhanTram, dggsp.thoi_gian_bat_dau as ThoiGianBatDau, dggsp.thoi_gian_ket_thuc as ThoiGianKetThuc,
            COUNT(dggsp.id) as SoLuongSanPham, dgg.trang_thai as TrangThai
            FROM dot_giam_gia dgg
            JOIN dot_giam_gia_san_pham dggsp ON dggsp.dot_giam_gia_id = dgg.id
            WHERE dgg.ma_dot_giam_gia LIKE %:search%
            OR dgg.ten_dot_giam_gia LIKE %:search%
            OR dgg.gia_tri_phan_tram = :search
            GROUP BY dgg.id, dgg.ma_dot_giam_gia, dgg.ten_dot_giam_gia, dgg.gia_tri_phan_tram, dggsp.thoi_gian_bat_dau, dggsp.thoi_gian_ket_thuc, dgg.trang_thai
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
            GROUP BY dgg.id, dgg.ma_dot_giam_gia, dgg.ten_dot_giam_gia, dgg.gia_tri_phan_tram, dggsp.thoi_gian_bat_dau, dggsp.thoi_gian_ket_thuc, dgg.trang_thai;
                        """
            , nativeQuery = true)
    Page<DotGiamGiaResponse> getStatusAll(Pageable pageable,
                                          @Param("startDate") String startDate,
                                          @Param("endDate") String endDate);

    @Query(value = """

            SELECT dgg.id as Id, dgg.ma_dot_giam_gia as MaDotGiamGia, dgg.ten_dot_giam_gia as TenDotGiamGia,
              dgg.gia_tri_phan_tram as GiaTriPhanTram, dggsp.thoi_gian_bat_dau as ThoiGianBatDau,
              dggsp.thoi_gian_ket_thuc as ThoiGianKetThuc, COUNT(dggsp.id) as SoLuongSanPham, dgg.trang_thai as TrangThai
            FROM dot_giam_gia dgg
            JOIN dot_giam_gia_san_pham dggsp ON dggsp.dot_giam_gia_id = dgg.id
            WHERE dgg.trang_thai = :status 
             AND (dggsp.thoi_gian_bat_dau >= :startDate AND dggsp.thoi_gian_ket_thuc <= :endDate )
            GROUP BY dgg.id, dgg.ma_dot_giam_gia, dgg.ten_dot_giam_gia, dgg.gia_tri_phan_tram, dggsp.thoi_gian_bat_dau, dggsp.thoi_gian_ket_thuc, dgg.trang_thai;
                        """,
            nativeQuery = true)
    Page<DotGiamGiaResponse> getStatusWithDate(Pageable pageable,
                                               @Param("status") Integer status,
                                               @Param("startDate") String startDate,
                                               @Param("endDate") String endDate);

    @Query(value = """
            SELECT\s
                dgg.id AS Id,
                dgg.ma_dot_giam_gia AS MaDotGiamGia,
                dgg.ten_dot_giam_gia AS TenDotGiamGia,
                dgg.gia_tri_phan_tram AS GiaTriPhanTram,
                dggsp.thoi_gian_bat_dau AS ThoiGianBatDau,
                dggsp.thoi_gian_ket_thuc AS ThoiGianKetThuc,
                dgg.trang_thai AS TrangThai,
                GROUP_CONCAT(dggsp.id) AS ListIdSanPhamChiTiet
            FROM dot_giam_gia dgg
            JOIN dot_giam_gia_san_pham dggsp ON dggsp.dot_giam_gia_id = dgg.id
            JOIN san_pham_chi_tiet spct ON spct.id = dggsp.san_pham_chi_tiet_id
            JOIN san_pham sp ON sp.id = spct.san_pham_id
            WHERE dgg.id = 3
            GROUP BY dgg.id, dgg.ma_dot_giam_gia, dgg.ten_dot_giam_gia, dgg.gia_tri_phan_tram, dggsp.thoi_gian_bat_dau, dggsp.thoi_gian_ket_thuc, dgg.trang_thai
            """
            , nativeQuery = true)
    DotGiamGiaResponse getOneById(@Param("id") Integer id);


    @Query(value = """
                SELECT spct.id as Id, sp.ma as MaSanPham ,sp.ten as TenSanPham, spct.gia_ban as GiaBan, spct.so_luong_ton as SoLuongTon, spct.trang_thai as TrangThai,
                cl.ten as TenChatLieu, ca.ten as TenCoAo, kc.ten as TenKichCo, kd.ten as TenKieuDang , ms.Ten as TenMauSac, ta.Ten as TenTayAo,
                tk.ten as TenThietKe
                FROM san_pham_chi_tiet spct
                LEFT JOIN chat_lieu cl ON cl.id = spct.chat_lieu_id
                LEFT JOIN co_ao ca ON ca.id = spct.co_ao_id
                LEFT JOIN kich_co kc ON kc.id = spct.kich_co_id
                LEFT JOIN kieu_dang kd ON kd.id = spct.kieu_dang_id
                LEFT JOIN mau_sac ms ON ms.id = spct.mau_sac_id
                LEFT JOIN san_pham sp ON sp.id = spct.san_pham_id \s
                LEFT JOIN tay_ao ta ON ta.id = spct.tay_ao_id
                LEFT JOIN kieu_thiet_ke tk ON tk.id = spct.thiet_ke_id
                WHERE sp.id IN ( :id );
            """, nativeQuery = true)
    Page<SanPhamChiTietResponse> getAllSanPhamChiTietBySanPhamId(Pageable pageable, @Param("id") List<Integer> id);

    @Query(value = """
                SELECT sp.id FROM san_pham sp
                JOIN san_pham_chi_tiet spct ON spct.san_pham_id = sp.id
                WHERE spct.id IN ( :ids )
                GROUP BY sp.id
            """, nativeQuery = true)
    List<Integer> getIdSanPhamIdBySanPhamChiTietId(@Param("ids") String ids);

}
