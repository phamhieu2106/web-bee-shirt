package com.datn.backend.service.impl;

import com.datn.backend.dto.request.PhieuGiamGiaRequest;
import com.datn.backend.dto.response.PhieuGiamGiaResponse;
import com.datn.backend.model.phieu_giam_gia.PhieuGiamGia;
import com.datn.backend.repository.PhieuGiamGiaRepository;
import com.datn.backend.service.PhieuGiamGiaServce;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PhieuGiamGiaServceImpl implements PhieuGiamGiaServce {


    private PhieuGiamGiaRepository repository;

    @Autowired
    public PhieuGiamGiaServceImpl(PhieuGiamGiaRepository repository){
        super();
        this.repository=repository;
    }
    @Override
    public List<PhieuGiamGiaResponse> getAll() {
        return repository.getAll();
    }

    @Override
    public PhieuGiamGiaResponse getOne(Integer id) {
        return repository.getOneById(id);
    }

    @Override
    public PhieuGiamGia add(PhieuGiamGiaRequest phieu) {
        return null;
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
            phieuGiamGia.setTrangThai(0);
            return repository.save(phieuGiamGia);
        }).orElse(null);
    }

    @Override
    public List<PhieuGiamGiaResponse> getPagination(int pageNumber, int pageSize, String search) {
        Pageable pageable = PageRequest.of(pageNumber - 1,pageSize);

        return repository.getPagination(pageable,search);
    }

}
