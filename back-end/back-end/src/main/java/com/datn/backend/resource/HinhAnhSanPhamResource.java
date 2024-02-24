package com.datn.backend.resource;

import com.datn.backend.model.san_pham.HinhAnh;
import com.datn.backend.service.HinhAnhSanPhamService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/hinh-anh-sp")
@RequiredArgsConstructor
public class HinhAnhSanPhamResource {

    private final HinhAnhSanPhamService hinhAnhService;

    @GetMapping("/get-by-ms")
    public List<HinhAnh> getByMauSac(@RequestParam("tenMau") String tenMau,
                                     @RequestParam("sanPhamID") int sanPhamID) {
        return hinhAnhService.getByMauSac(tenMau, sanPhamID);
    }
}
