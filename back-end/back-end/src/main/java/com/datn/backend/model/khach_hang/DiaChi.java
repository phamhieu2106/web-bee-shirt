package com.datn.backend.model.khach_hang;

import com.datn.backend.model.BaseEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "dia_chi")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class DiaChi extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String tinh;
    private String huyen;
    private String xa;
    private String duong;
    private boolean macDinh;

    @ManyToOne
    @JoinColumn(name = "khach_hang_id")

    private KhachHang khachHang;
}
