package com.datn.backend.service;

import com.datn.backend.dto.request.DotGiamGiaRequest;
import com.datn.backend.dto.response.DotGiamGiaReponse;
import com.datn.backend.model.dot_giam_gia.DotGiamGia;

import java.awt.print.Pageable;
import java.util.List;

public interface DotGiamGiaService {

    List<DotGiamGiaReponse> getAll();

    List<DotGiamGiaReponse> getPagination(int pageNumber, int pageSize, String search);

    DotGiamGiaReponse getOne(Integer id);

    DotGiamGia add(DotGiamGiaRequest object);

    DotGiamGia update(Integer id, DotGiamGiaRequest object);

    DotGiamGia remove(Integer id);
}
