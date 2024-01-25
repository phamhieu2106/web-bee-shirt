package com.datn.backend.dto.response;

import com.datn.backend.model.san_pham.SanPhamChiTiet;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;

/**
 * @author HungDV
 */
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class HoaDonChiTietResponse {
    private Integer id;
    private int soLuong;
    private BigDecimal giaBan;
//    private SanPhamChiTietResponse sanPhamChiTiet;
}
