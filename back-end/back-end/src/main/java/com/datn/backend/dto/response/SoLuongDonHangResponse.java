package com.datn.backend.dto.response;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * @author HungDV
 */
@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class SoLuongDonHangResponse {
    private long choXacNhanQuantity;
    private long daXacNhanQuantity;
    private long choGiaoQuantity;
    private long dangGiaoQuantity;
    private long hoanThanhQuantity;
    private long huyQuantity;
    private long traHangQuantity;
    private long choHoanTienQuantity;
    private long daHoanTienQuantity;
}
