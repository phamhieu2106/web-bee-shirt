package com.datn.backend.dto.request;

import com.datn.backend.model.dot_giam_gia.DotGiamGia;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class DotGiamGiaRequest {

    private Integer id;

    private String maDotGiamGia;

    @NotEmpty(message = "Code can't be Empty")
    @NotBlank(message = "Code can't be blank")
    private String tenDotGiamGia;

    @NotEmpty(message = "Start Date can't be empty")
    @NotNull(message = "Start Date can't be null")
    private LocalDateTime thoiGianBatDau;

    @NotEmpty(message = "End Date can't be empty")
    @NotNull(message = "End Date can't be null")
    private LocalDateTime thoiGianKetThuc;

    @Min(value = 5, message = "Discount percent must gather than 5")
    @Max(value = 100, message = "Discount percent must below 100")
    private Integer giaTriPhanTram;

    private Integer trangThai;


    public DotGiamGia map(DotGiamGia object) {

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
