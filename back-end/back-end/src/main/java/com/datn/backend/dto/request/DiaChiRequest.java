package com.datn.backend.dto.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class DiaChiRequest {

    private Integer id;
    private String tinh;
    private String huyen;
    private String xa;
    private String duong;
    private boolean macDinh;
}
