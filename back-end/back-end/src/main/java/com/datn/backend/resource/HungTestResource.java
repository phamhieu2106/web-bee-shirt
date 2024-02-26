package com.datn.backend.resource;

import com.datn.backend.constant.ApplicationConstant;
import com.datn.backend.dto.response.HoaDonResponse;
import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.dto.response.SpctResponse;
import com.datn.backend.service.SanPhamChiTietService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author HungDV
 */
@RestController
@RequestMapping("/spct")
@RequiredArgsConstructor
public class HungTestResource {
    private final SanPhamChiTietService sanPhamChiTietService;
    @GetMapping("/get-all")
    public ResponseEntity<PagedResponse<SpctResponse>> getAll(
            @RequestParam(defaultValue = ApplicationConstant.DEFAULT_PAGE_SIZE) int pageSize,
            @RequestParam(defaultValue = ApplicationConstant.DEFAULT_PAGE_NUM) int pageNumber,
            @RequestParam(defaultValue = "") String search
    ) {
        return ResponseEntity.ok( sanPhamChiTietService.getAll(pageNumber,pageSize,search));
    }
}
