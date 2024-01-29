package com.datn.backend.resource;

import com.datn.backend.constant.ApplicationConstant;
import com.datn.backend.dto.request.KhachHangRequest;
import com.datn.backend.dto.response.KhachHangResponse;
import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.model.khach_hang.KhachHang;
import com.datn.backend.service.KhachHangService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/khach-hang")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class KhachHangResource {
    private final KhachHangService khachHangService;

    @GetMapping("/get-all")
    public ResponseEntity<PagedResponse<KhachHangResponse>> getKhachHangList(@RequestParam(value = "pageNumber", defaultValue = "1", required = false) int pageNumber,
                                                                             @RequestParam(value = "pageSize", defaultValue = ApplicationConstant.DEFAULT_PAGE_SIZE, required = false) int pageSize,
                                                                             @RequestParam(value = "search", defaultValue = "", required = false) String search) {
        return ResponseEntity.ok(khachHangService.getAll(pageNumber, pageSize, search));
    }
    @GetMapping("/getById/{id}")
    public  ResponseEntity<KhachHangResponse> getKHById(@PathVariable("id")int id){
        return ResponseEntity.ok(khachHangService.getById(id));
    }
    @PostMapping("/add-kh")
    public ResponseEntity<KhachHang> addKH(@RequestBody KhachHangRequest kh) {
        return ResponseEntity.ok(khachHangService.add(kh));
    }

    @PutMapping("/update-kh/{id}")
    public ResponseEntity<KhachHang> updateKH(@PathVariable("id")int id, @RequestBody KhachHangRequest kh) {
        return ResponseEntity.ok(khachHangService.update(id,kh));
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<KhachHang> deleta(@PathVariable("id")Integer id){
        return ResponseEntity.ok(khachHangService.delete(id));
    }
}
