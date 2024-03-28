package com.datn.backend.service;

import com.datn.backend.dto.request.ThanhToanRequest;
import com.datn.backend.dto.response.ThanhToanResponse;

/**
 * @author HungDV
 */
public interface ThanhToanService {
    // create
    ThanhToanResponse createThanhToan(ThanhToanRequest thanhToanRequest);

    ThanhToanResponse deleteThanhToan(Integer thanhToanId);
    // update
    // delete
    // get
}
