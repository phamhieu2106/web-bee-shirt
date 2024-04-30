package com.datn.backend.enumeration;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * @author HungDV
 */
@AllArgsConstructor
@Getter
public enum TrangThaiHoaDon {

    TAO_DON("Tạo đơn hàng", "CHO_XAC_NHAN", "TAO_DON"), //
    CHO_XAC_NHAN("Chờ xác nhận", "DA_XAC_NHAN", "TAO_DON"), // chờ xác nhận
    DA_XAC_NHAN("Đã xác nhận", "CHO_GIAO", "CHO_XAC_NHAN"), // đã xác nhận
    CHO_GIAO("Chờ giao hàng", "DANG_GIAO", "DA_XAC_NHAN"), // chờ giao hàng
    DANG_GIAO("Đang giao hàng", "HOAN_THANH", "CHO_GIAO"), // đang giao hàng
    HOAN_THANH("Hoàn thành", "TRA_HANG", "DANG_GIAO"), // hoàn thành
    HUY("Hủy", "HUY", "CHO_XAC_NHAN"), // Hủy
    TRA_HANG("Trả hàng", "TRA_HANG", "HOAN_THANH"), // Trả Hàng
    HOAN_TIEN("Hoàn tiền", "", ""), // không dùng
    CHO_HOAN_TIEN("Chờ hoàn tiền", "", ""),
    DA_HOAN_TIEN("Đã hoàn tiền", "", "");

    private String title;
    private String next;
    private String prev;
}
