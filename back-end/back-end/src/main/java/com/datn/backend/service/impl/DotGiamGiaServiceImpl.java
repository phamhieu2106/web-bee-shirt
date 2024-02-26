package com.datn.backend.service.impl;

import com.datn.backend.dto.request.DotGiamGiaRequest;
import com.datn.backend.dto.response.DotGiamGiaResponse;
import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.dto.response.SanPhamChiTietResponse;
import com.datn.backend.exception.custom_exception.ResourceExistsException;
import com.datn.backend.exception.custom_exception.ResourceInvalidException;
import com.datn.backend.exception.custom_exception.ResourceOutOfRangeException;
import com.datn.backend.model.dot_giam_gia.DotGiamGia;
import com.datn.backend.model.dot_giam_gia.DotGiamGiaSanPham;
import com.datn.backend.model.san_pham.SanPhamChiTiet;
import com.datn.backend.repository.DotGiamGiaRepository;
import com.datn.backend.repository.DotGiamGiaSanPhamRepository;
import com.datn.backend.repository.SanPhamChiTietRepository;
import com.datn.backend.service.DotGiamGiaService;
import com.datn.backend.utility.UtilityFunction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class DotGiamGiaServiceImpl implements DotGiamGiaService {

    private final DotGiamGiaRepository repository;
    private final DotGiamGiaSanPhamRepository dotGiamGiaSanPhamRepository;
    private final SanPhamChiTietRepository sanPhamChiTietRepository;

    @Autowired
    public DotGiamGiaServiceImpl(DotGiamGiaRepository repository
            , DotGiamGiaSanPhamRepository dotGiamGiaSanPhamRepository, SanPhamChiTietRepository sanPhamChiTietRepository) {
        super();
        this.repository = repository;
        this.dotGiamGiaSanPhamRepository = dotGiamGiaSanPhamRepository;
        this.sanPhamChiTietRepository = sanPhamChiTietRepository;
    }

    @Override
    public List<Integer> getListIdSanPham(String ids) {
        //   Lấy danh sách id Sản Phẩm
        String[] idStrings = ids.split(",");
        // Chuyển đổi mảng chuỗi thành mảng số nguyên
        List<Integer> idList = Arrays.stream(idStrings)
                .map(Integer::parseInt)
                .collect(Collectors.toList());
        return repository.getIdSanPhamIdBySanPhamChiTietId(idList);
    }

    @Override
    public List<Integer> getListIdSanPhamChiTietByIdSanPham(Integer id) {
//        Trả về 1 danh sách id sản phẩm chi tiết qua id sản phẩm
        return repository.getListIdSanPhamChiTietByIdSanPham(id);
    }

    @Override
    public List<Integer> getListSanPhamChiTietByIdDotGiamGiaSanPham(Integer id) {
//        Trả về 1 danh sách id sản phẩm chi tiết có trong đợt giảm giá
        return repository.getListIdSanPhamChiTiet(id);
    }

    @Override
    public PagedResponse<SanPhamChiTietResponse> getAllSanPhamChiTiet(int pageNumber, int pageSize, List<Integer> listSanPhamId) {
//        Page Sản Phẩm Chi Tiết
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);

        Page<SanPhamChiTietResponse> sanPhamChiTietResponsePage =
                repository.getAllSanPhamChiTietBySanPhamId(pageable, listSanPhamId);

        PagedResponse<SanPhamChiTietResponse> sanPhamChiTietResponsePagedResponse = new PagedResponse<>();
        sanPhamChiTietResponsePagedResponse.setPageNumber(pageNumber);
        sanPhamChiTietResponsePagedResponse.setPageSize(pageSize);
        sanPhamChiTietResponsePagedResponse.setTotalElements((int) sanPhamChiTietResponsePage.getTotalElements());
        sanPhamChiTietResponsePagedResponse.setTotalPages(sanPhamChiTietResponsePage.getTotalPages());
        sanPhamChiTietResponsePagedResponse.setPageNumberArr(UtilityFunction.getPageNumberArr(sanPhamChiTietResponsePage.getTotalPages()));
        sanPhamChiTietResponsePagedResponse.setData(sanPhamChiTietResponsePage.getContent());
        sanPhamChiTietResponsePagedResponse.setSearch(listSanPhamId.toString());

        return sanPhamChiTietResponsePagedResponse;
    }

    @Override
    public PagedResponse<DotGiamGiaResponse> getPagination(int pageNumber, int pageSize, String search) {
//        Page Đợt Giảm Giá
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
        Page<DotGiamGiaResponse> dotGiamGiaPage = repository.getPagination(pageable, search);

        PagedResponse<DotGiamGiaResponse> dotGiamGiaPagedResponse = new PagedResponse<>();
        dotGiamGiaPagedResponse.setPageNumber(pageNumber);
        dotGiamGiaPagedResponse.setPageSize(pageSize);
        dotGiamGiaPagedResponse.setTotalElements((int) dotGiamGiaPage.getTotalElements());
        dotGiamGiaPagedResponse.setTotalPages(dotGiamGiaPage.getTotalPages());
        dotGiamGiaPagedResponse.setPageNumberArr(UtilityFunction.getPageNumberArr(dotGiamGiaPage.getTotalPages()));
        dotGiamGiaPagedResponse.setData(dotGiamGiaPage.getContent());
        dotGiamGiaPagedResponse.setSearch(search);

        return dotGiamGiaPagedResponse;
    }

    @Override
    public PagedResponse<DotGiamGiaResponse> getFilter(int pageNumber, int pageSize, String search,
                                                       int status, String startDate, String endDate) {
//        Page Đợt Giảm Giá Sau Khi Lọc
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
        Page<DotGiamGiaResponse> dotGiamGiaPage = null;

        if (status == 3) {
            dotGiamGiaPage = repository.getStatusAll(pageable, startDate, endDate);
        } else {
            dotGiamGiaPage = repository.getStatusWithDate(pageable, status, startDate, endDate);
        }

        PagedResponse<DotGiamGiaResponse> dotGiamGiaPagedResponse = new PagedResponse<>();
        dotGiamGiaPagedResponse.setPageNumber(pageNumber);
        dotGiamGiaPagedResponse.setPageSize(pageSize);
        dotGiamGiaPagedResponse.setTotalElements((int) dotGiamGiaPage.getTotalElements());
        dotGiamGiaPagedResponse.setTotalPages(dotGiamGiaPage.getTotalPages());
        dotGiamGiaPagedResponse.setPageNumberArr(UtilityFunction.getPageNumberArr(dotGiamGiaPage.getTotalPages()));
        dotGiamGiaPagedResponse.setData(dotGiamGiaPage.getContent());
        dotGiamGiaPagedResponse.setSearch(search);

        return dotGiamGiaPagedResponse;
    }

    @Override
    public DotGiamGiaResponse getOne(Integer id) {
        //        Get Data form database
        return repository.getOneById(id);
    }

    //    Validation
    private boolean validationCheck(DotGiamGiaRequest object) {
        boolean check = true;
        //        Check Exit by Ten
        if (repository.existsByTenDotGiamGia(object.getTenDotGiamGia())) {
            throw new ResourceExistsException("Object Request Name is Exits!");
        }

        //        Check Number
        try {
            //        Check Min Max
            if (object.getGiaTriPhanTram() > 99 || object.getGiaTriPhanTram() < 5) {
                throw new ResourceOutOfRangeException("Discount Percent of Object Request is not between 5 and 99");
            }
        } catch (Exception e) {
            throw new ResourceInvalidException("Discount Percent of Object Request is not a number");
        }
        if(object.getListIdSanPhamChiTiet().isEmpty()){
            throw new ResourceExistsException("Object Products Is Empty!");
        }
        if(object.getThoiGianBatDau().isAfter(object.getThoiGianKetThuc())){
            throw new ResourceExistsException("Object Start Date Is Invalid!");
        }
        return check;
    }
    private boolean validationCheckUpdate(Integer id,DotGiamGiaRequest object) {
        boolean check = true;
        //        Check Exit by Ten
        if(!repository.findById(id).get().getTenDotGiamGia().equalsIgnoreCase(object.getTenDotGiamGia())){
            if (repository.existsByTenDotGiamGia(object.getTenDotGiamGia())) {
                throw new ResourceExistsException("Object Request Name is Exits!");
            }
        }
        //        Check Number
        try {
            //        Check Min Max
            if (object.getGiaTriPhanTram() > 99 || object.getGiaTriPhanTram() < 5) {
                throw new ResourceOutOfRangeException("Discount Percent of Object Request is not between 5 and 99");
            }
        } catch (Exception e) {
            throw new ResourceInvalidException("Discount Percent of Object Request is not a number");
        }
        if(object.getListIdSanPhamChiTiet().isEmpty()){
            throw new ResourceExistsException("Object Products Is Empty!");
        }
        if(object.getThoiGianBatDau().isAfter(object.getThoiGianKetThuc())){
            throw new ResourceExistsException("Object Start Date Is Invalid!");
        }
        return check;
    }
    @Override
    public DotGiamGia add(DotGiamGiaRequest object) {
        if(validationCheck(object)){
            //      Tự Động Tạo Mã Đợt Giảm Giá
            UUID uuid = UUID.randomUUID();
            //        Set Code
            String code = "DGG" + uuid.toString().substring(0, 5).toUpperCase();
            object.setMaDotGiamGia(code);

//          Set Name
            object.setTenDotGiamGia(object.getTenDotGiamGia().trim());

            //        Set Status
            LocalDateTime today = LocalDateTime.now();

            if (object.getThoiGianBatDau().isAfter(today)) {
                // If thoiGianBatDau is after today, set trangThai to 2
                object.setTrangThai(2);
            } else {
                // If thoiGianBatDau is not after today, set trangThai to 1
                object.setTrangThai(1);
            }

            //        map requestObject to Object
            DotGiamGia dotGiamGia = object.map(new DotGiamGia());
            repository.save(dotGiamGia);

//        Find DotGiamGia after save
            DotGiamGia dotGiamGiaFind = repository.getDotGiamGiaByMaDotGiamGia(code);

//        Loop to create DotGiamGiaSanPham
            for (int i = 0; i < object.getListIdSanPhamChiTiet().size(); i++) {

                Optional<SanPhamChiTiet> optional = sanPhamChiTietRepository.findById(object.getListIdSanPhamChiTiet().get(i));
                if (optional.isPresent()) {
                    //        Create sanPhamChiTiet
                    SanPhamChiTiet sanPhamChiTiet = optional.get();
//                Create DotGiamGiaSanPham and set
                    DotGiamGiaSanPham dotGiamGiaSanPham = new DotGiamGiaSanPham();

                    dotGiamGiaSanPham.setGiaCu(sanPhamChiTiet.getGiaBan());

//                Caculator Gia Moi : GiaMoi = GiaCu - (GiaCu * PhanTram / 100)
                    dotGiamGiaSanPham.setGiaMoi(sanPhamChiTiet.getGiaBan()
                            .subtract(sanPhamChiTiet.getGiaBan()
                                    .multiply(BigDecimal.valueOf(object.getGiaTriPhanTram())
                                            .divide(new BigDecimal(100)))));

                    dotGiamGiaSanPham.setGiamGia(object.getGiaTriPhanTram());
                    dotGiamGiaSanPham.setThoiGianBatDau(object.getThoiGianBatDau());
                    dotGiamGiaSanPham.setThoiGianKetThuc(object.getThoiGianKetThuc());
                    dotGiamGiaSanPham.setTrangThai(sanPhamChiTiet.isTrangThai());
                    dotGiamGiaSanPham.setSanPhamChiTiet(SanPhamChiTiet.builder().id(sanPhamChiTiet.getId()).build());
                    dotGiamGiaSanPham.setDotGiamGia(DotGiamGia.builder().id(dotGiamGiaFind.getId()).build());
                    //        save to database
                    dotGiamGiaSanPhamRepository.save(dotGiamGiaSanPham);
                }
            }
            return dotGiamGia;
        }
        return null;
    }

    @Override
    public DotGiamGia update(Integer id, DotGiamGiaRequest object) {
        if(validationCheckUpdate(id,object)){
            //        Find Object from Database
            Optional<DotGiamGia> optional = repository.findById(id);

            if (optional.isEmpty()) {
                return null;
            }

            DotGiamGia dotGiamGia = object.map(optional.get());

            List<DotGiamGiaSanPham> listDotGiamGiaSanPham = dotGiamGiaSanPhamRepository.getAll(dotGiamGia.getId());

            for (Integer sanPhamChiTietID : object.getListIdSanPhamChiTiet()) {
                boolean found = false;
                for (DotGiamGiaSanPham dotGiamGiaSanPham : listDotGiamGiaSanPham) {
                    if (Objects.equals(sanPhamChiTietID, dotGiamGiaSanPham.getSanPhamChiTiet().getId())) {
                        found = true;
                        SanPhamChiTiet spct = sanPhamChiTietRepository
                                .findById(sanPhamChiTietID).get();

                        dotGiamGiaSanPham.setGiaCu(spct.getGiaBan());
//                Caculator Gia Moi : GiaMoi = GiaCu - (GiaCu * PhanTram / 100)
                        dotGiamGiaSanPham.setGiaMoi(spct.getGiaBan()
                                .subtract(spct.getGiaBan()
                                        .multiply(BigDecimal.valueOf(object.getGiaTriPhanTram())
                                                .divide(new BigDecimal(100)))));

                        dotGiamGiaSanPham.setGiamGia(object.getGiaTriPhanTram());
                        dotGiamGiaSanPham.setThoiGianBatDau(object.getThoiGianBatDau());
                        dotGiamGiaSanPham.setThoiGianKetThuc(object.getThoiGianKetThuc());
                        dotGiamGiaSanPham.setTrangThai(spct.isTrangThai());
                        dotGiamGiaSanPham.setSanPhamChiTiet(SanPhamChiTiet.builder().id(spct.getId()).build());
                        dotGiamGiaSanPham.setDotGiamGia(DotGiamGia.builder().id(dotGiamGia.getId()).build());
                        dotGiamGiaSanPhamRepository.save(dotGiamGiaSanPham);
                        break;
                    }
                }
                if (!found) {
                    SanPhamChiTiet spct = sanPhamChiTietRepository
                            .findById(sanPhamChiTietID).get();
                    DotGiamGiaSanPham dotGiamGiaSanPham = new DotGiamGiaSanPham();

                    dotGiamGiaSanPham.setGiaCu(spct.getGiaBan());
//                Caculator Gia Moi : GiaMoi = GiaCu - (GiaCu * PhanTram / 100)
                    dotGiamGiaSanPham.setGiaMoi(spct.getGiaBan()
                            .subtract(spct.getGiaBan()
                                    .multiply(BigDecimal.valueOf(object.getGiaTriPhanTram())
                                            .divide(new BigDecimal(100)))));

                    dotGiamGiaSanPham.setGiamGia(object.getGiaTriPhanTram());
                    dotGiamGiaSanPham.setThoiGianBatDau(object.getThoiGianBatDau());
                    dotGiamGiaSanPham.setThoiGianKetThuc(object.getThoiGianKetThuc());
                    dotGiamGiaSanPham.setTrangThai(spct.isTrangThai());
                    dotGiamGiaSanPham.setSanPhamChiTiet(SanPhamChiTiet.builder().id(spct.getId()).build());
                    dotGiamGiaSanPham.setDotGiamGia(DotGiamGia.builder().id(dotGiamGia.getId()).build());
                    dotGiamGiaSanPhamRepository.save(dotGiamGiaSanPham);
                }
            }
            for (DotGiamGiaSanPham dotGiamGiaSanPham : listDotGiamGiaSanPham) {
                boolean found = false;
                for (Integer idSPCT : object.getListIdSanPhamChiTiet()) {
                    if (Objects.equals(dotGiamGiaSanPham.getSanPhamChiTiet().getId(), idSPCT)) {
                        found = true;
                    }
                }
                if (!found) {
                    dotGiamGiaSanPham.setTrangThai(false);
                    dotGiamGiaSanPhamRepository.save(dotGiamGiaSanPham);
                }
            }
            repository.save(dotGiamGia);
            return dotGiamGia;
        }
        return null;
    }

    @Override
    public boolean remove(Integer id) {
//        Find Object from Database
        Optional<DotGiamGia> optional = repository.findById(id);
        if (optional.isPresent()) {
            DotGiamGia dotGiamGia = optional.get();
            try {
                dotGiamGia.setTrangThai(0);
                repository.save(dotGiamGia);
                return true;
            } catch (Exception ex) {
                throw new ResourceInvalidException("Id invalid!!");
            }
        }
        return false;
    }

}
