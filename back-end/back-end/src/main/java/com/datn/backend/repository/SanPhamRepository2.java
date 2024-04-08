package com.datn.backend.repository;


import com.datn.backend.dto.response.ProductDiscountSummaryResponse;
import com.datn.backend.model.san_pham.SanPham;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SanPhamRepository2 extends JpaRepository<SanPham, Integer> {

    @Query(value = """
                SELECT distinct sp.id FROM san_pham sp
                JOIN san_pham_chi_tiet spct ON spct.san_pham_id = sp.id
                JOIN dot_giam_gia_san_pham dggsp ON dggsp.san_pham_chi_tiet_id = spct.id
                JOIN dot_giam_gia dgg ON dgg.id = dggsp.dot_giam_gia_id
                WHERE sp.trang_thai = 1 AND dgg.trang_thai = 1
            """, nativeQuery = true)
    List<Integer> checkInDiscount();

    @Query(value = """
                SELECT distinct spct.id as Id, dgg.gia_tri_phan_tram as PhanTramGiam FROM san_pham_chi_tiet spct
                JOIN san_pham sp ON sp.id = spct.san_pham_id
                JOIN dot_giam_gia_san_pham dggsp ON dggsp.san_pham_chi_tiet_id = spct.id
                JOIN dot_giam_gia dgg ON dgg.id = dggsp.dot_giam_gia_id
                WHERE sp.trang_thai = 1
                AND spct.trang_thai = 1
                 AND dgg.trang_thai = 1
                 AND sp.id = :id ;
            """, nativeQuery = true)
    List<ProductDiscountSummaryResponse> getProductDiscountSummary(@Param("id") Integer id);

    @Query("""
       SELECT sp FROM SanPhamChiTiet spct
       LEFT JOIN SanPham sp ON sp.id = spct.sanPham.id
       WHERE spct.id = :id
""")
    SanPham getNameBuySanPhamChiTietId(int id);
}
