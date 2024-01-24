package com.datn.backend.service.impl;

import com.datn.backend.dto.request.DotGiamGiaRequest;
import com.datn.backend.dto.response.DotGiamGiaReponse;
import com.datn.backend.exception.custom_exception.ResourceExistsException;
import com.datn.backend.model.dot_giam_gia.DotGiamGia;
import com.datn.backend.repository.DotGiamGiaRepository;
import com.datn.backend.service.DotGiamGiaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

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

    @Override
    public List<DotGiamGiaReponse> getAll() {
//        Get Data form database
        return repository.getAll();
    }

    @Override
    public List<DotGiamGiaReponse> getPagination(int pageNumber, int pageSize, String search) {
        Pageable pageable = PageRequest.of(pageNumber - 1,pageSize);

        return repository.getPagination(pageable,search);
    }

    @Override
    public DotGiamGiaReponse getOne(Integer id) {
        //        Get Data form database
        return repository.getOneById(id);
    }

    @Override
    public DotGiamGia add(DotGiamGiaRequest object) {
//        map requestObject to Object
        DotGiamGia dotGiamGia = object.map(new DotGiamGia());
        if(repository.existsByTenDotGiamGia(dotGiamGia.getTenDotGiamGia())){
            throw new ResourceExistsException("Object Request Name is Exits!");
        }
        if(repository.existsByMaDotGiamGia(dotGiamGia.getMaDotGiamGia())){
            throw new ResourceExistsException("Object Request Code is Exits!");
        }
//        save to database
        return repository.save(dotGiamGia);
    }

    @Override
    public DotGiamGia update(Integer id, DotGiamGiaRequest object) {
//        Find Object from Database
        Optional<DotGiamGia> optional = repository.findById(id);
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
