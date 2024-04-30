package com.datn.backend.repository;

import com.datn.backend.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Integer> {

    List<Notification> findAllByCustomerIdOrderByIdDesc(int custId);

    @Modifying
    @Query(value = """
                   UPDATE notification
                   SET is_read = 1
                   WHERE id = :notifId
                   """, nativeQuery = true)
    void setIsRead(@Param("notifId") int notifId);

    @Modifying
    @Query(value = """
                   UPDATE notification n
                   SET status = true
                   WHERE n.id > 0
                   """, nativeQuery = true)
    void readAll();

    @Query(value = """
                   SELECT *
                   FROM notification
                   WHERE cust_id IS NULL
                   ORDER BY time DESC
                   """, nativeQuery = true)
    List<Notification> getAllNotifOfStaff();
}
