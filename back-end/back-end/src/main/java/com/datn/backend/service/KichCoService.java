package com.datn.backend.service;

import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.model.san_pham.KichCo;

import java.util.List;

public interface KichCoService {

    KichCo add(KichCo kichCo);

    PagedResponse<KichCo> getByPage(int pageNumber, int pageSize, String search);

    List<KichCo> getAll();

    KichCo getById(int id);

    void changeStatus(int id);

    KichCo update(KichCo kichCo);

    List<KichCo> getAllByProductAndColor(int productId, int colorId);
}
