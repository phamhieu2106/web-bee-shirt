package com.datn.backend.dto.request;

import lombok.Getter;

@Getter
public class ChangePasswordReq {

    private int accId;
    private String oldPassword;
    private String newPassword;
}
