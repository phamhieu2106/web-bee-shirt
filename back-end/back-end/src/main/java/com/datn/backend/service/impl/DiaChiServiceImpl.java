package com.datn.backend.service.impl;

import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.model.khach_hang.DiaChi;
import com.datn.backend.repository.DiaChiRepository;
import com.datn.backend.service.DiaChiService;
import com.datn.backend.utility.UtilityFunction;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DiaChiServiceImpl implements DiaChiService {
    private final DiaChiRepository diaChiRepository;
    @Override
    public DiaChi add(DiaChi dc) {
        return diaChiRepository.save(dc);
    }

    @Override
    public PagedResponse<DiaChi> getAll(int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
        Page<DiaChi> page = diaChiRepository.getAll(pageable);

        PagedResponse<DiaChi> pagedResponse = new PagedResponse<>();
        pagedResponse.setPageNumber(pageNumber);
        pagedResponse.setPageSize(pageSize);
        pagedResponse.setTotalPages(page.getTotalPages());
        pagedResponse.setTotalElements(page.getTotalElements());
        pagedResponse.setPageNumberArr(UtilityFunction.getPageNumberArr(page.getTotalPages()));
        pagedResponse.setData(page.getContent());
        pagedResponse.setSearch("");
        return pagedResponse;
    }

    @Override
    public DiaChi getDCById(int id) {
        return diaChiRepository.findById(id).get();
    }
}
