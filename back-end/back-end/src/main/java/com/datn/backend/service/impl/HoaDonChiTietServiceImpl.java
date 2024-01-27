package com.datn.backend.service.impl;

import com.datn.backend.dto.request.HoaDonChiTietRequest;
import com.datn.backend.dto.response.HoaDonChiTietResponse;
import com.datn.backend.exception.custom_exception.IdNotFoundException;
import com.datn.backend.model.hoa_don.HoaDonChiTiet;
import com.datn.backend.model.san_pham.SanPhamChiTiet;
import com.datn.backend.repository.HoaDonChiTietRepository;
import com.datn.backend.repository.HoaDonRepository;
import com.datn.backend.service.HoaDonChiTietService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * @author HungDV
 */
@Service
@RequiredArgsConstructor
public class HoaDonChiTietServiceImpl implements HoaDonChiTietService {
    private final HoaDonChiTietRepository hoaDonChiTietRepository;
    private final HoaDonRepository hoaDonRepository;
    private final ModelMapper modelMapper;

    @Override
    public HoaDonChiTietResponse addHoaDonCT(HoaDonChiTietRequest hoaDonChiTietRequest) {
        // check hóa đơn
        if (!hoaDonRepository.existsById(hoaDonChiTietRequest.getHoaDonID())) {
            throw new IdNotFoundException("Hóa đơn không tồn tai id: " + hoaDonChiTietRequest.getHoaDonID());
        }
        return null;
    }

    @Override
    public HoaDonChiTietResponse updateHoaDonCT(HoaDonChiTietRequest hoaDonChiTietRequest) {
        Optional<HoaDonChiTiet> hoaDonChiTiet = hoaDonChiTietRepository.findById(hoaDonChiTietRequest.getId());
        if (hoaDonChiTiet.isEmpty()) {
            throw new IdNotFoundException("Hóa đơn chi tiết không tồn tai id: " + hoaDonChiTietRequest.getId());
        }
        // còn kiểm tra số lượng sản phẩm chi tiết nữa



        HoaDonChiTiet hoaDonCTUpdate = hoaDonChiTiet.get();
        hoaDonCTUpdate.setGiaBan(hoaDonChiTietRequest.getGiaBan());
        hoaDonCTUpdate.setSoLuong(hoaDonChiTietRequest.getSoLuong());
        hoaDonCTUpdate = hoaDonChiTietRepository.save(hoaDonCTUpdate);
        return modelMapper.map(hoaDonCTUpdate, HoaDonChiTietResponse.class);
    }

    @Override
    public String deleteHoaDonCT(Integer id) {
        Optional<HoaDonChiTiet> hoaDonChiTiet = hoaDonChiTietRepository.findById(id);
        if (hoaDonChiTiet.isEmpty()){
            throw new IdNotFoundException("Không tìm thấy hóa đơn chi tiết id: "+id);
        }
        hoaDonChiTietRepository.delete(hoaDonChiTiet.get());
        return "Xóa thành công";
    }
}
