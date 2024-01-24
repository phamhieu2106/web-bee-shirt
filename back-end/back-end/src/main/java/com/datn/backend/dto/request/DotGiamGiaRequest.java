package com.datn.backend.dto.request;

import com.datn.backend.model.dot_giam_gia.DotGiamGia;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;

@Data
public class DotGiamGiaRequest {

    private Integer id;

    private String maDotGiamGia;

    private String tenDotGiamGia;

    private LocalDateTime thoiGianBatDau;

    private LocalDateTime thoiGianKetThuc;

    private Integer giaTriPhanTram;

    private Integer trangThai;


    public DotGiamGia map(DotGiamGia object){

//      Map request to Entity
        object.setId(this.id);
        object.setMaDotGiamGia(this.maDotGiamGia);
        object.setTenDotGiamGia(this.tenDotGiamGia);
        object.setGiaTriPhanTram(this.giaTriPhanTram);
        object.setTrangThai(this.trangThai);

//      return object after map
        return object;

    }
}
