package com.datn.backend.resource;

import com.datn.backend.constant.ApplicationConstant;
import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.dto.response.SpctResponse;
import com.datn.backend.model.san_pham.SanPhamChiTiet;
import com.datn.backend.repository.SanPhamChiTietRepository;
import com.datn.backend.service.SanPhamChiTietService;
import com.datn.backend.utility.UtilityFunction;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;

/**
 * @author HungDV
 */
@RestController
@RequestMapping("/spct")
@RequiredArgsConstructor
public class HungTestResource {
    private final SanPhamChiTietService sanPhamChiTietService;
    private final SanPhamChiTietRepository sanPhamChiTietRepo;
    @GetMapping("/get-all")
    public ResponseEntity<PagedResponse<SpctResponse>> getAll(
            @RequestParam(defaultValue = ApplicationConstant.DEFAULT_PAGE_SIZE) int pageSize,
            @RequestParam(defaultValue = ApplicationConstant.DEFAULT_PAGE_NUM) int pageNumber,
            @RequestParam(defaultValue = "") String search
    ) {
        return ResponseEntity.ok( sanPhamChiTietService.getAll(pageNumber,pageSize,search));
    }

    @GetMapping("/get-all-detail")
    public ResponseEntity<PagedResponse<SpctResponse>> getDetail(
            @RequestParam(defaultValue = ApplicationConstant.DEFAULT_PAGE_SIZE) int pageSize,
            @RequestParam(defaultValue = ApplicationConstant.DEFAULT_PAGE_NUM) int pageNumber,
            @RequestParam(defaultValue = "") String search,
            @RequestParam(defaultValue = "") String mauSac,
            @RequestParam(defaultValue = "") String kichCo,
            @RequestParam(defaultValue = "") String kieuDang,
            @RequestParam(defaultValue = "") String thietKe,
            @RequestParam(defaultValue = "") String tayAo,
            @RequestParam(defaultValue = "") String coAo,
            @RequestParam(defaultValue = "") String chatLieu,
            @RequestParam(defaultValue = "0") BigDecimal giaMin,
            @RequestParam(defaultValue = "999999999999999") BigDecimal giaMax
    ) {
        return ResponseEntity.ok( sanPhamChiTietService.getDetailSpct(pageSize,pageNumber,search.trim(),mauSac,kichCo,kieuDang,thietKe,tayAo,coAo,chatLieu,giaMin,giaMax));
    }
    @GetMapping("/min-max-price")
    public ResponseEntity<?> getMinMaxPrice() {
        long[][] minMaxPrice= sanPhamChiTietService.minMaxPrice();
        return ResponseEntity.ok(minMaxPrice[0]);
    }


//    private PagedResponse<SpctResponse> getDetailSpct(
//            int pageSize, int pageNumber,
//            String search,String mauSac,
//            String kichCo,String kieuDang,
//            String thietKe,String tayAo,
//            String coAo,String chatLieu,
//            BigDecimal giaMin,BigDecimal giaMax
//    )
//    {
//        Pageable pageable = PageRequest.of(pageNumber-1,pageSize);
//        Page<SanPhamChiTiet> sanPhamChiTietPage = sanPhamChiTietRepo.findDetailAll(pageable,search,mauSac,kichCo,kieuDang,thietKe,tayAo,coAo,chatLieu,giaMin,giaMax);
//
//        return UtilityFunction.mapToPagedResponse(sanPhamChiTietPage, SpctResponse.class,search);
//    }
}
