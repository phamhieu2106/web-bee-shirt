package com.datn.backend.service.impl;

import com.datn.backend.dto.request.ChangePasswordReq2;
import com.datn.backend.model.Account;
import com.datn.backend.model.khach_hang.KhachHang;
import com.datn.backend.repository.AccountRepository;
import com.datn.backend.repository.KhachHangRepository;
import com.datn.backend.service.AuthService;
import com.datn.backend.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final KhachHangRepository customerRepo;
    private final AccountRepository accountRepo;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void sendVerifyCodeForForgetPwd(String email) {
        KhachHang cust = customerRepo.getByEmail(email);
        if (cust == null) {
            throw new RuntimeException("Email chưa được đăng ký trong hệ thống!");
        }
        String verifyCode = RandomStringUtils.randomAlphabetic(10);
        System.out.println(verifyCode);
        Account accountOfCust = cust.getAccount();
        accountOfCust.setForgetPwdVerifyCode(verifyCode);
        accountRepo.save(accountOfCust);

        this.emailService.sendSimpleMailMessage(cust.getHoTen(), email, verifyCode);
    }

    @Override
    public void changePassword2(ChangePasswordReq2 req) {
        KhachHang cust = customerRepo.getByEmail(req.getCustEmail());
        if (cust == null) {
            return;
        }
        Account account = cust.getAccount();
        if (!account.getForgetPwdVerifyCode().equals(req.getVerifyCode())) {
            throw new RuntimeException("Mã xác nhận không chính xác!");
        }
        account.setMatKhau(passwordEncoder.encode(req.getNewPassword()));
        accountRepo.save(account);
    }
}
