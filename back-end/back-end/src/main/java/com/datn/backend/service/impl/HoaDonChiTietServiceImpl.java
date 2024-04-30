package com.datn.backend.service.impl;

import com.datn.backend.dto.request.AddHoaDonChiTietRequest;
import com.datn.backend.dto.request.DiscountValidRequest;
import com.datn.backend.dto.request.HoaDonChiTietRequest;
import com.datn.backend.dto.response.DiscountValidResponse;
import com.datn.backend.dto.response.HoaDonChiTietResponse;
import com.datn.backend.exception.custom_exception.IdNotFoundException;
import com.datn.backend.exception.custom_exception.PlaceOrderException;
import com.datn.backend.model.dot_giam_gia.DotGiamGia;
import com.datn.backend.model.hoa_don.HoaDon;
import com.datn.backend.model.hoa_don.HoaDonChiTiet;
import com.datn.backend.model.hoa_don.LichSuHoaDon;
import com.datn.backend.model.khach_hang.KhachHang;
import com.datn.backend.model.phieu_giam_gia.PhieuGiamGia;
import com.datn.backend.model.phieu_giam_gia.PhieuGiamGiaKhachHang;
import com.datn.backend.model.san_pham.SanPhamChiTiet;
import com.datn.backend.repository.*;
import com.datn.backend.service.HoaDonChiTietService;
import com.datn.backend.service.PhieuGiamGiaService;
import com.datn.backend.utility.UtilityFunction;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
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
    private final PhieuGiamGiaService phieuGiamGiaService;
    private final PhieuGiamGiaRepository phieuGiamGiaRepo;
    private final PhieuGiamGiaKhachHangRepository phieuGiamGiaKhachHangRepository;

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

        BigDecimal giaBanHienTai = getGiaBanSpctHienTai(sanPhamChiTiet.getId());

        // kiem tra spct da duoc mua chua
        hoaDonChiTiet = hoaDonChiTietRepository.findByHoaDonAndSanPhamChiTietAndGiaBan(hoaDon, sanPhamChiTiet, giaBanHienTai).orElse(null);

        // neu san pham chua duoc mua hoac gia ban bi thay doi
        if (hoaDonChiTiet == null ||
                hoaDonChiTiet.getGiaBan().compareTo(giaBanHienTai) != 0) {
            // tao moi 1 hdct voi gia ban moi
            hoaDonChiTiet = HoaDonChiTiet
                    .builder()
                    .soLuong(1)
                    .giaBan(giaBanHienTai)
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
                    .moTa("Thêm 1 sản phẩm " + sanPhamChiTiet.getSanPham().getTen() + " màu " + sanPhamChiTiet.getMauSac().getTen() + " ,size " + sanPhamChiTiet.getKichCo().getTen())
                    .hoaDon(hoaDon)
                    .build();
            lichSuHoaDonRepo.save(lichSuHoaDon);
        } else {
            // cong them 1 vao hdct
            hoaDonChiTiet.setSoLuong(hoaDonChiTiet.getSoLuong() + 1);

            // cap nhat so luong ton
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
        HoaDonChiTiet hdct = hoaDonChiTietRepository.save(hoaDonChiTiet);
        updateHoaDonAfterUpdateHDCT(hdct.getHoaDon().getId());
        return modelMapper.map(hdct, HoaDonChiTietResponse.class);
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
    @Transactional
    public HoaDonChiTietResponse updateHoaDonCT(HoaDonChiTietRequest hoaDonChiTietRequest) {
        HoaDonChiTiet hoaDonChiTiet = hoaDonChiTietRepository.findById(hoaDonChiTietRequest.getId()).orElseThrow(
                () -> new IdNotFoundException("Sản phẩm không tồn tại trong hóa đơn"));
        // lay hoa don
        HoaDon hoaDon = hoaDonChiTiet.getHoaDon();

        // lay spct
        SanPhamChiTiet sanPhamChiTiet = hoaDonChiTiet.getSanPhamChiTiet();

        // lay gia ban hien tai
        BigDecimal giaBanHienTai = getGiaBanSpctHienTai(hoaDonChiTiet.getSanPhamChiTiet().getId());

        // hdct de update
//        HoaDonChiTiet hoaDonChiTietUpdate = hoaDonChiTietRepository.findByHoaDonAndSanPhamChiTietAndGiaBan(hoaDon, sanPhamChiTiet, giaBanHienTai).orElse(null);

        if (!sanPhamChiTiet.isTrangThai()) {
            throw new PlaceOrderException("Sản phẩm " + sanPhamChiTiet.getSanPham().getTen() + " đã dừng bán!");
        }

        if (hoaDonChiTietRequest.getSoLuong() <= 0) {
            throw new PlaceOrderException("Sản phẩm " + sanPhamChiTiet.getSanPham().getTen() + " số lượng không hợp lệ !");
        }

        if (hoaDonChiTietRequest.getSoLuong() > sanPhamChiTiet.getSoLuongTon() + hoaDonChiTiet.getSoLuong()) {
            throw new PlaceOrderException("Sản phẩm " + sanPhamChiTiet.getSanPham().getTen() + " chỉ có thể mua tối đa " + (sanPhamChiTiet.getSoLuongTon() + hoaDonChiTiet.getSoLuong()) + " sản phẩm !");
        }
        int soLuongBienDong = hoaDonChiTietRequest.getSoLuong() - hoaDonChiTiet.getSoLuong();
        // neu soLuongBienDong<=0 thi la dang tru

        if (soLuongBienDong <= 0 || hoaDonChiTietRequest.getGiaBan().compareTo(giaBanHienTai) == 0) {
            // neu tru thi chi can update lai so luong || gia hien tai va gia cua san pham khong co su chenh lech
            int soLuongCapNhat = hoaDonChiTiet.getSoLuong() + soLuongBienDong;
            // cap nhat so luong
            hoaDonChiTiet.setSoLuong(soLuongCapNhat);
            if (hoaDonChiTiet.getSoLuong() <= 0) {
                throw new RuntimeException("Số lượng sản phẩm không hợp lệ");
            }
            // tao lich su hoa don
            LichSuHoaDon lichSuHoaDon = LichSuHoaDon.builder()
                    .tieuDe("Cập nhật sản phẩm")
                    .moTa("Cập nhật sản phẩm " + sanPhamChiTiet.getSanPham().getTen() +
                            " màu " + sanPhamChiTiet.getMauSac().getTen() +
                            " size " + sanPhamChiTiet.getKichCo().getTen() +
                            " số lượng " + (soLuongCapNhat)
                    )
//            (hoaDonChiTiet.getSoLuong() + soLuongBienDong)
                    .hoaDon(hoaDon)
                    .build();
            lichSuHoaDonRepo.save(lichSuHoaDon);

            // cap nhat so luong ton
            sanPhamChiTiet.setSoLuongTon(sanPhamChiTiet.getSoLuongTon() - soLuongBienDong);
            sanPhamChiTietRepo.save(sanPhamChiTiet);
        } else {
            // neu cong them || gia ban bi checnh lech

            hoaDonChiTiet = hoaDon.getHoaDonChiTiets().stream().filter(
                            (hdct) -> hdct.getGiaBan().compareTo(giaBanHienTai) == 0)
                    .findFirst().orElse(null);

            if (hoaDonChiTiet == null) {// chua co hdct nao voi gia moi
                // tao moi hdct
                hoaDonChiTiet = HoaDonChiTiet.builder()
                        .soLuong(1)
                        .giaBan(giaBanHienTai)// gia ban hien tai
                        .giaNhap(sanPhamChiTiet.getGiaNhap())
                        .hoaDon(hoaDon)
                        .sanPhamChiTiet(sanPhamChiTiet)
                        .build();

                // tao lich su hoa don
                LichSuHoaDon lichSuHoaDon = LichSuHoaDon.builder()
                        .tieuDe("Thêm mới sản phẩm")
                        .moTa("Thêm mới sản phẩm " + sanPhamChiTiet.getSanPham().getTen() +
                                " màu " + sanPhamChiTiet.getMauSac().getTen() +
                                " size " + sanPhamChiTiet.getKichCo().getTen() +
                                " giá bán " + UtilityFunction.convertToCurrency(giaBanHienTai.doubleValue())
                        )
                        .hoaDon(hoaDon)
                        .build();
                lichSuHoaDonRepo.save(lichSuHoaDon);
                // cap nhat so luong ton
                sanPhamChiTiet.setSoLuongTon(sanPhamChiTiet.getSoLuongTon() - 1);
                sanPhamChiTietRepo.save(sanPhamChiTiet);
            } else { // da co hdct voi gia moi => cap nhat sl
                int soLuongCapNhat = hoaDonChiTiet.getSoLuong() + soLuongBienDong;
                // cap nhat so luong

                hoaDonChiTiet.setSoLuong(soLuongCapNhat);
                if (hoaDonChiTiet.getSoLuong() <= 0) {
                    throw new RuntimeException("Số lượng sản phẩm không hợp lệ");
                }
                // tao lich su hoa don
                LichSuHoaDon lichSuHoaDon = LichSuHoaDon.builder()
                        .tieuDe("Cập nhật sản phẩm")
                        .moTa("Cập nhật sản phẩm " + sanPhamChiTiet.getSanPham().getTen() +
                                " màu " + sanPhamChiTiet.getMauSac().getTen() +
                                " size " + sanPhamChiTiet.getKichCo().getTen() +
                                " số lượng " + (soLuongCapNhat)
                        )
                        .hoaDon(hoaDon)
                        .build();
                lichSuHoaDonRepo.save(lichSuHoaDon);

                // cap nhat so luong ton
                sanPhamChiTiet.setSoLuongTon(sanPhamChiTiet.getSoLuongTon() - soLuongBienDong);
                sanPhamChiTietRepo.save(sanPhamChiTiet);
            }

        }
        hoaDonChiTietRepository.save(hoaDonChiTiet);
        updateHoaDonAfterUpdateHDCT(hoaDonChiTiet.getHoaDon().getId());

        // cap nhat hdct
        return modelMapper.map(hoaDonChiTiet, HoaDonChiTietResponse.class);
    }

    @Override
    public HoaDonChiTietResponse deleteHoaDonCT(Integer id) {
        Optional<HoaDonChiTiet> hoaDonChiTiet = hoaDonChiTietRepository.findById(id);
        if (hoaDonChiTiet.isEmpty()) {
            throw new IdNotFoundException("Sản phẩm không tồn tại trong hóa đơn");
        }
        //update so luong ton
        SanPhamChiTiet sanPhamChiTiet = hoaDonChiTiet.get().getSanPhamChiTiet();
        sanPhamChiTiet.setSoLuongTon(sanPhamChiTiet.getSoLuongTon() + hoaDonChiTiet.get().getSoLuong());
        sanPhamChiTietRepo.save(sanPhamChiTiet);

        hoaDonChiTietRepository.delete(hoaDonChiTiet.get());

        updateHoaDonAfterUpdateHDCT(hoaDonChiTiet.get().getHoaDon().getId());
        return modelMapper.map(hoaDonChiTiet.get(), HoaDonChiTietResponse.class);
    }

    @Override
    public HoaDon updateHoaDonAfterUpdateHDCT(Integer idHoaDon) {
        if (idHoaDon == null) {
            throw new IdNotFoundException("Hóa đơn không tồn tại");
        }
        // update tong tien
        HoaDon hoaDon = hoaDonRepository.findById(idHoaDon).orElseThrow(() -> new RuntimeException("Hóa đơn không tồn tại"));
        KhachHang khachHang = hoaDon.getKhachHang();
        hoaDon.setTongTien(this.getTongTien(hoaDon.getHoaDonChiTiets()));
        // lay phieu giam gia giam nhieu nhat
        DiscountValidRequest discountValidRequest = DiscountValidRequest.builder()
                .giaDangGiam(hoaDon.getTienGiam().longValue())
                .giaTriDonHang(hoaDon.getTongTien())
                .khachHangId(hoaDon.getKhachHang() == null ? null : hoaDon.getKhachHang().getId())
                .build();
        DiscountValidResponse discountValid = phieuGiamGiaService.getDiscountValidUpdateHDCT(hoaDon.getId(), discountValidRequest);

        // update so luong phieu giam gia
        if (hoaDon.getPhieuGiamGia() == null && discountValid.getPhieuGiamGia() != null) {
            // ap phieu giam gia moi
            PhieuGiamGia pggNew = discountValid.getPhieuGiamGia();
            pggNew.setSoLuong(pggNew.getSoLuong() - 1);
            phieuGiamGiaRepo.save(pggNew);
            hoaDon.setPhieuGiamGia(discountValid.getPhieuGiamGia());

            if (khachHang != null && pggNew.getLoai() == 0 &&  khachHang.getId() != null) {
                //chuyen trang thai cua khach hang trong phieu giam gia
                PhieuGiamGiaKhachHang phieuGiamGiaKhachHang = phieuGiamGiaKhachHangRepository.findByPhieuGiamGiaIdAndKhachHangId(
                        pggNew.getId(),khachHang.getId());
                phieuGiamGiaKhachHang.setTrangThai(1); //unUsed
                phieuGiamGiaKhachHangRepository.save(phieuGiamGiaKhachHang);
                System.out.println(phieuGiamGiaKhachHang);
            }

        } else if (hoaDon.getPhieuGiamGia() != null && discountValid.getPhieuGiamGia() == null) {
            // khong tim dc phieu giam gia phu hop hon
            // kiem tra phieu giam gia hien tai co con phu hop khong
            if (this.isPhieuGiamGiaValid(hoaDon.getPhieuGiamGia(), hoaDon.getTongTien()) == null) {
                // khong phu hop nua -> detach va rollback so luong
                PhieuGiamGia pgg = hoaDon.getPhieuGiamGia();
                pgg.setSoLuong(pgg.getSoLuong() + 1);
                phieuGiamGiaRepo.save(pgg);
                hoaDon.setPhieuGiamGia(null);
                // rollback pgg khach hang

                if (khachHang != null && pgg.getLoai() == 0 &&  khachHang.getId() != null) {
                    //chuyen trang thai cua khach hang trong phieu giam gia
                    PhieuGiamGiaKhachHang phieuGiamGiaKhachHang = phieuGiamGiaKhachHangRepository.findByPhieuGiamGiaIdAndKhachHangId(
                            pgg.getId(),khachHang.getId());
                    phieuGiamGiaKhachHang.setTrangThai(1); //unUsed
                    phieuGiamGiaKhachHangRepository.save(phieuGiamGiaKhachHang);
                    System.out.println(phieuGiamGiaKhachHang);
                }
            }

        } else if (discountValid.getPhieuGiamGia() != null && hoaDon.getPhieuGiamGia().getId() != null) {

            if (this.isPhieuGiamGiaValid(hoaDon.getPhieuGiamGia(), hoaDon.getTongTien()) == null) {
                // khong phu hop nua -> detach va rollback so luong
                PhieuGiamGia pgg = hoaDon.getPhieuGiamGia();
                pgg.setSoLuong(pgg.getSoLuong() + 1);
                phieuGiamGiaRepo.save(pgg);
                hoaDon.setPhieuGiamGia(discountValid.getPhieuGiamGia());
                // sua trang thai phieu giam gia khach hang cu
                if (khachHang != null && pgg.getLoai() == 0 &&  khachHang.getId() != null) {
                    //chuyen trang thai cua khach hang trong phieu giam gia
                    PhieuGiamGiaKhachHang phieuGiamGiaKhachHang = phieuGiamGiaKhachHangRepository.findByPhieuGiamGiaIdAndKhachHangId(
                            pgg.getId(),khachHang.getId());
                    phieuGiamGiaKhachHang.setTrangThai(1); // unUsed
                    phieuGiamGiaKhachHangRepository.save(phieuGiamGiaKhachHang);
                    System.out.println(phieuGiamGiaKhachHang);
                }

                // tru so luong phieu giam gia moi
                PhieuGiamGia pggNew = discountValid.getPhieuGiamGia();
                pggNew.setSoLuong(pggNew.getSoLuong() - 1);
                phieuGiamGiaRepo.save(pggNew);

                // sua trang thai phieu giam gia khach hang moi
                if (khachHang != null && pggNew.getLoai() == 0 &&  khachHang.getId() != null) {
                    //chuyen trang thai cua khach hang trong phieu giam gia
                    PhieuGiamGiaKhachHang phieuGiamGiaKhachHang = phieuGiamGiaKhachHangRepository.findByPhieuGiamGiaIdAndKhachHangId(
                            pggNew.getId(),khachHang.getId());
                    phieuGiamGiaKhachHang.setTrangThai(0); // unUsed
                    phieuGiamGiaKhachHangRepository.save(phieuGiamGiaKhachHang);
                    System.out.println(phieuGiamGiaKhachHang.toString());
                }
            } else {
                List<PhieuGiamGia> phieuGiamGias
                        = Arrays.asList(discountValid.getPhieuGiamGia(), hoaDon.getPhieuGiamGia());

                PhieuGiamGia discountMax = phieuGiamGiaService.getDiscountMax(phieuGiamGias, discountValidRequest.getGiaTriDonHang());
                if (!discountMax.getId().equals(hoaDon.getPhieuGiamGia().getId())) {

                    // hoán dôi 2 phiêu giảm gia
                    PhieuGiamGia pggOld = hoaDon.getPhieuGiamGia();
                    pggOld.setSoLuong(pggOld.getSoLuong() + 1);
                    phieuGiamGiaRepo.save(pggOld);
                    // sua trang thai phieu giam gia khach hang cu
                    if (khachHang != null && pggOld.getLoai() == 0 &&  khachHang.getId() != null) {
                        //chuyen trang thai cua khach hang trong phieu giam gia
                        PhieuGiamGiaKhachHang phieuGiamGiaKhachHang = phieuGiamGiaKhachHangRepository.findByPhieuGiamGiaIdAndKhachHangId(
                                pggOld.getId(),khachHang.getId());
                        phieuGiamGiaKhachHang.setTrangThai(1); // unUsed
                        phieuGiamGiaKhachHangRepository.save(phieuGiamGiaKhachHang);
//                        System.out.println(phieuGiamGiaKhachHang);
                    }

                    PhieuGiamGia pggNew = discountMax;
                    pggNew.setSoLuong(pggNew.getSoLuong() - 1);
                    phieuGiamGiaRepo.save(pggNew);
                    // sua trang thai phieu giam gia khach hang moi
                    if (khachHang != null && pggNew.getLoai() == 0 &&  khachHang.getId() != null) {
                        //chuyen trang thai cua khach hang trong phieu giam gia
                        PhieuGiamGiaKhachHang phieuGiamGiaKhachHang = phieuGiamGiaKhachHangRepository.findByPhieuGiamGiaIdAndKhachHangId(
                                pggNew.getId(),khachHang.getId());
                        phieuGiamGiaKhachHang.setTrangThai(0); // unUsed
                        phieuGiamGiaKhachHangRepository.save(phieuGiamGiaKhachHang);
                        System.out.println(phieuGiamGiaKhachHang.toString());
                    }
                    hoaDon.setPhieuGiamGia(discountMax);
                }
            }
        }


        // update tien giam
        BigDecimal tienGiam = this.getTienGiam(hoaDon.getTongTien(), hoaDon.getPhieuGiamGia());
        hoaDon.setTienGiam(tienGiam);
        return hoaDonRepository.save(hoaDon);
    }

    private PhieuGiamGia isPhieuGiamGiaValid(PhieuGiamGia phieuGiamGia, BigDecimal tongTien) {
        if (phieuGiamGia == null) {
            return null;
        }
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startTime = phieuGiamGia.getThoiGianBatDau();
        LocalDateTime endTime = phieuGiamGia.getThoiGianKetThuc();
        if ((now.isAfter(startTime) && now.isBefore(endTime)) &&
                tongTien.longValue() >= phieuGiamGia.getDieuKienGiam().longValue()
        ) {
            return phieuGiamGia;
        }
        return null;
    }

    private BigDecimal getTienGiam(BigDecimal tongTien, PhieuGiamGia phieuGiamGia) {
        long tienGiam = 0;
        if (UtilityFunction.isNullOrEmpty(phieuGiamGia)) {
            return BigDecimal.valueOf(tienGiam);
        }
        if (phieuGiamGia.getKieu() == 0) {
            // giảm theo %
            tienGiam = tongTien.longValue() * phieuGiamGia.getGiaTri().longValue() / 100;
            tienGiam = tienGiam < phieuGiamGia.getGiaTriMax().longValue() ? tienGiam : phieuGiamGia.getGiaTriMax().longValue();

        } else if (phieuGiamGia.getKieu() == 1) {
            // giảm theo giá trị
            tienGiam = phieuGiamGia.getGiaTri().longValue();
        }
        return BigDecimal.valueOf(tienGiam);
    }

    private BigDecimal getTongTien(List<HoaDonChiTiet> hoaDonChiTiets) {
        long total = 0;

        for (int i = 0; i < hoaDonChiTiets.size(); i++) {
            long giaBan = hoaDonChiTiets.get(i).getGiaBan().longValue();
            total += (giaBan * hoaDonChiTiets.get(i).getSoLuong());

        }
        return BigDecimal.valueOf(total);
    }
}
