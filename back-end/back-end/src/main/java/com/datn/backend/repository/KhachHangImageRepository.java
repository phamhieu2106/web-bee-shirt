package com.datn.backend.repository;

import com.datn.backend.model.khach_hang.KhachHangImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KhachHangImageRepository extends JpaRepository<KhachHangImage, Integer> {

    KhachHangImage getByImageName(String imgName);
}
