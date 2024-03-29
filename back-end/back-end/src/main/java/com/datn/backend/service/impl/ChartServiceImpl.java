package com.datn.backend.service.impl;

import com.datn.backend.dto.response.CouponsSumarryResponse;
import com.datn.backend.dto.response.DiscountSummaryResponse;
import com.datn.backend.dto.response.ProductsSummaryResponse;
import com.datn.backend.repository.ChartRepository;
import com.datn.backend.service.ChartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

@Service
public class ChartServiceImpl implements ChartService {


    private final ChartRepository chartRepository;

    @Autowired
    public ChartServiceImpl(ChartRepository chartRepository) {

        this.chartRepository = chartRepository;
    }

    @Override
    public Long countInvoiceComplete() {

        return chartRepository.countInvoiceComplete();
    }

    @Override
    public Long countInvoiceWFC() {
        return chartRepository.countInvoiceWFC();
    }

    @Override
    public Long countInvoiceWFD() {
        return chartRepository.countInvoiceWFD();
    }

    @Override
    public Long countInvoiceEx() {
        return chartRepository.countInvoiceEx();
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
//        Trả về dữ liệu 4 tuần của tháng này và + số đơn ngày cuối tháng (vì không thể query tới ngày cuối)
        List<Long> list = chartRepository.countInvoice4WeekInMonth(
                getStartDate(), getEndDate(getStartDate()), getTotalDay(getEndDate(getStartDate())));
        list.set(list.size() - 1, list.get(list.size() - 1) + countLastDayOfMonth(getStartDate()));
        return list;
    }


    @Override
    public List<Long> countInvoice4WeekInLastMonth() {
        //        Trả về dữ liệu 4 tuần của tháng trước và + số đơn ngày cuối tháng (vì không thể query tới ngày cuối)
        List<Long> list = chartRepository.countInvoice4WeekInMonth(
                getStartDateLastMonth(), getEndDate(getStartDateLastMonth()), getTotalDay(getEndDate(getStartDateLastMonth())));
        list.set(list.size() - 1, list.get(list.size() - 1) + countLastDayOfMonth(getStartDateLastMonth()));
        return list;
    }

    @Override
    public List<Long> countInvoice7DayThisWeek() {
//        Trả số hoá đơn của 7 ngày trong tuần này
        Date startOfWeek = getStartOfWeek();
        return chartRepository.countInvoice7DayThisWeek(startOfWeek);
    }

    @Override
    public List<Long> countInvoice7DayLastWeek() {
        //        Trả số hoá đơn của 7 ngày trong tuần trước
        Date startOfLastWeek = getStartOfLastWeek();
        return chartRepository.countInvoice7DayLastWeek(startOfLastWeek);
    }

    @Override
    public List<Long> countCustomerInThisYear() {
        return chartRepository.countCustomerInThisYear();
    }

    @Override
    public List<Long> countCustomerInLastYear() {
        return chartRepository.countCustomerInLastYear();
    }

    @Override
    public List<Long> countCustomer4WeekInMonth() {
        List<Long> list = chartRepository.countCustomer4WeekInMonth(
                getStartDate(), getEndDate(getStartDate()), getTotalDay(getEndDate(getStartDate())));
        list.set(list.size() - 1, list.get(list.size() - 1) + counCustomertLastDayOfMonth(getStartDate()));
        return list;
    }

    @Override
    public List<Long> countCustomer4WeekInLastMonth() {
        List<Long> list = chartRepository.countCustomer4WeekInMonth(
                getStartDateLastMonth(), getEndDate(getStartDateLastMonth()), getTotalDay(getEndDate(getStartDateLastMonth())));
        list.set(list.size() - 1, list.get(list.size() - 1) + counCustomertLastDayOfMonth(getStartDateLastMonth()));
        return list;
    }

    @Override
    public List<Long> countCustomer7DayThisWeek() {
        Date startOfWeek = getStartOfWeek();
        return chartRepository.countCustomer7DayThisWeek(startOfWeek);
    }

    @Override
    public List<Long> countCustomer7DayLastWeek() {
        Date startOfLastWeek = getStartOfLastWeek();
        return chartRepository.countCustomer7DayThisWeek(startOfLastWeek);
    }

    @Override
    public List<DiscountSummaryResponse> getMaDotGiamGiaAndNumberOfProductPurchasedCurrentYear(Integer year) {
        if (year == null) {
            year = LocalDate.now().getYear();
        }
        return chartRepository.getMaDotGiamGiaAndNumberOfProductPurchasedCurrentYear(year);
    }

