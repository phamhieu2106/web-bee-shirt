package com.datn.backend.model.khach_hang;

import com.datn.backend.model.BaseEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "dia_chi")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class DiaChi extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String hoTen;
    private String sdt;
    private String tinh;
    private String huyen;
    private String xa;
    private String duong;
    private boolean macDinh;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "khach_hang_id")
    private KhachHang khachHang;
}
