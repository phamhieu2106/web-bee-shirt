package com.datn.backend.resource;

import com.datn.backend.dto.request.HoaDonChiTietRequest;
import com.datn.backend.dto.response.HoaDonChiTietResponse;
import com.datn.backend.exception.custom_exception.IdNotFoundException;
import com.datn.backend.service.HoaDonChiTietService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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
public class HoaDonChiTietResouce {
    private final HoaDonChiTietService hoaDonChiTietService;
    // add
    @PostMapping("/add")
    public ResponseEntity<?> addHoaDonChiTiet(){
        return ResponseEntity.ok(null);
    }
    // update
    @PutMapping("/update")
    public ResponseEntity<HoaDonChiTietResponse> updateHoaDonChiTiet(@Valid @RequestBody HoaDonChiTietRequest hoaDonChiTietRequest){
        return ResponseEntity.ok(hoaDonChiTietService.updateHoaDonCT(hoaDonChiTietRequest));
    }
    // delete
    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateHoaDonChiTiet(@PathVariable Integer id){
        if (id.describeConstable().isEmpty()){
            throw new IdNotFoundException("ID không hợp lệ");
        }
        return ResponseEntity.ok(hoaDonChiTietService.deleteHoaDonCT(id));
    }
}
