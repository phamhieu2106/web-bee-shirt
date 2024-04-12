package com.datn.backend.service;

import com.datn.backend.dto.request.AddHoaDonChiTietRequest;
import com.datn.backend.dto.request.HoaDonChiTietRequest;
import com.datn.backend.dto.response.HoaDonChiTietResponse;
import com.datn.backend.dto.response.MessageResponse;

/**
 * @author HungDV
 */
public interface HoaDonChiTietService {
    HoaDonChiTietResponse addHoaDonCT(AddHoaDonChiTietRequest hoaDonChiTietRequest);
    HoaDonChiTietResponse updateHoaDonCT(HoaDonChiTietRequest hoaDonChiTietRequest);
    HoaDonChiTietResponse deleteHoaDonCT(Integer id);

    void updateHoaDonAfterUpdateHDCT(Integer idHoaDon);
}
