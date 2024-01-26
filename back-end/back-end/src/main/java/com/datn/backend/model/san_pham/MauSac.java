package com.datn.backend.model.san_pham;

import com.datn.backend.model.BaseEntity;
import jakarta.persistence.CascadeType;
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
    private boolean trangThai;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "image_id")
    private MauSacImage image;
}
/**
    NAVY, OLIVE, BEIGE, PEYOTE
**/
