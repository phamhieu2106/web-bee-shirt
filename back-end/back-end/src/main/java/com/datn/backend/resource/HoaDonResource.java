package com.datn.backend.resource;

import com.datn.backend.constant.ApplicationConstant;
import com.datn.backend.dto.response.HoaDonResponse;
import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.service.HoaDonService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

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
            @RequestParam(defaultValue = ApplicationConstant.DEFAULT_PAGE_NUM) int pageNum,
            @RequestParam(defaultValue = "") String search,
            @RequestParam(defaultValue = "") String loaiHoaDon,
            @RequestParam(defaultValue = "") LocalDate ngayTao
    ) {
        Pageable pageable = PageRequest.of(pageNum,pageSize);
        PagedResponse<HoaDonResponse> hoaDons = hoaDonService.getAll(pageable,search,loaiHoaDon,ngayTao);
        return ResponseEntity.ok(hoaDons);
    }
    // get by id
    // create
    // update
    // delete
}
