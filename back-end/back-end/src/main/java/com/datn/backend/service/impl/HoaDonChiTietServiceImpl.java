package com.datn.backend.service.impl;

import com.datn.backend.dto.request.AddHoaDonChiTietRequest;
import com.datn.backend.dto.request.HoaDonChiTietRequest;
import com.datn.backend.dto.response.HoaDonChiTietResponse;
import com.datn.backend.exception.custom_exception.IdNotFoundException;
import com.datn.backend.exception.custom_exception.PlaceOrderException;
import com.datn.backend.model.dot_giam_gia.DotGiamGia;
import com.datn.backend.model.hoa_don.HoaDon;
import com.datn.backend.model.hoa_don.HoaDonChiTiet;
import com.datn.backend.model.hoa_don.LichSuHoaDon;
import com.datn.backend.model.san_pham.SanPhamChiTiet;
import com.datn.backend.repository.*;
import com.datn.backend.service.HoaDonChiTietService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
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
    private final DotGiamGiaSanPhamRepository dotGiamGiaSanPhamRepo;
    private final LichSuHoaDonRepository lichSuHoaDonRepo;

    @Override
    @Transactional
    public HoaDonChiTietResponse addHoaDonCT(AddHoaDonChiTietRequest hoaDonChiTietRequest) {
        HoaDonChiTiet hoaDonChiTiet = null; // hoa don chi tiet de update hoac them
//        // check hóa đơn
        HoaDon hoaDon = hoaDonRepository.findById(hoaDonChiTietRequest.getHoaDonId()).orElseThrow(
                () -> new IdNotFoundException("Hóa đơn không tồn tại")
        ); // hoa don cua don hien tai

        SanPhamChiTiet sanPhamChiTiet = sanPhamChiTietRepo.findById(hoaDonChiTietRequest.getSanPhamChiTietId()).orElseThrow(
                () -> new IdNotFoundException("Sản phẩm chi tiết không tồn tại")
        ); // san pham can them

        if (!sanPhamChiTiet.getSanPham().isTrangThai()) {
            throw new RuntimeException("Sản phẩm chi tiết này đã dừng bán");
        }
        if (sanPhamChiTiet.getSoLuongTon() <= 0) {
            throw new RuntimeException("Sản phẩm chi tiết này đã hết hàng");
        }

        // kiem tra spct da duoc mua chua
        Optional<HoaDonChiTiet> hoaDonChiTietOptional = hoaDon.getHoaDonChiTiets().stream().filter(
                (hdct) -> hdct.getSanPhamChiTiet().getId().equals(hoaDonChiTietRequest.getSanPhamChiTietId())
        ).findFirst();

        // neu san pham chua duoc mua hoac gia ban bi thay doi
        if (hoaDonChiTietOptional.isEmpty() ||
                hoaDonChiTietOptional.get().getGiaBan().compareTo(
                        getGiaBanSpctHienTai(hoaDonChiTietRequest.getSanPhamChiTietId())
                ) != 0
        ) {
            hoaDonChiTiet = HoaDonChiTiet
                    .builder()
                    .soLuong(1)
                    .giaBan(this.getGiaBanSpctHienTai(hoaDonChiTietRequest.getSanPhamChiTietId()))
                    .giaNhap(sanPhamChiTiet.getGiaNhap())
                    .hoaDon(hoaDon)
                    .sanPhamChiTiet(sanPhamChiTiet)
                    .build();
            // tru so luong ton
            sanPhamChiTiet.setSoLuongTon(sanPhamChiTiet.getSoLuongTon() - 1);
            sanPhamChiTietRepo.save(sanPhamChiTiet);

            // tao lich su hoa don
            LichSuHoaDon lichSuHoaDon = LichSuHoaDon.builder()
                    .tieuDe("Thêm sản phẩm")
                    .moTa("Thêm 1 sản phẩm " + sanPhamChiTiet.getSanPham().getTen() + " màu " + sanPhamChiTiet.getMauSac().getTen() + " size " + sanPhamChiTiet.getMauSac().getTen())
                    .hoaDon(hoaDon)
                    .build();
            lichSuHoaDonRepo.save(lichSuHoaDon);
        } else {
            // neu san san pham khong bi thay doi gia ban
            hoaDonChiTiet = hoaDonChiTietOptional.get();

            // tru so luong ton
            hoaDonChiTiet.setSoLuong(hoaDonChiTiet.getSoLuong() + 1);

            sanPhamChiTiet.setSoLuongTon(sanPhamChiTiet.getSoLuongTon() - 1);
            sanPhamChiTietRepo.save(sanPhamChiTiet);

            // tao lich su hoa don
            LichSuHoaDon lichSuHoaDon = LichSuHoaDon.builder()
                    .tieuDe("Cập nhật sản phẩm")
                    .moTa("Thêm 1 sản phẩm " + sanPhamChiTiet.getSanPham().getTen() + " màu " + sanPhamChiTiet.getMauSac().getTen() + " size " + sanPhamChiTiet.getMauSac().getTen())
                    .hoaDon(hoaDon)
                    .build();
            lichSuHoaDonRepo.save(lichSuHoaDon);
        }

        return modelMapper.map(hoaDonChiTietRepository.save(hoaDonChiTiet), HoaDonChiTietResponse.class);
    }

    private BigDecimal getGiaBanSpctHienTai(Integer sanPhamChiTietId) {
        SanPhamChiTiet sanPhamChiTiet = sanPhamChiTietRepo.findById(sanPhamChiTietId).orElseThrow(
                () -> new IdNotFoundException("Sản phẩm chi tiết không tồn tại")
        );
        BigDecimal giaBan = null;
        DotGiamGia dotGiamGia = dotGiamGiaSanPhamRepo.findDotGiamGiaSanPhamActiveBySanPhamChiTietId(sanPhamChiTietId);
        if (dotGiamGia != null) {
            giaBan = BigDecimal.valueOf(sanPhamChiTiet.getGiaBan().longValue() * (100 - dotGiamGia.getGiaTriPhanTram()) / 100);
        } else {
            giaBan = sanPhamChiTiet.getGiaBan();
        }
        return giaBan;
    }

    @Override
    public HoaDonChiTietResponse updateHoaDonCT(HoaDonChiTietRequest hoaDonChiTietRequest) {
        Optional<HoaDonChiTiet> hoaDonChiTiet = hoaDonChiTietRepository.findById(hoaDonChiTietRequest.getId());
        if (hoaDonChiTiet.isEmpty()) {
            throw new IdNotFoundException("Hóa đơn chi tiết không tồn tai id: " + hoaDonChiTietRequest.getId());
        }
        // còn kiểm tra số lượng sản phẩm chi tiết nữa
        SanPhamChiTiet sanPhamChiTiet = hoaDonChiTiet.get().getSanPhamChiTiet();
        if (!sanPhamChiTiet.isTrangThai()) {
            throw new PlaceOrderException("Sản phẩm " + sanPhamChiTiet.getSanPham().getTen() + " đã dừng bán!");
        }
        if (hoaDonChiTietRequest.getSoLuong() <= 0) {
            throw new PlaceOrderException("Sản phẩm " + sanPhamChiTiet.getSanPham().getTen() + " số lượng không hợp lệ !");
        }
//        if (hoaDonChiTietRequest.getSoLuong() <= sanPhamChiTiet.getSoLuongTon()+hoaDonChiTiet.get().getSoLuong()){
//            throw new PlaceOrderException("Sản phẩm "+sanPhamChiTiet.getSanPham().getTen() +" đã hết hàng");
//        }
        if (hoaDonChiTietRequest.getSoLuong() > sanPhamChiTiet.getSoLuongTon() + hoaDonChiTiet.get().getSoLuong()) {
            throw new PlaceOrderException("Sản phẩm " + sanPhamChiTiet.getSanPham().getTen() + " chỉ có thể mua tối đa " + (sanPhamChiTiet.getSoLuongTon() + hoaDonChiTiet.get().getSoLuong()) + " sản phẩm !");
        }
        // update so luong ton
        sanPhamChiTiet.setSoLuongTon(sanPhamChiTiet.getSoLuongTon() + hoaDonChiTiet.get().getSoLuong() - hoaDonChiTietRequest.getSoLuong());
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
        if (hoaDonChiTiet.isEmpty()) {
            throw new IdNotFoundException("Không tìm thấy hóa đơn chi tiết id: " + id);
        }
        //update so luong ton
        SanPhamChiTiet sanPhamChiTiet = hoaDonChiTiet.get().getSanPhamChiTiet();
        sanPhamChiTiet.setSoLuongTon(sanPhamChiTiet.getSoLuongTon() + hoaDonChiTiet.get().getSoLuong());
        sanPhamChiTietRepo.save(sanPhamChiTiet);

        hoaDonChiTietRepository.delete(hoaDonChiTiet.get());
        return modelMapper.map(hoaDonChiTiet.get(), HoaDonChiTietResponse.class);
    }
}
