package com.datn.backend.resource;

import com.datn.backend.constant.ApplicationConstant;
import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.model.san_pham.KieuDang;
import com.datn.backend.service.KieuDangService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/kieu-dang")
@RequiredArgsConstructor
public class KieuDangResource {

    private final KieuDangService kieuDangService;

    @GetMapping("/get-by-page")
    public ResponseEntity<PagedResponse<KieuDang>> getKieuDangListByPage(@RequestParam(value = "pageNumber", defaultValue = "1", required = false) int pageNumber,
                                                                         @RequestParam(value = "pageSize", defaultValue = ApplicationConstant.DEFAULT_PAGE_SIZE, required = false) int pageSize,
                                                                         @RequestParam(value = "search", defaultValue = "", required = false) String search) {
        return ResponseEntity.ok(kieuDangService.getByPage(pageNumber, pageSize, search));
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<KieuDang>> getAll() {
        return ResponseEntity.ok(kieuDangService.getAll());
    }

    @PostMapping("/add")
    public ResponseEntity<KieuDang> add(@RequestBody KieuDang kieuDang) {
        return ResponseEntity.ok(kieuDangService.add(kieuDang));
    }

    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<KieuDang> add(@PathVariable("id") int id) {
        return ResponseEntity.ok(kieuDangService.getById(id));
    }

    @GetMapping("/status/{id}")
    public ResponseEntity<String> changeStatus(@PathVariable("id") int id) {
        kieuDangService.changeStatus(id);
        return ResponseEntity.ok("Cập nhật trạng thái thành công!");
    }

    @PutMapping("/update")
    public ResponseEntity<KieuDang> update(@RequestBody KieuDang chatLieu) {
        return ResponseEntity.ok(kieuDangService.update(chatLieu));
    }

    // client resources
    @GetMapping("/all-active")
    public ResponseEntity<List<KieuDang>> getAllActive() {
        return ResponseEntity.ok(kieuDangService.getAll().stream().filter(KieuDang::isTrangThai).toList());
    }
}
