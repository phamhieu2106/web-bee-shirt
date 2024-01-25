package com.datn.backend.resource;

import com.datn.backend.constant.ApplicationConstant;
import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.model.san_pham.MauSac;
import com.datn.backend.service.MauSacService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/mau-sac")
@RequiredArgsConstructor
public class MauSacResource {

    private final MauSacService mauSacService;
    private final ObjectMapper objectMapper;

    @PostMapping("/add")
    public ResponseEntity<MauSac> add(@RequestParam("request") String mauSacReq,
                                      @RequestParam("mauSacImage") MultipartFile multipartFile) throws IOException {
        MauSac mauSac = objectMapper.readValue(mauSacReq, MauSac.class);
        return ResponseEntity.ok(mauSacService.add(mauSac, multipartFile));
    }

    @GetMapping("/get-all")
    public ResponseEntity<PagedResponse<MauSac>> getChatLieuList(@RequestParam(value = "pageNumber", defaultValue = "1", required = false) int pageNumber,
                                                                   @RequestParam(value = "pageSize", defaultValue = ApplicationConstant.DEFAULT_PAGE_SIZE, required = false) int pageSize,
                                                                   @RequestParam(value = "search", defaultValue = "", required = false) String search) {
        return ResponseEntity.ok(mauSacService.getAll(pageNumber, pageSize, search));
    }
}
