package com.datn.backend.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "nhan_vien")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class NhanVien extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank(message = "Họ tên không được trống")
    private String hoTen;

    @NotNull(message = "Ngày sinh không được trống")
    private LocalDate ngaySinh;

    @NotBlank(message = "Sdt không được trống")
    private String sdt;

    private boolean gioiTinh;

    @NotBlank(message = "Email không được trống")
    private String email;

    @NotBlank(message = "Địa chỉ không được trống")
    private String diaChi;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "account_id")
    private Account account;
}
