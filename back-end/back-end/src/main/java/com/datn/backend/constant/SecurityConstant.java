package com.datn.backend.constant;

public class SecurityConstant {

    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String TOKEN_HEADER = "Jwt-Token";
    public static final String[] PUBLIC_URLS =
            { "/auth/admin/login",
              "/auth/client/login", "/auth/client/sign-up", "/auth/client/send-verify-code/*", "/auth/client/change-pwd-none-log"
            };

    public static final String[] CLIENT_URLS =
            { "/cart/client/*",
              "/dia-chi/client/*",
              "/khach-hang/client/*",
              "/kich-co/client/*", "/mau-sac/client/*", "/co-ao/client/*", "/thiet-ke/client/*", "/kieu-dang/client/*", "/chat-lieu/client/*", "/tay-ao/client/*",
              "/phieu-giam-gia/client/*",
              "/dot-giam-gia/client/*",
              "/spct/client/*",
              "/san-pham/client/*",
              "/hoa-don/client/*",
              "/hinh-anh-sp/client/*"
            };

//    public static final String[] ADMIN_URLS =
//            { "/chat-lieu/admin/*", "/co-ao/admin/*", "/kich-co/admin/*", "/kieu-dang/admin/*", "/thiet-ke/admin/*", "/mau-sac/admin/*", "/tay-ao/admin/*",
//              "/dia-chi/admin/*",
//              "/dot-giam-gia/admin/*",
//              "/hoa-don/admin/*",
//              "/khach-hang/admin/*",
//              "/nhan-vien/admin/*",
//              "/phieu-giam-gia/admin/*",
//              "/spct/admin/*",
//              "/san-pham/admin/*"
//            };

    public static final String[] ADMIN_URLS =
            { "/co-ao/admin/*"
            };

//    public static final String[] STAFF_URLS =
//            { "/chat-lieu/admin/*", "/co-ao/admin/*", "/kich-co/admin/*", "/kieu-dang/admin/*", "/thiet-ke/admin/*", "/mau-sac/admin/*", "/tay-ao/admin/*",
//              "/dia-chi/admin/*",
//              "/hoa-don/admin/*",
//              "/khach-hang/admin/*",
//              "/spct/admin/*",
//              "/san-pham/admin/*"
//            };

    public static final String[] STAFF_URLS =
            { "/chat-lieu/admin/*"
            };
}
