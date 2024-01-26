package com.datn.backend.service;

import com.datn.backend.dto.request.DotGiamGiaRequest;
import com.datn.backend.dto.response.DotGiamGiaResponse;
import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.model.dot_giam_gia.DotGiamGia;

public interface DotGiamGiaService {

//    List<DotGiamGiaResponse> getAll();

    PagedResponse<DotGiamGiaResponse> getPagination(int pageNumber, int pageSize, String search);

    PagedResponse<DotGiamGiaResponse> getFilter(int pageNumber, int pageSize, String search
            , int status, String startDate, String endDate);

    DotGiamGiaResponse getOne(Integer id);

    DotGiamGia add(DotGiamGiaRequest object);

    DotGiamGia update(Integer id, DotGiamGiaRequest object);

    boolean remove(Integer id);
}
