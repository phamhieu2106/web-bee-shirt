package com.datn.backend.service;

import com.datn.backend.dto.request.AddNhanVienRequest;
import com.datn.backend.model.NhanVien;

public interface NhanVienService {

    NhanVien add(AddNhanVienRequest request);
}
