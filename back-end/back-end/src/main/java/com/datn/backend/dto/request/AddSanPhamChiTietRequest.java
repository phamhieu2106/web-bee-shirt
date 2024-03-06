package com.datn.backend.dto.request;

import lombok.Getter;

@Getter
public class AddSanPhamChiTietRequest {

    private Integer id;
    private int sanPhamId;
    private int kieuDangId;
    private int thietKeId;
    private int tayAoId;
    private int coAoId;
    private int chatLieuId;
    private AddSanPhamChiTietSubRequest requests;

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
