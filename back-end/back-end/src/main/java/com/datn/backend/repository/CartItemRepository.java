package com.datn.backend.repository;

import com.datn.backend.model.danh_sach.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Integer> {

    @Query(value =
           """
           SELECT *
           FROM gio_hang_chi_tiet ct
           WHERE ct.gio_hang_id = (
               SELECT gh.id
               FROM gio_hang gh
               WHERE gh.khach_hang_id = :customerId
           );
           """, nativeQuery = true)
    List<CartItem> getAllCartItemsOf1Customer(@Param("customerId") int customerId);

    @Query(value =
            """
            SELECT ct.id, ct.so_luong, ct.gio_hang_id, ct.spct_id
            FROM gio_hang_chi_tiet ct
            JOIN gio_hang gh ON gh.id = ct.gio_hang_id
            WHERE gh.khach_hang_id = :cusId
            AND ct.spct_id = :proDetailsId
            """, nativeQuery = true)
    CartItem getCartItemByCustomerAndProductDetails(@Param("cusId") int cusId,
                                                    @Param("proDetailsId") int proDetailsId);

    @Modifying
    @Query(value = """
                   DELETE FROM gio_hang_chi_tiet t1
                   WHERE t1.gio_hang_id = (
                       SELECT gh.id
                       FROM gio_hang gh
                       WHERE gh.khach_hang_id = :custId
                   )
                    """, nativeQuery = true)
    void deleteAllItemsOf1Cart(@Param("custId") int custId);
}
