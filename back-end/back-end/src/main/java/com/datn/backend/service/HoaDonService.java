package com.datn.backend.service;

import com.datn.backend.dto.response.HoaDonResponse;
import com.datn.backend.dto.response.PagedResponse;
import org.springframework.data.domain.Pageable;

/**
 * @author HungDV
 */
public interface HoaDonService {
    PagedResponse<HoaDonResponse> getAll(Pageable pageable, String search);
}
