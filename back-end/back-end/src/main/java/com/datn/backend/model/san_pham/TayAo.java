package com.datn.backend.model.san_pham;

import com.datn.backend.model.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tay_ao")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class TayAo extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String ten;
}
