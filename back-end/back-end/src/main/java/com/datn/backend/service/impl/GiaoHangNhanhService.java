package com.datn.backend.service.impl;

import org.springframework.stereotype.Service;

@Service
public class GiaoHangNhanhService {
    private final String url = "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create";
    private final String shopId = "190872";
    private final String token = "18076f8d-bcb9-11ee-b1d4-92b443b7a897";
}
