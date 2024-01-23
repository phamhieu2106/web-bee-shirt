package com.datn.backend.dto.request;

import com.datn.backend.model.dot_giam_gia.DotGiamGia;
import lombok.Data;

@Data
public class DotGiamGiaRequest {

    private Integer id;

    private String maDotGiamGia;

    private String tenDotGiamGia;

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
