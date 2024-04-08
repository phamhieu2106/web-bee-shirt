package com.datn.backend.dto.request;

import lombok.Getter;

@Getter
public class AddAddressReq {

    private String hoTen;
    private String sdt;
    private String tinh;
    private String huyen;
    private String xa;
    private String duong;
    private boolean macDinh;
    private int custId;
}
