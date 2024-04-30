package com.datn.backend.model;

import com.datn.backend.enumeration.NotificationType;
import com.datn.backend.model.khach_hang.KhachHang;
import com.datn.backend.model.nhan_vien.NhanVien;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "notification")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Notification extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    private NotificationType type;
    private boolean isRead;
    private String content;
    private String relatedUrl;
    private LocalDateTime time;

    @ManyToOne
    @JoinColumn(name = "cust_id")
    private KhachHang customer;
}
