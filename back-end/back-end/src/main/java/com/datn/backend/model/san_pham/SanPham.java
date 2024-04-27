package com.datn.backend.model.san_pham;

import com.datn.backend.model.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

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
    private String ma;

    @Column(length = 4000)
    private String moTa;
    private boolean trangThai;

    @OneToMany(mappedBy = "sanPham")
    private List<SanPhamChiTiet> sanPhamChiTiets;
}
