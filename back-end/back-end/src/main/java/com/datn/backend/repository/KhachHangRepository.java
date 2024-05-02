package com.datn.backend.repository;

import com.datn.backend.dto.response.KhachHangResponse;
import com.datn.backend.model.khach_hang.KhachHang;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface KhachHangRepository extends JpaRepository<KhachHang,Integer> {

    KhachHang findByAccountId(Integer accountId);

    KhachHang getByEmail(String email);

    KhachHang getBySdt(String phone);

    boolean existsByEmail(String email);

    boolean existsBySdt(String sdt);
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
            or kh.sdt LIKE %:search%
            or kh.email LIKE %:search%
            and dc.mac_dinh= 1
            ORDER BY kh.created_at DESC
                    """
            , nativeQuery = true)
    Page<KhachHangResponse> getAll(Pageable pageable,
                                   @Param("search") String search);
    @Query("""
            select kh from KhachHang  kh
            where (kh.hoTen LIKE %:search%
            or kh.sdt LIKE %:search%
            or kh.email LIKE %:search%)
            and kh.trangThai=1
            """)
    Page<KhachHang> getAllActive(Pageable pageable,
                                   @Param("search") String search);

    @Query(value =
            """         
            select kh.id, kh.ho_ten as hoTen, kh.sdt, kh.ngay_sinh as ngaySinh, kh.gioi_tinh as gioiTinh,
            kh.email, kh.trang_thai as trangThai,
            dc.tinh, dc.huyen, dc.xa, dc.duong,
            acc.ten_dang_nhap as tenDangNhap, acc.mat_khau as matKhau,
            khach_hang_image.image_url as anhUrl
            from khach_hang kh
            join account acc on kh.account_id = acc.id
            join dia_chi dc on kh.id = dc.khach_hang_id
            join khach_hang_image on kh.image_id = khach_hang_image.id
            where kh.id = :id
            limit 1
                    """
            , nativeQuery = true)
    KhachHangResponse getKHById(int id);

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
            WHERE kh.gioi_tinh IN ( :gioiTinhFilter )
            AND kh.trang_thai IN ( :trangThaiFilter )
            and dc.mac_dinh= 1
            ORDER BY kh.created_at DESC
            """
            , nativeQuery = true)
    Page<KhachHangResponse> filter(Pageable pageable,
                                   @Param("gioiTinhFilter") List<Integer> gioiTinhFilter,
                                   @Param("trangThaiFilter") List<Integer> trangThaiFilter);


     @Query(value = "SELECT * \n" +
             "FROM khach_hang kh \n" +
             "WHERE kh.trang_thai !=0 AND kh.id  IN(SELECT kh.id FROM phieu_giam_gia_kh pgg JOIN khach_hang kh ON pgg.khach_hang_id = kh.id where pgg.phieu_giam_gia_id =:id1)" ,nativeQuery = true)
     Page<KhachHang> getKHCoPhieu(Pageable pageable, @Param("id1") String id1);

        @Query(value = "SELECT * \n" +
                "FROM khach_hang kh \n" +
                "WHERE kh.trang_thai !=0 AND kh.id NOT IN(SELECT kh.id FROM phieu_giam_gia_kh pgg JOIN khach_hang kh ON pgg.khach_hang_id = kh.id where pgg.phieu_giam_gia_id=:id)" ,nativeQuery = true)
        Page<KhachHang> getKHkhongPhieu(Pageable pageable, @Param("id") String id);


    @Query(value = "SELECT * \n" +
            "FROM khach_hang kh \n" +
            "WHERE kh.trang_thai !=0 AND kh.id  IN(SELECT kh.id FROM phieu_giam_gia_kh pgg JOIN khach_hang kh ON pgg.khach_hang_id = kh.id where pgg.phieu_giam_gia_id =:id1)" ,nativeQuery = true)
    List<KhachHang> getCoPhieu(@Param("id1") String id1);

    @Query(value = "SELECT * \n" +
            "FROM khach_hang kh \n" +
            "WHERE kh.trang_thai !=0 AND kh.id NOT IN(SELECT kh.id FROM phieu_giam_gia_kh pgg JOIN khach_hang kh ON pgg.khach_hang_id = kh.id where pgg.phieu_giam_gia_id=:id)" ,nativeQuery = true)
    List<KhachHang> getkhongPhieu(@Param("id") String id);

}
