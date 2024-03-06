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
}
