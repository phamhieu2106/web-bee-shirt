package com.datn.backend.constant;

public class SecurityConstant {

    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String TOKEN_HEADER = "Jwt-Token";
    public static final String[] PUBLIC_URLS =
            { "/auth/login",
              "/chat-lieu/get-all"
            };
}
