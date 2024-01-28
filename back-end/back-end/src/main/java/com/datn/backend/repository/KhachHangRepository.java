package com.datn.backend.repository;

import com.datn.backend.dto.request.KhachHangRequest;
import com.datn.backend.dto.response.KhachHangResponse;
import com.datn.backend.model.khach_hang.KhachHang;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface KhachHangRepository extends JpaRepository<KhachHang,Integer> {

    @Query(value =
            """         
            select kh.id, kh.ho_ten as hoTen, kh.sdt,kh.ngay_sinh ngaySinh,kh.gioi_tinh as gioiTinh,
             kh.email,kh.trang_thai as trangThai,
             dc.tinh,dc.huyen,dc.xa,dc.duong,
            acc.ten_dang_nhap as tenDangNhap, acc.mat_khau as matKhau
            from khach_hang kh
            join account acc
            on kh.account_id=acc.id
            join dia_chi dc       
            on kh.id=dc.khach_hang_id
            where  kh.ho_ten LIKE %:search%
            ORDER BY kh.created_at DESC
                    """
            , nativeQuery = true)
    Page<KhachHangResponse> getAll(Pageable pageable,
                                   @Param("search") String search);

    @Query(value =
            """         
            select kh.id, kh.ho_ten as hoTen, kh.sdt, kh.ngay_sinh as ngaySinh, kh.gioi_tinh as gioiTinh,
            kh.email,kh.trang_thai as trangThai,
             dc.tinh,dc.huyen,dc.xa,dc.duong,
            acc.ten_dang_nhap as tenDangNhap, acc.mat_khau as matKhau
            from khach_hang kh
            join account acc
            on kh.account_id=acc.id
            join dia_chi dc       
            on kh.id=dc.khach_hang_id
            where  kh.id = :id
            and dc.mac_dinh=1
            ORDER BY kh.created_at DESC
                    """
            , nativeQuery = true)
    KhachHangResponse getKHById(int id);



//    @Query(value =
//            """
//            UPDATE khach_hang
//            SET email = ?,
//            gioi_tinh = ?,
//            ho_ten = ?,
//            image_url = ?,
//            ngay_sinh = ?,
//            sdt = ?
//            WHERE id = :id;
//                    """
//            , nativeQuery = true)
//    KhachHang updateKH(int id,KhachHang kh);
}
