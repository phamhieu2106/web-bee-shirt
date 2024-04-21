package com.datn.backend.dto.request;

import lombok.Getter;

@Getter
public class ChangePasswordReq2 {

    private String custEmail;
    private String newPassword;
    private String verifyCode;
}
