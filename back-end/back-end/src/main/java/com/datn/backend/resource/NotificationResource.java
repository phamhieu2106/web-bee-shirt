package com.datn.backend.resource;

import com.datn.backend.model.Notification;
import com.datn.backend.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("api/notification")
@RequiredArgsConstructor
public class NotificationResource {

    private final NotificationRepository notificationRepo;

    @GetMapping
    public ResponseEntity<List<Notification>> getAll() {
        return ResponseEntity.ok(notificationRepo.findByOrderByIdDesc());
    }

    @PostMapping
    public ResponseEntity<Notification> post(@RequestBody Notification notification) {
        if (notificationRepo.existsById(notification.getId())) {
            return ResponseEntity.badRequest().build();
        }
        notification.setTime(new Date());
        notification.setStatus(false);
        return ResponseEntity.ok(notificationRepo.save(notification));
    }

    @GetMapping("/readed/{id}")
    public ResponseEntity<Notification> put(@PathVariable("id") Long id) {
        if (!notificationRepo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        Notification no = notificationRepo.getById(id);
        no.setStatus(true);
        return ResponseEntity.ok(notificationRepo.save(no));
    }

    @GetMapping("/read-all")
    public ResponseEntity<Void> readAll() {
        notificationRepo.readAll();
        return ResponseEntity.ok().build();
    }
}
