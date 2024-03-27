package com.datn.backend.resource;

import com.datn.backend.dto.request.ThanhToanRequest;
import com.datn.backend.dto.response.ThanhToanResponse;
import com.datn.backend.service.ThanhToanService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * @author HungDV
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/thanh-toan")
public class ThanhToanResource {
    private final ThanhToanService thanhToanService;

    @PostMapping("/add")
    public ResponseEntity<ThanhToanResponse> addThanhToan(@Valid @RequestBody ThanhToanRequest thanhToanRequest){
        return new ResponseEntity<>(thanhToanService.createThanhToan(thanhToanRequest), HttpStatusCode.valueOf(201));
    }

    @DeleteMapping()
    public ResponseEntity<ThanhToanResponse> deleteThanhToan(@RequestParam(name = "id") Integer thanhToanId){
        return new ResponseEntity<>(thanhToanService.deleteThanhToan(thanhToanId), HttpStatusCode.valueOf(200));
    }
}
