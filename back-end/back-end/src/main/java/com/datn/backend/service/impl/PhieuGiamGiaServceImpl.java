package com.datn.backend.service.impl;

import com.datn.backend.dto.request.PhieuGiamGiaRequest;
import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.dto.response.PhieuGiamGiaResponse;
import com.datn.backend.model.phieu_giam_gia.PhieuGiamGia;
import com.datn.backend.repository.PhieuGiamGiaRepository;
import com.datn.backend.service.PhieuGiamGiaServce;
import com.datn.backend.utility.UtilityFunction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PhieuGiamGiaServceImpl implements PhieuGiamGiaServce {


    private PhieuGiamGiaRepository repository;

    @Autowired
    public PhieuGiamGiaServceImpl(PhieuGiamGiaRepository repository) {
        super();
        this.repository = repository;
    }


    @Override
    public PhieuGiamGiaResponse getOne(Integer id) {
        return repository.getOneById(id);
    }

    @Override
    public PhieuGiamGia add(PhieuGiamGiaRequest phieu) {
        PhieuGiamGia pgg = phieu.giamGia(new PhieuGiamGia());
        return repository.save(pgg);
    }

    @Override
    public PhieuGiamGia update(Integer id, PhieuGiamGiaRequest object) {
        Optional<PhieuGiamGia> optional = repository.findById(id);
        return optional.map(phieuGiamGia -> repository.save(object.giamGia(phieuGiamGia))).orElse(null);
    }

    @Override
    public PhieuGiamGia remove(Integer id) {

        Optional<PhieuGiamGia> optional = repository.findById(id);
        return optional.map(phieuGiamGia -> {
            phieuGiamGia.setTrangThai(false);
            return repository.save(phieuGiamGia);
        }).orElse(null);
    }

    @Override
    public void changeStatus(int id) {
        PhieuGiamGia pgg = repository.findById(id).get();
        pgg.setTrangThai(!pgg.isTrangThai());
        repository.save(pgg);
    }

    @Override
    public PagedResponse<PhieuGiamGia> getPagination(int pageNumber, int pageSize, String search) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
        Page<PhieuGiamGia> phieuGiamGiaPage = repository.getPagination(pageable, search);

        PagedResponse<PhieuGiamGia> paged = new PagedResponse<>();
        paged.setPageNumber(pageNumber);
        paged.setPageSize(pageSize);
        paged.setTotalElements((int) phieuGiamGiaPage.getTotalElements());
        paged.setTotalPages(phieuGiamGiaPage.getTotalPages());
        paged.setPageNumberArr(UtilityFunction.getPageNumberArr(phieuGiamGiaPage.getTotalPages()));
        paged.setData(phieuGiamGiaPage.getContent());
        paged.setSearch(search);

        return paged;
    }

}
