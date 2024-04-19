package com.datn.backend.resource;

import com.datn.backend.constant.SecurityConstant;
import com.datn.backend.dto.request.ChangePasswordReq;
import com.datn.backend.dto.request.LoginRequest;
import com.datn.backend.dto.request.SignUpReq;
import com.datn.backend.enumeration.Role;
import com.datn.backend.model.Account;
import com.datn.backend.model.NhanVien;
import com.datn.backend.model.khach_hang.KhachHang;
import com.datn.backend.repository.AccountRepository;
import com.datn.backend.repository.KhachHangRepository;
import com.datn.backend.repository.NhanVienRepository;
import com.datn.backend.security.JwtTokenProvider;
import com.datn.backend.security.MyUserDetails;
import com.datn.backend.service.KhachHangService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.file.AccessDeniedException;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthResource {

    private final AuthenticationManager authManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final AccountRepository accountRepo;
    private final NhanVienRepository nhanVienRepo;
    private final KhachHangRepository khachHangRepo;
    private final KhachHangService khachHangService;

    @PostMapping("/staff/login")
    public ResponseEntity<NhanVien> staffLogin(@RequestBody LoginRequest request) throws AccessDeniedException {
        Authentication authentication = new UsernamePasswordAuthenticationToken(request.getTenDangNhap(), request.getMatKhau());
        authManager.authenticate(authentication);

        // if credentials right, code continue
        Account account = accountRepo.findByTenDangNhap(request.getTenDangNhap()).get();
        if (!account.getRole().equals(Role.ROLE_ADMIN.name())) {
            throw new AccessDeniedException("Bạn không có quyền truy cập vào trang web này!");
        }
        MyUserDetails userDetails = new MyUserDetails(account);
        String token = jwtTokenProvider.generateToken(userDetails);

        HttpHeaders headers = new HttpHeaders();
        headers.add(SecurityConstant.TOKEN_HEADER, token);

        NhanVien nhanVien = nhanVienRepo.findByAccountId(account.getId());
        return new ResponseEntity<>(nhanVien, headers, HttpStatus.OK);
    }

    // client
    @PostMapping("/customer/login")
    public ResponseEntity<KhachHang> customerLogin(@RequestBody LoginRequest request) {
        Authentication authentication = new UsernamePasswordAuthenticationToken(request.getTenDangNhap(), request.getMatKhau());
        authManager.authenticate(authentication);

        // if credentials right, code continue
        Account account = accountRepo.findByTenDangNhap(request.getTenDangNhap()).get();
        MyUserDetails userDetails = new MyUserDetails(account);
        String token = jwtTokenProvider.generateToken(userDetails);

        HttpHeaders headers = new HttpHeaders();
        headers.add(SecurityConstant.TOKEN_HEADER, token);

        KhachHang khachHang = khachHangRepo.findByAccountId(account.getId());
        return new ResponseEntity<>(khachHang, headers, HttpStatus.OK);
    }

    @PostMapping("/customer/sign-up")
    public ResponseEntity<KhachHang> signUp(@RequestBody SignUpReq req) {
        return ResponseEntity.ok(khachHangService.signUp(req));
    }

    @PostMapping("/change-pwd")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordReq req) {
        khachHangService.changePassword(req);
        return ResponseEntity.ok().build();
    }
}
