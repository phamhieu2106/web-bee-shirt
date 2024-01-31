package com.datn.backend.resource;

import com.datn.backend.constant.ApplicationConstant;
import com.datn.backend.dto.request.PhieuGiamGiaRequest;
import com.datn.backend.dto.request.PhieuKhachHangRequest;
import com.datn.backend.service.PhieuGiamGiaKhachHangService;
import com.datn.backend.service.PhieuGiamGiaServce;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.DeleteMapping;
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
@RequestMapping("/phieu-giam-gia")
@RequiredArgsConstructor
public class PhieuGiamGiaResource {

    @Autowired
    private PhieuGiamGiaServce service;

    @Autowired
    private PhieuGiamGiaKhachHangService phieuGiamGiaService;

    @GetMapping("/ds-phieu-giam-gia")
    public ResponseEntity<?> getPhieuGiamGiaList(@RequestParam(value = "pageNumber", defaultValue = "1", required = false) int pageNumber,
                                                 @RequestParam(value = "pageSize", defaultValue = ApplicationConstant.DEFAULT_PAGE_SIZE, required = false) int pageSize,
                                                 @RequestParam(value = "search", defaultValue = "", required = false) String search) {

        return ResponseEntity.ok(service.getPagination(pageNumber, pageSize, search));
    }

    @GetMapping("/get-all")
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<?> getOne(@PathVariable("id") Integer id) {

        return ResponseEntity.ok(service.getOne(id));
    }

    @PutMapping("/status/{id}")
    public ResponseEntity<?> changeStatus(@PathVariable("id") int id) {

        return ResponseEntity.ok(service.changeStatus(id));
    }


    @PostMapping("/add")
    public ResponseEntity<?> add(@Valid @RequestBody PhieuGiamGiaRequest phieuGiamGia, BindingResult result) {
        return ResponseEntity.ok(service.add(phieuGiamGia));
    }

    @PostMapping("/add-phieu")
    public ResponseEntity<?> themPhieuGiamGia(@RequestBody PhieuKhachHangRequest request) {
        phieuGiamGiaService.addPhieu(request);
        return ResponseEntity.ok(request);
    }


    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable("id") Integer id, @RequestBody PhieuGiamGiaRequest request) {
        return ResponseEntity.ok().body(service.update(id, request));
    }





}
