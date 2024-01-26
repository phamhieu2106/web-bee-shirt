package com.datn.backend.resource;

import com.datn.backend.constant.ApplicationConstant;
import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.model.san_pham.KichCo;
import com.datn.backend.service.KichCoService;
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
@RequestMapping("/kich-co")
@RequiredArgsConstructor
public class KichCoResource {

    private final KichCoService kichCoService;

    @GetMapping("/get-all")
    public ResponseEntity<PagedResponse<KichCo>> getKichCoList(@RequestParam(value = "pageNumber", defaultValue = "1", required = false) int pageNumber,
                                                               @RequestParam(value = "pageSize", defaultValue = ApplicationConstant.DEFAULT_PAGE_SIZE, required = false) int pageSize,
                                                               @RequestParam(value = "search", defaultValue = "", required = false) String search) {
        return ResponseEntity.ok(kichCoService.getAll(pageNumber, pageSize, search));
    }

    @PostMapping("/add")
    public ResponseEntity<KichCo> add(@RequestBody KichCo chatLieu) {
        return ResponseEntity.ok(kichCoService.add(chatLieu));
    }

    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<KichCo> add(@PathVariable("id") int id) {
        return ResponseEntity.ok(kichCoService.getById(id));
    }

    @GetMapping("/status/{id}")
    public ResponseEntity<String> changeStatus(@PathVariable("id") int id) {
        kichCoService.changeStatus(id);
        return ResponseEntity.ok("Cập nhật trạng thái thành công!");
    }

    @PutMapping("/update")
    public ResponseEntity<KichCo> update(@RequestBody KichCo chatLieu) {
        return ResponseEntity.ok(kichCoService.update(chatLieu));
    }
}
