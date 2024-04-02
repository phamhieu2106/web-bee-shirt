package com.datn.backend.repository;

import com.datn.backend.model.danh_sach.FavouriteList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FavouriteListRepository extends JpaRepository<FavouriteList, Integer> {
}
