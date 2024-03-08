package com.datn.backend.dto.request;

import com.datn.backend.model.dot_giam_gia.DotGiamGia;
import com.datn.backend.model.dot_giam_gia.DotGiamGiaSanPham;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class DotGiamGiaSanPhamRequest {

    private Integer id;

    private LocalDateTime thoiGianBatDau;

    private LocalDateTime thoiGianKetThuc;

    private Boolean trangThai;

    private DotGiamGia dotGiamGia;

    public DotGiamGiaSanPham map(DotGiamGiaSanPham object){
//        Map Request to entity
        object.setId(this.id);
        object.setThoiGianBatDau(this.thoiGianBatDau);
        object.setThoiGianKetThuc(this.thoiGianKetThuc);
        object.setTrangThai(this.trangThai);
        object.setDotGiamGia(this.dotGiamGia);
//        return object after map
        return object;
    }
}
