package com.datn.backend.resource;

import com.datn.backend.dto.request.AddNhanVienRequest;
import com.datn.backend.dto.response.NhanVienResponse;
import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.model.nhan_vien.NhanVien;
import com.datn.backend.service.NhanVienService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/nhan-vien")
@RequiredArgsConstructor
public class NhanVienResource {

    private final NhanVienService nhanVienService;
    private final ObjectMapper objectMapper;

    @GetMapping("/get-all")
    public ResponseEntity<PagedResponse<NhanVienResponse>> getNhanVienList(@RequestParam(value = "pageNumber", defaultValue = "1", required = false) int pageNumber,
                                                                           @RequestParam(value = "pageSize", defaultValue = "5", required = false) int pageSize,
                                                                           @RequestParam(value = "search", defaultValue = "", required = false) String search) {
        return ResponseEntity.ok(nhanVienService.getAll(pageNumber, pageSize, search.trim()));
    }

    @PostMapping("/add")
    public ResponseEntity<NhanVien> add(@Valid
                                        @RequestParam("request") String nhanVienReq,
                                        @RequestParam(value = "khachHangImage", required = false) MultipartFile multipartFile) throws IOException {
        AddNhanVienRequest nhanVienRequest = objectMapper.readValue(nhanVienReq, AddNhanVienRequest.class);
        return ResponseEntity.ok(nhanVienService.add(nhanVienRequest, multipartFile));
    }

    @GetMapping("/get-one-by-id/{id}")
    public ResponseEntity<NhanVienResponse> getOneById(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(nhanVienService.getOneById(id));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<NhanVien> update(@Valid
                                           @RequestParam("request") String nhanVienReq,
                                           @RequestParam(value = "khachHangImage", required = false) MultipartFile multipartFile,
                                           @PathVariable("id") Integer id) throws IOException {
        AddNhanVienRequest nhanVienRequest = objectMapper.readValue(nhanVienReq, AddNhanVienRequest.class);
        return ResponseEntity.ok(nhanVienService.update(nhanVienRequest, id, multipartFile));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<NhanVien> delete(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(nhanVienService.delete(id));
    }

    @GetMapping("/filter")
    public ResponseEntity<PagedResponse<NhanVienResponse>> filter(@RequestParam(value = "pageNumber", defaultValue = "1", required = false) int pageNumber,
                                                                  @RequestParam(value = "pageSize", defaultValue = "5", required = false) int pageSize,
                                                                  @RequestParam(value = "gioiTinhFilter", defaultValue = "0,1", required = false) List<Integer> gioiTinhFilter,
                                                                  @RequestParam(value = "trangThaiFilter", defaultValue = "0,1", required = false) List<Integer> trangThaiFilter,
                                                                  @RequestParam(value = "search", defaultValue = "", required = false) String search) {
        return ResponseEntity.ok(nhanVienService.filter(pageNumber, pageSize, gioiTinhFilter, trangThaiFilter, search));
    }
}
