package com.datn.backend.service;

import com.datn.backend.dto.response.CouponsSumarryResponse;
import com.datn.backend.dto.response.DiscountSummaryResponse;
import com.datn.backend.dto.response.ProductsSummaryResponse;

import java.time.LocalDate;
import java.util.List;

public interface ChartService {
    Long countInvoiceComplete();

    Long countInvoiceWFC();

    Long countInvoiceWFD();

    Long countInvoiceEx();

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

    List<DiscountSummaryResponse> getMaDotGiamGiaAndNumberOfProductPurchasedCurrentYear(Integer year);

    List<DiscountSummaryResponse> getMaDotGiamGiaAndNumberOfProductPurchasedAnyYear(LocalDate year);

    List<ProductsSummaryResponse> getListProductPurchasedInCurrentYear(Integer year);

    List<ProductsSummaryResponse> getListProductPurchasedInAnyYear(Integer year);

    List<CouponsSumarryResponse> getListCouponsUsedInAnyYear(Integer year);

    List<Double> getListSalesInThisYear();

    List<Double> getListSalesInLastYear();

    List<Double> getListSales4WeekInThisMonth();

    List<Double> getListSales4WeekInLastMonth();

    List<Double> getSale7DaysInThisWeek();

    List<Double> getSale7DaysInLastWeek();

    Long countAllInvoiceThisYear();

    Long countAllInvoiceLastYear();
}
