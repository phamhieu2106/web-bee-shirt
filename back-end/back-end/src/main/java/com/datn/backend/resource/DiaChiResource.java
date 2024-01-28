package com.datn.backend.resource;

import com.datn.backend.constant.ApplicationConstant;
import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.model.khach_hang.DiaChi;
import com.datn.backend.service.DiaChiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/dia-chi")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class DiaChiResource {
    private final DiaChiService diaChiService;
//    @GetMapping("/get-all")
//    public ResponseEntity<PagedResponse<DiaChi>> getChatLieuList(@RequestParam(value = "pageNumber", defaultValue = "1", required = false) int pageNumber,
//                                                                 @RequestParam(value = "pageSize", defaultValue = ApplicationConstant.DEFAULT_PAGE_SIZE, required = false) int pageSize
//                                                                ) {
//        return ResponseEntity.ok(diaChiService.getAllDC(pageNumber, pageSize));
//    }

    @PostMapping("/add")
    public ResponseEntity<DiaChi> add(@RequestBody DiaChi dc) {
        return ResponseEntity.ok(diaChiService.add(dc));
    }

    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<DiaChi> getById(@PathVariable("id") int id) {
        return ResponseEntity.ok(diaChiService.getDCById(id));
    }
}
