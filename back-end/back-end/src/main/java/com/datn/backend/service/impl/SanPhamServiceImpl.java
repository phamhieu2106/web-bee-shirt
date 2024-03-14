package com.datn.backend.service.impl;

import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.exception.custom_exception.ResourceExistsException;
import com.datn.backend.exception.custom_exception.ResourceNotFoundException;
import com.datn.backend.model.san_pham.MauSac;
import com.datn.backend.model.san_pham.SanPham;
import com.datn.backend.repository.SanPhamChiTietRepository;
import com.datn.backend.repository.SanPhamRepository;
import com.datn.backend.service.SanPhamService;
import com.datn.backend.utility.UtilityFunction;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class SanPhamServiceImpl implements SanPhamService {

    private final SanPhamRepository sanPhamRepo;
    private final SanPhamChiTietRepository spctRepo;

    // admin
    @Override
    public SanPham add(SanPham sanPham) {
        checkExistForAdd(sanPham);
        sanPham.setTrangThai(true);
        return sanPhamRepo.save(sanPham);
    }

    private void checkExistForAdd(SanPham sanPham) {
        if (sanPhamRepo.existsByTen(sanPham.getTen()) && !sanPhamRepo.existsByMa(sanPham.getMa())) {
            throw new ResourceExistsException("Tên sản phẩm đã tồn tại!");
        }

        if (!sanPhamRepo.existsByTen(sanPham.getTen()) && sanPhamRepo.existsByMa(sanPham.getMa())) {
            throw new ResourceExistsException("Mã sản phẩm đã tồn tại!");
        }

        if (sanPhamRepo.existsByTen(sanPham.getTen()) && sanPhamRepo.existsByMa(sanPham.getMa())) {
            throw new ResourceExistsException("Tên sản phẩm và mã sản phẩm đã tồn tại!");
        }
    }

    @Override
    public PagedResponse<SanPham> getByPage(int pageNumber, int pageSize, String search) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
        Page<SanPham> sanPhamPage = sanPhamRepo.getByPage(pageable, search);

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
        return sanPhamRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Sản phẩm với ID: " + id + " không tồn tại!"));
    }

    @Override
    @Transactional
    public void changeStatus(int id, boolean value) {
        SanPham sanPham = sanPhamRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Sản phẩm với ID: " + id + " không tồn tại!"));
        sanPham.setTrangThai(value);
        sanPhamRepo.save(sanPham);

        spctRepo.updateStatusAllBySpId(id, value);
        log.info("Đã cập nhật trạng thái của tất cả các SPCT của SP với ID: {}", id);
    }

    @Override
    public SanPham update(SanPham sanPham) {
        checkExistForUpdate(sanPham);
        return sanPhamRepo.save(sanPham);
    }

    private void checkExistForUpdate(SanPham sanPham) {
        SanPham sanPhamById = sanPhamRepo.findById(sanPham.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Sản phẩm với ID: " + sanPham.getId() + " không tồn tại!"));

        SanPham sanPhamByTen = sanPhamRepo.getByTen(sanPham.getTen());
        SanPham sanPhamByMa = sanPhamRepo.getByMa(sanPham.getMa());

        if (sanPhamByTen != null && sanPhamByTen.getId() != sanPhamById.getId()) {
            throw new ResourceExistsException("Tên sản phẩm đã tồn tại!");
        }

        if (sanPhamByMa != null && sanPhamByMa.getId() != sanPhamById.getId()) {
            throw new ResourceExistsException("Mã sản phẩm đã tồn tại!");
        }
    }

    // client
    @Override
    public PagedResponse<SanPham> getByPageClient(int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
        Page<SanPham> sanPhamPage = sanPhamRepo.getByPageClient(pageable);

        PagedResponse<SanPham> paged = new PagedResponse<>();
        paged.setPageNumber(pageNumber);
        paged.setPageSize(pageSize);
        paged.setTotalElements((int) sanPhamPage.getTotalElements());
        paged.setTotalPages(sanPhamPage.getTotalPages());
        paged.setPageNumberArr(UtilityFunction.getPageNumberArr(sanPhamPage.getTotalPages()));
        paged.setData(sanPhamPage.getContent());
        paged.setSearch(null);

        return paged;
    }
}
