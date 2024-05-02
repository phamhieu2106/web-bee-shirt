package com.datn.backend.resource;

import com.datn.backend.constant.ApplicationConstant;
import com.datn.backend.dto.request.*;
import com.datn.backend.dto.response.HoaDonResponse;
import com.datn.backend.dto.response.LichSuHoaDonResponse;
import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.dto.response.SoLuongDonHangResponse;
import com.datn.backend.service.HoaDonService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
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

import java.io.UnsupportedEncodingException;
import java.util.List;

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
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        PagedResponse<HoaDonResponse> hoaDons = hoaDonService.getAll(pageable, search, loaiHoaDon, ngayTao, trangThai);
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

    // Refund money
    @PostMapping("/change-status/refund")
    public ResponseEntity<HoaDonResponse> onRefund(@Valid @RequestBody ThanhToanRequest thanhToanRequest) {
        HoaDonResponse hoaDonResponse = hoaDonService.refundMoney(thanhToanRequest);
        return ResponseEntity.ok(hoaDonResponse);
    }

    // update
    @PutMapping("/update")
    public ResponseEntity<HoaDonResponse> updateHoaDon(@Valid @RequestBody HoaDonRequest hoaDonRequest) {
        HoaDonResponse hoaDonResponse = hoaDonService.updateHoaDon(hoaDonRequest);
        return ResponseEntity.ok(hoaDonResponse);
    }

    @GetMapping("/get-order-quantity-all")
    public ResponseEntity<SoLuongDonHangResponse> getSoLuongDonHang() {
        SoLuongDonHangResponse soLuongDonHangResponse = hoaDonService.getSoLuongDonHang();
        return ResponseEntity.ok(soLuongDonHangResponse);
    }

    @PostMapping("/place-order")
    public ResponseEntity<HoaDonResponse> placeOrder(@Valid @RequestBody PlaceOrderRequest placeOrderRequest) {
        HoaDonResponse hoaDonResponse = hoaDonService.placeOrder(placeOrderRequest);
        return ResponseEntity.ok(hoaDonResponse);
    }

    // client
    @PostMapping("/place-order-online")
    public ResponseEntity<HoaDonResponse> placeOrderOnline(@RequestBody OnlineOrderRequest req) {
        HoaDonResponse savedOrder = hoaDonService.placeOrderOnline(req);
        return ResponseEntity.ok(savedOrder);
    }

    @GetMapping("/get-by-code/{code}")
    public ResponseEntity<HoaDonResponse> getByCode(@PathVariable("code") String code) {
        return ResponseEntity.ok(hoaDonService.getByCode(code));
    }

    @GetMapping("/all-orders/{custId}/{orderStatus}")
    public ResponseEntity<List<HoaDonResponse>> getOrdersForClient(@PathVariable("custId") int custId,
                                                                   @PathVariable("orderStatus") String orderStatus) {
        return ResponseEntity.ok(hoaDonService.getOrdersForClient(custId, orderStatus));
    }

    @GetMapping("/none-logged-orders/{phone}")
    public ResponseEntity<List<HoaDonResponse>> getNoneLoggedOrdersByPhone(@PathVariable("phone") String phone) {
        return ResponseEntity.ok(hoaDonService.getNoneLoggedOrdersByPhone(phone));
    }

    // thanh toan voi vnpay
    @PostMapping("/payment-vnpay")
    public ResponseEntity paymentWithVNPay(@RequestBody CreatePaymentVNPayReq payModel,
                                           HttpServletRequest request) {
        try {
            return ResponseEntity.ok(hoaDonService.payWithVNPAYOnline(payModel, request)) ;
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
    }
}
