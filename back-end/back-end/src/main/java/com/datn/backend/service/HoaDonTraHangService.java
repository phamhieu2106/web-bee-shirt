package com.datn.backend.service;

import com.datn.backend.dto.request.ChangeOrderStatusRequest;
import com.datn.backend.dto.request.HoaDonTraHangRequest;
import com.datn.backend.dto.request.PlaceOrderRequest;
import com.datn.backend.dto.response.HoaDonResponse;
import com.datn.backend.dto.response.HoaDonTraHangResponse;
import com.datn.backend.dto.response.SpctResponse;
import com.datn.backend.model.hoa_don.HoaDonTraHang;

import java.util.List;

public interface HoaDonTraHangService {

    HoaDonResponse getHoaDonByMa(String ma);

    List<SpctResponse> getDanhSachSanPhamDaMua(Integer idHoaDon);

    List<Integer> getListIdDotGiamGiaSanPhamByIdHoaDon(Integer idHoaDon);

    HoaDonResponse traHang(ChangeOrderStatusRequest changeOrderStatus);

    HoaDonTraHangResponse add(HoaDonTraHangRequest hoaDonTraHangRequest);

    HoaDonTraHangResponse getByIdHoaDon(Integer id);

    HoaDonResponse placeOrderTraHang(PlaceOrderRequest placeOrderRequest);
}
