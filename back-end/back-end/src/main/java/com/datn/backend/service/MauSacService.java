package com.datn.backend.service;

import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.model.san_pham.MauSac;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface MauSacService {

    MauSac add(MauSac mauSac, MultipartFile multipartFile) throws IOException;

    PagedResponse<MauSac> getByPage(int pageNumber, int pageSize, String search);

    List<MauSac> getAll();

    List<MauSac> getAllActiveColors();

    MauSac getById(int id);

    void changeStatus(int id);

    MauSac update(MauSac mauSac, MultipartFile multipartFile) throws IOException;

    List<MauSac> getAllColorOfProduct(int productId);
}
