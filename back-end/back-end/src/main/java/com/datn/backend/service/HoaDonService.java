package com.datn.backend.service;

import com.datn.backend.dto.request.ChangeOrderStatusRequest;
import com.datn.backend.dto.request.HoaDonRequest;
import com.datn.backend.dto.request.OnlineOrderRequest;
import com.datn.backend.dto.request.PlaceOrderRequest;
import com.datn.backend.dto.response.HoaDonResponse;
import com.datn.backend.dto.response.LichSuHoaDonResponse;
import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.dto.response.SoLuongDonHangResponse;
import com.datn.backend.model.hoa_don.HoaDon;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;

/**
 * @author HungDV
 */
public interface HoaDonService {
    PagedResponse<HoaDonResponse> getAll(Pageable pageable, String search, String loaiHoaDon, String ngayTao, String trangThai);

    HoaDonResponse getById(Integer id);

    LichSuHoaDonResponse changeOrderStatus(ChangeOrderStatusRequest changeOrderStatus);

    LichSuHoaDonResponse cancelOrder(ChangeOrderStatusRequest changeOrderStatus);

    HoaDonResponse updateHoaDon(HoaDonRequest hoaDonRequest);

    SoLuongDonHangResponse getSoLuongDonHang();

    HoaDonResponse placeOrder(PlaceOrderRequest placeOrderRequest);

    String placeOrderOnline(OnlineOrderRequest req);

    HoaDonResponse getByCode(String code);

    List<HoaDonResponse> getOrdersForClient(int custId, String orderStatus);
}
