package com.datn.backend.dto.request;

import lombok.Getter;

import java.math.BigDecimal;
import java.util.List;

@Getter
public class AddSpctSubReq {

    private int mauSacId;
    private List<Integer> kichCoIdList;
    private List<BigDecimal> giaNhapList;
    private List<BigDecimal> giaBanList;
    private List<Integer> soLuongTonList;
}
