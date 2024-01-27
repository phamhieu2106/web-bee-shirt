package com.datn.backend.model.phieu_giam_gia;

import com.datn.backend.model.BaseEntity;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.LastModifiedDate;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "phieu_giam_gia")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PhieuGiamGia extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotEmpty(message = "Không để trống trường mã phiếu")
    private String maPhieuGiamGia;

    @NotEmpty(message = "Không để trống trường tên phiếu")
    private String tenPhieuGiamGia;


    private Integer kieu;
    private Integer loai;

    @NotEmpty(message = "Không để trống trường giá trị")
    private BigDecimal giaTri;

    @NotEmpty(message = "Không để trống trường giá trị max")
    private BigDecimal giaTriMax;

    @NotEmpty(message = "Không để trống trường điều kiện giảm")
    private BigDecimal dieuKienGiam;

    @NotEmpty(message = "Không để trống trường mã phiếu")
    @Min(value = 1, message = "Số lượng nhỏ nhất là 1")
    @Max(value = 100, message = "Số lượng lớn nhất là 100")
    private int soLuong;

    @LastModifiedDate
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private LocalDateTime thoiGianBatDau;
    @LastModifiedDate
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private LocalDateTime thoiGianKetThuc;
    private String trangThai;
}
