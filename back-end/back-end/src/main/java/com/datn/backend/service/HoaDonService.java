package com.datn.backend.service;

import com.datn.backend.dto.request.ChangeOrderStatusRequest;
import com.datn.backend.dto.request.HoaDonRequest;
import com.datn.backend.dto.response.HoaDonResponse;
import com.datn.backend.dto.response.LichSuHoaDonResponse;
import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.dto.response.SoLuongDonHangResponse;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;

/**
 * @author HungDV
 */
public interface HoaDonService {
    PagedResponse<HoaDonResponse> getAll(Pageable pageable, String search, String loaiHoaDon, String ngayTao,String trangThai);

    HoaDonResponse getById(Integer id);

    LichSuHoaDonResponse changeOrderStatus(ChangeOrderStatusRequest changeOrderStatus);

    LichSuHoaDonResponse cancelOrder(ChangeOrderStatusRequest changeOrderStatus);

    HoaDonResponse updateHoaDon(HoaDonRequest hoaDonRequest);

    SoLuongDonHangResponse getSoLuongDonHang();
}
