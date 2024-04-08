package com.datn.backend.resource;

import com.datn.backend.dto.request.ChangeOrderStatusRequest;
import com.datn.backend.dto.request.HoaDonTraHangRequest;
import com.datn.backend.dto.request.PlaceOrderRequest;
import com.datn.backend.dto.response.HoaDonResponse;
import com.datn.backend.dto.response.HoaDonTraHangResponse;
import com.datn.backend.dto.response.SpctResponse;
import com.datn.backend.model.hoa_don.HoaDonTraHang;
import com.datn.backend.service.HoaDonTraHangService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tra-hang")
public class HoaDonTraHangResource {

    private final HoaDonTraHangService hoaDonTraHangService;

    @Autowired
    public HoaDonTraHangResource(HoaDonTraHangService hoaDonTraHangService) {
        super();
        this.hoaDonTraHangService = hoaDonTraHangService;
    }

    @GetMapping("/tim-hoa-don")
    public ResponseEntity<HoaDonResponse> timHoaDon(
            @RequestParam("ma") String ma
    ) {
        return ResponseEntity.ok(hoaDonTraHangService.getHoaDonByMa(ma.trim()));
    }

    @GetMapping("/tim-hoa-don-tra-hang")
    public ResponseEntity<HoaDonTraHangResponse> timHoaDon(
            @RequestParam("id") Integer id
    ) {
        return ResponseEntity.ok(hoaDonTraHangService.getByIdHoaDon(id));
    }

    @GetMapping("/danh-sach-san-pham")
    public ResponseEntity<List<SpctResponse>> getDanhSachSanPham(
            @RequestParam("id") Integer idHoaDon
    ) {
        return ResponseEntity.ok(hoaDonTraHangService.getDanhSachSanPhamDaMua(idHoaDon));
    }

    @GetMapping("/dot-giam-gia-san-pham")
    public ResponseEntity<List<Integer>> getListIdDotGiamGiaSanPhamByIdHoaDon(
            @RequestParam("id") Integer idHoaDon
    ) {
        return ResponseEntity.ok(hoaDonTraHangService.getListIdDotGiamGiaSanPhamByIdHoaDon(idHoaDon));
    }

    @PostMapping
    public ResponseEntity<HoaDonResponse> traHang(@Valid @RequestBody ChangeOrderStatusRequest changeOrderStatus) {
        return ResponseEntity.ok(hoaDonTraHangService.traHang(changeOrderStatus));
    }

    @PostMapping("/tao-hoa-don-tra-hang")
    public ResponseEntity<HoaDonTraHangResponse> taoHoaDonTraHang(@Valid @RequestBody HoaDonTraHangRequest hoaDonTraHangRequest) {
        HoaDonTraHangResponse hoaDonTraHangResponse = hoaDonTraHangService.add(hoaDonTraHangRequest);
        return ResponseEntity.ok(hoaDonTraHangResponse);
    }

    @PostMapping("/place-order-tra-hang")
    public ResponseEntity<HoaDonResponse> placeOrderTraHang(@Valid @RequestBody PlaceOrderRequest placeOrderRequest) {
            HoaDonResponse hoaDonResponse = hoaDonTraHangService.placeOrderTraHang(placeOrderRequest);
            return ResponseEntity.ok(hoaDonResponse);
    }
}
