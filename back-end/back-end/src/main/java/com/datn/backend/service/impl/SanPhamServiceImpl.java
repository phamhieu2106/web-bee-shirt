package com.datn.backend.service.impl;

import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.exception.custom_exception.ResourceExistsException;
import com.datn.backend.exception.custom_exception.ResourceNotFoundException;
import com.datn.backend.model.san_pham.ChatLieu;
import com.datn.backend.model.san_pham.SanPham;
import com.datn.backend.repository.SanPhamRepository;
import com.datn.backend.service.SanPhamService;
import com.datn.backend.utility.UtilityFunction;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SanPhamServiceImpl implements SanPhamService {

    private final SanPhamRepository sanPhamRepo;

    @Override
    public SanPham add(SanPham sanPham) {
        if (sanPhamRepo.existsByTen(sanPham.getTen().toLowerCase())) {
            throw new ResourceExistsException("Tên sản phẩm: " + sanPham.getTen() + " đã tồn tại.");
        }
        sanPham.setTrangThai(true);
        return sanPhamRepo.save(sanPham);
    }

    @Override
    public PagedResponse<SanPham> getAll(int pageNumber, int pageSize, String search) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
        Page<SanPham> sanPhamPage = sanPhamRepo.getAll(pageable, search);

        PagedResponse<SanPham> paged = new PagedResponse<>();
        paged.setPageNumber(pageNumber);
        paged.setPageSize(pageSize);
        paged.setTotalElements((int) sanPhamPage.getTotalElements());
        paged.setTotalPages(sanPhamPage.getTotalPages());
        paged.setPageNumberArr(UtilityFunction.getPageNumberArr(sanPhamPage.getTotalPages()));
        paged.setData(sanPhamPage.getContent());
        paged.setSearch(search);

        return paged;
    }

    @Override
    public SanPham getById(int id) {
        return sanPhamRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Không tìm được sản phẩm ID: " + id));
    }

    @Override
    public void changeStatus(int id) {
        SanPham sanPham = sanPhamRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Không tìm được sản phẩm ID: " + id));
        sanPham.setTrangThai(!sanPham.isTrangThai());
        sanPhamRepo.save(sanPham);
    }

    @Override
    public SanPham update(SanPham sanPham) {
        return sanPhamRepo.save(sanPham);
    }
}
