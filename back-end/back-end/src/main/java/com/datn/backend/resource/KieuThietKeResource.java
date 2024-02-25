package com.datn.backend.resource;

import com.datn.backend.constant.ApplicationConstant;
import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.model.san_pham.KieuThietKe;
import com.datn.backend.service.KieuThietKeService;
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
@RequestMapping("/thiet-ke")
@RequiredArgsConstructor
public class KieuThietKeResource {

    private final KieuThietKeService thietKeService;

    @GetMapping("/get-by-page")
    public ResponseEntity<PagedResponse<KieuThietKe>> getByPage(@RequestParam(value = "pageNumber", defaultValue = "1", required = false) int pageNumber,
                                                                @RequestParam(value = "pageSize", defaultValue = ApplicationConstant.DEFAULT_PAGE_SIZE, required = false) int pageSize,
                                                                @RequestParam(value = "search", defaultValue = "", required = false) String search) {
        return ResponseEntity.ok(thietKeService.getByPage(pageNumber, pageSize, search));
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<KieuThietKe>> getAll() {
        return ResponseEntity.ok(thietKeService.getAll());
    }

    @PostMapping("/add")
    public ResponseEntity<KieuThietKe> add(@RequestBody KieuThietKe chatLieu) {
        return ResponseEntity.ok(thietKeService.add(chatLieu));
    }

    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<KieuThietKe> getById(@PathVariable("id") int id) {
        return ResponseEntity.ok(thietKeService.getById(id));
    }

    @GetMapping("/status/{id}")
    public ResponseEntity<String> changeStatus(@PathVariable("id") int id) {
        thietKeService.changeStatus(id);
        return ResponseEntity.ok("Cập nhật trạng thái thành công!");
    }

    @PutMapping("/update")
    public ResponseEntity<KieuThietKe> update(@RequestBody KieuThietKe chatLieu) {
        return ResponseEntity.ok(thietKeService.update(chatLieu));
    }
}
