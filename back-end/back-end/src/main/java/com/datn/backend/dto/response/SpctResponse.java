package com.datn.backend.dto.response;

import com.datn.backend.model.san_pham.HinhAnh;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

/**
 * @author HungDV
 */
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class SpctResponse {
    private Integer id;

    private BigDecimal giaNhap;

    private BigDecimal giaBan;

    private int soLuongTon;

    private boolean trangThai;

    private SanPhamResponse sanPham;

    private MauSacResponse mauSac;

    private KichCoResponse kichCo;

    private KieuDangResponse kieuDang;

    private KieuThietKeResponse thietKe;

    private TayAoResponse tayAo;

    private CoAoResponse coAo;

    private ChatLieuResponse chatLieu;

    private DotGiamGiaResponse2 dotGiamGia;

    private List<HinhAnh> hinhAnhs = new ArrayList<>();
}
