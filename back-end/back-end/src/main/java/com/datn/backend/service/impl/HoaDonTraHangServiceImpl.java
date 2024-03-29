package com.datn.backend.service.impl;

import com.datn.backend.dto.request.HoaDonTraHangRequest;
import com.datn.backend.dto.response.HoaDonResponse;
import com.datn.backend.dto.response.SpctResponse;
import com.datn.backend.enumeration.TrangThaiHoaDon;
import com.datn.backend.exception.custom_exception.ResourceInvalidException;
import com.datn.backend.exception.custom_exception.ResourceNotFoundException;
import com.datn.backend.model.hoa_don.HoaDon;
import com.datn.backend.repository.HoaDonTraHangRepository;
import com.datn.backend.service.HoaDonTraHangService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class HoaDonTraHangServiceImpl implements HoaDonTraHangService {

    private final HoaDonTraHangRepository repository;
    private final ModelMapper modelMapper;

    @Autowired
    public HoaDonTraHangServiceImpl(HoaDonTraHangRepository repository,
                                    ModelMapper modelMapper) {
        super();
        this.repository = repository;
        this.modelMapper = modelMapper;
    }

    @Override
    public HoaDonResponse getHoaDonByMa(String ma) {
//        Tìm Hoá Đơn Theo Mã
        Optional<HoaDon> optionalHoaDon
                = repository.findHoaDonByTrangThaiAndMa(TrangThaiHoaDon.HOAN_THANH, ma);
        if (optionalHoaDon.isEmpty()) {
            throw new ResourceNotFoundException("Không tìm thấy hoá đơn có mã: " + ma);
        } else {
            HoaDon hoaDon = optionalHoaDon.get();
            if (hoaDon.getUpdatedAt() == null) {
                throw new ResourceInvalidException("Đơn hàng chưa được cập nhật");
            }
//            Nếu thời gian đơn hàng hoàn thành đã quá 7 ngày thì không cho đổi
            if (LocalDateTime.now().minusDays(7).isAfter(hoaDon.getUpdatedAt())) {
                throw new ResourceInvalidException("Đơn hàng đã quá thời gian trả hàng");
            }

            return modelMapper.map(hoaDon, HoaDonResponse.class);
        }
    }

    @Override
    public HoaDonResponse handleTraHang(HoaDonTraHangRequest hoaDonTraHangRequest) {
        return null;
    }

    @Override
    public List<SpctResponse> getDanhSachSanPhamDaMua(Integer idHoaDon) {
        if (idHoaDon == 0) {
            throw new ResourceNotFoundException("Không tìm thấy hoá đơn để lấy danh sách sản phẩm");
        }
        return repository.getAllSanPhamChiTiet(idHoaDon)
                .stream()
                .map(item -> modelMapper.map(item, SpctResponse.class)).toList();
    }
}
