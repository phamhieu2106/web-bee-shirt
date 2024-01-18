package com.datn.backend.model.san_pham;

import com.datn.backend.model.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "san_pham")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class SanPham extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String ten;
    private boolean trangThai;
    private String moTa;
}
