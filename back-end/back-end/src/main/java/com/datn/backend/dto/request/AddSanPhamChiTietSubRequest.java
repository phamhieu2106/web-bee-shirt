package com.datn.backend.dto.request;

import lombok.Getter;

import java.util.List;

@Getter
public class AddSanPhamChiTietSubRequest {

    private int mauSacId;
    private List<Integer> kichCoIdList;
    private List<Integer> soLuongTonList;
}
