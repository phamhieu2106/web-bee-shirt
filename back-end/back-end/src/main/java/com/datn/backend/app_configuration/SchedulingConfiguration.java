package com.datn.backend.app_configuration;

import com.datn.backend.repository.DotGiamGiaSanPhamRepository;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@Configuration
@EnableScheduling
public class SchedulingConfiguration {

    private final DotGiamGiaSanPhamRepository repository;

    public SchedulingConfiguration(DotGiamGiaSanPhamRepository repository) {
        super();
        this.repository = repository;
    }

    //    Cap nhat trang thai dot giam gia moi 1 phut
    @Scheduled(fixedRate = 60000) // 60000 milliseconds = 1 minutes
    private void executeDGGStatus() {
        repository.updateDotGiamGiaSanPham();
    }
}
