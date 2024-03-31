package com.datn.backend.repository;

import com.datn.backend.model.san_pham.ChatLieu;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChatLieuRepository extends JpaRepository<ChatLieu, Integer> {

    boolean existsByTen(String ten);

    ChatLieu getChatLieuByTen(String ten);

    @Query(value =
           """
           SELECT *
           FROM chat_lieu c
           WHERE c.ten LIKE %:search%
           ORDER BY c.created_at DESC
           """, nativeQuery = true)
    Page<ChatLieu> getAll(Pageable pageable,
                          @Param("search") String search);

    @Query(value =
            """
            SELECT cl.id
            FROM chat_lieu cl
            WHERE cl.trang_thai = 1
            """, nativeQuery = true)
    List<Integer> getAllActiveMaterialIds();
}
