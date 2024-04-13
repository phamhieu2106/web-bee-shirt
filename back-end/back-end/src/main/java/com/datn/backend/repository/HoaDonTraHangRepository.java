package com.datn.backend.repository;

import com.datn.backend.enumeration.TrangThaiHoaDon;
import com.datn.backend.model.hoa_don.HoaDon;
import com.datn.backend.model.phieu_giam_gia.PhieuGiamGia;
import com.datn.backend.model.san_pham.SanPhamChiTiet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HoaDonTraHangRepository extends JpaRepository<HoaDon, Integer> {

    Optional<HoaDon> findHoaDonByMa(String ma);

    @Query("""
                    SELECT hdct.sanPhamChiTiet FROM HoaDonChiTiet hdct
                    LEFT JOIN hdct.sanPhamChiTiet spct
                    LEFT JOIN hdct.hoaDon hd
                    WHERE spct.id = hdct.sanPhamChiTiet.id
                    AND hdct.hoaDon.id = hd.id
                    AND hd.id = :idHoaDon
            """)
    List<SanPhamChiTiet> getAllSanPhamChiTiet(Integer idHoaDon);

    @Query("""
            SELECT spct.id FROM SanPhamChiTiet spct
            LEFT JOIN DotGiamGiaSanPham dggsp ON dggsp.sanPhamChiTiet.id = spct.id
            LEFT JOIN HoaDonChiTiet hdct ON hdct.sanPhamChiTiet.id = spct.id
            LEFT JOIN hdct.hoaDon hd
            WHERE hd.createdAt BETWEEN dggsp.thoiGianBatDau AND dggsp.thoiGianKetThuc
            AND hd.id = :idHoaDon
                """)
    List<Integer> getAllIdSanPhamChiTietInDotGiamGiaByHoaDonId(Integer idHoaDon);

}
