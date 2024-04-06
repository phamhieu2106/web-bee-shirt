package com.datn.backend.model.hoa_don;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HoaDonTraHang {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String ma;
    private String tenNguoiNhan;
    private String sdtNguoiNhan;
    private String emailNguoiNhan;
    private String diaChiNguoiNhan;
    private BigDecimal tongTien;
    private String ghiChu;

    @OneToMany(mappedBy = "hoaDonTraHang", cascade = CascadeType.ALL)
    private List<HoaDonChiTiet> hoaDonChiTiets;

    @OneToOne
    @JoinColumn(referencedColumnName = "id")
    private HoaDon hoaDon;
}
