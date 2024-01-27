package com.datn.backend.service.impl;

import com.datn.backend.dto.request.DotGiamGiaRequest;
import com.datn.backend.dto.response.DotGiamGiaResponse;
import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.exception.custom_exception.ResourceExistsException;
import com.datn.backend.exception.custom_exception.ResourceInvalidException;
import com.datn.backend.exception.custom_exception.ResourceOutOfRangeException;
import com.datn.backend.model.dot_giam_gia.DotGiamGia;
import com.datn.backend.repository.DotGiamGiaRepository;
import com.datn.backend.service.DotGiamGiaService;
import com.datn.backend.utility.UtilityFunction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Optional;
import java.util.UUID;
import java.util.logging.Logger;

@Service
public class DotGiamGiaServiceImpl implements DotGiamGiaService {

    private final DotGiamGiaRepository repository;
    private static final Logger logger = Logger.getLogger(DotGiamGia.class.getName());

    @Autowired
    public DotGiamGiaServiceImpl(DotGiamGiaRepository repository) {
        super();
        this.repository = repository;
    }
//
//    @Override
//    public List<DotGiamGiaResponse> getAll() {
////        Get Data form database
//        return repository.getAll();
//    }

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
        //        Set Statusd
        object.setTrangThai(1);
        //        map requestObject to Object
        DotGiamGia dotGiamGia = object.map(new DotGiamGia());

//        save dotgiamgiasanpham to database
//        save to database
        return repository.save(dotGiamGia);
    }

    @Override
    public DotGiamGia update(Integer id, DotGiamGiaRequest object) {
//        Find Object from Database
        Optional<DotGiamGia> optional = repository.findById(id);
        if (optional.isPresent()) {
            // Set ID
            object.setId(id);
//            Set Code
            object.setMaDotGiamGia(optional.get().getMaDotGiamGia());

            DotGiamGia dotGiamGia = object.map(optional.get());

            return repository.save(dotGiamGia);
        }
        return null;
    }

    @Override
    public boolean remove(Integer id) {
//        Find Object from Database
        Optional<DotGiamGia> optional = repository.findById(id);
        if (optional.isPresent()) {
            try {
                repository.delete(optional.get());
                return true;
            } catch (Exception ex) {
                throw new ResourceInvalidException("Id invalid!!");
            }
        }
        return false;
    }

}
