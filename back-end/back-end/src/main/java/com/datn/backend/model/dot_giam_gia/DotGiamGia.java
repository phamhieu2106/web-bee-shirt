package com.datn.backend.model.dot_giam_gia;

import com.datn.backend.model.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "dot_giam_gia")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class DotGiamGia extends BaseEntity {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "ma_dot_giam_gia")
    @NotNull(message = "DotGiamGia Code can't be null")
    @NotBlank(message = "DotGiamGia Code can't be empty")
    private String maDotGiamGia;

    @Column(name = "ten_dot_giam_gia")
    @NotNull(message = "DotGiamGia Name can't be null")
    @NotBlank(message = "DotGiamGia Name can't be empty")
    private String tenDotGiamGia;

    @Column(name = "gia_tri_phan_tram")
    @NotNull(message = "Discount percent can't be null")
    @Min(value = 5, message = "Discount percent must gather than 5")
    @Max(value = 100, message = "Discount percent must below 100")
    private Integer giaTriPhanTram;

    @Column(name = "trang_thai")
    private Integer trangThai;


}
