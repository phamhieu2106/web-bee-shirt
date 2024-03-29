package com.datn.backend.resource;

import com.datn.backend.dto.response.HoaDonResponse;
import com.datn.backend.dto.response.SpctResponse;
import com.datn.backend.service.HoaDonTraHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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

    @GetMapping("/danh-sach-san-pham")
    public ResponseEntity<List<SpctResponse>> getDanhSachSanPham(
            @RequestParam("id") Integer idHoaDon
    ) {
        return ResponseEntity.ok(hoaDonTraHangService.getDanhSachSanPhamDaMua(idHoaDon));
    }
}
