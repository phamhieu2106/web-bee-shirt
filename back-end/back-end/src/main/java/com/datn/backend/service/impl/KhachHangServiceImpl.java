package com.datn.backend.service.impl;

import com.datn.backend.dto.request.KhachHangRequest;
import com.datn.backend.dto.response.KhachHangResponse;
import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.enumeration.Role;
import com.datn.backend.model.Account;
import com.datn.backend.model.khach_hang.DiaChi;
import com.datn.backend.model.khach_hang.KhachHang;
import com.datn.backend.repository.AccountRepository;
import com.datn.backend.repository.DiaChiRepository;
import com.datn.backend.repository.KhachHangRepository;
import com.datn.backend.service.DiaChiService;
import com.datn.backend.service.KhachHangService;
import com.datn.backend.utility.UtilityFunction;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class KhachHangServiceImpl implements KhachHangService {
    private final PasswordEncoder passwordEncoder;
    private final KhachHangRepository khachHangRepository;
    private final DiaChiRepository diaChiRepository;
    private final AccountRepository ar;


    @Override
    public KhachHang add(KhachHangRequest kh) {
        Account account = new Account();
        account.setTenDangNhap(kh.getTenDangNhap());
        account.setMatKhau(passwordEncoder.encode(kh.getMatKhau()));
        account.setTrangThai(true);
        account.setRole(Role.ROLE_CUSTOMER.name());

        // khach hang
        KhachHang khachHang = new KhachHang();
        khachHang.setHoTen(kh.getHoTen());
        khachHang.setNgaySinh(kh.getNgaySinh());
        khachHang.setSdt(kh.getSdt());
        khachHang.setGioiTinh(kh.isGioiTinh());
        khachHang.setEmail(kh.getEmail());
        khachHang.setTrangThai(kh.getTrangThai());
        khachHang.setAccount(account);
        khachHangRepository.save(khachHang);
        DiaChi diaChi = new DiaChi();
        diaChi.setKhachHang(khachHang);
        diaChi.setTinh(kh.getTinh());
        diaChi.setHuyen(kh.getHuyen());
        diaChi.setXa(kh.getXa());
        diaChi.setDuong(kh.getDuong());
        diaChi.setMacDinh(true);
        diaChiRepository.save(diaChi);

        return null;
    }

    @Override
    public PagedResponse<KhachHangResponse> getAll(int pageNumber, int pageSize, String search) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
        Page<KhachHangResponse> page = khachHangRepository.getAll(pageable, search);

        PagedResponse<KhachHangResponse> pagedResponse = new PagedResponse<>();
        pagedResponse.setPageNumber(pageNumber);
        pagedResponse.setPageSize(pageSize);
        pagedResponse.setTotalPages(page.getTotalPages());
        pagedResponse.setTotalElements(page.getTotalElements());
        pagedResponse.setPageNumberArr(UtilityFunction.getPageNumberArr(page.getTotalPages()));
        pagedResponse.setData(page.getContent());
        pagedResponse.setSearch(search);
        return pagedResponse;
    }

    @Override
    public KhachHang update(int id,KhachHangRequest kh) {
        System.out.println("vào đến service");
        Account account = ar.findByTenDangNhap(kh.getTenDangNhap()).get();
        System.out.println(kh);
        KhachHang khachHang = new KhachHang();
        khachHang.setId(id);
        khachHang.setHoTen(kh.getHoTen());
        khachHang.setNgaySinh(kh.getNgaySinh());
        khachHang.setSdt(kh.getSdt());
        khachHang.setGioiTinh(kh.isGioiTinh());
        khachHang.setImageUrl(kh.getImageUrl());
        khachHang.setTrangThai(kh.getTrangThai());
        khachHang.setEmail(kh.getEmail());
        khachHang.setAccount(account);
//        KhachHang addKH = khachHangRepository.save(khachHang);
//        KhachHangRequest request = new KhachHangRequest();
//        request.setId(addKH.getId());
//        request.setHoTen(addKH.getHoTen());
//        request.setNgaySinh(addKH.getNgaySinh());
//        request.setSdt(addKH.getSdt());
//        request.setEmail(addKH.getEmail());
//        request.setGioiTinh(addKH.isGioiTinh());
//        request.setImageUrl(addKH.getImageUrl());
        System.out.println(khachHang);
//        System.out.println(khachHangRepository.save(khachHang).toString());
        return khachHangRepository.save(khachHang);
    }

    @Override
    public KhachHang delete(Integer id) {
        Optional<KhachHang> kh = khachHangRepository.findById(id);

        khachHangRepository.deleteById(id);
        return null;
    }

    @Override
    public KhachHangResponse getById(int id) {
        return khachHangRepository.getKHById(id);
    }


}
