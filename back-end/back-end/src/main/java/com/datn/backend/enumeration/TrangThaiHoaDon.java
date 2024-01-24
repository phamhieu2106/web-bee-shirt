package com.datn.backend.enumeration;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * @author HungDV
 */
@AllArgsConstructor
@Getter
public enum TrangThaiHoaDon {
    TAO_DON("Tạo đơn hàng"),//
    CHO_XAC_NHAN("Chờ xác nhận"), // chờ xác nhận
    DA_XAC_NHAN("Đã xác nhận"),// đã xác nhận
    CHO_GIAO("Chờ giao hàng"), // chờ giao hàng
    DANG_GIAO("Đang giao hàng"),// đang giao hàng
    HOAN_THANH("Hoàn thành"), // hoaàn thành
    HUY("Hủy"); // HỦy

    private String title;
}
