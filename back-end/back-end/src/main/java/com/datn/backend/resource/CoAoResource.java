package com.datn.backend.resource;

import com.datn.backend.constant.ApplicationConstant;
import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.model.san_pham.CoAo;
import com.datn.backend.service.CoAoService;
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
@RequestMapping("/co-ao")
@RequiredArgsConstructor
public class CoAoResource {

    private final CoAoService coAoService;

    @GetMapping("/get-by-page")
    public ResponseEntity<PagedResponse<CoAo>> getByPage(@RequestParam(value = "pageNumber", defaultValue = "1", required = false) int pageNumber,
                                                         @RequestParam(value = "pageSize", defaultValue = ApplicationConstant.DEFAULT_PAGE_SIZE, required = false) int pageSize,
                                                         @RequestParam(value = "search", defaultValue = "", required = false) String search) {
        return ResponseEntity.ok(coAoService.getByPage(pageNumber, pageSize, search));
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<CoAo>> getAll() {
        return ResponseEntity.ok(coAoService.getAll());
    }



    @PostMapping("/add")
    public ResponseEntity<CoAo> add(@RequestBody CoAo coAo) {
        return ResponseEntity.ok(coAoService.add(coAo));
    }

    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<CoAo> add(@PathVariable("id") int id) {
        return ResponseEntity.ok(coAoService.getById(id));
    }

    @GetMapping("/status/{id}")
    public ResponseEntity<String> changeStatus(@PathVariable("id") int id) {
        coAoService.changeStatus(id);
        return ResponseEntity.ok("Cập nhật trạng thái thành công!");
    }

    @PutMapping("/update")
    public ResponseEntity<CoAo> update(@RequestBody CoAo chatLieu) {
        return ResponseEntity.ok(coAoService.update(chatLieu));
    }

    @GetMapping("/all-active")
    public ResponseEntity<List<CoAo>> getAllActive() {
        return ResponseEntity.ok(coAoService.getAll().stream().filter(CoAo::isTrangThai).toList());
    }
}
