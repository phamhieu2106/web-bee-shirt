package com.datn.backend.resource;

import com.datn.backend.dto.request.DotGiamGiaRequest;
import com.datn.backend.service.DotGiamGiaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/dot-giam-gia")
@RequiredArgsConstructor
public class DotGiamGiaResource {

    private DotGiamGiaService service;

    @Autowired
    public DotGiamGiaResource(DotGiamGiaService service) {
        super();
        this.service = service;
    }


    @GetMapping
    public ResponseEntity<?> getPagination(@RequestParam(value = "pageNumber", defaultValue = "1", required = false)
                                           int pageNumber,
                                           @RequestParam(value = "pageSize", defaultValue = "5", required = false)
                                           int pageSize,
                                           @RequestParam(value = "search", defaultValue = "", required = false)
                                           String search) {
//        return DotGiamGiaResponseEntity
        return ResponseEntity.ok(service.getPagination(pageNumber, pageSize, search));
    }

    @GetMapping("/filter")
    public ResponseEntity<?> getFilters(@RequestParam(value = "status", defaultValue = "3", required = false)
                                        int status,
                                        @RequestParam(value = "startDate", defaultValue = "2024-01-01", required = false)
                                        String startDate,
                                        @RequestParam(value = "endDate", defaultValue = "3000-01-01", required = false)
                                        String endDate,
                                        @RequestParam(value = "pageNumber", defaultValue = "1", required = false)
                                        int pageNumber,
                                        @RequestParam(value = "pageSize", defaultValue = "99", required = false)
                                        int pageSize,
                                        @RequestParam(value = "search", defaultValue = "", required = false)
                                        String search) {
        return ResponseEntity.ok(service.getFilter(pageNumber, pageSize, search, status, startDate, endDate));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOne(@PathVariable("id") Integer id) {
//        return DotGiamGiaResponseEntity
        return ResponseEntity.ok(service.getOne(id));
    }

    @GetMapping("/dotgiamgiasanpham/{id}")
    public ResponseEntity<?> getListSanPhamChiTietByIdDotGiamGiaSanPham(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(service.getListSanPhamChiTietByIdDotGiamGiaSanPham(id));
    }

    @GetMapping("/sanphamchitiet/{id}")
    public ResponseEntity<?> getListIdSanPhamChiTietByIdSanPham(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(service.getListIdSanPhamChiTietByIdSanPham(id));
    }

    @GetMapping("/sanphamchitiet")
    public ResponseEntity<?> getSanPhamChiTiet(@RequestParam(value = "id", defaultValue = "", required = false)
                                               List<Integer> id,
                                               @RequestParam(value = "pageNumber", defaultValue = "1", required = false)
                                               int pageNumber,
                                               @RequestParam(value = "pageSize", defaultValue = "5", required = false)
                                               int pageSize) {
//        return SanPhamChiTietResponse
        return ResponseEntity.ok(service.getAllSanPhamChiTiet(pageNumber, pageSize, id));
    }

    @GetMapping("/listidsanpham")
    public ResponseEntity<?> getListIdSanPham(@RequestParam(value = "ids", defaultValue = "", required = false)
                                              String ids) {
        return ResponseEntity.ok(service.getListIdSanPham(ids));
    }

    @PostMapping
    public ResponseEntity<?> add(@Valid @RequestBody DotGiamGiaRequest request) {
//        return DotGiamGiaResponseEntity with HttpStatus 201
        return ResponseEntity.status(HttpStatus.CREATED).body(service.add(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable("id") Integer id, @Valid @RequestBody DotGiamGiaRequest request) {
//        return DotGiamGiaResponseEntity body
        return ResponseEntity.ok().body(service.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Integer id) {
//        Check remove success or not
        boolean isSuccess = service.remove(id);
        if (isSuccess) {
            return ResponseEntity.status(HttpStatus.FOUND).body("Deleted Successfully with ID: " + id);
        }
//        return NOT FOUND if fail
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Can't Delete with ID: " + id);
    }

}
