package com.datn.backend.service;

import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.model.san_pham.CoAo;

public interface CoAoService {

    CoAo add(CoAo coAo);

    PagedResponse<CoAo> getAll(int pageNumber, int pageSize, String search);

    CoAo getById(int id);

    void changeStatus(int id);

    CoAo update(CoAo coAo);
}
