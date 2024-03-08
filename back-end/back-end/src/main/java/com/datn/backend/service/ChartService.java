package com.datn.backend.service;

import java.util.List;

public interface ChartService {
    Long countInvoiceComplete();
    Long countInvoiceWFC();
    Long countInvoiceWFD();

    List<Long> countInvoiceInThisYear();

    List<Long> countInvoiceInLastYear();

    List<Long> countInvoice4WeekInThisMonth();

    List<Long> countInvoice4WeekInLastMonth();

    List<Long> countInvoice7DayThisWeek();

    List<Long> countInvoice7DayLastWeek();
    List<Long> countCustomerInThisYear();
    List<Long> countCustomerInLastYear();
    List<Long> countCustomer4WeekInMonth();
    List<Long> countCustomer4WeekInLastMonth();
    List<Long> countCustomer7DayThisWeek();
    List<Long> countCustomer7DayLastWeek();
}
