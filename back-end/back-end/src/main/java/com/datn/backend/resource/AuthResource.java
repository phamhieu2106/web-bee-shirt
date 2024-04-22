package com.datn.backend.resource;

import com.datn.backend.constant.SecurityConstant;
import com.datn.backend.dto.request.ChangePasswordReq;
import com.datn.backend.dto.request.ChangePasswordReq2;
import com.datn.backend.dto.request.LoginRequest;
import com.datn.backend.dto.request.SignUpReq;
import com.datn.backend.enumeration.Role;
import com.datn.backend.model.Account;
import com.datn.backend.model.nhan_vien.NhanVien;
import com.datn.backend.model.khach_hang.KhachHang;
import com.datn.backend.repository.AccountRepository;
import com.datn.backend.repository.KhachHangRepository;
import com.datn.backend.repository.NhanVienRepository;
import com.datn.backend.security.JwtTokenProvider;
import com.datn.backend.security.MyUserDetails;
import com.datn.backend.service.AuthService;
import com.datn.backend.service.KhachHangService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
    private final AuthService authService;

    @PostMapping("/staff/login")
    public ResponseEntity<NhanVien> staffLogin(@RequestBody LoginRequest request) throws AccessDeniedException {
        Authentication authentication = new UsernamePasswordAuthenticationToken(request.getPhone(), request.getPassword());
        authManager.authenticate(authentication);

        // if credentials right, code continue
        Account account = accountRepo.findByTenDangNhap(request.getPhone()).get();
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
        Authentication authentication = new UsernamePasswordAuthenticationToken(request.getPhone(), request.getPassword());
        authManager.authenticate(authentication);

        // if credentials right, code continue
        Account account = accountRepo.findByTenDangNhap(request.getPhone()).get();
        MyUserDetails userDetails = new MyUserDetails(account);
        String token = jwtTokenProvider.generateToken(userDetails);

        HttpHeaders headers = new HttpHeaders();
        headers.add(SecurityConstant.TOKEN_HEADER, token);

        KhachHang khachHang = khachHangRepo.findByAccountId(account.getId());
        return new ResponseEntity<>(khachHang, headers, HttpStatus.OK);
    }

    @PostMapping("/customer/sign-up")
    public ResponseEntity<KhachHang> signUp(@RequestBody SignUpReq req) {
        return ResponseEntity.ok(authService.signUp(req));
    }

    @PostMapping("/change-pwd")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordReq req) {
        authService.changePassword(req);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/change-pwd2")
    public ResponseEntity<?> changePassword2(@RequestBody ChangePasswordReq2 req) {
        authService.changePassword2(req);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/send-verify-code/{email}")
    public ResponseEntity<?> checkEmailForForgetPassword(@PathVariable("email") String email) {
        authService.sendVerifyCodeForForgetPwd(email);
        return ResponseEntity.ok().build();
    }
}
