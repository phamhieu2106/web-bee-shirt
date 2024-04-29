package com.datn.backend.resource;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * @author HungDV
 */
@RestController
@RequestMapping("/test")
public class TestResource {

    @GetMapping("/say-admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> sayAdmin() {
        return ResponseEntity.ok("hello admin");
    }

    @GetMapping("/say-cust")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<String> sayStaff() {
        return ResponseEntity.ok("hello CUSTOMER");
    }
}
