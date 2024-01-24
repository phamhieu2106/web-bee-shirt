package com.datn.backend.repository;

import com.datn.backend.dto.response.PhieuGiamGiaResponse;
import com.datn.backend.model.phieu_giam_gia.PhieuGiamGia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PhieuGiamGiaRepository extends JpaRepository<PhieuGiamGia, Integer> {
    @Query("""
              select pgg.id ,
               pgg.maPhieuGiamGia,
                pgg.tenPhieuGiamGia ,
                pgg.kieu,
                pgg.loai,
                pgg.giaTri,
                pgg.giaTriMax,
                pgg.dieuKienGiam,
                pgg.soLuong,
                pgg.thoiGianBatDau,
                pgg.thoiGianKetThuc,
                pgg.trangThai from PhieuGiamGia pgg
            """)
    List<PhieuGiamGiaResponse> getAll();
}
