package com.datn.backend.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreatePaymentVNPayReq {

    public String vnp_Amount;
    public String vnp_OrderInfo = "Thanh toán hóa đơn";
    public String vnp_OrderType = "Thanh toán hóa đơn";
    public String vnp_TxnRef;
}
