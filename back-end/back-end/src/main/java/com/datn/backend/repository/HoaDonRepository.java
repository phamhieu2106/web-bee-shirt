package com.datn.backend.repository;

import com.datn.backend.dto.response.HoaDonResponse;
import com.datn.backend.dto.response.SoLuongDonHangResponse;
import com.datn.backend.model.hoa_don.HoaDon;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

/**
 * @author HungDV
 */
public interface HoaDonRepository extends JpaRepository<HoaDon, Integer> {
    /**
     * @param pageable
     * @param keys       điều kiện tìm theo MaHD, SDTNguoiNhan, TenNguoiNhan,
     *                   EmailNguoiNhan, TenKhachHang, SDTKhachHang
     * @param loaiHoaDon
     * @param ngayTao
     * @return
     */
    @Query("""
            select hd from HoaDon hd
            left join hd.khachHang kh
            where ( hd.ma like %:keys% or 
            hd.sdtNguoiNhan like %:keys% or 
            hd.tenNguoiNhan like %:keys% or
            hd.emailNguoiNhan like %:keys% or 
            kh.hoTen like %:keys% or
            kh.sdt like %:keys% ) and
            concat( hd.loaiHoaDon,'') like %:loaiHoaDon%  and 
            concat( hd.trangThai,'') like %:trangThai%  and 
            concat( hd.createdAt,'') like %:ngayTao%   
            order by hd.createdAt desc 
            """)
    Page<HoaDon> findByKeys(Pageable pageable, String keys,String loaiHoaDon, String ngayTao,String trangThai);

    @Query(value = """
            SELECT new com.datn.backend.dto.response.SoLuongDonHangResponse(
             COUNT(CASE WHEN hd.trangThai = 'CHO_XAC_NHAN' THEN 1 END),
              COUNT(CASE WHEN hd.trangThai = 'DA_XAC_NHAN' THEN 1 END),
              COUNT(CASE WHEN hd.trangThai = 'CHO_GIAO' THEN 1 END),
               COUNT(CASE WHEN hd.trangThai = 'DANG_GIAO' THEN 1 END),
              COUNT(CASE WHEN hd.trangThai = 'HOAN_THANH' THEN 1 END),
               COUNT(CASE WHEN hd.trangThai = 'HUY' THEN 1 END),
               COUNT(CASE WHEN hd.trangThai = 'TRA_HANG' THEN 1 END),
               COUNT(CASE WHEN hd.trangThai = 'CHO_HOAN_TIEN' THEN 1 END),
               COUNT(CASE WHEN hd.trangThai = 'DA_HOAN_TIEN' THEN 1 END)
               )
            FROM
              HoaDon hd
            """)
    SoLuongDonHangResponse getSoLuongDonHang();

    boolean existsByMa(String ma);

    Optional<HoaDon> getByMa(String ma);

    @Query(value = """
                   SELECT *
                   FROM hoa_don hd
                   WHERE hd.id_khach_hang = :custId
                   AND hd.trang_thai LIKE %:orderStatus%
                   ORDER BY hd.trang_thai
                   """, nativeQuery = true)
    List<HoaDon> getOrdersForClient(@Param("custId") int custId,
                                    @Param("orderStatus") String orderStatus);

    @Query(value = """
                   SELECT *
                   FROM hoa_don
                   WHERE id_khach_hang IS NULL
                   AND id_nhan_vien IS NULL
                   AND sdt_nguoi_nhan = :phone
                   """, nativeQuery = true)
    List<HoaDon> getNoneLoggedOrdersByPhone(@Param("phone") String phone);
}
