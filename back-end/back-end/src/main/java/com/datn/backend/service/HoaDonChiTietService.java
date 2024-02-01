package com.datn.backend.service;

import com.datn.backend.dto.request.HoaDonChiTietRequest;
import com.datn.backend.dto.response.HoaDonChiTietResponse;
import com.datn.backend.dto.response.MessageResponse;

/**
 * @author HungDV
 */
public interface HoaDonChiTietService {
    HoaDonChiTietResponse addHoaDonCT(HoaDonChiTietRequest hoaDonChiTietRequest);
    HoaDonChiTietResponse updateHoaDonCT(HoaDonChiTietRequest hoaDonChiTietRequest);
    HoaDonChiTietResponse deleteHoaDonCT(Integer id);
}
