package com.datn.backend.service;

import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.model.san_pham.TayAo;

public interface TayAoService {

    TayAo add(TayAo chatLieu);

    PagedResponse<TayAo> getAll(int pageNumber, int pageSize, String search);

    TayAo getById(int id);

    void changeStatus(int id);

    TayAo update(TayAo tayAo);
}
