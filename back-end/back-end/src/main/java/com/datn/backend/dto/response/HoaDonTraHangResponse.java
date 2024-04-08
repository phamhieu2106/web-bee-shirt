package com.datn.backend.dto.response;

import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class HoaDonTraHangResponse {

    private String ma;
    private String tenNguoiNhan;
    private String sdtNguoiNhan;
    private String emailNguoiNhan;
    private String diaChiNguoiNhan;
    private BigDecimal tongTien;
    private String ghiChu;

    private List<HoaDonChiTietResponse> hoaDonChiTiets;
    private HoaDonResponse hoaDon;

}
