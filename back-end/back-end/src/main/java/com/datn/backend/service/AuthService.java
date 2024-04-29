package com.datn.backend.service;

import com.datn.backend.dto.request.ChangePasswordReq;
import com.datn.backend.dto.request.ChangePasswordReq2;
import com.datn.backend.dto.request.SignUpReq;
import com.datn.backend.model.khach_hang.KhachHang;

public interface AuthService {

    void sendVerifyCodeForForgetPwd(String email);

    void changePasswordLogged(ChangePasswordReq req);

    void changePasswordNoneLogged(ChangePasswordReq2 req);

    KhachHang signUp(SignUpReq req);
}
