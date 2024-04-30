package com.datn.backend.resource;

import com.datn.backend.dto.request.AddNotificationReq;
import com.datn.backend.model.Notification;
import com.datn.backend.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/notification")
@RequiredArgsConstructor
public class NotificationResource {

    private final NotificationService notificationService;

    // 1
    @PostMapping("/create")
    public ResponseEntity<Notification> create(@RequestBody AddNotificationReq req) {
        return ResponseEntity.ok(notificationService.create(req));
    }

    // 2
    @GetMapping("/all-by-cust/{custId}")
    public ResponseEntity<List<Notification>> getAllByCust(@PathVariable("custId") int custId) {
        return ResponseEntity.ok(notificationService.getAllByCust(custId));
    }

    // 3
    @GetMapping("/set-read/{notifId}")
    public ResponseEntity<Notification> setIsRead(@PathVariable("notifId") int notifId) {
        return ResponseEntity.ok(notificationService.setIsRead(notifId));
    }

    // 4
    @GetMapping("/notif-of-staff")
    public ResponseEntity<List<Notification>> getAllNotifOfStaff() {
        return ResponseEntity.ok(notificationService.getAllNotifOfStaff());
    }
}
