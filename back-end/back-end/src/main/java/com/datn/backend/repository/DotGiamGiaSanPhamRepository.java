package com.datn.backend.repository;

import com.datn.backend.model.dot_giam_gia.DotGiamGia;
import com.datn.backend.model.dot_giam_gia.DotGiamGiaSanPham;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface DotGiamGiaSanPhamRepository extends JpaRepository<DotGiamGiaSanPham, Integer> {

    @Query(value = """
            SELECT id, san_pham_chi_tiet_id, dot_giam_gia_id ,
            thoi_gian_bat_dau, thoi_gian_ket_thuc, created_at, updated_at, created_by, last_updated_by
            FROM dot_giam_gia_san_pham
            WHERE dot_giam_gia_id = :id ;
            """, nativeQuery = true)
    List<DotGiamGiaSanPham> getAll(@Param("id") Integer id);

    @Modifying
    @Transactional
    @Query(value = """
            UPDATE dot_giam_gia dgg
             JOIN dot_giam_gia_san_pham dggsp ON dggsp.dot_giam_gia_id = dgg.id
             SET dgg.trang_thai =
                 CASE\s
                     WHEN :now BETWEEN dggsp.thoi_gian_bat_dau AND dggsp.thoi_gian_ket_thuc THEN 1
                     WHEN :now < dggsp.thoi_gian_bat_dau THEN 2
                     WHEN :now > dggsp.thoi_gian_ket_thuc THEN 0
                 END
             WHERE dgg.trang_thai > 0;
             """, nativeQuery = true)
    void updateDotGiamGiaSanPham(LocalDateTime now);
//    @Query(value = """
//            UPDATE dot_giam_gia dgg
//             JOIN dot_giam_gia_san_pham dggsp ON dggsp.dot_giam_gia_id = dgg.id
//             SET dgg.trang_thai =
//                 CASE\s
//                     WHEN NOW() BETWEEN dggsp.thoi_gian_bat_dau AND dggsp.thoi_gian_ket_thuc THEN 1
//                     WHEN NOW() < dggsp.thoi_gian_bat_dau THEN 2
//                     WHEN NOW() > dggsp.thoi_gian_ket_thuc THEN 0
//                 END
//             WHERE dgg.trang_thai > 0;
//             """, nativeQuery = true)

    @Query(value = """
            select dgg from DotGiamGia dgg
            left join DotGiamGiaSanPham dggsp on dgg.id = dggsp.dotGiamGia.id
            where dggsp.sanPhamChiTiet.id = :id and dgg.trangThai = 1
                        """)
    DotGiamGia findDotGiamGiaSanPhamActiveBySanPhamChiTietId(Integer id);
}
