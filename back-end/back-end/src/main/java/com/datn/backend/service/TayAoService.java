package com.datn.backend.service;

import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.model.san_pham.TayAo;

import java.util.List;

public interface TayAoService {

    TayAo add(TayAo chatLieu);

    PagedResponse<TayAo> getByPage(int pageNumber, int pageSize, String search);

    List<TayAo> getAll();

    TayAo getById(int id);

    void changeStatus(int id);

    TayAo update(TayAo tayAo);
}
