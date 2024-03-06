package com.datn.backend.service.impl;

import com.datn.backend.dto.request.AddSanPhamChiTietRequest;
import com.datn.backend.dto.request.CapNhatNhanhSanPhamChiTietReq;
import com.datn.backend.dto.response.DotGiamGiaSanPhamResponse;
import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.dto.response.SpctResponse;
import com.datn.backend.exception.custom_exception.ResourceNotFoundException;
import com.datn.backend.model.dot_giam_gia.DotGiamGiaSanPham;
import com.datn.backend.model.san_pham.*;
import com.datn.backend.repository.*;
import com.datn.backend.service.SanPhamChiTietService;
import com.datn.backend.utility.CloudinaryService;
import com.datn.backend.utility.UtilityFunction;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class SanPhamChiTietServiceImpl implements SanPhamChiTietService {

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
    public void addSpctList(AddSanPhamChiTietRequest request, MultipartFile[] multipartFiles) throws IOException {
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

        for (MultipartFile file : multipartFiles) {
            HinhAnh hinhAnh = saveHinhAnhImage(file);
            hinhAnhs.add(hinhAnh);
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

    private SanPhamChiTiet setCommonField(SanPhamChiTiet spct, AddSanPhamChiTietRequest request) {
        SanPham sanPham = sanPhamRepo.findById(request.getSanPhamId()).get();
        KieuDang kieuDang = kieuDangRepo.findById(request.getKieuDangId()).get();
        KieuThietKe kieuThietKe = kieuThietKeRepo.findById(request.getThietKeId()).get();
        TayAo tayAo = tayAoRepo.findById(request.getTayAoId()).get();
        CoAo coAo = coAoRepo.findById(request.getCoAoId()).get();
        ChatLieu chatLieu = chatLieuRepo.findById(request.getChatLieuId()).get();

        spct.setGiaNhap(request.getGiaNhap());
        spct.setGiaBan(request.getGiaBan());
        spct.setSanPham(sanPham);
        spct.setKieuDang(kieuDang);
        spct.setThietKe(kieuThietKe);
        spct.setTayAo(tayAo);
        spct.setCoAo(coAo);
        spct.setChatLieu(chatLieu);

        return spct;
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

    @Transactional
    @Override
    public void updateSpctNhanh(CapNhatNhanhSanPhamChiTietReq req) {
        for (int i = 0; i < req.getIds().size(); ++i) {
            int id = req.getIds().get(i);
            SanPhamChiTiet spct = spctRepo.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy SPCT ID: " + id));

            spct.setGiaNhap(req.getGiaNhaps().get(i));
            spct.setGiaBan(req.getGiaBans().get(i));
            spct.setSoLuongTon(req.getSoLuongs().get(i));

            spctRepo.save(spct);
        }
    }

    @Override
    public PagedResponse<SpctResponse> getAll(int pageNumber, int pageSize, String search) {
        PageRequest pageRequest = PageRequest.of(pageNumber -1, pageSize);
//        Get list spct
        Page<SanPhamChiTiet> spcts = spctRepo.getAllBySearch(search, pageRequest);
//        find doi giam gia theo spct
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
            DotGiamGiaSanPham dotGiamGiaSanPham =
                    dggspRepo.findDotGiamGiaSanPhamActiveBySanPhamChiTietId(spct.getId());

            //gán gia tri
            if (dotGiamGiaSanPham != null){
                spctResp.setDotGiamGiaSanPham(
                        modelMapper.map(dotGiamGiaSanPham,DotGiamGiaSanPhamResponse.class)
                );
            }

            return spctResp;
        }).toList();
        return spctResponses;
    }
}
