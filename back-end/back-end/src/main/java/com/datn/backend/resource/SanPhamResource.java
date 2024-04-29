package com.datn.backend.resource;

import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.model.san_pham.SanPham;
import com.datn.backend.service.SanPhamService;
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

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/san-pham")
@RequiredArgsConstructor
public class SanPhamResource {

    private final SanPhamService sanPhamService;

    // admin resources
    @GetMapping("/get-by-page")
    public ResponseEntity<PagedResponse<SanPham>> getByPage(@RequestParam(value = "pageNumber", defaultValue = "1", required = false) int pageNumber,
                                                            @RequestParam(value = "pageSize", defaultValue = "5", required = false) int pageSize,
                                                            @RequestParam(value = "search", defaultValue = "", required = false) String search,
                                                            @RequestParam(value = "status", defaultValue = "0, 1", required = false) List<Integer> status) {
        return ResponseEntity.ok(sanPhamService.getByPage(pageNumber, pageSize, search, status));
    }

    @PostMapping("/add")
    public ResponseEntity<SanPham> add(@RequestBody SanPham sanPham) {
        return ResponseEntity.ok(sanPhamService.add(sanPham));
    }

    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<SanPham> getOneById(@PathVariable("id") int id) {
        return ResponseEntity.ok(sanPhamService.getById(id));
    }

    @GetMapping("/status/{id}/{value}")
    public ResponseEntity<Void> changeStatus(@PathVariable("id") int id,
                                             @PathVariable("value") boolean value) {
        sanPhamService.changeStatus(id, value);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/update")
    public ResponseEntity<SanPham> update(@RequestBody SanPham sanPham) {
        return ResponseEntity.ok(sanPhamService.update(sanPham));
    }

    //  client resources
    @GetMapping("/client/get-by-page")
    public ResponseEntity<PagedResponse<SanPham>> getByPageClient(@RequestParam(value = "pageNumber", defaultValue = "1", required = false) int pageNumber,
                                                                  @RequestParam(value = "pageSize", defaultValue = "8", required = false) int pageSize,
                                                                  @RequestParam(value = "search", defaultValue = "", required = false) String search
    ) {
        return ResponseEntity.ok(sanPhamService.getByPageClient(pageNumber, pageSize,search));
    }

    @GetMapping("/client/filter")
    public ResponseEntity<PagedResponse<SanPham>> getByFilterForClient(@RequestParam("pageNumber") int pageNumber,
                                                                       @RequestParam("pageSize") int pageSize,
                                                                       @RequestParam(value = "colorIds", required = false) List<Integer> colorIds,
                                                                       @RequestParam(value = "sizeIds", required = false) List<Integer> sizeIds,
                                                                       @RequestParam(value = "formIds", required = false) List<Integer> formIds,
                                                                       @RequestParam(value = "designIds", required = false) List<Integer> designIds,
                                                                       @RequestParam(value = "collarId", required = false) List<Integer> collarId,
                                                                       @RequestParam(value = "sleeveIds", required = false) List<Integer> sleeveIds,
                                                                       @RequestParam(value = "materialIds", required = false) List<Integer> materialIds,
                                                                       @RequestParam(value = "minPrice", required = false) BigDecimal minPrice,
                                                                       @RequestParam(value = "maxPrice", required = false) BigDecimal maxPrice) {
        return ResponseEntity.ok(sanPhamService.getByFilterForClient(pageNumber, pageSize, colorIds,
                                                                     sizeIds, formIds, designIds,
                                                                     collarId, sleeveIds, materialIds,
                                                                     minPrice, maxPrice));
    }

    @GetMapping("/get-by-product-details/{productDetailsId}")
    public ResponseEntity<SanPham> getProductByProductDetailsId(@PathVariable("productDetailsId") int productDetailsId) {
        return ResponseEntity.ok(sanPhamService.getProductByProductDetailsId(productDetailsId));
    }
}
