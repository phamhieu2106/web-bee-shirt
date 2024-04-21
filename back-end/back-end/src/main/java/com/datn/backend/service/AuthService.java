package com.datn.backend.service;

import com.datn.backend.dto.request.ChangePasswordReq2;

public interface AuthService {

    void sendVerifyCodeForForgetPwd(String email);

    void changePassword2(ChangePasswordReq2 req);
}
