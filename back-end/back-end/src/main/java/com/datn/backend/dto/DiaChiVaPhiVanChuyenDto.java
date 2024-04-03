package com.datn.backend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class DiaChiVaPhiVanChuyenDto {

    private String tinh;
    private Integer tinhId;
    private String huyen;
    private Integer huyenId;
    private String xa;
    private String xaCode;
    private String cuThe;
    private Integer service_id;
    private Integer service_type_id;
}
