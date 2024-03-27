package com.datn.backend.service.impl;

import com.datn.backend.dto.request.ThanhToanRequest;
import com.datn.backend.dto.response.ThanhToanResponse;
import com.datn.backend.enumeration.LoaiHinhThuc;
import com.datn.backend.exception.custom_exception.IdNotFoundException;
import com.datn.backend.model.hoa_don.HinhThucThanhToan;
import com.datn.backend.model.hoa_don.HoaDon;
import com.datn.backend.model.hoa_don.LichSuHoaDon;
import com.datn.backend.model.hoa_don.ThanhToan;
import com.datn.backend.repository.HinhThucThanhToanRepository;
import com.datn.backend.repository.HoaDonRepository;
import com.datn.backend.repository.LichSuHoaDonRepository;
import com.datn.backend.repository.ThanhToanRepository;
import com.datn.backend.service.ThanhToanService;
import com.datn.backend.utility.UtilityFunction;
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
public class ThanhToanServiceImpl implements ThanhToanService {
    private final ThanhToanRepository thanhToanRepository;
    private final HoaDonRepository hoaDonRepository;
    private final HinhThucThanhToanRepository htttRepository;
    private final LichSuHoaDonRepository lshdRepo;
    private final ModelMapper modelMapper;

    @Override
    @Transactional
    public ThanhToanResponse createThanhToan(ThanhToanRequest thanhToanRequest) {
        LoaiHinhThuc hinhThuc ;
        try{
            hinhThuc = LoaiHinhThuc.valueOf(thanhToanRequest.getHinhThucThanhToan());
        }catch (IllegalArgumentException e){
            throw new IllegalArgumentException("Hình thức thanh toán không hợp lệ: "+thanhToanRequest.getHinhThucThanhToan());
        }
        // kiểm tra hình thức thanh toán
        Optional<HinhThucThanhToan> httt = htttRepository.findByHinhThuc(hinhThuc);
        if (httt.isEmpty()) {
            throw new IdNotFoundException("Hình thức thanh toán không tồn tại");
        }
        // kiểm tra hóa đơn
        Optional<HoaDon> hoaDon = hoaDonRepository.findById(thanhToanRequest.getIdHoaDon());
        if (hoaDon.isEmpty()){
            throw new IdNotFoundException("Hóa đơn không tồn tại, vui lòng tải lại");
        }
        // check phải diền mã giao dịch khi chọn chuyen khoản
        if (hinhThuc == LoaiHinhThuc.CHUYEN_KHOAN
                && thanhToanRequest.getMaGiaoDich().isEmpty()){
            throw new RuntimeException("Mã giao dịch không đuược trống");
        }

        ThanhToan thanhToan = ThanhToan.builder()
                .moTa(thanhToanRequest.getMoTa())
                .maGiaoDich(thanhToanRequest.getMaGiaoDich())
                .soTien(thanhToanRequest.getSoTien())
                .trangThai(true)
                .hoaDon(hoaDon.get())
                .hinhThucThanhToan(httt.get())
                .build();

        // tao lshd
        LichSuHoaDon lichSuHoaDon = LichSuHoaDon
                .builder()
                .tieuDe("Tạo thanh toán")
                .moTa("Tạo thanh toán với số tiền : "+ UtilityFunction.convertToCurrency(thanhToan.getSoTien().doubleValue()))
                .hoaDon(thanhToan.getHoaDon())
                .build();

        lshdRepo.save(lichSuHoaDon);
        return modelMapper.map(thanhToanRepository.save(thanhToan),ThanhToanResponse.class);
    }

    @Override
    @Transactional
    public ThanhToanResponse deleteThanhToan(Integer thanhToanId) {
        if (thanhToanId == null){
            throw new IdNotFoundException("Thanh toán này không tồn tại vui lòng thử lại.");
        }
        ThanhToan thanhToan = thanhToanRepository.findById(thanhToanId).orElseThrow(() -> new IdNotFoundException("Thanh toán này không tồn tại vui lòng thử lại.") );
        // tao lshd
        LichSuHoaDon lichSuHoaDon = LichSuHoaDon
                .builder()
                .tieuDe("Xóa thanh toán")
                .moTa("Xóa thanh toán với số tiền : "+UtilityFunction.convertToCurrency(thanhToan.getSoTien().doubleValue()))
                .hoaDon(thanhToan.getHoaDon())
                .build();
        lshdRepo.save(lichSuHoaDon);

        thanhToanRepository.deleteById(thanhToanId);
        return modelMapper.map(thanhToan,ThanhToanResponse.class);
    }
}
