package com.datn.backend.service.impl;

import com.datn.backend.exception.custom_exception.ResourceNotFoundException;
import com.datn.backend.model.khach_hang.DiaChi;
import com.datn.backend.repository.DiaChiRepository;
import com.datn.backend.service.DiaChiService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DiaChiServiceImpl implements DiaChiService {

    private final DiaChiRepository diaChiRepo;

    @Override
    public DiaChi add(DiaChi dc) {
        return diaChiRepo.save(dc);
    }

    @Override
    public DiaChi updateDC(DiaChi dc) {
        return diaChiRepo.save(dc);
    }

    @Override
    public List<DiaChi> getAllAddressOf1Customer(int id) {
        return diaChiRepo.getAllAddressOf1Customer(id);
    }

    @Override
    public DiaChi getDCById(int id) {
        return diaChiRepo.findById(id).get();
    }

    @Override
    public DiaChi deleteDC(int id) {
        DiaChi diaChi = getDCById(id);
        if (!diaChi.isMacDinh()) {
            diaChiRepo.delete(diaChi);
        }
        return null;
    }

    @Override
    @Transactional
    public DiaChi setDefault(int id) {
        DiaChi address = diaChiRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Địa chỉ ID: " + id + " không tồn tại"));
        address.setMacDinh(true);
        diaChiRepo.setUnDefaultValue(address.getId(), address.getKhachHang().getId());
        return diaChiRepo.save(address);
    }
}
