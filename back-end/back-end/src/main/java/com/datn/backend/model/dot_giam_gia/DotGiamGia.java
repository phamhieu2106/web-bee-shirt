package com.datn.backend.model.dot_giam_gia;

import com.datn.backend.model.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "dot_giam_gia")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class DotGiamGia extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String maDotGiamGia;
    private String tenDotGiamGia;
    private int giaTriPhanTram;
    private boolean trangThai;



}
