package com.datn.backend.resource;

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

/**
 * @author HungDV
 */
@RestController
@RequestMapping("/hoa-don")
@RequiredArgsConstructor
public class HoaDonResource {
    private final HoaDonService hoaDonService;
    // get all
    @GetMapping("/")
    public ResponseEntity<PagedResponse<HoaDonResponse>> getAll(
            @RequestParam(defaultValue = "20") int pageSize,
            @RequestParam(defaultValue = "0") int pageNum,
            @RequestParam(defaultValue = "") String search
    ) {
        Pageable pageable = PageRequest.of(pageNum,pageSize);
        PagedResponse<HoaDonResponse> hoaDons = hoaDonService.getAll(pageable,search);
        return ResponseEntity.ok(hoaDons);
    }
    // get by id
    // create
    // update
    // delete
}
