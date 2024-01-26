package com.datn.backend.service;

import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.model.san_pham.KichCo;

public interface KichCoService {

    KichCo add(KichCo kichCo);

    PagedResponse<KichCo> getAll(int pageNumber, int pageSize, String search);

    KichCo getById(int id);

    void changeStatus(int id);

    KichCo update(KichCo kichCo);
}
