package com.datn.backend.service;

import com.datn.backend.dto.request.AddHoaDonChiTietRequest;
import com.datn.backend.dto.request.HoaDonChiTietRequest;
import com.datn.backend.dto.response.HoaDonChiTietResponse;
import com.datn.backend.dto.response.MessageResponse;
import com.datn.backend.model.hoa_don.HoaDon;

/**
 * @author HungDV
 */
public interface HoaDonChiTietService {
    HoaDonChiTietResponse addHoaDonCT(AddHoaDonChiTietRequest hoaDonChiTietRequest);
    HoaDonChiTietResponse updateHoaDonCT(HoaDonChiTietRequest hoaDonChiTietRequest);
    HoaDonChiTietResponse deleteHoaDonCT(Integer id);

    HoaDon updateHoaDonAfterUpdateHDCT(Integer idHoaDon);
}
