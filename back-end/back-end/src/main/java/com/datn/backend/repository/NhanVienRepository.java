package com.datn.backend.repository;

import com.datn.backend.dto.response.NhanVienResponse;
import com.datn.backend.model.NhanVien;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface NhanVienRepository extends JpaRepository<NhanVien, Integer> {

    NhanVien findByAccountId(Integer accountId);

    @Query(value =
            """
            SELECT nv.id, nv.dia_chi as DiaChi, nv.email, nv.gioi_tinh as GioiTinh, nv.ho_ten as HoTen, nv.ngay_sinh as NgaySinh, nv.sdt, acc.mat_khau as MatKhau, acc.role, acc.ten_dang_nhap as TenDangNhap, acc.trang_thai as TrangThai
            FROM account acc 
            JOIN nhan_vien nv 
            ON nv.account_id = acc.id 
            WHERE nv.ho_ten LIKE %:search% 
            OR nv.sdt LIKE %:search%
            OR nv.email LIKE %:search%
            ORDER BY nv.created_at DESC
            """
            , nativeQuery = true)
    Page<NhanVienResponse> getAll(Pageable pageable,
                                  @Param("search") String search);

    @Query(value =
            """
            SELECT nv.id, nv.dia_chi as DiaChi, nv.email, nv.gioi_tinh as GioiTinh, nv.ho_ten as HoTen, nv.ngay_sinh as NgaySinh, nv.sdt, acc.mat_khau as MatKhau, acc.role, acc.ten_dang_nhap as TenDangNhap, acc.trang_thai as TrangThai
            FROM account acc 
            JOIN nhan_vien nv 
            ON nv.account_id = acc.id 
            WHERE nv.id = :id
            ORDER BY nv.created_at DESC
            """
            , nativeQuery = true)
    NhanVienResponse getOneById(Integer id);
}
