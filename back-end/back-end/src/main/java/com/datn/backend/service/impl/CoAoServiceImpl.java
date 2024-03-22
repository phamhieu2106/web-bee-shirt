package com.datn.backend.service.impl;

import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.exception.custom_exception.ResourceExistsException;
import com.datn.backend.model.san_pham.ChatLieu;
import com.datn.backend.model.san_pham.CoAo;
import com.datn.backend.repository.CoAoRepository;
import com.datn.backend.service.CoAoService;
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
public class CoAoServiceImpl implements CoAoService {

    private final CoAoRepository coAoRepo;

    @Override
    public CoAo add(CoAo coAo) {
        if (coAoRepo.existsByTen(coAo.getTen().toLowerCase())) {
            throw new ResourceExistsException("'" + coAo.getTen() + "' đã tồn tại.");
        }
        coAo.setTrangThai(true);
        return coAoRepo.save(coAo);
    }

    @Override
    public PagedResponse<CoAo> getByPage(int pageNumber, int pageSize, String search) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
        Page<CoAo> chatLieuPage = coAoRepo.getAll(pageable, search);

        PagedResponse<CoAo> paged = new PagedResponse<>();
        paged.setPageNumber(pageNumber);
        paged.setPageSize(pageSize);
        paged.setTotalElements((int) chatLieuPage.getTotalElements());
        paged.setTotalPages(chatLieuPage.getTotalPages());
        paged.setPageNumberArr(UtilityFunction.getPageNumberArr(chatLieuPage.getTotalPages()));
        paged.setData(chatLieuPage.getContent());
        paged.setSearch(search);

        return paged;
    }

    @Override
    public List<CoAo> getAll() {
        Sort sort = Sort.by("ten");
        return coAoRepo.findAll(sort);
    }

    @Override
    public CoAo getById(int id) {
        return coAoRepo.findById(id).get();
    }

    @Override
    public void changeStatus(int id) {
        CoAo coAo = coAoRepo.findById(id).get();
        coAo.setTrangThai(!coAo.isTrangThai());
        coAoRepo.save(coAo);
    }

    @Override
    public CoAo update(CoAo coAo) {
        checkExistForUpdate(coAo);
        return coAoRepo.save(coAo);
    }

    private void checkExistForUpdate(CoAo coAo) {
        CoAo coAoInDB = coAoRepo.findById(coAo.getId()).get();
        CoAo coAoByTen = coAoRepo.getCoAoByTen(coAo.getTen());

        if (coAoByTen != null && coAoByTen.getId() != coAoInDB.getId()) {
            throw new ResourceExistsException("Tên cổ áo '" + coAo.getTen() + "' đã tồn tại.");
        }
    }
}
