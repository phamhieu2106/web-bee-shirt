package com.datn.backend.service;

import com.datn.backend.dto.request.HoaDonTraHangRequest;
import com.datn.backend.dto.response.HoaDonResponse;
import com.datn.backend.dto.response.SpctResponse;

import java.util.List;

public interface HoaDonTraHangService {

    HoaDonResponse getHoaDonByMa(String ma);

    HoaDonResponse handleTraHang(HoaDonTraHangRequest hoaDonTraHangRequest);

    List<SpctResponse> getDanhSachSanPhamDaMua(Integer idHoaDon);
}
