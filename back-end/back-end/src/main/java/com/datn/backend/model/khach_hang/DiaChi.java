package com.datn.backend.model.khach_hang;

import com.datn.backend.model.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "dia_chi")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class DiaChi extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String tinh;
    private String huyen;
    private String xa;
    private String duong;
    private String diaChiChiTiet;
    private boolean macDinh;


    @ManyToOne
    @JoinColumn(name = "khach_hang_id")
    private KhachHang khachHang;
}
