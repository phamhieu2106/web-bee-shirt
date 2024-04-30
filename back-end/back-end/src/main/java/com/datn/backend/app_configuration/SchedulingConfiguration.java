package com.datn.backend.app_configuration;

import com.datn.backend.repository.DotGiamGiaSanPhamRepository;
import com.datn.backend.repository.PhieuGiamGiaRepository;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import java.time.LocalDateTime;

@Configuration
@EnableScheduling
public class SchedulingConfiguration {

    private final DotGiamGiaSanPhamRepository repository;

    private final PhieuGiamGiaRepository phieuGiamGiaRepository;

    public SchedulingConfiguration(DotGiamGiaSanPhamRepository repository, PhieuGiamGiaRepository phieuGiamGiaRepository) {
        super();
        this.repository = repository;
        this.phieuGiamGiaRepository = phieuGiamGiaRepository;
    }

    // Cap nhat trang thai dot giam gia moi 1 phut
    @Scheduled(cron = "0 * * * * *", zone = "Asia/Ho_Chi_Minh") // Chay vao giay thu 0 cua moi phut theo mui gio VietNam
    private void executeDGGStatus() {
        repository.updateDotGiamGiaSanPham(LocalDateTime.now());
        phieuGiamGiaRepository.updateDotGiamGiaSanPham(LocalDateTime.now());
    }
}
