package com.datn.backend.service;

import com.datn.backend.dto.request.DotGiamGiaRequest;
import com.datn.backend.dto.request.DotGiamGiaSanPhamRequest;
import com.datn.backend.model.dot_giam_gia.DotGiamGiaSanPham;

import java.util.List;

public interface DotGiamGiaSanPhamService {

//    List San Pham Chi Tiet Response

//    San Pham Chi Tiet Response

    DotGiamGiaSanPham add(DotGiamGiaRequest object);

    DotGiamGiaSanPham update(Integer id, DotGiamGiaSanPhamRequest object);

}
