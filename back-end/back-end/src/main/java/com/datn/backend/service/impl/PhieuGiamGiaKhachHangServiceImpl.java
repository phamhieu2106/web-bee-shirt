package com.datn.backend.service.impl;

import com.datn.backend.dto.request.KhachHangRequest;
import com.datn.backend.dto.request.PhieuKhachHangRequest;
import com.datn.backend.dto.response.KhachHangResponse;
import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.model.khach_hang.DiaChi;
import com.datn.backend.model.khach_hang.KhachHang;
import com.datn.backend.model.phieu_giam_gia.PhieuGiamGia;
import com.datn.backend.model.phieu_giam_gia.PhieuGiamGiaKhachHang;
import com.datn.backend.repository.KhachHangRepository;
import com.datn.backend.repository.PhieuGiamGiaKhachHangRepository;
import com.datn.backend.repository.PhieuGiamGiaRepository;
import com.datn.backend.service.PhieuGiamGiaKhachHangService;
import com.datn.backend.utility.UtilityFunction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PhieuGiamGiaKhachHangServiceImpl implements PhieuGiamGiaKhachHangService {

    @Autowired
    private PhieuGiamGiaRepository phieuGiamGiaRepository;

    @Autowired
    private PhieuGiamGiaKhachHangRepository phieuGiamGiaKhachHangRepository;

    @Autowired
    private PhieuGiamGiaKhachHangRepository repository;

    @Autowired
    private KhachHangRepository khachHangRepository;

    @Override
    public List<PhieuGiamGiaKhachHang> getAll() {
        return repository.findAll();
    }

    @Override
    public void addPhieu(PhieuKhachHangRequest request) {
        PhieuGiamGia phieuGiamGia = phieuGiamGiaRepository.findById(request.getPhieuGiamGiaId()).get();
        List<Integer> listIdKhachHang= request.getSelectedIds();

        for (Integer idKhach: listIdKhachHang ) {
            KhachHang kh = khachHangRepository.findById(idKhach).get();
            PhieuGiamGiaKhachHang phieuKH = new PhieuGiamGiaKhachHang();
            phieuKH.setKhachHang(kh);
            phieuKH.setPhieuGiamGia(phieuGiamGia);
            phieuKH.setTrangThai(1);
            repository.save(phieuKH);
        }
    }



    @Override
    public void deletePhieu(Integer id) {
        repository.deleteAllPhieu(id);
    }

    @Override
    public PagedResponse<KhachHang> getPagination(int pageNumber, int pageSize, String id) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
        Page<KhachHang> khachHangPhieu;
        khachHangPhieu = khachHangRepository.getKHkhongPhieu(pageable, id);
        PagedResponse<KhachHang> paged = new PagedResponse<>();
        paged.setPageNumber(pageNumber);
        paged.setPageSize(pageSize);
        paged.setTotalElements((int) khachHangPhieu.getTotalElements());
        paged.setTotalPages(khachHangPhieu.getTotalPages());
        paged.setPageNumberArr(UtilityFunction.getPageNumberArr(khachHangPhieu.getTotalPages()));
        paged.setData(khachHangPhieu.getContent());
        return paged;
    }

    @Override
    public PagedResponse<PhieuGiamGiaKhachHang> getPhieuCo(int pageNumber, int pageSize, String id) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
        Page<PhieuGiamGiaKhachHang> khachHangPhieu;
        khachHangPhieu = phieuGiamGiaKhachHangRepository.getCoPhieu(pageable, id);

        PagedResponse<PhieuGiamGiaKhachHang> paged = new PagedResponse<>();
        paged.setPageNumber(pageNumber);
        paged.setPageSize(pageSize);
        paged.setTotalElements((int) khachHangPhieu.getTotalElements());
        paged.setTotalPages(khachHangPhieu.getTotalPages());
        paged.setPageNumberArr(UtilityFunction.getPageNumberArr(khachHangPhieu.getTotalPages()));
        paged.setData(khachHangPhieu.getContent());
        return paged;
    }

    @Override
    public List<KhachHang> getPhieuKhachHang( String id,Boolean check) {

        List<KhachHang> khachHangPhieu;

        if(check == true){
            khachHangPhieu = khachHangRepository.getCoPhieu(id);
        }else{
            khachHangPhieu = khachHangRepository.getkhongPhieu(id);
        }

        return khachHangPhieu;

    }

    @Override
    public PagedResponse<KhachHang> getAllActive(int pageNumber, int pageSize, String search) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
        Page<KhachHang> page = khachHangRepository.getAllActive(pageable, search);

        PagedResponse<KhachHang> pagedResponse = new PagedResponse<>();
        pagedResponse.setPageNumber(pageNumber);
        pagedResponse.setPageSize(pageSize);
        pagedResponse.setTotalPages(page.getTotalPages());
        pagedResponse.setTotalElements(page.getTotalElements());
        pagedResponse.setPageNumberArr(UtilityFunction.getPageNumberArr(page.getTotalPages()));
        pagedResponse.setData(page.getContent());
        pagedResponse.setSearch(search);
        return pagedResponse;
    }


}
