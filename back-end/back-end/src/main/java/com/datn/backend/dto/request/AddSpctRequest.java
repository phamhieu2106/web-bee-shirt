package com.datn.backend.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddSpctRequest {

    private Integer id;
    private int sanPhamId;
    private int kieuDangId;
    private int thietKeId;
    private int tayAoId;
    private int coAoId;
    private int chatLieuId;
    private AddSpctSubRequest requests;

    @Override
    public String toString() {
        return "AddSanPhamChiTietRequest{" +
                "id=" + id +
                ", sanPhamId=" + sanPhamId +
                ", kieuDangId=" + kieuDangId +
                ", thietKeId=" + thietKeId +
                ", tayAoId=" + tayAoId +
                ", coAoId=" + coAoId +
                ", chatLieuId=" + chatLieuId +
                ", requests=" + requests +
                '}';
    }
}
