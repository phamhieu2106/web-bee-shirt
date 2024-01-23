package com.datn.backend.service.impl;

import com.datn.backend.dto.response.HoaDonResponse;
import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.model.hoa_don.HoaDon;
import com.datn.backend.repository.HoaDonRepository;
import com.datn.backend.service.HoaDonService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * @author HungDV
 */
@Service
@RequiredArgsConstructor
public class HoaDonServiceImpl implements HoaDonService {
    private final HoaDonRepository hoaDonRepository;
    private final ModelMapper modelMapper;

    /**
     *
     * @param pageable
     * @param search điều kiện tìm theo MaHD, SDTNguoiNhan, TenNguoiNhan,
     *              EmailNguoiNhan, TenKhachHang, SDTKhachHang, TenNhanVien, TenKhachHang
     * @return
     */
    @Override
    public PagedResponse<HoaDonResponse> getAll(Pageable pageable, String search) {
        Page<HoaDon> hoaDons = hoaDonRepository.findByKeys(pageable,search);

        return PagedResponse.
                <HoaDonResponse>builder()
                .pageNumber(hoaDons.getNumber())
                .pageSize(hoaDons.getSize())
                .totalPages(hoaDons.getTotalPages())
                .totalElements(hoaDons.getTotalElements())
                .data(
                        hoaDons.getContent().stream().map(hoaDon -> mapToHoaDonResponse(hoaDon)).toList()
                )
                .build();
    }

    public HoaDonResponse mapToHoaDonResponse(HoaDon hoaDon) {
        return modelMapper.map(hoaDon, HoaDonResponse.class);
    }
}