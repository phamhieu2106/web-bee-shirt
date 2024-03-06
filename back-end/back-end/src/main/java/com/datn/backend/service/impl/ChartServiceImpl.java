package com.datn.backend.service.impl;

import com.datn.backend.repository.ChartRepository;
import com.datn.backend.service.ChartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChartServiceImpl implements ChartService {


    private ChartRepository chartRepository;

    @Autowired
    public ChartServiceImpl(ChartRepository chartRepository) {
        this.chartRepository = chartRepository;
    }

    @Override
    public Long countInvoiceComplete() {
        return chartRepository.countInvoiceComplete();
    }

    @Override
    public List<Long> countInvoiceInThisYear() {
        return chartRepository.countInvoiceInThisYear();
    }

    @Override
    public List<Long> countInvoiceInLastYear() {
        return chartRepository.countInvoiceInLastYear();
    }

    @Override
    public List<Long> countInvoice4WeekInThisMonth() {
        return chartRepository.countInvoice4WeekInThisMonth();
    }

    @Override
    public List<Long> countInvoice4WeekInLastMonth() {
        return chartRepository.countInvoice4WeekInLastMonth();
    }

    @Override
    public List<Long> countInvoice7DayThisWeek() {
        chartRepository.createVarrible1();
        chartRepository.createVarrible2();
        return chartRepository.countInvoice7DayThisWeek();
    }

    @Override
    public List<Long> countInvoice7DayLastWeek() {
//        chartRepository.createVarrible1();
//        chartRepository.createVarrible2();
//        chartRepository.createVarrible3();
//        System.out.println(chartRepository.countInvoice7DayThisWeek());
//        return chartRepository.countInvoice7DayLastWeek();
        return null;

//        HÀM NÀY ĐANG BỊ LỖI
    }
}
