package com.datn.backend.dto.request;

import com.datn.backend.model.dot_giam_gia.DotGiamGia;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class DotGiamGiaRequest {

    private Integer id;

    @NotNull(message = "Code can't be null")
    @NotEmpty(message = "Code can't be empty")
    private String maDotGiamGia;

    @NotNull(message = "Name can't be null")
    @NotEmpty(message = "Name can't be empty")
    private String tenDotGiamGia;

    @Min(value = 5,message = "Discount percent must gather than 5")
    @Max(value = 100, message = "Discount percent must below 100")
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
