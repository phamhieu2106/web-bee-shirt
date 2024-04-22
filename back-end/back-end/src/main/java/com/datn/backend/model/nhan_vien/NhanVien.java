package com.datn.backend.model.nhan_vien;

import com.datn.backend.model.Account;
import com.datn.backend.model.BaseEntity;
import com.datn.backend.model.khach_hang.CustomerImage;
import com.datn.backend.model.nhan_vien.StaffImage;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
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

    private String cccd;

    private String hoTen;

    private LocalDate ngaySinh;

    private String sdt;

    private boolean gioiTinh;

    private String email;

    private String diaChi;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "account_id")
    private Account account;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "image_id")
    private StaffImage image;
}
