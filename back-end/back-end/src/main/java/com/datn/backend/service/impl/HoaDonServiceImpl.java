package com.datn.backend.service.impl;

import com.datn.backend.dto.request.ChangeOrderStatusRequest;
import com.datn.backend.dto.request.HoaDonRequest;
import com.datn.backend.dto.response.HoaDonResponse;
import com.datn.backend.dto.response.LichSuHoaDonResponse;
import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.dto.response.SoLuongDonHangResponse;
import com.datn.backend.enumeration.LoaiHoaDon;
import com.datn.backend.enumeration.TrangThaiHoaDon;
import com.datn.backend.exception.custom_exception.IdNotFoundException;
import com.datn.backend.exception.custom_exception.OrderStatusException;
import com.datn.backend.model.hoa_don.HoaDon;
import com.datn.backend.model.hoa_don.LichSuHoaDon;
import com.datn.backend.repository.HoaDonRepository;
import com.datn.backend.repository.LichSuHoaDonRepository;
import com.datn.backend.service.HoaDonService;
import com.datn.backend.utility.UtilityFunction;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

/**
 * @author HungDV
 */
@Service
@RequiredArgsConstructor
public class HoaDonServiceImpl implements HoaDonService {
    private final HoaDonRepository hoaDonRepository;
    private final ModelMapper modelMapper;
    private final LichSuHoaDonRepository lichSuHoaDonRepository;

    /**
     * @param pageable
     * @param search     điều kiện tìm theo MaHD, SDTNguoiNhan, TenNguoiNhan,
     *                   EmailNguoiNhan, TenKhachHang, SDTKhachHang, TenNhanVien, TenKhachHang
     * @param loaiHoaDon
     * @param ngayTao
     * @return
     */
    @Override
    public PagedResponse<HoaDonResponse> getAll(Pageable pageable, String search, String loaiHoaDon, String ngayTao,String trangThai) {
        Page<HoaDon> hoaDons = hoaDonRepository.findByKeys(pageable, search, loaiHoaDon, ngayTao,trangThai);

        return PagedResponse.
                <HoaDonResponse>builder()
                .pageNumber(hoaDons.getNumber())
                .pageSize(hoaDons.getSize())
                .totalPages(hoaDons.getTotalPages())
                .totalElements(hoaDons.getTotalElements())
                .pageNumberArr(UtilityFunction.getPageNumberArr(hoaDons.getTotalPages()))
                .search(search)
                .data(
                        hoaDons.getContent().stream().map(hoaDon -> mapToHoaDonResponse(hoaDon)).toList()
                )
                .build();
    }

    @Override
    public HoaDonResponse getById(Integer id) {
        Optional<HoaDon> hoaDon = hoaDonRepository.findById(id);
        if (hoaDon.isEmpty()) {
            throw new IdNotFoundException("Không tồn tại hóa đơn id=" + id);
        }
        HoaDonResponse hoaDonResponse = mapToHoaDonResponse(hoaDon.get());
        return hoaDonResponse;
    }

    @Override
    public LichSuHoaDonResponse changeOrderStatus(ChangeOrderStatusRequest changeOrderStatus) {
        int id = changeOrderStatus.getIdHoaDon();
        Optional<HoaDon> hoaDon = hoaDonRepository.findById(id);
        if (hoaDon.isEmpty()) {
            throw new IdNotFoundException("Không tồn tại hóa đơn id=" + id);
        }
        HoaDon hoaDonUpdate = hoaDon.get();
        // đổi trạng thái
        TrangThaiHoaDon nextTrangThaiHD;
        if (changeOrderStatus.isNext()) {
            // nếu next = true thì next trạng thái
            if (hoaDonUpdate.getTrangThai() == TrangThaiHoaDon.HUY || hoaDonUpdate.getTrangThai() == TrangThaiHoaDon.HOAN_THANH) {
                // Hóa đơn đang ở trạng thái HUY hoặc HOAN_THANH thì k thể next trạng thái
                throw new OrderStatusException("Hóa đơn này không thể thay đổi trạng thái được nữa");
            }
            nextTrangThaiHD = TrangThaiHoaDon.valueOf(hoaDonUpdate.getTrangThai().getNext());
        } else {
            // nếu next = false thì prev trạng thái
            if (hoaDonUpdate.getTrangThai() == TrangThaiHoaDon.TAO_DON) {
                // Hóa đơn đang ở trạng thái TAO_DON thì k thể prev trạng thái
                throw new OrderStatusException("Hóa đơn này không thể quay lại trạng thái được nữa");
            }
            nextTrangThaiHD = TrangThaiHoaDon.valueOf(hoaDonUpdate.getTrangThai().getPrev());
        }
        hoaDonUpdate.setTrangThai(nextTrangThaiHD);
        //tạo 1 lịch sử hóa đơn
        LichSuHoaDon lichSuHoaDon = LichSuHoaDon.builder()
                .hoaDon(hoaDonUpdate)
                .moTa(changeOrderStatus.getMoTa())
                .tieuDe(nextTrangThaiHD.getTitle())
                .trangThai(nextTrangThaiHD)
                .build();

        return modelMapper.map(lichSuHoaDonRepository.save(lichSuHoaDon), LichSuHoaDonResponse.class);
    }

