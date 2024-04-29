package com.datn.backend.resource;

import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.model.san_pham.MauSac;
import com.datn.backend.service.MauSacService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/mau-sac")
@RequiredArgsConstructor
public class ColorResource {

    private final MauSacService mauSacService;
    private final ObjectMapper objectMapper;

    // admin resources
    @PostMapping("/add")
    public ResponseEntity<MauSac> add(@RequestParam("request") String mauSacReq,
                                      @RequestParam("mauSacImage") MultipartFile multipartFile) throws IOException {
        MauSac mauSac = objectMapper.readValue(mauSacReq, MauSac.class);
        return ResponseEntity.ok(mauSacService.add(mauSac, multipartFile));
    }

    @GetMapping("/get-by-page")
    public ResponseEntity<PagedResponse<MauSac>> getMauSacList(@RequestParam(value = "pageNumber", defaultValue = "1", required = false) int pageNumber,
                                                               @RequestParam(value = "pageSize", defaultValue = "5", required = false) int pageSize,
                                                               @RequestParam(value = "search", defaultValue = "", required = false) String search) {
        return ResponseEntity.ok(mauSacService.getByPage(pageNumber, pageSize, search));
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<MauSac>> getAllMauSac() {
        return ResponseEntity.ok(mauSacService.getAll());
    }



    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<MauSac> add(@PathVariable("id") int id) {
        return ResponseEntity.ok(mauSacService.getById(id));
    }

    @GetMapping("/status/{id}")
    public ResponseEntity<Void> changeStatus(@PathVariable("id") int id) {
        mauSacService.changeStatus(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/update")
    public ResponseEntity<MauSac> update(@RequestParam("request") String mauSacReq,
                                         @RequestParam(value = "mauSacImage", required = false) MultipartFile multipartFile) throws IOException {
        MauSac mauSac = objectMapper.readValue(mauSacReq, MauSac.class);
        return ResponseEntity.ok(mauSacService.update(mauSac, multipartFile));
    }

    // client resources
    @GetMapping("/colors-of-product/{productId}")
    public ResponseEntity<List<MauSac>> getAllColorOfProduct(@PathVariable("productId") int productId) {
        return ResponseEntity.ok(mauSacService.getAllColorOfProduct(productId));
    }

    @GetMapping("/all-active")
    public ResponseEntity<List<MauSac>> getAllActiveColors() {
        return ResponseEntity.ok(mauSacService.getAllActiveColors());
    }
}
