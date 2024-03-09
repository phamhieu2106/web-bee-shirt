package com.datn.backend.service;

import com.datn.backend.dto.response.DiscountSummaryResponse;
import com.datn.backend.dto.response.ProductsSummaryResponse;

import java.time.LocalDate;
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

    List<DiscountSummaryResponse> getMaDotGiamGiaAndNumberOfProductPurchasedCurrentYear();

    List<DiscountSummaryResponse> getMaDotGiamGiaAndNumberOfProductPurchasedAnyYear(LocalDate year);

    List<ProductsSummaryResponse> getListProductPurchasedInCurrentYear();

    List<ProductsSummaryResponse> getListProductPurchasedInAnyYear(LocalDate year);

}
