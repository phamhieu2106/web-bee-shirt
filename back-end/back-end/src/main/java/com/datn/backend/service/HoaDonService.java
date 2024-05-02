package com.datn.backend.service;

import com.datn.backend.dto.request.*;
import com.datn.backend.dto.response.HoaDonResponse;
import com.datn.backend.dto.response.LichSuHoaDonResponse;
import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.dto.response.SoLuongDonHangResponse;
import com.datn.backend.model.hoa_don.HoaDon;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.domain.Pageable;

import java.io.UnsupportedEncodingException;
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

    HoaDonResponse placeOrderOnline(OnlineOrderRequest req);

    HoaDonResponse getByCode(String code);

    List<HoaDonResponse> getOrdersForClient(int custId, String orderStatus);

    List<HoaDonResponse> getNoneLoggedOrdersByPhone(String phone);

    String payWithVNPAYOnline(CreatePaymentVNPayReq payModel, HttpServletRequest request) throws UnsupportedEncodingException;

    HoaDonResponse refundMoney(ThanhToanRequest thanhToanRequest);
}
