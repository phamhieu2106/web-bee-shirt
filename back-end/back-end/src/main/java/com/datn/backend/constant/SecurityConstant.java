package com.datn.backend.constant;

public class SecurityConstant {

    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String TOKEN_HEADER = "Jwt-Token";
    public static final String[] PUBLIC_URLS =
            { "/auth/login",
              "/user/image/**", "/product/image/**",
              "/cart-item/add",
              "/category/get-all", "/category/get-by-id/**",
              "/favourite-item/count-by-user/**", "/favourite-item/count-by-product/**",
              "/product/all-active", "/product/best-seller", "/product/newest", "/product/best-rating", "/product/get-by-id/**", "/product/get-by-category/**", "/product/get-related/**",
              "/rating/get-all", "/rating/get-by-product/**"
            };
}
