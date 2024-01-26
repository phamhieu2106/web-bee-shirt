package com.datn.backend.dto.response;

import com.datn.backend.enumeration.LoaiHinhThuc;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * @author HungDV
 */
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class HinhThucThanhToanResponse {
    private Integer id;

    private String hinhThuc;
}
