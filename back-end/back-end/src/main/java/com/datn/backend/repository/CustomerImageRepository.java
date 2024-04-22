package com.datn.backend.repository;

import com.datn.backend.model.khach_hang.CustomerImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerImageRepository extends JpaRepository<CustomerImage, Integer> {

    CustomerImage getByImageId(String imgId);
}
