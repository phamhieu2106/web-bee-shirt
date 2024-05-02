package com.datn.backend.service.impl;

import com.datn.backend.dto.request.AddSpctReq;
import com.datn.backend.dto.request.CapNhatNhanhSpctReq;
import com.datn.backend.dto.request.UpdateSpctReq;
import com.datn.backend.dto.request.FilterSPCTParams;
import com.datn.backend.dto.request.UpdateCommonPropertiesReq;
import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.exception.custom_exception.OperationNotAllowException;
import com.datn.backend.exception.custom_exception.ResourceExistsException;
import com.datn.backend.exception.custom_exception.ResourceNotFoundException;
import com.datn.backend.dto.response.DotGiamGiaResponse2;
import com.datn.backend.dto.response.SpctResponse;
import com.datn.backend.model.dot_giam_gia.DotGiamGia;
import com.datn.backend.model.san_pham.ChatLieu;
import com.datn.backend.model.san_pham.CoAo;
import com.datn.backend.model.san_pham.HinhAnh;
import com.datn.backend.model.san_pham.KichCo;
import com.datn.backend.model.san_pham.KieuDang;
import com.datn.backend.model.san_pham.KieuThietKe;
import com.datn.backend.model.san_pham.MauSac;
import com.datn.backend.model.san_pham.SanPham;
import com.datn.backend.model.san_pham.SanPhamChiTiet;
import com.datn.backend.model.san_pham.TayAo;
import com.datn.backend.repository.ChatLieuRepository;
import com.datn.backend.repository.CoAoRepository;
import com.datn.backend.repository.DotGiamGiaSanPhamRepository;
import com.datn.backend.repository.HinhAnhRepository;
import com.datn.backend.repository.KichCoRepository;
import com.datn.backend.repository.KieuDangRepository;
import com.datn.backend.repository.KieuThietKeRepository;
import com.datn.backend.repository.MauSacRepository;
import com.datn.backend.repository.SanPhamChiTietRepository;
import com.datn.backend.repository.SanPhamRepository;
import com.datn.backend.repository.TayAoRepository;
import com.datn.backend.repository.custom_repository.CustomSpctRepository;
import com.datn.backend.service.SanPhamChiTietService;
import com.datn.backend.utility.CloudinaryService;
import com.datn.backend.utility.UtilityFunction;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class SanPhamChiTietServiceImpl implements SanPhamChiTietService {

    private final CustomSpctRepository customSpctRepo;
    private final SanPhamChiTietRepository spctRepo;
    private final SanPhamRepository sanPhamRepo;
    private final KieuDangRepository kieuDangRepo;
    private final KieuThietKeRepository kieuThietKeRepo;
    private final TayAoRepository tayAoRepo;
    private final CoAoRepository coAoRepo;
    private final ChatLieuRepository chatLieuRepo;
    private final KichCoRepository kichCoRepo;
    private final MauSacRepository mauSacRepo;
    private final HinhAnhRepository hinhAnhRepo;
    private final CloudinaryService cloudinaryService;
    private final ModelMapper modelMapper;
    private final DotGiamGiaSanPhamRepository dggspRepo;

    /**
     * Thêm List<SPCT> cùng lúc nhưng chúng cùng một màu sắc, kèm thêm một loạt ảnh kèm theo
     */
    @Transactional
    @Override
    public void addSpctList(AddSpctReq request, MultipartFile[] multipartFiles) throws IOException {
        // check for exist by MauSac and KichCo
        checkExistForAdd(request);

        List<SanPhamChiTiet> spctList = new ArrayList<>();
        List<HinhAnh> hinhAnhs = new ArrayList<>();

        for (int i = 0; i < request.getRequests().getKichCoIdList().size(); ++i) {
            SanPhamChiTiet spct = new SanPhamChiTiet();
            spct = setCommonField(spct, request);
            spct.setGiaNhap(request.getRequests().getGiaNhapList().get(i));
            spct.setGiaBan(request.getRequests().getGiaBanList().get(i));
            spct.setSoLuongTon(request.getRequests().getSoLuongTonList().get(i));

            KichCo kichCo = kichCoRepo.findById(request.getRequests().getKichCoIdList().get(i)).get();
            MauSac mauSac = mauSacRepo.findById(request.getRequests().getMauSacId()).get();
            spct.setKichCo(kichCo);
            spct.setMauSac(mauSac);
            spct.setTrangThai(true);

            spctList.add(spct);
        }

        if (multipartFiles != null) {
            for (MultipartFile file : multipartFiles) {
                HinhAnh hinhAnh = saveHinhAnhImage(file);
                hinhAnhs.add(hinhAnh);
            }
        } else if (multipartFiles == null) {
            List<HinhAnh> existImgs = hinhAnhRepo.getImgsOf1ProductColor(request.getSanPhamId(), request.getRequests().getMauSacId());
            hinhAnhs.addAll(existImgs);
        }

        for (SanPhamChiTiet spct : spctList) {
            spct.setHinhAnhs(hinhAnhs);
        }

        hinhAnhRepo.saveAll(hinhAnhs);
        spctRepo.saveAll(spctList);
    }

    private HinhAnh saveHinhAnhImage(MultipartFile multipartFile) throws IOException {
        Map result = cloudinaryService.upload(multipartFile);
        return new HinhAnh(
                (String) result.get("original_filename"),
                (String) result.get("url"),
                (String) result.get("public_id"));
    }

    private SanPhamChiTiet setCommonField(SanPhamChiTiet spct, AddSpctReq request) {
        SanPham sanPham = sanPhamRepo.findById(request.getSanPhamId()).get();
        KieuDang kieuDang = kieuDangRepo.findById(request.getKieuDangId()).get();
        KieuThietKe kieuThietKe = kieuThietKeRepo.findById(request.getThietKeId()).get();
        TayAo tayAo = tayAoRepo.findById(request.getTayAoId()).get();
        CoAo coAo = coAoRepo.findById(request.getCoAoId()).get();
        ChatLieu chatLieu = chatLieuRepo.findById(request.getChatLieuId()).get();

        spct.setSanPham(sanPham);
        spct.setKieuDang(kieuDang);
        spct.setThietKe(kieuThietKe);
        spct.setTayAo(tayAo);
        spct.setCoAo(coAo);
        spct.setChatLieu(chatLieu);

        return spct;
    }

    private void checkExistForAdd(AddSpctReq request) {
        for (int kichCoId : request.getRequests().getKichCoIdList()) {
            SanPhamChiTiet spctByMauSacAndKichCo = spctRepo.findBySanPhamIdAndMauSacIdAndKichCoId(request.getSanPhamId(), request.getRequests().getMauSacId(), kichCoId);
            if (spctByMauSacAndKichCo != null) {
                MauSac mauSac = mauSacRepo.findById(request.getRequests().getMauSacId()).get();
                KichCo kichCo = kichCoRepo.findById(kichCoId).get();
                throw new ResourceExistsException("SPCT màu " + mauSac.getTen() + " và size " + kichCo.getTen() + " đã tồn tại!");
            }
        }
    }

    @Override
    public PagedResponse<SanPhamChiTiet> getByPage(int pageNumber, int pageSize, String search, int spId) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
        Page<SanPhamChiTiet> spctPage = spctRepo.getByPage(pageable, spId);

        PagedResponse<SanPhamChiTiet> paged = new PagedResponse<>();
        paged.setPageNumber(pageNumber);
        paged.setPageSize(pageSize);
        paged.setTotalElements((int) spctPage.getTotalElements());
        paged.setTotalPages(spctPage.getTotalPages());
        paged.setPageNumberArr(UtilityFunction.getPageNumberArr(spctPage.getTotalPages()));
        paged.setData(spctPage.getContent());
        paged.setSearch(search);

        return paged;
    }

    @Override
    public PagedResponse<SanPhamChiTiet> filterByPage(FilterSPCTParams params) {
        return customSpctRepo.filterByPage(params);
    }

    @Transactional
    @Override
    public void updateSpctNhanh(CapNhatNhanhSpctReq req) {
        for (int i = 0; i < req.getIds().size(); ++i) {
            int id = req.getIds().get(i);
            SanPhamChiTiet spct = getOneById(id);

            checkUpdateSpctNhanh(req.getGiaNhaps().get(i), req.getGiaBans().get(i), req.getSoLuongs().get(i));

            spct.setGiaNhap(req.getGiaNhaps().get(i));
            spct.setGiaBan(req.getGiaBans().get(i));
            spct.setSoLuongTon(req.getSoLuongs().get(i));

            spctRepo.save(spct);
        }
    }

    private void checkUpdateSpctNhanh(BigDecimal giaNhap, BigDecimal giaBan, Integer soLuong) {
        if (giaNhap.compareTo(BigDecimal.ZERO) < 0 || giaBan.compareTo(BigDecimal.ZERO) < 0 || soLuong < 0) {
            throw new RuntimeException("Giá nhập, giá bán, số lượng phải lớn hơn 0!");
        }
        if (giaNhap.compareTo(giaBan) > 0) {
            throw new RuntimeException("Giá nhập phải nhỏ hơn giá bán!");
        }
    }

    @Override
    public Integer getQuantityOfOne(int productId, int colorId, int sizeId) {
        return spctRepo.getQuantityOfOne(productId, colorId, sizeId);
    }

    @Override
    public BigDecimal getPriceOfOne(int productId, int colorId, int sizeId) {
        return spctRepo.getPriceOfOne(productId, colorId, sizeId);
    }

    @Override
    public String getProductNameByProductDetails(int productDetailsId) {
        return spctRepo.getProductNameByProductDetails(productDetailsId);
    }

    @Override
    public PagedResponse<SpctResponse> getAll(int pageNumber, int pageSize, String search) {
        Sort sort = Sort.by(Sort.Direction.DESC,"createdAt");
        PageRequest pageRequest = PageRequest.of(pageNumber - 1, pageSize,sort);
        //  Get list spct
        Page<SanPhamChiTiet> spcts = spctRepo.getAllBySearch(search, pageRequest);
        // find doi giam gia theo spct
        List<SpctResponse> data = mapToSpctResponse(spcts);

        return PagedResponse
                .<SpctResponse>builder()
                .pageNumber(spcts.getNumber())
                .pageSize(spcts.getSize())
                .totalPages(spcts.getTotalPages())
                .totalElements(spcts.getTotalElements())
                .pageNumberArr(UtilityFunction.getPageNumberArr(spcts.getTotalPages()))
                .search(search)
                .data(
                        data
                )
                .build();
    }

    private List<SpctResponse> mapToSpctResponse(Page<SanPhamChiTiet> spcts) {
        // Lấy danh sách spct tìm được
        List<SpctResponse> spctResponses = spcts.getContent().stream().map(spct -> {
            // map spct sang spctResponse
            SpctResponse spctResp = modelMapper.map(spct, SpctResponse.class);

            // lấy danh sách các đợt giảm giá đang hiệu lực voi spct nay
            DotGiamGia dotGiamGia =
                    dggspRepo.findDotGiamGiaSanPhamActiveBySanPhamChiTietId(spct.getId());

            //gán gia tri
            if (dotGiamGia != null) {
                spctResp.setDotGiamGia(
                        modelMapper.map(dotGiamGia, DotGiamGiaResponse2.class)
                );
            }

            return spctResp;
        }).toList();
        return spctResponses;
    }

    private SpctResponse mapToSpctResponse(SanPhamChiTiet spct) {
            // map spct sang spctResponse
            SpctResponse spctResp = modelMapper.map(spct, SpctResponse.class);

            // lấy danh sách các đợt giảm giá đang hiệu lực voi spct nay
            DotGiamGia dotGiamGia =
                    dggspRepo.findDotGiamGiaSanPhamActiveBySanPhamChiTietId(spct.getId());

            //gán gia tri
            if (dotGiamGia != null) {
                spctResp.setDotGiamGia(
                        modelMapper.map(dotGiamGia, DotGiamGiaResponse2.class)
                );
            }

            return spctResp;
    }

    @Override
    public BigDecimal[] getMinAndMaxPrice(int productId) {
        BigDecimal[] result = new BigDecimal[2];
        result[0] = spctRepo.getMinPriceOf1Product(productId);
        result[1] = spctRepo.getMaxPriceOf1Product(productId);
        return result;
    }

    @Override
    public void changeStatus(int id) {
        SanPhamChiTiet spct = spctRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("SPCT ID: " + id + " không tồn tại!"));
        if (!spct.isTrangThai() && !spct.getSanPham().isTrangThai()) {
            throw new OperationNotAllowException("Trạng thái của sản phẩm của SPCT này được bị ngừng bán!");
        }
        spct.setTrangThai(!spct.isTrangThai());
        spctRepo.save(spct);
    }

    @Override
    public SanPhamChiTiet getOneById(int spctId) {
        return spctRepo.findById(spctId)
                .orElseThrow(() -> new ResourceNotFoundException("SPCT ID: " + spctId + " không tồn tại!"));
    }

    @Override
    @Transactional
    public String update(UpdateSpctReq req) {
        String message = "";
        SanPhamChiTiet spctByMauSacAndKichCo = spctRepo.findBySanPhamIdAndMauSacIdAndKichCoId(req.getSanPhamId(), req.getMauSacId(), req.getKichCoId());
        SanPhamChiTiet spctById = spctRepo.findById(req.getId()).get();
        boolean isMauSacChange = (req.getMauSacId() != spctById.getMauSac().getId());

        if (spctByMauSacAndKichCo != null && spctByMauSacAndKichCo.getId() != req.getId()) {
            throw new ResourceExistsException("Đã tồn tại sản phẩm có màu sắc và kích cỡ này!");
        } else {
            // nếu có thay đổi màu sắc
            if (isMauSacChange) {
                message = changeImagesWhenColorChange(req.getSanPhamId(), req.getMauSacId(), spctById);
            }

            checkUpdateSpctNhanh(req.getGiaNhap(), req.getGiaBan(), req.getSoLuong());
            spctById.setSoLuongTon(req.getSoLuong());
            spctById.setGiaNhap(req.getGiaNhap());
            spctById.setGiaBan(req.getGiaBan());
            spctById.setMauSac(mauSacRepo.findById(req.getMauSacId()).get());
            spctById.setKichCo(kichCoRepo.findById(req.getKichCoId()).get());

            spctRepo.save(spctById);
            return message.equals("") ? "Cập nhật thành công!" : "Cập nhật thành công!\n" + message;
        }
    }

    private String changeImagesWhenColorChange(int sanPhamId, int newMauSacId, SanPhamChiTiet updateSpct) {
        SanPhamChiTiet spct = spctRepo.findFirstBySanPhamIdAndMauSacId(sanPhamId, newMauSacId);
        String message = "";
        if (spct != null) {
            updateSpct.setHinhAnhs(new ArrayList<>());
            for (HinhAnh img : spct.getHinhAnhs()) {
                updateSpct.setHinhAnh(img);
            }
            message = "Bạn vừa thay đổi màu sắc. Ảnh của màu sắc mới đã tự động được thay đổi!";
        } else {
            message = "Bạn vừa thay đổi màu sắc. Ảnh của màu sắc mới chưa tồn tại, hãy thay đổi ảnh phù hợp cho màu sắc mới!";
        }
        return message;
    }

    @Override
    public SanPhamChiTiet getAnyBySanPhamId(int spId) {
        return spctRepo.findFirstBySanPhamId(spId);
    }

    @Override
    public SanPhamChiTiet getOneByProColorSize(int productId, int colorId, int sizeId) {
        return spctRepo.findBySanPhamIdAndMauSacIdAndKichCoId(productId, colorId, sizeId);
    }

    @Override
    public boolean checkExist(int spId, int mauSacId, int sizeId) {
        return spctRepo.findBySanPhamIdAndMauSacIdAndKichCoId(spId, mauSacId, sizeId) != null;
    }

    @Override
    public void updateImages(MultipartFile[] files, int spId, int mauSacId) throws IOException {
        List<SanPhamChiTiet> spctList = this.spctRepo.findBySanPhamIdAndMauSacId(spId, mauSacId);
        List<HinhAnh> hinhAnhs = spctList.get(0).getHinhAnhs();
        List<HinhAnh> newHinhAnhs = new ArrayList<>();
        int hinhAnhLength = hinhAnhs.size();

        for (int i = 0; i < files.length; ++i) {
            MultipartFile file = files[i];
            HinhAnh newImg = saveHinhAnhImage(file);
            if (i <= hinhAnhLength - 1) {
                HinhAnh existImg = hinhAnhs.get(i);
                existImg.setImageName(newImg.getImageName());
                existImg.setImageUrl(newImg.getImageUrl());
                existImg.setImageId(newImg.getImageId());
                HinhAnh savedImg = hinhAnhRepo.save(existImg);
                newHinhAnhs.add(savedImg);
            } else {
                HinhAnh savedImg = hinhAnhRepo.save(newImg);
                newHinhAnhs.add(savedImg);
            }
        }

        for (SanPhamChiTiet spct : spctList) {
            spct.setHinhAnhs(newHinhAnhs);
            spctRepo.save(spct);
        }
    }

    @Transactional
    @Override
    public void updateCommonProperties(UpdateCommonPropertiesReq req) {
        spctRepo.updateCommonProperties(req.getSanPhamId(), req.getKieuDangId(), req.getThietKeId(),
                                        req.getCoAoId(), req.getTayAoId(), req.getChatLieuId());
    }

    @Override
    public long[][] minMaxPrice() {
        return spctRepo.getMixMaxPrice();
    }

    @Override
    public PagedResponse<SpctResponse> getDetailSpct(int pageSize, int pageNumber, String search, String mauSac, String kichCo, String kieuDang, String thietKe, String tayAo, String coAo, String chatLieu, BigDecimal giaMin, BigDecimal giaMax) {
        Sort sort = Sort.by(Sort.Direction.DESC,"createdAt");
        // to page request
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize,sort);

        // lay danh sách sản pẩm chi tiet
        Page<SanPhamChiTiet> sanPhamChiTietPage = spctRepo.findDetailAll(pageable, search, mauSac, kichCo, kieuDang, thietKe, tayAo, coAo, chatLieu, giaMin, giaMax);

        // mapping sang spct response
        List<SpctResponse> spctResponses = mapToSpctResponse(sanPhamChiTietPage);

        // tao basePaged
        PagedResponse<SpctResponse> spctResponsePagedResponse = new PagedResponse<>();
        spctResponsePagedResponse.setData(spctResponses);
        spctResponsePagedResponse.setPageNumber(sanPhamChiTietPage.getNumber());
        spctResponsePagedResponse.setPageSize(sanPhamChiTietPage.getSize());
        spctResponsePagedResponse.setTotalPages(sanPhamChiTietPage.getTotalPages());
        spctResponsePagedResponse.setTotalElements(sanPhamChiTietPage.getTotalElements());
        spctResponsePagedResponse.setSearch(search);
        spctResponsePagedResponse.setPageNumberArr(UtilityFunction.getPageNumberArr(sanPhamChiTietPage.getTotalPages()));
        return spctResponsePagedResponse;
    }

    @Override
    public SpctResponse getById(Integer id) {
        SanPhamChiTiet sanPhamChiTiet = spctRepo.findById(id).get();
        return mapToSpctResponse(sanPhamChiTiet);
    }
}
