package com.datn.backend.repository;

import com.datn.backend.model.san_pham.HinhAnh;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface HinhAnhRepository extends JpaRepository<HinhAnh, Integer> {

    @Query(value =
            """
            SELECT ha.id, ha.image_url
            FROM spct_hinh_anh spha
            JOIN hinh_anh ha ON ha.id = spha.hinh_anh_id
            JOIN san_pham_chi_tiet spct ON spct.id = spha.spct_id
            JOIN san_pham sp ON spct.san_pham_id = sp.id
            JOIN mau_sac ms ON spct.mau_sac_id = ms.id
            WHERE ms.ten = :tenMau
            AND sp.id = :sanPhamID
            """, nativeQuery = true)
    List<HinhAnh> getByMauSac(@Param("tenMau") String tenMau,
                              @Param("sanPhamID") int sanPhamID);

    @Query(value =
            """
            SELECT DISTINCT ha.image_url
            FROM san_pham_chi_tiet ct
            JOIN spct_hinhanh ct_ha ON ct.id = ct_ha.spct_id
            JOIN hinh_anh ha ON ct_ha.hinhanh_id = ha.id
            WHERE ct.san_pham_id = :productId
            AND ct.mau_sac_id = :colorId
            """, nativeQuery = true)
    List<String> getAllUrlBySanPhamAndMauSac(@Param("productId") int productId,
                                             @Param("colorId") int colorId);

    @Query(value = """
                   SELECT distinct t3.id, t3.image_id, t3.image_name, t3.image_url
                   FROM san_pham_chi_tiet t1
                   JOIN spct_hinhanh t2 ON t1.id = t2.spct_id
                   JOIN hinh_anh t3 ON t2.hinhanh_id = t3.id
                   WHERE san_pham_id = :prodId
                   AND t1.mau_sac_id = :colorId
                   """, nativeQuery = true)
    List<HinhAnh> getImgsOf1ProductColor(@Param("prodId") int prodId,
                                         @Param("colorId") int colorId);
}
