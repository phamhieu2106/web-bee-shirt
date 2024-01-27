package com.datn.backend.service;

import com.datn.backend.dto.request.HoaDonChiTietRequest;
import com.datn.backend.dto.response.HoaDonChiTietResponse;

/**
 * @author HungDV
 */
public interface HoaDonChiTietService {
    HoaDonChiTietResponse addHoaDonCT(HoaDonChiTietRequest hoaDonChiTietRequest);
    HoaDonChiTietResponse updateHoaDonCT(HoaDonChiTietRequest hoaDonChiTietRequest);
    String deleteHoaDonCT(Integer id);
}
