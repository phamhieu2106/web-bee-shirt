package com.datn.backend.resource;

import com.datn.backend.constant.ApplicationConstant;
import com.datn.backend.dto.request.AddSanPhamChiTietRequest;
import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.model.san_pham.SanPhamChiTiet;
import com.datn.backend.service.SanPhamChiTietService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/spct")
@RequiredArgsConstructor
public class SanPhamChiTietResource {

    private final SanPhamChiTietService spctService;
    private final ObjectMapper objectMapper;

    @PostMapping("/add")
    public ResponseEntity<String> add(@RequestParam("request") String requestStr,
                                      @RequestParam(value = "files", required = false) MultipartFile[] files) throws IOException {
        AddSanPhamChiTietRequest request = objectMapper.readValue(requestStr, AddSanPhamChiTietRequest.class);
        spctService.addSpctList(request, files);
        return ResponseEntity.ok("Thêm các sản phẩm thành công!");
    }

    @GetMapping("/get-by-page/{spId}")
    public ResponseEntity<PagedResponse<SanPhamChiTiet>> getBySanPham(@RequestParam(value = "pageNumber", defaultValue = "1", required = false) int pageNumber,
                                                                      @RequestParam(value = "pageSize", defaultValue = ApplicationConstant.DEFAULT_PAGE_SIZE, required = false) int pageSize,
                                                                      @RequestParam(value = "search", defaultValue = "", required = false) String search,
                                                                      @PathVariable("spId") int spId) {
        return ResponseEntity.ok(spctService.getByPage(pageNumber, pageSize, search, spId));
    }
}
