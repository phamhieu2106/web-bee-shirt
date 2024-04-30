package com.datn.backend.service.impl;

import com.datn.backend.dto.request.AddNotificationReq;
import com.datn.backend.enumeration.NotificationType;
import com.datn.backend.exception.custom_exception.ResourceNotFoundException;
import com.datn.backend.model.Notification;
import com.datn.backend.model.khach_hang.KhachHang;
import com.datn.backend.repository.KhachHangRepository;
import com.datn.backend.repository.NotificationRepository;
import com.datn.backend.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final KhachHangRepository customerRepo;
    private final NotificationRepository notificationRepo;

    @Override
    public Notification create(AddNotificationReq req) {
        KhachHang cust = req.getCustId() != null ? customerRepo.findById(req.getCustId()).orElse(null) : null;
        Notification notification = Notification.builder()
                .type(NotificationType.valueOf(req.getType()))
                .isRead(false)
                .content(req.getContent())
                .relatedUrl(req.getRelatedUrl())
                .time(LocalDateTime.now())
                .customer(cust)
                .build();
        return notificationRepo.save(notification);
    }

    @Override
    public List<Notification> getAllByCust(int custId) {
        return notificationRepo.findAllByCustomerIdOrderByIdDesc(custId);
    }

    @Override
    @Transactional
    public Notification setIsRead(int notifId) {
        notificationRepo.setIsRead(notifId);
        return notificationRepo.findById(notifId).get();
    }

    @Override
    public List<Notification> getAllNotifOfStaff() {
        return notificationRepo.getAllNotifOfStaff();
    }
}