    @Override
    public List<DiscountSummaryResponse> getMaDotGiamGiaAndNumberOfProductPurchasedAnyYear(LocalDate year) {
        return chartRepository.getMaDotGiamGiaAndNumberOfProductPurchasedAnyYear(year);
    }

    @Override
    public List<ProductsSummaryResponse> getListProductPurchasedInCurrentYear(Integer year) {
        if (year == null) {
            year = LocalDate.now().getYear();
        }
        return chartRepository.getListProductPurchasedInCurrentYear(year);
    }

    @Override
    public List<ProductsSummaryResponse> getListProductPurchasedInAnyYear(Integer year) {
        if (year == null) {
            year = LocalDate.now().getYear();
        }
        return chartRepository.getListProductPurchasedInAnyYear(year);
    }

    @Override
    public List<CouponsSumarryResponse> getListCouponsUsedInAnyYear(Integer year) {
        if (year == null) {
            year = LocalDate.now().getYear();
        }
        return chartRepository.getListCouponsUsedInAnyYear(year);
    }

    @Override
    public List<BigDecimal> getListSalesInThisYear() {
        return chartRepository.getListSalesInAnyYear(LocalDate.now());
    }

    @Override
    public List<BigDecimal> getListSales4WeekInThisMonth() {
        List<BigDecimal> list = chartRepository.getListSales4WeekInAnyMonth(
                getStartDate(), getEndDate(getStartDate()), getTotalDay(getEndDate(getStartDate())));
        list.set(list.size() - 1, list.get(list.size() - 1).add(countSaleLastDayOfMonth(getStartDateLastMonth())));
        return list;
    }

    @Override
    public List<BigDecimal> getListSales4WeekInLastMonth() {
        List<BigDecimal> list = chartRepository.getListSales4WeekInAnyMonth(
                getStartDateLastMonth(), getEndDate(getStartDateLastMonth()), getTotalDay(getEndDate(getStartDateLastMonth())));
        list.set(list.size() - 1, list.get(list.size() - 1).add(countSaleLastDayOfMonth(getStartDateLastMonth())));
        return list;
    }

    @Override
    public List<BigDecimal> getListSalesInLastYear() {
        return chartRepository.getListSalesInAnyYear(LocalDate.now().minusYears(1));
    }

    @Override
    public List<BigDecimal> getSale7DaysInThisWeek() {
        Date startOfWeek = getStartOfWeek();
        return chartRepository.getSale7DaysInAnyWeek(startOfWeek);
    }

    @Override
    public List<BigDecimal> getSale7DaysInLastWeek() {
        Date startOfWeek = getStartOfLastWeek();
        return chartRepository.getSale7DaysInAnyWeek(startOfWeek);
    }

    @Override
    public Long countAllInvoiceThisYear() {
        return chartRepository.countAllInvoiceAnyYear(LocalDate.now());
    }

    @Override
    public Long countAllInvoiceLastYear() {
        return chartRepository.countAllInvoiceAnyYear(LocalDate.now().minusYears(1));
    }

    public Long countLastDayOfMonth(LocalDate today) {
//      Đếm số hoá đơn của ngày cuối cùng trong tháng
        return chartRepository.countInvoiceLastDayOfMonth(today);
    }

    public BigDecimal countSaleLastDayOfMonth(LocalDate today) {
        return chartRepository.getSaleLastDayOfAnyMonth(today);
    }

    public Long counCustomertLastDayOfMonth(LocalDate today) {
//      Đếm số hoá đơn của ngày cuối cùng trong tháng
        return chartRepository.countCustomerLastDayOfMonth(today);
    }

    private static Date getStartOfWeek() {
        LocalDate today = LocalDate.now();
        LocalDate startOfWeek = today.with(DayOfWeek.MONDAY);
        return Date.from(startOfWeek.atStartOfDay(ZoneId.systemDefault()).toInstant());
    }

    private static Date getStartOfLastWeek() {
        LocalDate today = LocalDate.now();
        LocalDate startOfLastWeek = today.minusWeeks(1).with(DayOfWeek.MONDAY);
        return Date.from(startOfLastWeek.atStartOfDay(ZoneId.systemDefault()).toInstant());
    }

    private static LocalDate getStartDate() {
        return LocalDate.now().withDayOfMonth(1);
    }

    private static LocalDate getStartDateLastMonth() {
        return LocalDate.now().withDayOfMonth(1).minusMonths(1);
    }

    private static LocalDate getEndDate(LocalDate startDate) {
        return startDate.withDayOfMonth(startDate.lengthOfMonth());
    }

    private static int getTotalDay(LocalDate endDate) {
        return endDate.getDayOfMonth();
    }
}
