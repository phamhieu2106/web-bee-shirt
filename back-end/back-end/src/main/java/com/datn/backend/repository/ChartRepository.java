package com.datn.backend.repository;

import com.datn.backend.model.hoa_don.HoaDon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Repository
public interface ChartRepository extends JpaRepository<HoaDon, Integer> {

    @Query(value = """
            SELECT COUNT(hd.trang_thai) FROM hoa_don hd
            WHERE hd.trang_thai = 'HOAN_THANH';
            """, nativeQuery = true)
    Long countInvoiceComplete();

    @Query(value = """
                SELECT COALESCE(SUM(CASE WHEN hd.trang_thai = 'HOAN_THANH' THEN 1 ELSE 0 END), 0) AS SoLuongDonHoanThanh
            FROM (
                SELECT 1 AS Thang UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL
                SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL
                SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9 UNION ALL
                SELECT 10 UNION ALL SELECT 11 UNION ALL SELECT 12
            ) AS thang
            LEFT JOIN hoa_don hd ON thang.Thang = MONTH(hd.created_at)
            AND YEAR(hd.created_at) = YEAR(CURDATE()) AND hd.trang_thai = 'HOAN_THANH'
            GROUP BY thang.Thang
            ORDER BY thang.Thang;
                """, nativeQuery = true)
    List<Long> countInvoiceInThisYear();

    @Query(value = """
                SELECT COALESCE(SUM(CASE WHEN hd.trang_thai = 'HOAN_THANH' THEN 1 ELSE 0 END), 0) AS SoLuongDonHoanThanh
            FROM (
                SELECT 1 AS Thang UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL
                SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL
                SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9 UNION ALL
                SELECT 10 UNION ALL SELECT 11 UNION ALL SELECT 12
            ) AS thang
            LEFT JOIN hoa_don hd ON thang.Thang = MONTH(hd.created_at)
            AND YEAR(hd.created_at) = YEAR(CURDATE()) - 1 AND hd.trang_thai = 'HOAN_THANH'
            GROUP BY thang.Thang
            ORDER BY thang.Thang;
                """, nativeQuery = true)
    List<Long> countInvoiceInLastYear();


    @Query(value = """
                     SELECT COUNT(*) AS total_orders
                     FROM hoa_don
                     WHERE trang_thai = 'HOAN_THANH'
                         AND created_at >= :startDate
                         AND created_at <= DATE_ADD( :startDate , INTERVAL CEIL( :totalDays / 4) DAY)
                     UNION ALL
                     SELECT  COUNT(*) AS total_orders
                     FROM hoa_don
                     WHERE trang_thai = 'HOAN_THANH'
                         AND created_at > DATE_ADD(:startDate, INTERVAL CEIL(:totalDays / 4) DAY)\s
                         AND created_at <= DATE_ADD(:startDate, INTERVAL CEIL(:totalDays / 2) DAY)
                     UNION ALL
                     SELECT COUNT(*) AS total_orders
                     FROM hoa_don
                     WHERE trang_thai = 'HOAN_THANH'
                     	AND created_at > DATE_ADD(:startDate, INTERVAL CEIL(:totalDays / 2) DAY)\s
                         AND created_at <= DATE_ADD(:startDate, INTERVAL CEIL(:totalDays * 3 / 4) DAY)
                     UNION ALL
                     SELECT COUNT(*) AS total_orders
                     FROM hoa_don
                     WHERE trang_thai = 'HOAN_THANH'
                         AND created_at > DATE_ADD(:startDate, INTERVAL CEIL(:totalDays * 3 / 4) DAY)\s
                         AND created_at <= :endDate ;
            """,
            nativeQuery = true)
    List<Long> countInvoice4WeekInMonth(@Param("startDate") LocalDate startDate
            , @Param("endDate") LocalDate endDate, @Param("totalDays") int totalDays);


    @Query(value = """

                        SELECT IFNULL(COUNT(*), 0) as SoDon
            FROM hoa_don
            WHERE DAY(created_at) = DAY(LAST_DAY( :today ));
            """, nativeQuery = true)
    Long countInvoiceLastDayOfMonth(@Param("today") LocalDate today);

    @Query(value = """
            SELECT COALESCE(COUNT(hd.trang_thai), 0) AS SoDonHang
            FROM (
                SELECT 0 AS num UNION ALL
                SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL
                SELECT 5 UNION ALL SELECT 6
            ) AS numbers
            LEFT JOIN hoa_don hd ON DATE(hd.created_at) = DATE_ADD( :startOfWeek , INTERVAL num DAY)
                                  AND hd.trang_thai = 'HOAN_THANH'
            GROUP BY DATE_ADD( :startOfWeek , INTERVAL num DAY)
            ORDER BY DATE_ADD( :startOfWeek , INTERVAL num DAY);
                        """, nativeQuery = true)
    List<Long> countInvoice7DayThisWeek(@Param("startOfWeek") Date startOfWeek);

    @Query(value = """             
            SELECT COALESCE(COUNT(hd.trang_thai), 0) AS SoDonHang
                        FROM (
                            SELECT 0 AS num UNION ALL
                            SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL
                            SELECT 5 UNION ALL SELECT 6
                        ) AS numbers
                        LEFT JOIN hoa_don hd ON DATE(hd.created_at) = DATE_ADD( :startOfLastWeek , INTERVAL num DAY)
                                              AND hd.trang_thai = 'HOAN_THANH'
                        GROUP BY DATE_ADD( :startOfLastWeek, INTERVAL num DAY)
                        ORDER BY DATE_ADD( :startOfLastWeek , INTERVAL num DAY);
                             """, nativeQuery = true)
    List<Long> countInvoice7DayLastWeek(@Param("startOfLastWeek") Date startOfLastWeek);
}
