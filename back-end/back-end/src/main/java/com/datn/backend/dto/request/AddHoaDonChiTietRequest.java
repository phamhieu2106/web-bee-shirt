package com.datn.backend.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AddHoaDonChiTietRequest {

    @NotNull(message = "Sản phẩm không hợp lệ")
    private Integer sanPhamChiTietId;

    @NotNull(message = "Hóa Đơn không hợp lệ")
    private Integer hoaDonId;
}
