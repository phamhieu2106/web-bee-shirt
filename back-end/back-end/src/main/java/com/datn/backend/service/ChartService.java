package com.datn.backend.service;

import java.util.List;

public interface ChartService {
    Long countInvoiceComplete();

    List<Long> countInvoiceInThisYear();

    List<Long> countInvoiceInLastYear();

    List<Long> countInvoice4WeekInThisMonth();

    List<Long> countInvoice4WeekInLastMonth();

    List<Long> countInvoice7DayThisWeek();

    List<Long> countInvoice7DayLastWeek();
}
