package com.datn.backend.service.impl;

import com.datn.backend.dto.request.KhachHangRequest;
import com.datn.backend.dto.response.KhachHangResponse;
import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.enumeration.Role;
import com.datn.backend.model.Account;
import com.datn.backend.model.khach_hang.DiaChi;
import com.datn.backend.model.khach_hang.KhachHang;
import com.datn.backend.model.phieu_giam_gia.PhieuGiamGia;
import com.datn.backend.repository.AccountRepository;
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
    private final AccountRepository accountRepo;
    private final DiaChiService diaChiService;


    @Override
    public KhachHang add(KhachHangRequest kh) {
        Account account = new Account();
        account.setTenDangNhap(kh.getTen_dang_nhap());
        account.setMatKhau(passwordEncoder.encode(kh.getMat_khau()));
        account.setTrangThai(true);
        account.setRole(Role.ROLE_CUSTOMER.name());

        // khach hang
        KhachHang khachHang = new KhachHang();
        khachHang.setHoTen(kh.getHo_ten());
        khachHang.setNgaySinh(kh.getNgay_sinh());
        khachHang.setSdt(kh.getSdt());
        khachHang.setGioiTinh(kh.isGioi_tinh());
        khachHang.setEmail(kh.getEmail());
        khachHang.setTrangThai(0);
        khachHang.setAccount(account);
        return khachHangRepository.save(khachHang);
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
    public KhachHang update(Integer id, KhachHangRequest kh) {
        //tài khoản
        KhachHang khachHang = khachHangRepository.getById(id);
        Account account = new Account();
        account.setTenDangNhap(kh.getTen_dang_nhap());
        account.setMatKhau(passwordEncoder.encode(kh.getMat_khau()));
        account.setTrangThai(true);
        account.setRole(Role.ROLE_CUSTOMER.name());
        account.setId(khachHang.getAccount().getId());

        // khach hang
        khachHang.setId(id);
        khachHang.setHoTen(kh.getHo_ten());
        khachHang.setNgaySinh(kh.getNgay_sinh());
        khachHang.setSdt(kh.getSdt());
        khachHang.setGioiTinh(kh.isGioi_tinh());
        khachHang.setEmail(kh.getEmail());
        khachHang.setAccount(account);
        return khachHangRepository.save(khachHang);
    }

    @Override
    public KhachHang delete(Integer id) {
        Optional<KhachHang> kh = khachHangRepository.findById(id);
//        return kh.map(khachHang->{
//            khachHang.setTrangThai(0);
//            return khachHangRepository.save(khachHang);
//        }).orElse(null);
        khachHangRepository.deleteById(id);
        return null;
    }
}
