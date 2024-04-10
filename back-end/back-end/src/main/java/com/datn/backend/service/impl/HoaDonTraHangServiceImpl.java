package com.datn.backend.service.impl;

import com.datn.backend.dto.request.*;
import com.datn.backend.dto.response.HoaDonResponse;
import com.datn.backend.dto.response.HoaDonTraHangResponse;
import com.datn.backend.dto.response.SpctResponse;
import com.datn.backend.enumeration.LoaiHinhThuc;
import com.datn.backend.enumeration.LoaiHoaDon;
import com.datn.backend.enumeration.TrangThaiHoaDon;
import com.datn.backend.exception.custom_exception.*;
import com.datn.backend.model.NhanVien;
import com.datn.backend.model.hoa_don.*;
import com.datn.backend.model.khach_hang.KhachHang;
import com.datn.backend.model.phieu_giam_gia.PhieuGiamGia;
import com.datn.backend.model.san_pham.SanPhamChiTiet;
import com.datn.backend.repository.*;
import com.datn.backend.service.HoaDonTraHangService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class HoaDonTraHangServiceImpl implements HoaDonTraHangService {

    private final HoaDonTraHangRepository repository;
    private final HoaDonTraHangModelRepository hoaDonTraHangModelRepository;
    private final HoaDonChiTietRepository hoaDonChiTietRepository;
    private final NhanVienRepository nhanVienRepo;
    private final KhachHangRepository khachHangRepo;
    private final PhieuGiamGiaRepository phieuGiamGiaRepo;
    private final ModelMapper modelMapper;
    private final LichSuHoaDonRepository lichSuHoaDonRepository;
    private final SanPhamChiTietRepository spctRepo;
    private final HinhThucThanhToanRepository hinhThucThanhToanRepo;
    private final HoaDonRepository hoaDonRepository;
    @Autowired
    public HoaDonTraHangServiceImpl(HoaDonTraHangRepository repository,
                                    HoaDonTraHangModelRepository hoaDonTraHangModelRepository,
                                    NhanVienRepository nhanVienRepo,
                                    KhachHangRepository khachHangRepo,
                                    PhieuGiamGiaRepository phieuGiamGiaRepo,
                                    ModelMapper modelMapper,
                                    SanPhamChiTietRepository spctRepo,
                                    HoaDonChiTietRepository hoaDonChiTietRepository,
                                    LichSuHoaDonRepository lichSuHoaDonRepository,
                                    HinhThucThanhToanRepository hinhThucThanhToanRepo,
                                    HoaDonRepository hoaDonRepository) {
        super();
        this.repository = repository;
        this.modelMapper = modelMapper;
        this.lichSuHoaDonRepository = lichSuHoaDonRepository;
        this.hoaDonTraHangModelRepository = hoaDonTraHangModelRepository;
        this.spctRepo = spctRepo;
        this.hoaDonChiTietRepository = hoaDonChiTietRepository;
        this.nhanVienRepo = nhanVienRepo;
        this.khachHangRepo = khachHangRepo;
        this.phieuGiamGiaRepo = phieuGiamGiaRepo;
        this.hinhThucThanhToanRepo = hinhThucThanhToanRepo;
        this.hoaDonRepository = hoaDonRepository;
    }

    @Override
    public HoaDonTraHangResponse add(HoaDonTraHangRequest hoaDonTraHangRequest) {

        HoaDonTraHang hoaDon = HoaDonTraHang.builder()
                .ma(generateMaHoaDonTraHang())
                .tenNguoiNhan(hoaDonTraHangRequest.getTenNguoiNhan())
                .sdtNguoiNhan(hoaDonTraHangRequest.getSdtNguoiNhan())
                .emailNguoiNhan(hoaDonTraHangRequest.getEmailNguoiNhan())
                .diaChiNguoiNhan(hoaDonTraHangRequest.getDiaChiNguoiNhan())
                .tongTien(hoaDonTraHangRequest.getTongTien())
                .ghiChu(hoaDonTraHangRequest.getGhiChu())
                .hoaDon(HoaDon.builder().id(hoaDonTraHangRequest.getHoaDonId()).build())
                .build();
        HoaDonTraHang newHoaDonTraHang = hoaDonTraHangModelRepository.save(hoaDon);
        newHoaDonTraHang.setHoaDonChiTiets(this.mapToHoaDonChiTietTraHang(hoaDonTraHangRequest.getHoaDonChiTiets(), newHoaDonTraHang));

        return modelMapper.map(newHoaDonTraHang,HoaDonTraHangResponse.class);
    }

    @Override
    public HoaDonResponse getHoaDonByMa(String ma) {
        if(ma.trim().isEmpty()){
            throw new ResourceNotFoundException("Mã hoá đơn không được trống");
        }
//        Tìm Hoá Đơn Theo Mã
        Optional<HoaDon> optionalHoaDon
                = repository.findHoaDonByMa(ma);
        if (optionalHoaDon.isEmpty()) {
            throw new ResourceNotFoundException("Không tìm thấy hoá đơn có mã: " + ma);
        } else {
            HoaDon hoaDon = optionalHoaDon.get();
            if(hoaDon.getTrangThai() != TrangThaiHoaDon.HOAN_THANH){
                throw new ResourceInvalidException("Đơn hàng chưa hoàn thành");
            }
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
    public List<SpctResponse> getDanhSachSanPhamDaMua(Integer idHoaDon) {
        if (idHoaDon == 0) {
            throw new ResourceNotFoundException("Không tìm thấy hoá đơn để lấy danh sách sản phẩm");
        }
        return repository.getAllSanPhamChiTiet(idHoaDon)
                .stream()
                .map(item -> modelMapper.map(item, SpctResponse.class)).toList();
    }

    @Override
    public List<Integer> getListIdDotGiamGiaSanPhamByIdHoaDon(Integer idHoaDon) {
        return repository.getAllIdSanPhamChiTietInDotGiamGiaByHoaDonId(idHoaDon);
    }

    @Override
    @Transactional
    public HoaDonResponse placeOrderTraHang(PlaceOrderRequest placeOrderRequest) {
        return mapToHoaDonResponse(this.createHoaDonTraHangTaiQuay(placeOrderRequest));
    }

    @Override
    public HoaDonResponse traHang(ChangeOrderStatusRequest changeOrderStatus) {
        int id = changeOrderStatus.getIdHoaDon();
        Optional<HoaDon> optionalHoaDon = repository.findById(id);

        if (optionalHoaDon.isEmpty()) {
            throw new IdNotFoundException("Không tồn tại hóa đơn id=" + id);
        }
        HoaDon hoaDonUpdate = optionalHoaDon.get();
        if (hoaDonUpdate.getTrangThai() != TrangThaiHoaDon.HOAN_THANH) {
            throw new OrderStatusException("Hóa đơn này không thể trả hàng do chưa hoàn thành");
        }
        if (hoaDonUpdate.getUpdatedAt() == null) {
            throw new ResourceInvalidException("Đơn hàng chưa được cập nhật");
        }
//            Nếu thời gian đơn hàng hoàn thành đã quá 7 ngày thì không cho đổi
        if (LocalDateTime.now().minusDays(7).isAfter(hoaDonUpdate.getUpdatedAt())) {
            throw new ResourceInvalidException("Đơn hàng đã quá thời gian trả hàng");
        }
        TrangThaiHoaDon nextTrangThaiHD = TrangThaiHoaDon.valueOf(hoaDonUpdate.getTrangThai().getNext());
        hoaDonUpdate.setTrangThai(nextTrangThaiHD);
        LichSuHoaDon lichSuHoaDon = LichSuHoaDon.builder()
                .hoaDon(hoaDonUpdate)
                .moTa(changeOrderStatus.getMoTa())
                .tieuDe(nextTrangThaiHD.getTitle())
                .trangThai(nextTrangThaiHD)
                .build();
        lichSuHoaDonRepository.save(lichSuHoaDon);
        return modelMapper.map(hoaDonUpdate, HoaDonResponse.class);
    }

    @Override
    public HoaDonTraHangResponse getByIdHoaDon(Integer id) {
        Optional<HoaDonTraHang> optional = hoaDonTraHangModelRepository.findByHoaDonId(id);
        if(optional.isPresent()){
            HoaDonTraHang hoaDonTraHang = optional.get();
            return modelMapper.map(hoaDonTraHang,HoaDonTraHangResponse.class);
        }
        return null;
    }

    private HoaDon createHoaDonTraHangTaiQuay(PlaceOrderRequest placeOrderRequest) {
        NhanVien nhanVien = nhanVienRepo.findById(placeOrderRequest.getNhanVienId()).orElse(null);
        KhachHang khachHang = placeOrderRequest.getKhachHangId() != null ? khachHangRepo.findById(placeOrderRequest.getKhachHangId()).orElse(null) : null;
        PhieuGiamGia phieuGiamGia = this.validPhieuGiamGia(placeOrderRequest.getPhieuGiamGiaId());

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
        hoaDon.setHoaDonChiTiets(this.mapToHoaDonChiTiet(placeOrderRequest.getHoaDonChiTiets(), hoaDon));
        hoaDon.setLichSuHoaDons(this.createLichSuHoaDonTaiQuay(hoaDon));
        hoaDon.setThanhToans(this.createThanhToans(placeOrderRequest.getThanhToans(), hoaDon));
        return hoaDon;
    }


    public HoaDonResponse mapToHoaDonResponse(HoaDon hoaDon) {
        return modelMapper.map(hoaDon, HoaDonResponse.class);
    }

    private PhieuGiamGia validPhieuGiamGia(Integer phieuGiamGiaId) {
        PhieuGiamGia phieuGiamGia = null;
        if (phieuGiamGiaId != null) {
            phieuGiamGia = phieuGiamGiaRepo.findById(phieuGiamGiaId).orElseThrow(
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
            if (!this.isWithinInterval(now, phieuGiamGia.getThoiGianBatDau(), phieuGiamGia.getThoiGianKetThuc())) {
                throw new PlaceOrderException("Phiếu giảm giá đã hết hạn sử dụng");
            }
            // tru so luong
            if (phieuGiamGia.getSoLuong() >= 1) {
                phieuGiamGia.setSoLuong(phieuGiamGia.getSoLuong() - 1);
            }

        }
        return phieuGiamGia;
    }
    public boolean isWithinInterval(LocalDateTime time, LocalDateTime startTime, LocalDateTime endTime) {
        return !time.isBefore(startTime) && !time.isAfter(endTime);
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
    private List<ThanhToan> createThanhToans(List<ThanhToanRequest> thanhToans, HoaDon hoaDon) {

        return thanhToans.stream().map((tt) -> {
            ThanhToan thanhToan = new ThanhToan();
            HinhThucThanhToan hinhThucThanhToan = hinhThucThanhToanRepo.findByHinhThuc(
                    LoaiHinhThuc.valueOf(tt.getHinhThucThanhToan())
            ).orElse(null);
            if (hinhThucThanhToan == null) {
                hinhThucThanhToan = hinhThucThanhToanRepo.save(HinhThucThanhToan.builder().hinhThuc(LoaiHinhThuc.valueOf(tt.getHinhThucThanhToan())).build());
            }
            thanhToan.setMaGiaoDich(tt.getMaGiaoDich());
            thanhToan.setSoTien(tt.getSoTien());
            thanhToan.setTrangThai(true);
            thanhToan.setHinhThucThanhToan(
                    hinhThucThanhToan
            );
            thanhToan.setHoaDon(hoaDon);
            return thanhToan;
        }).toList();
    }

    private List<HoaDonChiTiet> mapToHoaDonChiTiet(List<HoaDonChiTietRequest> hoaDonChiTiets, HoaDon hoaDon) {
        if (hoaDonChiTiets.isEmpty()) {
            throw new PlaceOrderException("Vui lòng thêm sản phẩm vào đơn");
        }
        return hoaDonChiTiets.stream().map((hdct) -> {
            HoaDonChiTiet hoaDonChiTiet = new HoaDonChiTiet();
            SanPhamChiTiet sanPhamChiTiet = spctRepo.findById(hdct.getSanPhamChiTietId()).orElse(null);
            if (sanPhamChiTiet == null || !sanPhamChiTiet.isTrangThai()) {
                throw new PlaceOrderException("Sản phẩm " + sanPhamChiTiet.getSanPham().getTen() + " đã dừng bán vui lòng xóa khỏi đơn !");
            }
            if (hdct.getSoLuong() <= 0) {
                throw new PlaceOrderException("Sản phẩm " + sanPhamChiTiet.getSanPham().getTen() + " số lượng không hợp lệ !");
            }
            if (sanPhamChiTiet.getSoLuongTon() <= 0) {
                throw new PlaceOrderException("Sản phẩm " + sanPhamChiTiet.getSanPham().getTen() + " đã hết hàng");
            }
            if (hdct.getSoLuong() > sanPhamChiTiet.getSoLuongTon()) {
                throw new PlaceOrderException("Sản phẩm " + sanPhamChiTiet.getSanPham().getTen() + " chỉ có thể mua tối đa " + sanPhamChiTiet.getSoLuongTon() + " sản phẩm !");
            }
            hoaDonChiTiet.setSoLuong(hdct.getSoLuong());
            hoaDonChiTiet.setGiaBan(hdct.getGiaBan());
            hoaDonChiTiet.setGiaNhap(hdct.getGiaNhap());
            hoaDonChiTiet.setSanPhamChiTiet(sanPhamChiTiet);
            hoaDonChiTiet.setHoaDon(hoaDon);
            return hoaDonChiTiet;
        }).toList();
    }

    private List<HoaDonChiTiet> mapToHoaDonChiTietTraHang(List<HoaDonChiTietRequest> hoaDonChiTiets, HoaDonTraHang hoaDonTraHang) {
        if (hoaDonChiTiets.isEmpty()) {
            throw new PlaceOrderException("Vui lòng thêm sản phẩm vào đơn");
        }
        return hoaDonChiTietRepository.saveAll(hoaDonChiTiets.stream().map((hdct) -> {
            HoaDonChiTiet hoaDonChiTiet = new HoaDonChiTiet();
            SanPhamChiTiet sanPhamChiTiet = spctRepo.findById(hdct.getSanPhamChiTietId()).orElse(null);
            hoaDonChiTiet.setSoLuong(hdct.getSoLuong());
            hoaDonChiTiet.setGiaBan(hdct.getGiaBan());
            hoaDonChiTiet.setGiaNhap(hdct.getGiaNhap());
            hoaDonChiTiet.setSanPhamChiTiet(sanPhamChiTiet);
            hoaDonChiTiet.setHoaDonTraHang(HoaDonTraHang.builder().id(hoaDonTraHang.getId()).build());
            return hoaDonChiTiet;
        }).toList());
    }
    public String generateMaHD() {
        return "HD" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
    private String generateMaHoaDonTraHang() {
        return "HDTH" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
}
