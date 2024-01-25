package com.datn.backend.resource;

import com.datn.backend.constant.ApplicationConstant;
import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.model.san_pham.TayAo;
import com.datn.backend.service.TayAoService;
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

@RestController
@RequestMapping("/tay-ao")
@RequiredArgsConstructor
public class TayAoResource {

    private final TayAoService tayAoService;

    @GetMapping("/get-all")
    public ResponseEntity<PagedResponse<TayAo>> getChatLieuList(@RequestParam(value = "pageNumber", defaultValue = "1", required = false) int pageNumber,
                                                                @RequestParam(value = "pageSize", defaultValue = ApplicationConstant.DEFAULT_PAGE_SIZE, required = false) int pageSize,
                                                                @RequestParam(value = "search", defaultValue = "", required = false) String search) {
        return ResponseEntity.ok(tayAoService.getAll(pageNumber, pageSize, search));
    }

    @PostMapping("/add")
    public ResponseEntity<TayAo> add(@RequestBody TayAo chatLieu) {
        return ResponseEntity.ok(tayAoService.add(chatLieu));
    }

    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<TayAo> add(@PathVariable("id") int id) {
        return ResponseEntity.ok(tayAoService.getById(id));
    }

    @GetMapping("/status/{id}")
    public ResponseEntity<String> changeStatus(@PathVariable("id") int id) {
        tayAoService.changeStatus(id);
        return ResponseEntity.ok("Cập nhật trạng thái thành công!");
    }

    @PutMapping("/update")
    public ResponseEntity<TayAo> update(@RequestBody TayAo chatLieu) {
        return ResponseEntity.ok(tayAoService.update(chatLieu));
    }
}