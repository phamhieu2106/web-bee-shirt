package com.datn.backend.service;

import java.util.List;

public interface ChartService {
    Long countInvoiceComplete();

    List<Long> countInvoiceInThisYear();

    List<Long> countInvoiceInLastYear();
}
