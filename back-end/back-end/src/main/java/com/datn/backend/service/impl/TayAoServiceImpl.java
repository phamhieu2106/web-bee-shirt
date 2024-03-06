package com.datn.backend.service.impl;

import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.exception.custom_exception.ResourceExistsException;
import com.datn.backend.model.san_pham.TayAo;
import com.datn.backend.repository.TayAoRepository;
import com.datn.backend.service.TayAoService;
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
public class TayAoServiceImpl implements TayAoService {

    private final TayAoRepository tayAoRepo;

    @Override
    public TayAo add(TayAo tayAo) {
        if (tayAoRepo.existsByTen(tayAo.getTen().toLowerCase())) {
            throw new ResourceExistsException("Tên tay áo '" + tayAo.getTen() + "' đã tồn tại.");
        }
        tayAo.setTrangThai(true);
        return tayAoRepo.save(tayAo);
    }

    @Override
    public PagedResponse<TayAo> getByPage(int pageNumber, int pageSize, String search) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
        Page<TayAo> tayAoPage = tayAoRepo.getAll(pageable, search);

        PagedResponse<TayAo> paged = new PagedResponse<>();
        paged.setPageNumber(pageNumber);
        paged.setPageSize(pageSize);
        paged.setTotalElements((int) tayAoPage.getTotalElements());
        paged.setTotalPages(tayAoPage.getTotalPages());
        paged.setPageNumberArr(UtilityFunction.getPageNumberArr(tayAoPage.getTotalPages()));
        paged.setData(tayAoPage.getContent());
        paged.setSearch(search);

        return paged;
    }

    @Override
    public List<TayAo> getAll() {
        Sort sort = Sort.by("ten");
        return tayAoRepo.findAll(sort);
    }

    @Override
    public TayAo getById(int id) {
        return tayAoRepo.findById(id).get();
    }

    @Override
    public void changeStatus(int id) {
        TayAo tayAo = tayAoRepo.findById(id).get();
        tayAo.setTrangThai(!tayAo.isTrangThai());
        tayAoRepo.save(tayAo);
    }

    @Override
    public TayAo update(TayAo tayAo) {
        checkExistForUpdate(tayAo);
        return tayAoRepo.save(tayAo);
    }

    private void checkExistForUpdate(TayAo tayAo) {
        TayAo tayAoInDB = tayAoRepo.findById(tayAo.getId()).get();
        TayAo tayAoByTen = tayAoRepo.getTayAoByTen(tayAo.getTen());

        if (tayAoByTen != null && tayAoByTen.getId() != tayAoInDB.getId()) {
            throw new ResourceExistsException("Tên tay áo '" + tayAo.getTen() + "' đã tồn tại.");
        }
    }
}
