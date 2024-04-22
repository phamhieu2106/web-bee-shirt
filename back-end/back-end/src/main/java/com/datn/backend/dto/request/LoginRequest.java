package com.datn.backend.dto.request;

import lombok.Getter;

@Getter
public class LoginRequest {

    private String phone;
    private String password;
}
