package com.datn.backend.repository;

import com.datn.backend.model.danh_sach.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Integer> {

    Cart getByKhachHangId(int customerId);
}
