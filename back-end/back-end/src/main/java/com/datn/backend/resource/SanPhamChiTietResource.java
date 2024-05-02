package com.datn.backend.resource;

import com.datn.backend.dto.request.AddSpctReq;
import com.datn.backend.dto.request.CapNhatNhanhSpctReq;
import com.datn.backend.dto.request.UpdateSpctReq;
import com.datn.backend.dto.request.FilterSPCTParams;
import com.datn.backend.dto.request.UpdateCommonPropertiesReq;
import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.model.san_pham.SanPhamChiTiet;
import com.datn.backend.service.SanPhamChiTietService;
import com.fasterxml.jackson.databind.ObjectMapper;
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
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;

@RestController
@RequestMapping("/spct")
@RequiredArgsConstructor
public class SanPhamChiTietResource {

    private final SanPhamChiTietService spctService;
    private final ObjectMapper objectMapper;

    // admin resources
    @PostMapping("/add")
    public ResponseEntity<String> add(@RequestParam("request") String requestStr,
                                      @RequestParam(value = "files", required = false) MultipartFile[] files) throws IOException {
        AddSpctReq request = objectMapper.readValue(requestStr, AddSpctReq.class);
        spctService.addSpctList(request, files);
        return ResponseEntity.ok("Thêm các sản phẩm thành công!");
    }

    @GetMapping("/get-by-page/{spId}")
    public ResponseEntity<PagedResponse<SanPhamChiTiet>> getBySanPham(@RequestParam(value = "pageNumber", defaultValue = "1", required = false) int pageNumber,
                                                                      @RequestParam(value = "pageSize", defaultValue = "5", required = false) int pageSize,
                                                                      @RequestParam(value = "search", defaultValue = "", required = false) String search,
                                                                      @PathVariable("spId") int spId) {
        return ResponseEntity.ok(spctService.getByPage(pageNumber, pageSize, search, spId));
    }

    @GetMapping("/get-one/{spctId}")
    public ResponseEntity<SanPhamChiTiet> getById(@PathVariable("spctId") int spctId) {
        return ResponseEntity.ok(spctService.getOneById(spctId));
    }

    @GetMapping("/get-any-by-spid/{spId}")
    public ResponseEntity<SanPhamChiTiet> getAnyBySanPhamId(@PathVariable("spId") int spId) {
        return ResponseEntity.ok(spctService.getAnyBySanPhamId(spId));
    }

    @PostMapping("/filter-by-page")
    public ResponseEntity<PagedResponse<SanPhamChiTiet>> filterSPCTByPage(@RequestBody FilterSPCTParams params) {
        return ResponseEntity.ok(spctService.filterByPage(params));
    }

    @PostMapping("/quick-update")
    public ResponseEntity<?> updateSpctNhanh(@RequestBody CapNhatNhanhSpctReq req) {
        spctService.updateSpctNhanh(req);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/update")
    public ResponseEntity<String> update(@RequestBody UpdateSpctReq req) {
        String updateResult = spctService.update(req);
        return ResponseEntity.ok(updateResult);
    }

    @GetMapping("/min-max-price/{productId}")
    public ResponseEntity<BigDecimal[]> getMinAndMaxPrice(@PathVariable("productId") int productId) {
        return ResponseEntity.ok(spctService.getMinAndMaxPrice(productId));
    }

    @GetMapping("/check-exist")
    public ResponseEntity<Boolean> checkExist(@RequestParam("spId") int spId,
                                              @RequestParam("mauSacId") int mauSacId,
                                              @RequestParam("sizeId") int sizeId) {
        return ResponseEntity.ok(spctService.checkExist(spId, mauSacId, sizeId));
    }

    @PutMapping("/update-images")
    public ResponseEntity<?> updateImages(@RequestParam(value = "files", required = false) MultipartFile[] files,
                                          @RequestParam("spId") int spId,
                                          @RequestParam("mauSacId") int mauSacId) throws IOException {
        spctService.updateImages(files, spId, mauSacId);
        return ResponseEntity.ok("Cập nhật ảnh thành công!");
    }

    @PostMapping("/update-properties")
    public ResponseEntity<Void> updateCommonProperties(@RequestBody UpdateCommonPropertiesReq req) {
        spctService.updateCommonProperties(req);
        return ResponseEntity.ok().build();
    }

    // client resources
    @GetMapping("/get-quantity/{productId}/{colorId}/{sizeId}")
    public ResponseEntity<Integer> getQuantityOfOne(@PathVariable("productId") int productId,
                                                    @PathVariable("colorId") int colorId,
                                                    @PathVariable("sizeId") int sizeId) {
        return ResponseEntity.ok(spctService.getQuantityOfOne(productId, colorId, sizeId));
    }

    @GetMapping("/get-price/{productId}/{colorId}/{sizeId}")
    public ResponseEntity<BigDecimal> getPriceOfOne(@PathVariable("productId") int productId,
                                                    @PathVariable("colorId") int colorId,
                                                    @PathVariable("sizeId") int sizeId) {
        return ResponseEntity.ok(spctService.getPriceOfOne(productId, colorId, sizeId));
    }

    @GetMapping("/by-product-color-size/{productId}/{colorId}/{sizeId}")
    public ResponseEntity<SanPhamChiTiet> getOneByProColorSize(@PathVariable("productId") int productId,
                                                               @PathVariable("colorId") int colorId,
                                                               @PathVariable("sizeId") int sizeId) {
        return ResponseEntity.ok(spctService.getOneByProColorSize(productId, colorId, sizeId));
    }

    @GetMapping("/get-product-name/{productDetailsId}")
    public ResponseEntity<String> getProductNameByProductDetails(@PathVariable("productDetailsId") int id) {
        return ResponseEntity.ok(spctService.getProductNameByProductDetails(id));
    }
}
