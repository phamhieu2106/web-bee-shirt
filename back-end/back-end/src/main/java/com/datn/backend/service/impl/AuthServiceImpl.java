package com.datn.backend.service.impl;

import com.datn.backend.dto.request.ChangePasswordReq;
import com.datn.backend.dto.request.ChangePasswordReq2;
import com.datn.backend.dto.request.SignUpReq;
import com.datn.backend.exception.custom_exception.ResourceExistsException;
import com.datn.backend.model.Account;
import com.datn.backend.model.khach_hang.DiaChi;
import com.datn.backend.model.khach_hang.KhachHang;
import com.datn.backend.model.khach_hang.CustomerImage;
import com.datn.backend.repository.AccountRepository;
import com.datn.backend.repository.CustomerImageRepository;
import com.datn.backend.repository.AddressRepository;
import com.datn.backend.repository.KhachHangRepository;
import com.datn.backend.service.AuthService;
import com.datn.backend.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final KhachHangRepository customerRepo;
    private final AccountRepository accountRepo;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;
    private final CustomerImageRepository customerImageRepo;

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
    public void changePasswordNoneLogged(ChangePasswordReq2 req) {
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

    @Override
    public void changePasswordLogged(ChangePasswordReq req) {
        Account account = accountRepo.findById(req.getAccId()).get();
        boolean isMatch = passwordEncoder.matches(req.getOldPassword(), account.getMatKhau());

        if (!isMatch) {
            throw new RuntimeException("Mật khẩu cũ không đúng!");
        }
        account.setMatKhau(passwordEncoder.encode(req.getNewPassword()));
        accountRepo.save(account);
    }

    @Override
    public KhachHang signUp(SignUpReq req) {
        checkPhoneAndEmailForSignUp(req);

        // account
        Account account = Account.builder()
                .tenDangNhap(req.getSdt())
                .matKhau(passwordEncoder.encode(req.getMatKhau()))
                .trangThai(true)
                .role("ROLE_CUSTOMER")
                .build();

        // customer image
        CustomerImage defaultImg = customerImageRepo.getByImageId("default-user-img-id");
        if (defaultImg == null) {
            defaultImg = CustomerImage.builder()
                    .imageId("default-user-img-id")
                    .imageName("default-user-img")
                    .imageUrl("https://res.cloudinary.com/dpsryzyev/image/upload/v1712851456/default-user-img_ri7fap.webp")
                    .build();
        }

        DiaChi address = DiaChi.builder()
                .hoTen(req.getHoTen())
                .sdt(req.getSdt())
                .tinh(req.getTinh())
                .huyen(req.getHuyen())
                .xa(req.getXa())
                .duong(req.getDuong())
                .macDinh(true)
                .build();

        KhachHang customer = KhachHang.builder()
                .hoTen(req.getHoTen())
                .ngaySinh(req.getNgaySinh())
                .sdt(req.getSdt())
                .email(req.getEmail())
                .gioiTinh(req.isGioiTinh())
                .trangThai(1)
                .account(account)
                .image(defaultImg)
                .diaChis(List.of(address))
                .build();
        address.setKhachHang(customer);
        KhachHang savedCust = customerRepo.save(customer);

        return savedCust;
    }

    private void checkPhoneAndEmailForSignUp(SignUpReq req) {
        KhachHang byPhone = customerRepo.getBySdt(req.getSdt());
        KhachHang byEmail = customerRepo.getByEmail(req.getEmail());

        if (byPhone != null && byEmail == null) {
            throw new ResourceExistsException("Số điện thoại này đã được đăng ký!");
        }

        if (byPhone == null && byEmail != null) {
            throw new ResourceExistsException("Email này đã được đăng ký!");
        }

        if (byPhone != null && byEmail != null) {
            throw new ResourceExistsException("Số điện thoại và email này đã được đăng ký!");
        }
    }
}
