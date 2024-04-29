package com.datn.backend.resource;

import com.datn.backend.dto.response.ProductDiscountSummaryResponse;
import com.datn.backend.dto.response.SanPhamResponse;
import com.datn.backend.service.SanPhamService2;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/san-pham")
@RequiredArgsConstructor
public class SanPhamResource2 {

    private final SanPhamService2 sanPhamService;

    @GetMapping("/checkInDiscount")
    public ResponseEntity<List<Integer>> checkInDiscount() {
        return ResponseEntity.ok(sanPhamService.check());
    }

    @GetMapping("/itemInDiscount")
    public ResponseEntity<List<ProductDiscountSummaryResponse>> getItemInDiscount(@RequestParam("id") Integer id) {
        return ResponseEntity.ok(sanPhamService.getProductInDiscount(id));
    }

    @GetMapping("/nameItem")
    public ResponseEntity<SanPhamResponse> getItemName(@RequestParam("id") Integer id) {
        return ResponseEntity.ok(sanPhamService.getNameSanPhamBySanPhamChiTietId(id));
    }
}
