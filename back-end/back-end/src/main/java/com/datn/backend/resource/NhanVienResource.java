package com.datn.backend.resource;

import com.datn.backend.constant.ApplicationConstant;
import com.datn.backend.dto.request.AddNhanVienRequest;
import com.datn.backend.dto.response.NhanVienResponse;
import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.model.NhanVien;
import com.datn.backend.model.san_pham.ChatLieu;
import com.datn.backend.service.ChatLieuService;
import com.datn.backend.service.NhanVienService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/nhan-vien")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class NhanVienResource {

    private final NhanVienService nhanVienService;

    @GetMapping("/get-all")
    public ResponseEntity<PagedResponse<NhanVienResponse>> getNhanVienList(@RequestParam(value = "pageNumber", defaultValue = "1", required = false) int pageNumber,
                                                                           @RequestParam(value = "pageSize", defaultValue = ApplicationConstant.DEFAULT_PAGE_SIZE, required = false) int pageSize,
                                                                           @RequestParam(value = "search", defaultValue = "", required = false) String search) {
        return ResponseEntity.ok(nhanVienService.getAll(pageNumber, pageSize, search));
    }

    @PostMapping("/add")
    public ResponseEntity<NhanVien> add(@RequestBody AddNhanVienRequest nhanVienRequest) {
        return ResponseEntity.ok(nhanVienService.add(nhanVienRequest));
    }
}
