package com.datn.backend.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;

/**
 * @author HungDV
 */
@Builder
@Data
public class ChangeOrderStatusRequest {

    @Min(value = 0, message = "ID hóa đơn không hợp lệ")
    private int idHoaDon;

    @Size(min = 10, message = "Mô tả phải có ít nhất 10 kí tự")
    @NotBlank(message = "Mô tả không được trống")
    private String moTa;

    private boolean isNext;
}
