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
        String[] idStrings = ids.split(",");

        // Chuyển đổi mảng chuỗi thành mảng số nguyên
        List<Integer> idList = Arrays.stream(idStrings)
                .map(Integer::parseInt)
                .collect(Collectors.toList());
        return repository.getIdSanPhamIdBySanPhamChiTietId(idList);
    }

    @Override
    public List<Integer> getListIdSanPhamChiTietByIdSanPham(Integer id) {
        return repository.getListIdSanPhamChiTietByIdSanPham(id);
    }

    @Override
    public List<Integer> getListSanPhamChiTietByIdDotGiamGiaSanPham(Integer id) {
        return repository.getListIdSanPhamChiTiet(id);
    }

    @Override
    public PagedResponse<SanPhamChiTietResponse> getAllSanPhamChiTiet(int pageNumber, int pageSize, List<Integer> listSanPhamId) {

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
//        Get Pageable
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
//        Get Page DotGiamGia Response
        Page<DotGiamGiaResponse> dotGiamGiaPage = repository.getPagination(pageable, search);
//        Page DotGiamGia
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

        //        Get Pageable
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
//        Get Page DotGiamGia Response
        Page<DotGiamGiaResponse> dotGiamGiaPage = null;
        if (status == 3) {
            dotGiamGiaPage = repository.getStatusAll(pageable, startDate, endDate);
        } else {
            dotGiamGiaPage = repository.getStatusWithDate(pageable, status, startDate, endDate);
        }
//        Page DotGiamGia
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
    private void validationCheck(DotGiamGiaRequest object) {

        //        Check Exit by Ten
        if (repository.existsByTenDotGiamGia(object.getTenDotGiamGia())) {
            throw new ResourceExistsException("Object Request Name is Exits!");
        }

        //        Check Number
        try {
            BigDecimal bigDecimal = BigDecimal.valueOf(object.getGiaTriPhanTram());
        } catch (Exception e) {
            throw new ResourceInvalidException("Discount Percent of Object Request is not a number");
        }

//        Check Min Max
        if (object.getGiaTriPhanTram() > 99 || object.getGiaTriPhanTram() < 5) {
            throw new ResourceOutOfRangeException("Discount Percent of Object Request is not between 5 and 99");
        }
    }

    @Override
    public DotGiamGia add(DotGiamGiaRequest object) {

        UUID uuid = UUID.randomUUID();
        object.setTenDotGiamGia(object.getTenDotGiamGia().trim());
        //        Set Code
        String code = "DGG" + uuid.toString().substring(0, 5).toUpperCase();
        object.setMaDotGiamGia(code);
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
//        Save object
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

    @Override
    public DotGiamGia update(Integer id, DotGiamGiaRequest object) {
        System.out.println(object.getId());
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
                    System.out.println("Update Successfully");
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
                System.out.println("Add Successfully");
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
                System.out.println("Set Status");
            }
        }
        System.out.println(dotGiamGia);
        repository.save(dotGiamGia);
        return dotGiamGia;
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
