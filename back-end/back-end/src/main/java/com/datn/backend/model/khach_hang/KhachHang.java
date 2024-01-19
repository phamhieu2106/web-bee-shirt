package com.datn.backend.model.khach_hang;

import com.datn.backend.model.Account;
import com.datn.backend.model.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "khach_hang")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class KhachHang extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String hoTen;
    private LocalDate ngaySinh;
    private String sdt;
    private String email;
    private boolean gioiTinh;
    private String imageUrl;

    @OneToOne
    @JoinColumn(name = "account_id")
    private Account account;
}
