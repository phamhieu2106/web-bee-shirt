package com.datn.backend.resource;

import com.datn.backend.constant.ApplicationConstant;
import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.dto.response.SpctResponse;
import com.datn.backend.service.SanPhamChiTietService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

/**
 * @author HungDV
 */
@RestController
@RequestMapping("/spct")
@RequiredArgsConstructor
public class SanPhamChiTietResource2 {

    private final SanPhamChiTietService sanPhamChiTietService;

    @GetMapping("/get-all")
    public ResponseEntity<PagedResponse<SpctResponse>> getAll(
            @RequestParam(defaultValue = ApplicationConstant.DEFAULT_PAGE_SIZE) int pageSize,
            @RequestParam(defaultValue = ApplicationConstant.DEFAULT_PAGE_NUM) int pageNumber,
            @RequestParam(defaultValue = "") String search
    ) {
        return ResponseEntity.ok(sanPhamChiTietService.getAll(pageNumber, pageSize, search));
    }

    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<SpctResponse> getById(
            @PathVariable Integer id
    ) {
        return ResponseEntity.ok(sanPhamChiTietService.getById(id));
    }

    @GetMapping("/min-max-price")
    public ResponseEntity<?> getMinMaxPrice() {
        long[][] minMaxPrice = sanPhamChiTietService.minMaxPrice();
        return ResponseEntity.ok(minMaxPrice[0]);
    }

    @GetMapping("/get-all-detail")
    public ResponseEntity<PagedResponse<SpctResponse>> getDetail(
            @RequestParam(defaultValue = ApplicationConstant.DEFAULT_PAGE_SIZE) int pageSize,
            @RequestParam(defaultValue = ApplicationConstant.DEFAULT_PAGE_NUM) int pageNumber,
            @RequestParam(defaultValue = "") String search,
            @RequestParam(defaultValue = "") String mauSac,
            @RequestParam(defaultValue = "") String kichCo,
            @RequestParam(defaultValue = "") String kieuDang,
            @RequestParam(defaultValue = "") String thietKe,
            @RequestParam(defaultValue = "") String tayAo,
            @RequestParam(defaultValue = "") String coAo,
            @RequestParam(defaultValue = "") String chatLieu,
            @RequestParam(defaultValue = "0") BigDecimal giaMin,
            @RequestParam(defaultValue = "999999999999999") BigDecimal giaMax
    ) {
        return ResponseEntity.ok(sanPhamChiTietService.getDetailSpct(pageSize, pageNumber, search.trim(), mauSac, kichCo, kieuDang, thietKe, tayAo, coAo, chatLieu, giaMin, giaMax));
    }
}