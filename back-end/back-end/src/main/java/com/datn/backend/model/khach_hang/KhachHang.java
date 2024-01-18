package com.datn.backend.model.khach_hang;

import com.datn.backend.enumeration.Gender;
import com.datn.backend.model.BaseEntity;
import jakarta.persistence.*;
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
    private Gender gender;
    private String imageUrl;
}
