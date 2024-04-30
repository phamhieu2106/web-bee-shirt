package com.datn.backend.resource;

import com.datn.backend.constant.ApplicationConstant;
import com.datn.backend.dto.request.DiscountValidRequest;
import com.datn.backend.dto.request.PhieuGiamGiaRequest;
import com.datn.backend.dto.request.PhieuKhachHangRequest;
import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.model.khach_hang.KhachHang;
import com.datn.backend.model.phieu_giam_gia.PhieuGiamGia;
import com.datn.backend.service.PhieuGiamGiaKhachHangService;
import com.datn.backend.service.PhieuGiamGiaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
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
@RequestMapping("/phieu-giam-gia")
@RequiredArgsConstructor
public class PhieuGiamGiaResource {

    private final PhieuGiamGiaService pggService;
    private final PhieuGiamGiaKhachHangService pggKhService;

    @GetMapping("/ds-phieu-giam-gia")
    public ResponseEntity<?> getPhieuGiamGiaList(@RequestParam(value = "pageNumber", defaultValue = "1", required = false) int pageNumber,
                                                 @RequestParam(value = "pageSize", defaultValue = "5", required = false) int pageSize,
                                                 @RequestParam(value = "search", defaultValue = "", required = false) String search,
                                                 @RequestParam(value = "kieu", defaultValue = "", required = false) List<Integer> kieu,
                                                 @RequestParam(value = "loai", defaultValue = "", required = false) List<Integer> loai,
                                                 @RequestParam(value = "trangThai", required = false) List<String> trangThai) {
        return ResponseEntity.ok(pggService.getPagination(pageNumber, pageSize, search, kieu, loai, trangThai));
    }

    public void changePhieuGG(Integer id) {
        pggService.changeStatus(id);
    }

    @GetMapping("/filter")
    public ResponseEntity<?> getFilter(@RequestParam(value = "pageNumber", defaultValue = "1", required = false) int pageNumber,
                                       @RequestParam(value = "pageSize", defaultValue = "5", required = false) int pageSize,
                                       @RequestParam(value = "search", defaultValue = "", required = false) String search,
                                       @RequestParam(value = "kieu", defaultValue = "", required = false) List<Integer> kieu,
                                       @RequestParam(value = "loai", defaultValue = "", required = false) List<Integer> loai,
                                       @RequestParam(value = "trangThai", required = false) List<String> trangThai,
                                       @RequestParam(value = "thoiGianBatDau", defaultValue = "", required = false) String thoiGianBatDau,
                                       @RequestParam(value = "thoiGianKetThuc", defaultValue = "", required = false) String thoiGianKetThuc) {
        return ResponseEntity.ok(pggService.getFilter(pageNumber, pageSize, search, kieu, loai, trangThai, thoiGianBatDau, thoiGianKetThuc));
    }

    @GetMapping("/get-all")
    public ResponseEntity<?> getAll() {

        return ResponseEntity.ok(pggService.getAll());
    }

    @GetMapping("/sua-phieu/{id}")
    public ResponseEntity<?> getOne(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(pggService.getOne(id));
    }

    @PutMapping("/status/{id}")
    public ResponseEntity<?> changeStatus(@PathVariable("id") int id) {
        return ResponseEntity.ok(pggService.changeStatus(id));
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@Valid @RequestBody PhieuGiamGiaRequest phieuGiamGia, BindingResult result) {
        return ResponseEntity.ok(pggService.add(phieuGiamGia));
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id") Integer id, @RequestBody PhieuGiamGiaRequest request) {
        return ResponseEntity.ok().body(pggService.update(id, request));
    }

    /// Phiếu Giảm Giá Khách Hàng
    @PostMapping("/add-phieu")
    public ResponseEntity<?> themPhieuGiamGia(@RequestBody PhieuKhachHangRequest request) {
        pggKhService.deletePhieu(request.getPhieuGiamGiaId());
        pggKhService.addPhieu(request);
        return ResponseEntity.ok(request);
    }

