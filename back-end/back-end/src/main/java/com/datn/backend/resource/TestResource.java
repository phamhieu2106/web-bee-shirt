package com.datn.backend.resource;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestResource {

    @GetMapping("/hello")
    private String hello() {
        return "Hello";
    }
}
