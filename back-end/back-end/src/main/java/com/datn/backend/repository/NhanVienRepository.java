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
            SELECT nv.id, nv.dia_chi, nv.email, nv.gioi_tinh, nv.ho_ten, nv.ngay_sinh, nv.sdt, acc.mat_khau, acc.role, acc.ten_dang_nhap, acc.trang_thai 
            FROM nhan_vien nv 
            JOIN account acc 
            ON nv.account_id = acc.id 
            WHERE acc.trang_thai = 1
            AND nv.ho_ten LIKE %:search% 
            OR nv.sdt LIKE %:search%
            OR nv.email LIKE %:search%
            ORDER BY nv.created_at DESC
            """
            , nativeQuery = true)
    Page<NhanVienResponse> getAll(Pageable pageable,
                                  @Param("search") String search);
}
