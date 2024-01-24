package com.datn.backend.repository;

import com.datn.backend.model.san_pham.ChatLieu;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ChatLieuRepository extends JpaRepository<ChatLieu, Integer> {

    boolean existsByTen(String ten);

    @Query(value =
           """
           SELECT *
           FROM chat_lieu c
           WHERE c.trang_thai = 1
           AND c.ten LIKE %:search%
           """, nativeQuery = true)
    Page<ChatLieu> getAll(Pageable pageable,
                          @Param("search") String search);
}
