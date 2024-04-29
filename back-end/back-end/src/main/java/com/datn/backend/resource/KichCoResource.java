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

import java.util.List;

@RestController
@RequestMapping("/kich-co")
@RequiredArgsConstructor
public class KichCoResource {

    private final KichCoService kichCoService;

    // admin resources
    @GetMapping("/get-by-page")
    public ResponseEntity<PagedResponse<KichCo>> getByPage(@RequestParam(value = "pageNumber", defaultValue = "1", required = false) int pageNumber,
                                                           @RequestParam(value = "pageSize", defaultValue = ApplicationConstant.DEFAULT_PAGE_SIZE, required = false) int pageSize,
                                                           @RequestParam(value = "search", defaultValue = "", required = false) String search) {
        return ResponseEntity.ok(kichCoService.getByPage(pageNumber, pageSize, search));
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<KichCo>> getAll() {
        return ResponseEntity.ok(kichCoService.getAll());
    }

    @PostMapping("/add")
    public ResponseEntity<KichCo> add(@RequestBody KichCo kichCo) {
        return ResponseEntity.ok(kichCoService.add(kichCo));
    }

    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<KichCo> getById(@PathVariable("id") int id) {
        return ResponseEntity.ok(kichCoService.getById(id));
    }

    @GetMapping("/status/{id}")
    public ResponseEntity<Void> changeStatus(@PathVariable("id") int id) {
        kichCoService.changeStatus(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/update")
    public ResponseEntity<KichCo> update(@RequestBody KichCo chatLieu) {
        return ResponseEntity.ok(kichCoService.update(chatLieu));
    }

    // client resources
    @GetMapping("/by-product-color/{productId}/{colorId}")
    public ResponseEntity<List<KichCo>> getAllByProductAndColor(@PathVariable("productId") int productId,
                                                                @PathVariable("colorId") int colorId) {
        return ResponseEntity.ok(kichCoService.getAllByProductAndColor(productId, colorId));
    }

    @GetMapping("/all-active")
    public ResponseEntity<List<KichCo>> getAllActive() {
        return ResponseEntity.ok(kichCoService.getAll().stream().filter(KichCo::isTrangThai).toList());
    }
}
