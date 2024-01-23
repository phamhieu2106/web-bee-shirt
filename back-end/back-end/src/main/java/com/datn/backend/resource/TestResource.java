package com.datn.backend.resource;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestResource {

    @GetMapping("/hello")
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    public String hello() {
        return "Hello I'm a customer";
    }
}
