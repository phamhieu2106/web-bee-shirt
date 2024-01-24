package com.datn.backend.resource;

import com.datn.backend.service.PhieuGiamGiaServce;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/phieu-giam-gia")
@RequiredArgsConstructor
public class PhieuGiamGiaResource {

    @Autowired
    private PhieuGiamGiaServce servce;

    @GetMapping
    public ResponseEntity<?> getAll(){
        return  ResponseEntity.ok(servce.getAll());
    }
}
