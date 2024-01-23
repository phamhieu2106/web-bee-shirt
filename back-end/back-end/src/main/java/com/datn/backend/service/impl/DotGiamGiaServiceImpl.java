package com.datn.backend.service.impl;

import com.datn.backend.dto.request.DotGiamGiaRequest;
import com.datn.backend.dto.response.DotGiamGiaReponse;
import com.datn.backend.exception.custom_exception.ResourceExistsException;
import com.datn.backend.model.dot_giam_gia.DotGiamGia;
import com.datn.backend.repository.DotGiamGiaRepository;
import com.datn.backend.service.DotGiamGiaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DotGiamGiaServiceImpl implements DotGiamGiaService {

    private DotGiamGiaRepository repository;

    @Autowired
    public DotGiamGiaServiceImpl(DotGiamGiaRepository repository) {
        super();
        this.repository = repository;
    }

    @Override
    public List<DotGiamGiaReponse> getAll() {
//        Get Data form database
        List<DotGiamGiaReponse> reponseList = repository.getAll();
//        if Empty throw exception

        return reponseList;
    }

    @Override
    public DotGiamGiaReponse getOne(Integer id) {
        //        Get Data form database
        DotGiamGiaReponse repons = repository.getOneById(id);
        //        if Null throw exception


        return repons;
    }

    @Override
    public DotGiamGia add(DotGiamGiaRequest object) {
//        map requestObject to Object
        DotGiamGia dotGiamGia = object.map(new DotGiamGia());
        if(repository.existsByTenDotGiamGia(dotGiamGia.getTenDotGiamGia())){
            throw new ResourceExistsException("Object Request is Null!");
        }
//        save to database
        return repository.save(dotGiamGia);
    }

    @Override
    public DotGiamGia update(Integer id, DotGiamGiaRequest object) {
//        Find Object from Database
        Optional<DotGiamGia> optional = repository.findById(id);
//        If not empty then map request to object
        if(!optional.isEmpty()){
            return repository.save(object.map(optional.get()));
        }
        return null;
    }

    @Override
    public DotGiamGia remove(Integer id) {
//        Find Object from Database
        Optional<DotGiamGia> optional = repository.findById(id);
//        If not empty then map request to object
        if(!optional.isEmpty()){
//            Set Status to 0
            optional.get().setTrangThai(0);
            return repository.save(optional.get());
        }
        return null;
    }
}
