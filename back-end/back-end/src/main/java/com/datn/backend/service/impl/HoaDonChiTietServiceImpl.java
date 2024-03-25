package com.datn.backend.service.impl;

import com.datn.backend.dto.request.HoaDonChiTietRequest;
import com.datn.backend.dto.response.HoaDonChiTietResponse;
import com.datn.backend.dto.response.MessageResponse;
import com.datn.backend.exception.custom_exception.IdNotFoundException;
import com.datn.backend.exception.custom_exception.PlaceOrderException;
import com.datn.backend.model.hoa_don.HoaDonChiTiet;
import com.datn.backend.model.san_pham.SanPhamChiTiet;
import com.datn.backend.repository.HoaDonChiTietRepository;
import com.datn.backend.repository.HoaDonRepository;
import com.datn.backend.repository.SanPhamChiTietRepository;
import com.datn.backend.service.HoaDonChiTietService;
import jakarta.transaction.Transactional;
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
    private final SanPhamChiTietRepository sanPhamChiTietRepo;

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
        SanPhamChiTiet sanPhamChiTiet = hoaDonChiTiet.get().getSanPhamChiTiet();
        if (!sanPhamChiTiet.isTrangThai()){
            throw new PlaceOrderException("Sản phẩm "+sanPhamChiTiet.getSanPham().getTen() +" đã dừng bán!");
        }
        if (hoaDonChiTietRequest.getSoLuong() <= 0){
            throw new PlaceOrderException("Sản phẩm "+sanPhamChiTiet.getSanPham().getTen() +" số lượng không hợp lệ !");
        }
//        if (hoaDonChiTietRequest.getSoLuong() <= sanPhamChiTiet.getSoLuongTon()+hoaDonChiTiet.get().getSoLuong()){
//            throw new PlaceOrderException("Sản phẩm "+sanPhamChiTiet.getSanPham().getTen() +" đã hết hàng");
//        }
        if (hoaDonChiTietRequest.getSoLuong() > sanPhamChiTiet.getSoLuongTon()+hoaDonChiTiet.get().getSoLuong()){
            throw new PlaceOrderException("Sản phẩm "+sanPhamChiTiet.getSanPham().getTen() +" chỉ có thể mua tối đa "+ (sanPhamChiTiet.getSoLuongTon()+hoaDonChiTiet.get().getSoLuong())+" sản phẩm !");
        }
        // update so luong ton
        sanPhamChiTiet.setSoLuongTon(sanPhamChiTiet.getSoLuongTon()+hoaDonChiTiet.get().getSoLuong() - hoaDonChiTietRequest.getSoLuong());
        sanPhamChiTietRepo.save(sanPhamChiTiet);

        HoaDonChiTiet hoaDonCTUpdate = hoaDonChiTiet.get();
        hoaDonCTUpdate.setGiaBan(hoaDonChiTietRequest.getGiaBan());
        hoaDonCTUpdate.setSoLuong(hoaDonChiTietRequest.getSoLuong());
        hoaDonCTUpdate = hoaDonChiTietRepository.save(hoaDonCTUpdate);

        return modelMapper.map(hoaDonCTUpdate, HoaDonChiTietResponse.class);
    }

    @Override
    public HoaDonChiTietResponse deleteHoaDonCT(Integer id) {
        Optional<HoaDonChiTiet> hoaDonChiTiet = hoaDonChiTietRepository.findById(id);
        if (hoaDonChiTiet.isEmpty()){
            throw new IdNotFoundException("Không tìm thấy hóa đơn chi tiết id: "+id);
        }
        //update so luong ton
        SanPhamChiTiet sanPhamChiTiet = hoaDonChiTiet.get().getSanPhamChiTiet();
        sanPhamChiTiet.setSoLuongTon(sanPhamChiTiet.getSoLuongTon() + hoaDonChiTiet.get().getSoLuong());
        sanPhamChiTietRepo.save(sanPhamChiTiet);

        hoaDonChiTietRepository.delete(hoaDonChiTiet.get());
        return modelMapper.map(hoaDonChiTiet.get(),HoaDonChiTietResponse.class);
    }
}
