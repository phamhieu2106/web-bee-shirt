package com.datn.backend.repository;

import com.datn.backend.model.hoa_don.HoaDon;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 * @author HungDV
 */
public interface HoaDonRepository extends JpaRepository<HoaDon, Integer> {
    /**
     * @param pageable
     * @param keys     điều kiện tìm theo MaHD, SDTNguoiNhan, TenNguoiNhan,
     *                 EmailNguoiNhan, TenKhachHang, SDTKhachHang
     * @return
     */
    @Query("""
            select hd from HoaDon hd 
            join hd.khachHang kh
            where   hd.ma like %:keys% or 
                    hd.sdtNguoiNhan like %:keys% or
                    hd.tenNguoiNhan like %:keys% or
                    hd.emailNguoiNhan like %:keys% or
                    kh.hoTen like %:keys% or
                    kh.sdt like %:keys% 
            """)
    Page<HoaDon> findByKeys(Pageable pageable, String keys);
}
