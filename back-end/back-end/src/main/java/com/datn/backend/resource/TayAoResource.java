package com.datn.backend.resource;

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

import java.util.List;

@RestController
@RequestMapping("/tay-ao")
@RequiredArgsConstructor
public class TayAoResource {

    private final TayAoService tayAoService;

    @GetMapping("/get-by-page")
    public ResponseEntity<PagedResponse<TayAo>> getByPage(@RequestParam(value = "pageNumber", defaultValue = "1", required = false) int pageNumber,
                                                          @RequestParam(value = "pageSize", defaultValue = "5", required = false) int pageSize,
                                                          @RequestParam(value = "search", defaultValue = "", required = false) String search) {
        return ResponseEntity.ok(tayAoService.getByPage(pageNumber, pageSize, search));
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<TayAo>> getAll() {
        return ResponseEntity.ok(tayAoService.getAll());
    }

    @PostMapping("/add")
    public ResponseEntity<TayAo> add(@RequestBody TayAo chatLieu) {
        return ResponseEntity.ok(tayAoService.add(chatLieu));
    }

    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<TayAo> getById(@PathVariable("id") int id) {
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

    // client resources
    @GetMapping("/all-active")
    public ResponseEntity<List<TayAo>> getAllActive() {
        return ResponseEntity.ok(tayAoService.getAll().stream().filter(TayAo::isTrangThai).toList());
    }
}
