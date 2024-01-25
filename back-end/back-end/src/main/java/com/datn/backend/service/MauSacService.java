package com.datn.backend.service;

import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.model.san_pham.MauSac;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface MauSacService {

    MauSac add(MauSac mauSac, MultipartFile multipartFile) throws IOException;

    PagedResponse<MauSac> getAll(int pageNumber, int pageSize, String search);

    MauSac getById(int id);

    void changeStatus(int id);

    MauSac update(MauSac mauSac);
}
