package com.datn.backend.service.impl;

import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.exception.custom_exception.ResourceExistsException;
import com.datn.backend.model.san_pham.KieuThietKe;
import com.datn.backend.repository.KieuThietKeRepository;
import com.datn.backend.service.KieuThietKeService;
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
public class KieuThietKeServiceImpl implements KieuThietKeService {

    private final KieuThietKeRepository kieuThietKeRepo;

    @Override
    public KieuThietKe add(KieuThietKe thietKe) {
        if (kieuThietKeRepo.existsByTen(thietKe.getTen().toLowerCase())) {
            throw new ResourceExistsException("'" + thietKe.getTen() + "' đã tồn tại.");
        }
        thietKe.setTrangThai(true);
        return kieuThietKeRepo.save(thietKe);
    }

    @Override
    public PagedResponse<KieuThietKe> getByPage(int pageNumber, int pageSize, String search) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
        Page<KieuThietKe> thietKePage = kieuThietKeRepo.getAll(pageable, search);

        PagedResponse<KieuThietKe> paged = new PagedResponse<>();
        paged.setPageNumber(pageNumber);
        paged.setPageSize(pageSize);
        paged.setTotalElements((int) thietKePage.getTotalElements());
        paged.setTotalPages(thietKePage.getTotalPages());
        paged.setPageNumberArr(UtilityFunction.getPageNumberArr(thietKePage.getTotalPages()));
        paged.setData(thietKePage.getContent());
        paged.setSearch(search);

        return paged;
    }

    @Override
    public List<KieuThietKe> getAll() {
        Sort sort = Sort.by("ten");
        return kieuThietKeRepo.findAll(sort);
    }

    @Override
    public KieuThietKe getById(int id) {
        return kieuThietKeRepo.findById(id).get();
    }

    @Override
    public void changeStatus(int id) {
        KieuThietKe thietKe = kieuThietKeRepo.findById(id).get();
        thietKe.setTrangThai(!thietKe.isTrangThai());
        kieuThietKeRepo.save(thietKe);
    }

    @Override
    public KieuThietKe update(KieuThietKe thietKe) {
        checkExistForUpdate(thietKe);
        return kieuThietKeRepo.save(thietKe);
    }

    private void checkExistForUpdate(KieuThietKe thietKe) {
        KieuThietKe thietKeInDB = kieuThietKeRepo.findById(thietKe.getId()).get();
        KieuThietKe kieuThietKeByTen = kieuThietKeRepo.getKieuThietKeByTen(thietKe.getTen());

        if (kieuThietKeByTen != null && kieuThietKeByTen.getId() != thietKeInDB.getId()) {
            throw new ResourceExistsException("'" + thietKe.getTen() + "' đã tồn tại.");
        }
    }
}
