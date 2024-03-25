package com.datn.backend.service.impl;

import com.datn.backend.dto.request.*;
import com.datn.backend.dto.response.HoaDonResponse;
import com.datn.backend.dto.response.LichSuHoaDonResponse;
import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.dto.response.SoLuongDonHangResponse;
import com.datn.backend.enumeration.LoaiHinhThuc;
import com.datn.backend.enumeration.LoaiHoaDon;
import com.datn.backend.enumeration.TrangThaiHoaDon;
import com.datn.backend.exception.custom_exception.IdNotFoundException;
import com.datn.backend.exception.custom_exception.OrderStatusException;
import com.datn.backend.exception.custom_exception.PlaceOrderException;
import com.datn.backend.model.NhanVien;
import com.datn.backend.model.hoa_don.HoaDon;
import com.datn.backend.model.hoa_don.HoaDonChiTiet;
import com.datn.backend.model.hoa_don.LichSuHoaDon;
import com.datn.backend.model.hoa_don.ThanhToan;
import com.datn.backend.model.khach_hang.KhachHang;
import com.datn.backend.model.phieu_giam_gia.PhieuGiamGia;
import com.datn.backend.model.san_pham.SanPhamChiTiet;
import com.datn.backend.repository.*;
import com.datn.backend.service.HoaDonService;
import com.datn.backend.utility.UtilityFunction;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
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
    private final NhanVienRepository nhanVienRepo;
    private final KhachHangRepository khachHangRepo;
    private final HoaDonChiTietRepository hoaDonChiTietRepo;
    private final ThanhToanRepository thanhToanRepo;
    private final PhieuGiamGiaRepository phieuGiamGiaRepo;
    private final SanPhamChiTietRepository spctRepo;
    private final HinhThucThanhToanRepository hinhThucThanhToanRepo;

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
    @Transactional
    public LichSuHoaDonResponse cancelOrder(ChangeOrderStatusRequest changeOrderStatus) {
        int id = changeOrderStatus.getIdHoaDon();
        Optional<HoaDon> hoaDon = hoaDonRepository.findById(id);
        if (hoaDon.isEmpty()) {
            throw new IdNotFoundException("Không tồn tại hóa đơn id=" + id);
        }
        HoaDon hoaDonUpdate = hoaDon.get();


        // đổi trạng thái
        if (hoaDonUpdate.getTrangThai() == TrangThaiHoaDon.DANG_GIAO ||
                hoaDonUpdate.getTrangThai() == TrangThaiHoaDon.HUY ) {
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
        //rollback sl sp va sl pgg
        if (hoaDonUpdate.getPhieuGiamGia() != null){
            hoaDonUpdate.getPhieuGiamGia().setSoLuong(hoaDonUpdate.getPhieuGiamGia().getSoLuong() + 1);
            System.out.println(hoaDonUpdate.getPhieuGiamGia());
            phieuGiamGiaRepo.save(hoaDonUpdate.getPhieuGiamGia());
        }
        if (hoaDonUpdate.getHoaDonChiTiets() != null && !hoaDonUpdate.getHoaDonChiTiets().isEmpty()){
            hoaDonUpdate.getHoaDonChiTiets().forEach(hdct ->{
                hdct.getSanPhamChiTiet().setSoLuongTon(hdct.getSanPhamChiTiet().getSoLuongTon() + hdct.getSoLuong());
                System.out.println(hdct.getSanPhamChiTiet());
                spctRepo.save(hdct.getSanPhamChiTiet());
            });
        }

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

    @Override
    @Transactional
    public HoaDonResponse placeOrder(PlaceOrderRequest placeOrderRequest) {
        HoaDon hoaDon = null;
//        System.out.println(placeOrderRequest.getDiaChiVaPhiVanChuyen());
        if (placeOrderRequest.getLoaiHoaDon().equals(LoaiHoaDon.TAI_QUAY.toString())){
            hoaDon = this.createHoaDonTaiQuay(placeOrderRequest);
        } else if (placeOrderRequest.getLoaiHoaDon().equals(LoaiHoaDon.GIAO_HANG.toString())) {
            hoaDon = this.createHoaDonGiaoHang(placeOrderRequest);
        }
        return mapToHoaDonResponse(hoaDon);
    }

    private HoaDon createHoaDonTaiQuay(PlaceOrderRequest placeOrderRequest) {
        NhanVien nhanVien = nhanVienRepo.findById(placeOrderRequest.getNhanVienId()).orElse(null);
        KhachHang khachHang =placeOrderRequest.getKhachHangId() != null ? khachHangRepo.findById(placeOrderRequest.getKhachHangId()).orElse(null):null;
        PhieuGiamGia phieuGiamGia = this.validPhieuGiamGia(placeOrderRequest.getPhieuGiamGiaId());

//        System.out.println(placeOrderRequest);
        HoaDon hoaDon = HoaDon
                .builder()
                .ma(generateMaHD())
                .loaiHoaDon(LoaiHoaDon.valueOf(placeOrderRequest.getLoaiHoaDon()))
                .tenNguoiNhan(null)
                .sdtNguoiNhan(null)
                .emailNguoiNhan(null)
                .diaChiNguoiNhan(null)
                .tongTien(placeOrderRequest.getTongTien())
                .tienGiam(placeOrderRequest.getTienGiam())
                .phiVanChuyen(BigDecimal.valueOf(0))
                .loaiHoaDon(LoaiHoaDon.TAI_QUAY)
                .trangThai(TrangThaiHoaDon.HOAN_THANH)
                .ghiChu(placeOrderRequest.getGhiChu())
                .nhanVien(nhanVien)
                .khachHang(khachHang)
                .phieuGiamGia(phieuGiamGia)
                .build();

        hoaDonRepository.save(hoaDon);
                hoaDon.setHoaDonChiTiets(this.mapToHoaDonChiTiet(placeOrderRequest.getHoaDonChiTiets(),hoaDon));
        hoaDon.setLichSuHoaDons(this.createLichSuHoaDonTaiQuay(hoaDon));
        hoaDon.setThanhToans(this.createThanhToans(placeOrderRequest.getThanhToans(),hoaDon));
        return hoaDon;
    }

    private List<ThanhToan> createThanhToans(List<ThanhToanRequest> thanhToans,HoaDon hoaDon) {
        return thanhToans.stream().map((tt) ->{
            ThanhToan thanhToan = new ThanhToan();
            thanhToan.setMaGiaoDich(tt.getMaGiaoDich());
            thanhToan.setSoTien(tt.getSoTien());
            thanhToan.setTrangThai(true);
            thanhToan.setHinhThucThanhToan(
                    hinhThucThanhToanRepo.findByHinhThuc(
                            LoaiHinhThuc.valueOf(tt.getHinhThucThanhToan())
                    ).orElseThrow(() -> new PlaceOrderException("Hình thức thanh toán không hợp lệ"))
            );
            thanhToan.setHoaDon(hoaDon);
            return thanhToan;
        }).toList();
    }

    private List<LichSuHoaDon> createLichSuHoaDonTaiQuay(HoaDon hoaDon) {
        List<LichSuHoaDon> lichSuHoaDons = new ArrayList<>();
        LichSuHoaDon lichSuHoaDon =
                LichSuHoaDon
                        .builder()
                        .tieuDe("Hoàn thành")
                        .moTa("")
                        .trangThai(TrangThaiHoaDon.HOAN_THANH)
                        .hoaDon(hoaDon)
                        .build();

        lichSuHoaDons.add(lichSuHoaDon);
        return lichSuHoaDons;
    }

    private PhieuGiamGia validPhieuGiamGia(Integer phieuGiamGiaId) {
        PhieuGiamGia phieuGiamGia = null;
        if (phieuGiamGiaId != null) {
            phieuGiamGia =  phieuGiamGiaRepo.findById(phieuGiamGiaId).orElseThrow(
                    () -> new PlaceOrderException("Phiếu giảm giá không hợp lệ")
            );
            // check so luong
            if (phieuGiamGia.getSoLuong() <= 0) {
                throw new PlaceOrderException("Phiếu giảm giá đã hết số lượng sử dụng");
            }
            // check thoi han su dung
            LocalDateTime now = LocalDateTime.now();
//            if (!(now.isBefore(phieuGiamGia.getThoiGianBatDau()) && now.isAfter(phieuGiamGia.getThoiGianKetThuc()))){
//                System.out.println(now.toString());
//                throw new PlaceOrderException("Phiếu giảm giá đã hết hạn sử dụng");
//            }
            if (!this.isWithinInterval(now,phieuGiamGia.getThoiGianBatDau(),phieuGiamGia.getThoiGianKetThuc())){
                throw new PlaceOrderException("Phiếu giảm giá đã hết hạn sử dụng");
            }
            // tru so luong
            if (phieuGiamGia.getSoLuong()>= 1){
                phieuGiamGia.setSoLuong(phieuGiamGia.getSoLuong() - 1);
            }

        }
        return phieuGiamGia;
    }
    // Phương thức kiểm tra xem một thời gian cụ thể có nằm trong một khoảng thời gian hay không
    public boolean isWithinInterval(LocalDateTime time, LocalDateTime startTime, LocalDateTime endTime) {
        return !time.isBefore(startTime) && !time.isAfter(endTime);
    }
    private List<HoaDonChiTiet> mapToHoaDonChiTiet(List<HoaDonChiTietRequest> hoaDonChiTiets,HoaDon hoaDon) {
        if (hoaDonChiTiets.isEmpty()){
            throw new PlaceOrderException("Vui lòng thêm sản phẩm vào đơn");
        }
        return hoaDonChiTiets.stream().map((hdct)->{
            HoaDonChiTiet hoaDonChiTiet = new HoaDonChiTiet();
            SanPhamChiTiet sanPhamChiTiet = spctRepo.findById(hdct.getSanPhamChiTietId()).orElse(null);
            if (sanPhamChiTiet == null || !sanPhamChiTiet.isTrangThai()){
                throw new PlaceOrderException("Sản phẩm "+sanPhamChiTiet.getSanPham().getTen() +" đã dừng bán vui lòng xóa khỏi đơn !");
            }
            if (hdct.getSoLuong() <= 0){
                throw new PlaceOrderException("Sản phẩm "+sanPhamChiTiet.getSanPham().getTen() +" số lượng không hợp lệ !");
            }
            if (sanPhamChiTiet.getSoLuongTon() <= 0){
                throw new PlaceOrderException("Sản phẩm "+sanPhamChiTiet.getSanPham().getTen() +" đã hết hàng");
            }
            if (hdct.getSoLuong() > sanPhamChiTiet.getSoLuongTon()){
                throw new PlaceOrderException("Sản phẩm "+sanPhamChiTiet.getSanPham().getTen() +" chỉ có thể mua tối đa "+ sanPhamChiTiet.getSoLuongTon()+" sản phẩm !");
            }
            hoaDonChiTiet.setSoLuong(hdct.getSoLuong());
            hoaDonChiTiet.setGiaBan(hdct.getGiaBan());
            hoaDonChiTiet.setGiaNhap(hdct.getGiaNhap());
            hoaDonChiTiet.setSanPhamChiTiet(sanPhamChiTiet);
            hoaDonChiTiet.setHoaDon(hoaDon);
            // tru so luong ton
            sanPhamChiTiet.setSoLuongTon(sanPhamChiTiet.getSoLuongTon()-hdct.getSoLuong());
            return hoaDonChiTiet;
        }).toList();
    }

    public String generateMaHD(){
        long count = hoaDonRepository.count();
        String maHD = "HD"+count;
        while (hoaDonRepository.existsByMa(maHD)){
            count += 1;
            maHD = "HD"+count;
        }
        return maHD;
    }
    private HoaDon createHoaDonGiaoHang(PlaceOrderRequest placeOrderRequest) {
        // check so dien thoai
        if (placeOrderRequest.getSdtNguoiNhan() == null || !placeOrderRequest.getSdtNguoiNhan().matches("^(0[3|5|7|8|9])+([0-9]{8})\\b$")){
            throw new PlaceOrderException("Số điện thoại người nhận không hợp lệ");
        }

        // check ten nguoi nhan
        if ( placeOrderRequest.getTenNguoiNhan() == null ||placeOrderRequest.getTenNguoiNhan().trim().isEmpty()){
            throw new PlaceOrderException("Tên người nhận không hợp lệ");
        }
        //check dia chi
        if ( placeOrderRequest.getDiaChiNguoiNhan() == null ||placeOrderRequest.getDiaChiNguoiNhan().trim().isEmpty()){
            throw new PlaceOrderException("Địa chỉ người nhận không hợp lệ");
        }
        String[] diaChis = placeOrderRequest.getDiaChiNguoiNhan().split(",");
        int diaChisLength = diaChis.length;
        if (UtilityFunction.isNullOrEmpty(diaChis[diaChisLength-1]) || UtilityFunction.isNullOrEmpty(diaChis[diaChisLength-2]) || UtilityFunction.isNullOrEmpty(diaChis[diaChisLength-3])){
            throw new PlaceOrderException("Vui lòng chọn đầy đủ địa chỉ người nhận");
        }
//        System.out.println(1+placeOrderRequest.toString());
        NhanVien nhanVien = nhanVienRepo.findById(placeOrderRequest.getNhanVienId()).orElse(null);
        KhachHang khachHang =placeOrderRequest.getKhachHangId() != null ? khachHangRepo.findById(placeOrderRequest.getKhachHangId()).orElse(null):null;
        PhieuGiamGia phieuGiamGia = this.validPhieuGiamGia(placeOrderRequest.getPhieuGiamGiaId());

        HoaDon hoaDon = HoaDon
                .builder()
                .ma(generateMaHD())
                .loaiHoaDon(LoaiHoaDon.valueOf(placeOrderRequest.getLoaiHoaDon()))
                .tenNguoiNhan(placeOrderRequest.getTenNguoiNhan().trim())
                .sdtNguoiNhan(placeOrderRequest.getSdtNguoiNhan())
                .emailNguoiNhan(null)
                .diaChiNguoiNhan(placeOrderRequest.getDiaChiNguoiNhan().trim())
                .tongTien(placeOrderRequest.getTongTien())
                .tienGiam(placeOrderRequest.getTienGiam())
                .phiVanChuyen(placeOrderRequest.getPhiVanChuyen())
                .loaiHoaDon(LoaiHoaDon.GIAO_HANG)
                .trangThai(TrangThaiHoaDon.CHO_XAC_NHAN)
                .ghiChu(placeOrderRequest.getGhiChu())
                .nhanVien(nhanVien)
                .khachHang(khachHang)
                .phieuGiamGia(phieuGiamGia)
                .build();

        hoaDonRepository.save(hoaDon);
        hoaDon.setHoaDonChiTiets(this.mapToHoaDonChiTiet(placeOrderRequest.getHoaDonChiTiets(),hoaDon));
        hoaDon.setLichSuHoaDons(this.createLichSuHoaDonGiaoHang(hoaDon));
        hoaDon.setThanhToans(this.createThanhToans(placeOrderRequest.getThanhToans(),hoaDon));
        return hoaDon;
    }

    private List<LichSuHoaDon> createLichSuHoaDonGiaoHang(HoaDon hoaDon) {
        List<LichSuHoaDon> lichSuHoaDons = new ArrayList<>();
        LichSuHoaDon lichSuHoaDon =
                LichSuHoaDon
                        .builder()
                        .tieuDe("Chờ xác nhận")
                        .moTa("")
                        .trangThai(TrangThaiHoaDon.CHO_XAC_NHAN)
                        .hoaDon(hoaDon)
                        .build();
        lichSuHoaDons.add(lichSuHoaDon);
        return lichSuHoaDons;
    }

    public HoaDonResponse mapToHoaDonResponse(HoaDon hoaDon) {
        return modelMapper.map(hoaDon, HoaDonResponse.class);
    }
}
