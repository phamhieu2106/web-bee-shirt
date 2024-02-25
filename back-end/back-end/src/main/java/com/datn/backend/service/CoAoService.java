package com.datn.backend.service;

import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.model.san_pham.CoAo;

import java.util.List;

public interface CoAoService {

    CoAo add(CoAo coAo);

    PagedResponse<CoAo> getByPage(int pageNumber, int pageSize, String search);

    List<CoAo> getAll();

    CoAo getById(int id);

    void changeStatus(int id);

    CoAo update(CoAo coAo);
}
