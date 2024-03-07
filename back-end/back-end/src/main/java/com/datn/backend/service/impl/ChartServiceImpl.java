package com.datn.backend.service.impl;

import com.datn.backend.repository.ChartRepository;
import com.datn.backend.service.ChartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public Long countLastDayOfMonth(LocalDate today) {
//      Đếm số hoá đơn của ngày cuối cùng trong tháng
        return chartRepository.countInvoiceLastDayOfMonth(today);
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
