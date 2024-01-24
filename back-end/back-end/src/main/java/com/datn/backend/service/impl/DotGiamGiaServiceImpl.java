package com.datn.backend.service.impl;

import com.datn.backend.dto.request.DotGiamGiaRequest;
import com.datn.backend.dto.response.DotGiamGiaResponse;
import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.exception.custom_exception.ResourceExistsException;
import com.datn.backend.exception.custom_exception.ResourceNotBetweenException;
import com.datn.backend.exception.custom_exception.ResourceNumberException;
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
import java.util.List;
import java.util.Optional;

@Service
public class DotGiamGiaServiceImpl implements DotGiamGiaService {

    private final DotGiamGiaRepository repository;

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
        Pageable pageable = PageRequest.of(pageNumber - 1,pageSize);
//        Get Page DotGiamGia Response
        Page<DotGiamGiaResponse> dotGiamGiaPage = repository.getPagination(pageable,search);
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

    @Override
    public DotGiamGia add(DotGiamGiaRequest object) {
        //        map requestObject to Object
        DotGiamGia dotGiamGia = object.map(new DotGiamGia());
        try {
//        Check Exit by Ten and Ma
            if(repository.existsByTenDotGiamGia(dotGiamGia.getTenDotGiamGia().trim())){
                throw new ResourceExistsException("Object Request Name is Exits!");
            }
            if(repository.existsByMaDotGiamGia(dotGiamGia.getMaDotGiamGia().trim())){
                throw new ResourceExistsException("Object Request Code is Exits!");
            }
//        Check Number
            try {
                BigDecimal bigDecimal = BigDecimal.valueOf(dotGiamGia.getGiaTriPhanTram());
            }catch(NumberFormatException e){
                throw new ResourceNumberException("Discount Percent of Object Request is not a number");
            }
//        Check Min Max
            if(dotGiamGia.getGiaTriPhanTram() > 99 || dotGiamGia.getGiaTriPhanTram() < 5){
                throw new ResourceNotBetweenException("Discount Percent of Object Request is not between 5 and 99");
            }
//        Set Status
            dotGiamGia.setTrangThai(1);
//        save to database
        }catch(Exception ex){
            System.out.println("Somethings is wrong when try to add new DotGiamGia Request!");
        }
        return repository.save(dotGiamGia);
    }

    @Override
    public DotGiamGia update(Integer id, DotGiamGiaRequest object) {
//        Find Object from Database
        Optional<DotGiamGia> optional = repository.findById(id);
//        Set ID
        object.setId(id);
//        If not empty then map request to object
        return optional.map(dotGiamGia -> repository.save(object.map(dotGiamGia))).orElse(null);
    }

    @Override
    public DotGiamGia remove(Integer id) {
//        Find Object from Database
        Optional<DotGiamGia> optional = repository.findById(id);
//        If not empty then map request to object
        //            Set deleted is true
        return optional.map(dotGiamGia -> {
            dotGiamGia.setTrangThai(0);
            return repository.save(dotGiamGia);
        }).orElse(null);
    }

}
