package com.datn.backend.repository;

import com.datn.backend.model.hoa_don.ThanhToan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * @author HungDV
 */
public interface ThanhToanRepository extends JpaRepository<ThanhToan,Integer> {

}
