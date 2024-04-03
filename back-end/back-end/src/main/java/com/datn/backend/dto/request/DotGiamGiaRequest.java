package com.datn.backend.dto.request;

import com.datn.backend.model.dot_giam_gia.DotGiamGia;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class DotGiamGiaRequest {

    private Integer id;

    private String maDotGiamGia;

    @NotEmpty(message = "Code can't be Empty")
    @NotBlank(message = "Code can't be blank")
    private String tenDotGiamGia;

    @NotNull(message = "Start Date can't be null")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss.S")
    private LocalDateTime thoiGianBatDau;

    @NotNull(message = "End Date can't be null")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss.S")
    private LocalDateTime thoiGianKetThuc;

    @Min(value = 5, message = "Discount percent must gather than 5")
    @Max(value = 100, message = "Discount percent must below 100")
    private Integer giaTriPhanTram;

    private Integer trangThai;

    @NotEmpty(message = "List ID can't be empty")
    @NotNull(message = "List ID can't be null")
    private List<Integer> listIdSanPhamChiTiet;

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
