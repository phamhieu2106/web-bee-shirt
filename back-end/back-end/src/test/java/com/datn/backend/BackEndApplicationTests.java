package com.datn.backend;

import com.datn.backend.enumeration.NotificationType;
import com.datn.backend.model.Notification;
import com.datn.backend.model.khach_hang.KhachHang;
import com.datn.backend.repository.KhachHangRepository;
import com.datn.backend.repository.NotificationRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import java.time.LocalDateTime;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Rollback(value = false)
class BackEndApplicationTests {

    @Autowired
    private NotificationRepository repository;

    @Autowired
    private KhachHangRepository repository2;

    @Test
    void test() {
        KhachHang kh = repository2.findById(6).get();

        Notification notification = Notification.builder()
                .type(NotificationType.valueOf("NEW_ORDER_CREATED"))
                .isRead(false)
                .content("Bạn có đơn hàng mới!")
                .relatedUrl("/hoa-don/chi-tiet-hoa-don/${order.id}")
                .time(LocalDateTime.now())
                .customer(null)
                .build();
        repository.save(notification);
    }
}
