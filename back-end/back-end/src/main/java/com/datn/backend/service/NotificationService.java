package com.datn.backend.service;

import com.datn.backend.dto.request.AddNotificationReq;
import com.datn.backend.model.Notification;

import java.util.List;

public interface NotificationService {

    Notification create(AddNotificationReq req);

    List<Notification> getAllByCust(int custId);

    Notification setIsRead(int notifId);

    List<Notification> getAllNotifOfStaff();
}
