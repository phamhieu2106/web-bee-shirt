package com.datn.backend.model.san_pham;

import com.datn.backend.model.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "mau_sac")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class MauSac extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String ten;
    private String ma;
    private String imageUrl;
}
