package com.datn.backend.enumeration;

import com.datn.backend.constant.AuthoritiesConstant;

public enum Role {

    ROLE_CUSTOMER(AuthoritiesConstant.CUSTOMER_AUTHORITY),
    ROLE_ADMIN(AuthoritiesConstant.ADMIN_AUTHORITY);

    private String[] authorities;

    Role(String[] authority) {
        this.authorities = authority;
    }

    public String[] getAuthority() {
        return authorities;
    }
}
