package com.datn.backend.service.impl;

import com.datn.backend.dto.request.AddNhanVienRequest;
import com.datn.backend.enumeration.Role;
import com.datn.backend.model.Account;
import com.datn.backend.model.NhanVien;
import com.datn.backend.repository.NhanVienRepository;
import com.datn.backend.service.NhanVienService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NhanVienServiceImpl implements NhanVienService {

    private final NhanVienRepository nhanVienRepo;
    private final PasswordEncoder passwordEncoder;

    @Override
    public NhanVien add(AddNhanVienRequest request) {
        // account
        Account account = new Account();
        account.setTenDangNhap(request.getTenDangNhap());
        account.setMatKhau(passwordEncoder.encode(request.getMatKhau()));
        account.setTrangThai(true);
        account.setRole(Role.ROLE_ADMIN.name());
//        account.setAuthorities(Role.ROLE_ADMIN.getAuthority());

        // nhan vien
        NhanVien nhanVien = new NhanVien();
        nhanVien.setHoTen(request.getHoTen());
        nhanVien.setNgaySinh(request.getNgaySinh());
        nhanVien.setSdt(request.getSdt());
        nhanVien.setGioiTinh(request.isGioiTinh());
        nhanVien.setEmail(request.getEmail());
        nhanVien.setDiaChi(request.getDiaChi());
        nhanVien.setAccount(account);

        return nhanVienRepo.save(nhanVien);
    }
}
