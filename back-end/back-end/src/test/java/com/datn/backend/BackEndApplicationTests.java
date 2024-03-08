package com.datn.backend;

import com.datn.backend.enumeration.Role;
import com.datn.backend.model.Account;
import com.datn.backend.model.NhanVien;
import com.datn.backend.model.san_pham.HinhAnh;
import com.datn.backend.model.san_pham.SanPham;
import com.datn.backend.repository.HinhAnhRepository;
import com.datn.backend.repository.NhanVienRepository;
import com.datn.backend.repository.SanPhamRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.annotation.Rollback;

import java.time.LocalDate;
import java.util.List;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Rollback(value = false)
class BackEndApplicationTests {

    @Autowired
    private SanPhamRepository sanPhamRepo;

    @Test
    void getSanPham() {
        Pageable pageable = PageRequest.of(0, 5);
        Page<SanPham> sanPhamPage = sanPhamRepo.getByPageClient(pageable);
        for (SanPham s: sanPhamPage.getContent()) {
            System.err.println(s.getTen() + " - " + s.getId());
            System.out.println("spct length: " + s.getSanPhamChiTiets().size());
        }
    }
}
