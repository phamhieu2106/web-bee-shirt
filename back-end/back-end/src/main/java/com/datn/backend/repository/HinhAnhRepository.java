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
}
