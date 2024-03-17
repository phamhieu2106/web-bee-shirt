package com.datn.backend.resource;

import com.datn.backend.constant.ApplicationConstant;
import com.datn.backend.dto.request.ChangeOrderStatusRequest;
import com.datn.backend.dto.request.HoaDonRequest;
import com.datn.backend.dto.response.HoaDonResponse;
import com.datn.backend.dto.response.LichSuHoaDonResponse;
import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.dto.response.SoLuongDonHangResponse;
import com.datn.backend.exception.custom_exception.IdNotFoundException;
import com.datn.backend.service.HoaDonService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.Optional;

/**
 * @author HungDV
 */
@RestController
@RequestMapping("/hoa-don")
@RequiredArgsConstructor
public class HoaDonResource {
    private final HoaDonService hoaDonService;
    // get all
    @GetMapping("/ds-hoa-don")
    public ResponseEntity<PagedResponse<HoaDonResponse>> getAll(
            @RequestParam(defaultValue = ApplicationConstant.DEFAULT_PAGE_SIZE) int pageSize,
            @RequestParam(defaultValue = ApplicationConstant.DEFAULT_PAGE_NUM) int pageNumber,
            @RequestParam(defaultValue = "") String search,
            @RequestParam(defaultValue = "") String loaiHoaDon,
            @RequestParam(defaultValue = "") String ngayTao,
            @RequestParam(defaultValue = "") String trangThai
    ) {
        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        PagedResponse<HoaDonResponse> hoaDons = hoaDonService.getAll(pageable,search,loaiHoaDon,ngayTao, trangThai);
        return ResponseEntity.ok(hoaDons);
    }
    // get by id
    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<HoaDonResponse> getByID(@PathVariable Integer id) {
        HoaDonResponse hoaDonResponse = hoaDonService.getById(id);
        return ResponseEntity.ok(hoaDonResponse);
    }

    // change status
    @PostMapping("/change-status")
    public ResponseEntity<LichSuHoaDonResponse> changeStatus(@Valid @RequestBody ChangeOrderStatusRequest changeOrderStatus) {
        LichSuHoaDonResponse hoaDonResponse = hoaDonService.changeOrderStatus(changeOrderStatus);
        return ResponseEntity.ok(hoaDonResponse);
    }
    // Cancel order
    @PostMapping("/change-status/cancel")
    public ResponseEntity<LichSuHoaDonResponse> onCancelOrder(@Valid @RequestBody ChangeOrderStatusRequest changeOrderStatus) {
        LichSuHoaDonResponse lichSuHoaDonResponse = hoaDonService.cancelOrder(changeOrderStatus);
        return ResponseEntity.ok(lichSuHoaDonResponse);
    }
    // update
    @PutMapping("/update")
    public ResponseEntity<HoaDonResponse> updateHoaDon(@Valid @RequestBody HoaDonRequest hoaDonRequest) {
        HoaDonResponse hoaDonResponse = hoaDonService.updateHoaDon(hoaDonRequest);
        return ResponseEntity.ok(hoaDonResponse);
    }
    // delete
    @GetMapping("/get-order-quantity-all")
    public ResponseEntity<SoLuongDonHangResponse> getSoLuongDonHang() {
        SoLuongDonHangResponse soLuongDonHangResponse = hoaDonService.getSoLuongDonHang();
        return ResponseEntity.ok(soLuongDonHangResponse);
    }


}
