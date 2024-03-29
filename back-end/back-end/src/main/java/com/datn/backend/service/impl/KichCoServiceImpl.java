package com.datn.backend.service.impl;

import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.exception.custom_exception.ResourceExistsException;
import com.datn.backend.model.san_pham.KichCo;
import com.datn.backend.repository.KichCoRepository;
import com.datn.backend.service.KichCoService;
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
public class KichCoServiceImpl implements KichCoService {

    private final KichCoRepository kichCoRepo;

    @Override
    public KichCo add(KichCo kichCo) {
        if (kichCoRepo.existsByTen(kichCo.getTen().toLowerCase())) {
            throw new ResourceExistsException("Tên kích cỡ '" + kichCo.getTen() + "' đã tồn tại.");
        }
        kichCo.setTrangThai(true);
        return kichCoRepo.save(kichCo);
    }

    @Override
    public PagedResponse<KichCo> getByPage(int pageNumber, int pageSize, String search) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
        Page<KichCo> kichCoPage = kichCoRepo.getAll(pageable, search);

        PagedResponse<KichCo> paged = new PagedResponse<>();
        paged.setPageNumber(pageNumber);
        paged.setPageSize(pageSize);
        paged.setTotalElements((int) kichCoPage.getTotalElements());
        paged.setTotalPages(kichCoPage.getTotalPages());
        paged.setPageNumberArr(UtilityFunction.getPageNumberArr(kichCoPage.getTotalPages()));
        paged.setData(kichCoPage.getContent());
        paged.setSearch(search);

        return paged;
    }

    @Override
    public List<KichCo> getAll() {
        return kichCoRepo.findAll();
    }

    @Override
    public KichCo getById(int id) {
        return kichCoRepo.findById(id).get();
    }

    @Override
    public void changeStatus(int id) {
        KichCo kichCo = kichCoRepo.findById(id).get();
        kichCo.setTrangThai(!kichCo.isTrangThai());
        kichCoRepo.save(kichCo);
    }

    @Override
    public KichCo update(KichCo kichCo) {
        checkExistForUpdate(kichCo);
        return kichCoRepo.save(kichCo);
    }

    private void checkExistForUpdate(KichCo kichCo) {
        KichCo kichCoInDB = kichCoRepo.findById(kichCo.getId()).get();
        KichCo kichCoByTen = kichCoRepo.getKichCoByTen(kichCo.getTen());

        if (kichCoByTen != null && kichCoByTen.getId() != kichCoInDB.getId()) {
            throw new ResourceExistsException("Tên kiểu dáng '" + kichCo.getTen() + "' đã tồn tại.");
        }
    }

    @Override
    public List<KichCo> getAllByProductAndColor(int productId, int colorId) {
        return kichCoRepo.getAllByProductAndColor(productId, colorId);
    }
}
