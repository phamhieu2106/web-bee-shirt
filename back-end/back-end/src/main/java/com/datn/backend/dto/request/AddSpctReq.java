package com.datn.backend.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddSpctReq {

    private Integer id;
    private int sanPhamId;
    private int kieuDangId;
    private int thietKeId;
    private int tayAoId;
    private int coAoId;
    private int chatLieuId;
    private AddSpctSubReq requests;
}
