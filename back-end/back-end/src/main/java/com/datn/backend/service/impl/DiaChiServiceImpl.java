package com.datn.backend.service.impl;

import com.datn.backend.dto.request.DiaChiRequest;
import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.model.khach_hang.DiaChi;
import com.datn.backend.model.khach_hang.KhachHang;
import com.datn.backend.repository.DiaChiRepository;
import com.datn.backend.repository.KhachHangRepository;
import com.datn.backend.service.DiaChiService;
import com.datn.backend.utility.UtilityFunction;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DiaChiServiceImpl implements DiaChiService {
    private final DiaChiRepository diaChiRepository;
    private final KhachHangRepository khachHangRepository;

    @Override
    public DiaChi add(DiaChi dc) {
        return diaChiRepository.save(dc);
    }

    @Override
    public DiaChi updateDC(DiaChi dc) {
        return diaChiRepository.save(dc);
    }

    @Override
    public List<DiaChi> getAllDC(int id) {
        return diaChiRepository.getAll(id);
    }

    @Override
    public DiaChi getDCById(int id) {
        return diaChiRepository.findById(id).get();
    }

    @Override
    public DiaChi deleteDC(int id) {
        DiaChi diaChi = getDCById(id);
        if (!diaChi.isMacDinh()) {
            diaChiRepository.delete(diaChi);
        }
        return null;
    }

    @Override
    public void setDefault(int id) {
        DiaChi setDC = diaChiRepository.findById(id).orElse(null);
        if (setDC != null) {
            setDC.setMacDinh(true);
            diaChiRepository.save(setDC);
            List<DiaChi> ds = getAllDC(setDC.getKhachHang().getId());
            for (DiaChi diaChi : ds) {
                if (!diaChi.getId().equals(id)) {
                    diaChi.setMacDinh(false);
                    diaChiRepository.save(diaChi);
                }
            }
        }
    }
}
