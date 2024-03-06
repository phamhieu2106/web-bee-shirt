package com.datn.backend.service.impl;

import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.exception.custom_exception.ResourceExistsException;
import com.datn.backend.model.san_pham.KieuDang;
import com.datn.backend.repository.KieuDangRepository;
import com.datn.backend.service.KieuDangService;
import com.datn.backend.utility.UtilityFunction;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class KieuDangServiceImpl implements KieuDangService {

    private final KieuDangRepository kieuDangRepo;

    @Override
    public KieuDang add(KieuDang kieuDang) {
        if (kieuDangRepo.existsByTen(kieuDang.getTen().toLowerCase())) {
            throw new ResourceExistsException("Tên kiểu dáng '" + kieuDang.getTen() + "' đã tồn tại.");
        }
        kieuDang.setTrangThai(true);
        return kieuDangRepo.save(kieuDang);
    }

    @Override
    public PagedResponse<KieuDang> getByPage(int pageNumber, int pageSize, String search) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
        Page<KieuDang> kieuDangPage = kieuDangRepo.getAll(pageable, search);

        PagedResponse<KieuDang> paged = new PagedResponse<>();
        paged.setPageNumber(pageNumber);
        paged.setPageSize(pageSize);
        paged.setTotalElements((int) kieuDangPage.getTotalElements());
        paged.setTotalPages(kieuDangPage.getTotalPages());
        paged.setPageNumberArr(UtilityFunction.getPageNumberArr(kieuDangPage.getTotalPages()));
        paged.setData(kieuDangPage.getContent());
        paged.setSearch(search);

        return paged;
    }

    @Override
    public List<KieuDang> getAll() {
        Sort sort = Sort.by("ten");
        return kieuDangRepo.findAll(sort);
    }

    @Override
    public KieuDang getById(int id) {
        return kieuDangRepo.findById(id).get();
    }

    @Override
    public void changeStatus(int id) {
        KieuDang kieuDang = kieuDangRepo.findById(id).get();
        kieuDang.setTrangThai(!kieuDang.isTrangThai());
        kieuDangRepo.save(kieuDang);
    }

    @Override
    public KieuDang update(KieuDang kieuDang) {
        checkExistForUpdate(kieuDang);
        return kieuDangRepo.save(kieuDang);
    }

    private void checkExistForUpdate(KieuDang kieuDang) {
        KieuDang kieuDangInDB = kieuDangRepo.findById(kieuDang.getId()).get();
        KieuDang kieuDangByTen = kieuDangRepo.getKieuDangByTen(kieuDang.getTen());

        if (kieuDangByTen != null && kieuDangByTen.getId() != kieuDangInDB.getId()) {
            throw new ResourceExistsException("Tên kiểu dáng '" + kieuDang.getTen() + "' đã tồn tại.");
        }
    }
}
