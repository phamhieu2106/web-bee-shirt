package com.datn.backend.repository;

import com.datn.backend.dto.response.NhanVienResponse;
import com.datn.backend.model.nhan_vien.NhanVien;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface NhanVienRepository extends JpaRepository<NhanVien, Integer> {

    NhanVien findByAccountId(Integer accountId);

    boolean existsByEmail(String email);

    boolean existsBySdt(String sdt);

    @Query(value =
            """
            SELECT CASE
                       WHEN EXISTS (
                           SELECT nv.email FROM nhan_vien nv WHERE nv.email = :emailInput AND nv.email != :emailDetail
                       ) THEN 'true'
                       ELSE 'false'
                   END AS result;
            """
            , nativeQuery = true)
    boolean existsByEmailExcluding(@Param("emailInput") String emailInput, @Param("emailDetail") String emailDetail);

    @Query(value =
            """
                     SELECT CASE
                               WHEN EXISTS (
                                   SELECT nv.sdt FROM nhan_vien nv WHERE nv.sdt = :sdtInput AND nv.sdt != :sdtDetail
                               ) THEN 'true'
                               ELSE 'false'
                           END AS result;
                    """
            , nativeQuery = true)
    boolean existsBySdtExcluding(@Param("sdtInput") String sdtInput, @Param("sdtDetail") String sdtDetail);

    @Query(value =
            """
                    SELECT nv.id, nv.created_at as CreatedAt, nv.created_by as CreatedBy, nv.updated_at as UpdatedAt, nv.last_updated_by as LastUpdatedBy, nv.dia_chi as DiaChi, nv.email, nv.gioi_tinh as GioiTinh, nv.ho_ten as HoTen, nv.ngay_sinh as NgaySinh, nv.sdt, acc.mat_khau as MatKhau, acc.role, acc.ten_dang_nhap as TenDangNhap, acc.trang_thai as TrangThai, nv.cccd
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
                    SELECT nv.id, nv.created_at as CreatedAt, nv.created_by as CreatedBy, nv.updated_at as UpdatedAt, nv.last_updated_by as LastUpdatedBy, nv.dia_chi as DiaChi, nv.email, nv.gioi_tinh as GioiTinh, nv.ho_ten as HoTen, nv.ngay_sinh as NgaySinh, nv.sdt, acc.mat_khau as MatKhau, acc.role, acc.ten_dang_nhap as TenDangNhap, acc.trang_thai as TrangThai, nv.cccd, khi.image_url as ImageUrl
                    FROM account acc 
                    JOIN nhan_vien nv 
                    ON nv.account_id = acc.id
                    LEFT JOIN khach_hang_image khi
                    ON nv.image_id = khi.id
                    WHERE nv.id = :id
                    ORDER BY nv.created_at DESC
                    """
            , nativeQuery = true)
    NhanVienResponse getOneById(Integer id);

    @Query(value =
            """
                    SELECT nv.id, nv.created_at as CreatedAt, nv.created_by as CreatedBy, nv.updated_at as UpdatedAt, nv.last_updated_by as LastUpdatedBy, nv.dia_chi as DiaChi, nv.email, nv.gioi_tinh as GioiTinh, nv.ho_ten as HoTen, nv.ngay_sinh as NgaySinh, nv.sdt, acc.mat_khau as MatKhau, acc.role, acc.ten_dang_nhap as TenDangNhap, acc.trang_thai as TrangThai, nv.cccd
                    FROM account acc 
                    JOIN nhan_vien nv 
                    ON nv.account_id = acc.id 
                    WHERE nv.gioi_tinh IN ( :gioiTinhFilter )
                    AND acc.trang_thai IN ( :trangThaiFilter )
                    AND ( nv.ho_ten LIKE %:search% 
                        OR nv.sdt LIKE %:search%
                        OR nv.email LIKE %:search% )
                    ORDER BY nv.created_at DESC
                    """
            , nativeQuery = true)
    Page<NhanVienResponse> filter(Pageable pageable
            , @Param("gioiTinhFilter") List<Integer> gioiTinhFilter
            , @Param("trangThaiFilter") List<Integer> trangThaiFilter
            , @Param("search") String search);
}
