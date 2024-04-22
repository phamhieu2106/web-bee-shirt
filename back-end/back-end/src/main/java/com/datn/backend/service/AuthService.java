package com.datn.backend.service;

import com.datn.backend.dto.request.ChangePasswordReq;
import com.datn.backend.dto.request.ChangePasswordReq2;
import com.datn.backend.dto.request.SignUpReq;
import com.datn.backend.model.khach_hang.KhachHang;

public interface AuthService {

    void sendVerifyCodeForForgetPwd(String email);

    void changePassword(ChangePasswordReq req);

    void changePassword2(ChangePasswordReq2 req);

    KhachHang signUp(SignUpReq req);
}
