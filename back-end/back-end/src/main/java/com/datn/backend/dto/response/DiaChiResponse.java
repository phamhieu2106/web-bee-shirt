package com.datn.backend.dto.response;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class DiaChiResponse {
    private Integer id;

    private String hoTen;
    private String sdt;
    private String tinh;
    private String huyen;
    private String xa;
    private String duong;
    private boolean macDinh;
}
