package com.datn.backend.service.impl;

import com.datn.backend.dto.request.PhieuGiamGiaRequest;
import com.datn.backend.dto.response.PhieuGiamGiaResponse;
import com.datn.backend.model.phieu_giam_gia.PhieuGiamGia;
import com.datn.backend.repository.PhieuGiamGiaRepository;
import com.datn.backend.service.PhieuGiamGiaServce;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PhieuGiamGiaImpl implements PhieuGiamGiaServce {

    @Autowired
    PhieuGiamGiaRepository repository;
    @Override
    public List<PhieuGiamGia> getAll() {
        return repository.findAll();
    }

    @Override
    public PhieuGiamGiaResponse getOne(Integer id) {
        return null;
    }

    @Override
    public PhieuGiamGia add(PhieuGiamGiaRequest phieu) {
        return null;
    }

    @Override
    public PhieuGiamGia update(Integer id, PhieuGiamGiaRequest phieu) {
        return null;
    }

    @Override
    public PhieuGiamGia remove(Integer id) {
        return null;
    }
}
