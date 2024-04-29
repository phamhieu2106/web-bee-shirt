package com.datn.backend.resource;

import com.datn.backend.dto.request.AddHoaDonChiTietRequest;
import com.datn.backend.dto.request.HoaDonChiTietRequest;
import com.datn.backend.dto.response.HoaDonChiTietResponse;
import com.datn.backend.exception.custom_exception.IdNotFoundException;
import com.datn.backend.service.HoaDonChiTietService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author HungDV
 */
@RestController
@RequestMapping("/hoa-don-chi-tiet")
@RequiredArgsConstructor
public class HoaDonChiTietResource {
    private final HoaDonChiTietService hoaDonChiTietService;

    // add
    @PostMapping("/add")
    public ResponseEntity<HoaDonChiTietResponse> addHoaDonChiTiet(@Valid @RequestBody AddHoaDonChiTietRequest hoaDonChiTietRequest) {
        return ResponseEntity.ok(hoaDonChiTietService.addHoaDonCT(hoaDonChiTietRequest));
    }

    // update
    @PutMapping("/update")
    public ResponseEntity<HoaDonChiTietResponse> updateHoaDonChiTiet(@Valid @RequestBody HoaDonChiTietRequest hoaDonChiTietRequest) {
        HoaDonChiTietResponse hoaDonChiTietResponse = hoaDonChiTietService.updateHoaDonCT(hoaDonChiTietRequest);
        return ResponseEntity.ok(hoaDonChiTietResponse);
    }

    // delete
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HoaDonChiTietResponse> updateHoaDonChiTiet(@PathVariable Integer id) {
        if (id.describeConstable().isEmpty()) {
            throw new IdNotFoundException("ID không hợp lệ");
        }
        HoaDonChiTietResponse hoaDonChiTietResponse = hoaDonChiTietService.deleteHoaDonCT(id);
        return ResponseEntity.ok(hoaDonChiTietResponse);
    }
}
