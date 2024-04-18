package com.datn.backend.repository;

import com.datn.backend.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Integer> {

    List<Notification> findAllByCustomerIdOrderByIdDesc(int custId);

    @Modifying
    @Query(value = """
                   UPDATE notification n
                   SET status = true
                   WHERE n.id > 0
                   """, nativeQuery = true)
    void readAll();
}