    @Override
    public LichSuHoaDonResponse cancelOrder(ChangeOrderStatusRequest changeOrderStatus) {
        int id = changeOrderStatus.getIdHoaDon();
        Optional<HoaDon> hoaDon = hoaDonRepository.findById(id);
        if (hoaDon.isEmpty()) {
            throw new IdNotFoundException("Không tồn tại hóa đơn id=" + id);
        }
        HoaDon hoaDonUpdate = hoaDon.get();


        // đổi trạng thái
        if (hoaDonUpdate.getTrangThai() == TrangThaiHoaDon.DANG_GIAO ||
                hoaDonUpdate.getTrangThai() == TrangThaiHoaDon.HUY ||
                hoaDonUpdate.getTrangThai() == TrangThaiHoaDon.HOAN_THANH) {
            // Hóa đơn đang ở trạng thái DANG_GIAO || HUY || HOAN_THANH thì k thể hủy hóa đơn
            throw new OrderStatusException("Hóa đơn này không thể thay đổi trạng thái được nữa");
        }


        TrangThaiHoaDon cancelOrder = TrangThaiHoaDon.HUY;
        hoaDonUpdate.setTrangThai(cancelOrder);


        //tạo 1 lịch sử hóa đơn
        LichSuHoaDon lichSuHoaDon = LichSuHoaDon.builder()
                .hoaDon(hoaDonUpdate)
                .moTa(changeOrderStatus.getMoTa())
                .tieuDe(cancelOrder.getTitle())
                .trangThai(cancelOrder)
                .build();

        return modelMapper.map(lichSuHoaDonRepository.save(lichSuHoaDon), LichSuHoaDonResponse.class);
    }

    @Override
    public HoaDonResponse updateHoaDon(HoaDonRequest hoaDonRequest) {
        Optional<HoaDon> hoaDon = hoaDonRepository.findById(hoaDonRequest.getId());
        LoaiHoaDon loaiHoaDon ;
        if (hoaDon.isEmpty()){
            throw new IdNotFoundException("Id hóa đơn không hợp lệ id: " +hoaDonRequest.getId());
        }
        try {
            loaiHoaDon = LoaiHoaDon.valueOf(hoaDonRequest.getLoaiHoaDon());
        }catch (IllegalArgumentException e){
            throw new IllegalArgumentException("Loại hóa đơn không hợp lệ: " + hoaDonRequest.getLoaiHoaDon() );
        }
        HoaDon hoaDonUpdate = hoaDon.get();
        hoaDonUpdate.setTenNguoiNhan(hoaDonRequest.getTenNguoiNhan());
        hoaDonUpdate.setSdtNguoiNhan(hoaDonRequest.getSdtNguoiNhan());
        hoaDonUpdate.setEmailNguoiNhan(hoaDonRequest.getEmailNguoiNhan());
        hoaDonUpdate.setDiaChiNguoiNhan(hoaDonRequest.getDiaChiNguoiNhan());
        hoaDonUpdate.setTongTien(hoaDonRequest.getTongTien());
        hoaDonUpdate.setTienGiam(hoaDonRequest.getTienGiam());
        hoaDonUpdate.setPhiVanChuyen(hoaDonRequest.getPhiVanChuyen());
        hoaDonUpdate.setLoaiHoaDon(loaiHoaDon);
        hoaDonUpdate.setGhiChu(hoaDonRequest.getGhiChu());

        return modelMapper.map(hoaDonRepository.save(hoaDonUpdate),HoaDonResponse.class);
    }

    @Override
    public SoLuongDonHangResponse getSoLuongDonHang() {
        return hoaDonRepository.getSoLuongDonHang();
    }

    public HoaDonResponse mapToHoaDonResponse(HoaDon hoaDon) {
        return modelMapper.map(hoaDon, HoaDonResponse.class);
    }
}
