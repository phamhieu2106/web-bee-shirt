package com.datn.backend.dto.request;

import lombok.*;

import java.util.List;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GHNOrderRequest {
    private int payment_type_id;//Choose who pay shipping fee. 1: Shop/Seller. 2: Buyer/Consignee.
    private String note;
    private String required_note; //CHOTHUHANG, CHOXEMHANGKHONGTHU, KHONGCHOXEMHANG
    private String from_name; // ten nguoi gui
    private String from_phone;// sdt nguoi gui
    private String from_address;//dia chi nguoi gui
    private String from_ward_name;//xa nguoi gui
    private String from_district_name;//huyen nguoi gui
    private String from_province_name;//tinh nguoi gui
    private String return_phone; //Số điện thoại liên hệ để trả lại bưu kiện
    private String return_addres;// dia chi tra lai buu kien
    private String return_district_id;// huyen id tra lai buu kien
    private String return_ward_code; // xa code tra lai buu kien
    private String client_order_code; //Mã đơn hàng bên ngoài được quản lý bởi khách hàng đã đăng nhập
    private String to_name; //ten nguoi nhan
    private String to_phone;// so dien thoai nguoi nhan
    private String to_address; // dia chi nguoi nhan full
    private String to_ward_code;// xa code nguoi nhan
    private String to_district_id; //huyenId nguoi gui
    private long cod_amount; // tien can thu max 10.000.000
    private String content;// noi dung dat hang
    private long weight; //nang (gram)
    private int length;// dai (cm)
    private int width;// rong (cm)
    private int height;// cao (cm)
    private int pick_station_id; //Người gửi hàng không nhận bưu kiện tại địa chỉ cửa hàng
    private String deliver_station_id;
    private int insurance_value ;//Dùng để khai báo giá trị lô hàng.
    private Integer service_id ;// If not input service_type_id
    private Integer service_type_id; //Default value: 2: E-commerce Delivery, 5: Traditional Delivery If not input service_id.
    private String coupon;
    private int[] pick_shift={2}; // "Ca lấy 12-03-2021 (12h00 - 18h00)"
    private List<GHNItemRequest> items;
}
