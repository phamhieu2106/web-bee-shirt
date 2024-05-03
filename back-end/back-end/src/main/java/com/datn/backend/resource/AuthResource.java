package com.datn.backend.resource;

import com.datn.backend.constant.SecurityConstant;
import com.datn.backend.dto.request.AdminLoginReq;
import com.datn.backend.dto.request.ChangePasswordReq;
import com.datn.backend.dto.request.ChangePasswordReq2;
import com.datn.backend.dto.request.LoginRequest;
import com.datn.backend.dto.request.SignUpReq;
import com.datn.backend.model.Account;
import com.datn.backend.model.nhan_vien.NhanVien;
import com.datn.backend.model.khach_hang.KhachHang;
import com.datn.backend.repository.AccountRepository;
import com.datn.backend.repository.KhachHangRepository;
import com.datn.backend.repository.NhanVienRepository;
import com.datn.backend.security.JwtTokenProvider;
import com.datn.backend.security.MyUserDetails;
import com.datn.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthResource {

    private final AuthenticationManager authManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final AccountRepository accountRepo;
    private final NhanVienRepository staffRepo;
    private final KhachHangRepository customerRepo;
    private final AuthService authService;

    @PostMapping("/admin/login")
    public ResponseEntity<NhanVien> adminLogin(@RequestBody AdminLoginReq req) {
        Authentication authentication = new UsernamePasswordAuthenticationToken(req.getUsername(), req.getPassword());
        authManager.authenticate(authentication);

        // if credentials right, code continue
        Account account = accountRepo.findByTenDangNhap(req.getUsername()).get();
        if (account.getRole().equals("ROLE_CUSTOMER")) {
            throw new BadCredentialsException("Tài khoản mật khẩu của bạn tồn tại!");
        }

        MyUserDetails userDetails = new MyUserDetails(account);
        String token = jwtTokenProvider.generateToken(userDetails);

        HttpHeaders headers = new HttpHeaders();
        headers.add(SecurityConstant.TOKEN_HEADER, token);

        NhanVien nhanVien = staffRepo.findByAccountId(account.getId());
        return new ResponseEntity<>(nhanVien, headers, HttpStatus.OK);
    }

    // client
    @PostMapping("/client/login")
    public ResponseEntity<KhachHang> Login(@RequestBody LoginRequest request) {
        Authentication authentication = new UsernamePasswordAuthenticationToken(request.getPhone(), request.getPassword());
        authManager.authenticate(authentication);

        // if credentials right, code continue
        Account account = accountRepo.findByTenDangNhap(request.getPhone()).get();
        if (account.getRole().equals("ROLE_ADMIN") || account.getRole().equals("ROLE_STAFF")) {
            throw new BadCredentialsException("Tài khoản mật khẩu của bạn tồn tại!");
        }

        MyUserDetails userDetails = new MyUserDetails(account);
        String token = jwtTokenProvider.generateToken(userDetails);

        HttpHeaders headers = new HttpHeaders();
        headers.add(SecurityConstant.TOKEN_HEADER, token);

        KhachHang khachHang = customerRepo.findByAccountId(account.getId());
        return new ResponseEntity<>(khachHang, headers, HttpStatus.OK);
    }

    @PostMapping("/sign-up")
    public ResponseEntity<KhachHang> signUp(@RequestBody SignUpReq req) {
        return ResponseEntity.ok(authService.signUp(req));
    }

    @PostMapping("/change-pwd-log")
    public ResponseEntity<?> changePasswordLogged(@RequestBody ChangePasswordReq req) {
        authService.changePasswordLogged(req);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/change-pwd-none-log")
    public ResponseEntity<?> changePasswordNoneLogged(@RequestBody ChangePasswordReq2 req) {
        authService.changePasswordNoneLogged(req);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/send-verify-code/{email}")
    public ResponseEntity<?> checkEmailForForgetPassword(@PathVariable("email") String email) {
        authService.sendVerifyCodeForForgetPwd(email);
        return ResponseEntity.ok().build();
    }
}
