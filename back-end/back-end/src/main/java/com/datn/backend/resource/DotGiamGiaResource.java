package com.datn.backend.resource;

import com.datn.backend.dto.request.DotGiamGiaRequest;
import com.datn.backend.service.impl.DotGiamGiaServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dot-giam-gia")
@RequiredArgsConstructor
public class DotGiamGiaResource {

    private final DotGiamGiaServiceImpl service;

//    @GetMapping("/all")
//    public ResponseEntity<?> getAll(){
////        return DotGiamGiaResponseEntity
//        return ResponseEntity.ok(service.getAll());
//    }

    @GetMapping
    public ResponseEntity<?> getPagination(@RequestParam(value = "pageNumber" , defaultValue = "1", required = false)
                                            int pageNumber,
                                           @RequestParam(value = "pageSize", defaultValue = "5", required = false)
                                           int pageSize,
                                           @RequestParam(value = "search", defaultValue = "", required = false)
                                           String search){
//        return DotGiamGiaResponseEntity
        return ResponseEntity.ok(service.getPagination(pageNumber,pageSize,search));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOne(@PathVariable("id")Integer id){
//        return DotGiamGiaResponseEntity
        return ResponseEntity.ok(service.getOne(id));
    }

    @PostMapping
    public ResponseEntity<?> add(@RequestBody DotGiamGiaRequest request){
//        return DotGiamGiaResponseEntity with HttpStatus 201
        return ResponseEntity.status(HttpStatus.CREATED).body(service.add(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable("id")Integer id,@RequestBody DotGiamGiaRequest request){
//        return DotGiamGiaResponseEntity body
        return ResponseEntity.ok().body(service.update(id,request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id")Integer id){
        service.remove(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
