package com.datn.backend.resource;

import com.datn.backend.service.ChartService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/thong-ke")
@RequiredArgsConstructor
public class ThongKeResource {

    private ChartService chartService;

    @Autowired
    public ThongKeResource(ChartService chartService) {
        super();
        this.chartService = chartService;
    }
    @GetMapping("/hoa-don-hoan-thanh")
    public ResponseEntity<Long> countInvoiceComplete() {
        return ResponseEntity.ok(chartService.countInvoiceComplete());
    }
    @GetMapping("/hoa-don-moi")
    public ResponseEntity<Long> countInvoiceWFC() {
        return ResponseEntity.ok(chartService.countInvoiceWFC());
    }
    @GetMapping("/hoa-don-cho-giao")
    public ResponseEntity<Long> countInvoiceWFD() {
        return ResponseEntity.ok(chartService.countInvoiceWFD());
    }
    @GetMapping("/khach-hang-trong-nam")
    public ResponseEntity<List<Long>> countCustomerCompleteThisYear() {
        return ResponseEntity.ok(chartService.countCustomerInThisYear());
    }

    @GetMapping("/khach-hang-trong-nam-truoc")
    public ResponseEntity<List<Long>> countCustomerCompleteLastYear() {
        return ResponseEntity.ok(chartService.countCustomerInLastYear());
    }

    @GetMapping("/khach-hang-4-tuan-trong-thang")
    public ResponseEntity<List<Long>> countCustomerComplete4WeekThisMonth() {
        return ResponseEntity.ok(chartService.countCustomer4WeekInMonth());
    }

    @GetMapping("/khach-hang-4-tuan-trong-thang-truoc")
    public ResponseEntity<List<Long>> countCustomerComplete4WeekLastMonth() {
        return ResponseEntity.ok(chartService.countCustomer4WeekInLastMonth());
    }

    @GetMapping("/khach-hang-7-ngay-trong-tuan")
    public ResponseEntity<List<Long>> countCustomerComplete7DayThisWeek() {
        return ResponseEntity.ok(chartService.countCustomer7DayThisWeek());
    }

    @GetMapping("/khach-hang-7-ngay-trong-tuan-truoc")
    public ResponseEntity<List<Long>> countCustomerComplete7DayLastWeek() {
        return ResponseEntity.ok(chartService.countCustomer7DayLastWeek());
    }
    @GetMapping("/hoa-don-hoan-thanh-trong-nam")
    public ResponseEntity<List<Long>> countInvoiceCompleteThisYear() {
        return ResponseEntity.ok(chartService.countInvoiceInThisYear());
    }

    @GetMapping("/hoa-don-hoan-thanh-trong-nam-truoc")
    public ResponseEntity<List<Long>> countInvoiceCompleteLastYear() {
        return ResponseEntity.ok(chartService.countInvoiceInLastYear());
    }

    @GetMapping("/hoa-don-hoan-thanh-4-tuan-trong-thang")
    public ResponseEntity<List<Long>> countInvoiceComplete4WeekThisMonth() {
        return ResponseEntity.ok(chartService.countInvoice4WeekInThisMonth());
    }

    @GetMapping("/hoa-don-hoan-thanh-4-tuan-trong-thang-truoc")
    public ResponseEntity<List<Long>> countInvoiceComplete4WeekLastMonth() {
        return ResponseEntity.ok(chartService.countInvoice4WeekInLastMonth());
    }

    @GetMapping("/hoa-don-hoan-thanh-7-ngay-trong-tuan")
    public ResponseEntity<List<Long>> countInvoiceComplete7DayThisWeek() {
        return ResponseEntity.ok(chartService.countInvoice7DayThisWeek());
    }

    @GetMapping("/hoa-don-hoan-thanh-7-ngay-trong-tuan-truoc")
    public ResponseEntity<List<Long>> countInvoiceComplete7DayLastWeek() {
        return ResponseEntity.ok(chartService.countInvoice7DayLastWeek());
    }
}
