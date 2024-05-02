package com.datn.backend;

import com.datn.backend.enumeration.NotificationType;
import com.datn.backend.model.Notification;
import com.datn.backend.model.khach_hang.KhachHang;
import com.datn.backend.repository.KhachHangRepository;
import com.datn.backend.repository.NotificationRepository;
import com.datn.backend.repository.SanPhamRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import java.time.LocalDateTime;
import java.util.List;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Rollback(value = false)
class BackEndApplicationTests {
}
