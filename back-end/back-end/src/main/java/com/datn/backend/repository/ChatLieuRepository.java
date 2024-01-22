package com.datn.backend.repository;

import com.datn.backend.model.san_pham.ChatLieu;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatLieuRepository extends JpaRepository<ChatLieu, Integer> {

    boolean existsByTen(String ten);
}