    @DeleteMapping("/add-phieu")
    public void xoaPhieuGiamGiaKhach(@PathVariable("id") Integer id) {
        pggKhService.deletePhieu(id);
    }

    @GetMapping("/get-phieu-khach-hang")
    public ResponseEntity<?> getAllPhieuKhachHang() {
        return ResponseEntity.ok(pggKhService.getAll());
    }


    @GetMapping("/ds-khach-tang")
    public ResponseEntity<?> getPhieuTangKhach(@RequestParam(value = "pageNumber", defaultValue = "1", required = false) int pageNumber,
                                               @RequestParam(value = "pageSize", defaultValue = ApplicationConstant.DEFAULT_PAGE_SIZE, required = false) int pageSize,
                                               @RequestParam(value = "id", defaultValue = "", required = false) String id

    ) {
        return ResponseEntity.ok(pggKhService.getPagination(pageNumber, pageSize, id));
    }

    @GetMapping("/ds-khach-tang-co")
    public ResponseEntity<?> getPhieuTangKhachCo(@RequestParam(value = "pageNumber", defaultValue = "1", required = false) int pageNumber,
                                                 @RequestParam(value = "pageSize", defaultValue = "5", required = false) int pageSize,
                                                 @RequestParam(value = "id", defaultValue = "", required = false) String id) {
        return ResponseEntity.ok(pggKhService.getPhieuCo(pageNumber, pageSize, id));
    }

    @GetMapping("/ds-tang")
    public ResponseEntity<?> getPhieuTangKhach(@RequestParam(value = "id", defaultValue = "", required = false) String id,
                                               @RequestParam(value = "check", defaultValue = "", required = false) Boolean check) {
        return ResponseEntity.ok(pggKhService.getPhieuKhachHang(id, check));
    }

    @GetMapping("/get-active")
    public ResponseEntity<PagedResponse<KhachHang>> getKhachHangActiveList(@RequestParam(value = "pageNumber", defaultValue = "1", required = false) int pageNumber,
                                                                           @RequestParam(value = "pageSize", defaultValue = "5", required = false) int pageSize,
                                                                           @RequestParam(value = "search", defaultValue = "", required = false) String search) {
        return ResponseEntity.ok(pggKhService.getAllActive(pageNumber, pageSize, search));
    }

    @PostMapping("/get-discount-valid")
    public ResponseEntity<?> getDiscountValid(@Valid @RequestBody DiscountValidRequest discountValidRequest) {
        return ResponseEntity.ok(pggService.getDiscountValid(discountValidRequest));
    }

    // client resources
    @GetMapping("/discounts-for-logged-checkout/{priceCond}/{custId}")
    public ResponseEntity<List<PhieuGiamGia>> getDiscountsForLoggedCheckOut(@PathVariable("priceCond") BigDecimal priceCondition,
                                                                            @PathVariable("custId") int custId) {
        return ResponseEntity.ok(pggService.getDiscountsForLoggedCheckOut(priceCondition, custId));
    }

    @GetMapping("/discounts-for-none-logged-checkout/{priceCond}")
    public ResponseEntity<List<PhieuGiamGia>> getDiscountsForNoneLoggedCheckOut(@PathVariable("priceCond") BigDecimal priceCondition) {
        return ResponseEntity.ok(pggService.getDiscountsForNoneLoggedCheckOut(priceCondition));
    }

    @GetMapping("/discounts-by-cust/{custId}")
    public ResponseEntity<List<PhieuGiamGia>> getAllDiscounts1Cust(@PathVariable("custId") int custId) {
        return ResponseEntity.ok(pggService.getAllDiscountsOf1Cust(custId));
    }

    @GetMapping("/none-log-discounts")
    public ResponseEntity<List<PhieuGiamGia>> getAllDiscountsForNoneLog() {
        return ResponseEntity.ok(pggService.getAllDiscountsForNoneLog());
    }
}
