package com.datn.backend.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
public class CapNhatNhanhSpctReq {

    private List<Integer> ids;
    private List<BigDecimal> giaNhaps;
    private List<BigDecimal> giaBans;
    private List<Integer> soLuongs;
}
