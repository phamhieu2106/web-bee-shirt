package com.datn.backend.dto.response;

import lombok.*;

/**
 * @author HungDV
 */

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class KhachHangHoaDonResponse {
    private Integer id;
    private String hoTen;
    private String sdt;
    private String email;
}
