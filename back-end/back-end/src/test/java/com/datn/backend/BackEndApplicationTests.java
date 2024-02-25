package com.datn.backend;

import com.datn.backend.enumeration.Role;
import com.datn.backend.model.Account;
import com.datn.backend.model.NhanVien;
import com.datn.backend.model.san_pham.HinhAnh;
import com.datn.backend.repository.HinhAnhRepository;
import com.datn.backend.repository.NhanVienRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
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
    private NhanVienRepository nhanVienRepo;

    @Autowired
    private HinhAnhRepository hinhAnhRepo;

    @Test
    void contextLoads() {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        // account
        Account account = new Account();
        account.setTenDangNhap("admin0203");
        account.setMatKhau(passwordEncoder.encode("12345678"));
        account.setTrangThai(true);
        account.setRole(Role.ROLE_ADMIN.name());

        // nhan vien
        NhanVien nhanVien = new NhanVien();
        nhanVien.setHoTen("Nguyễn Lăng Cọc");
        nhanVien.setNgaySinh(LocalDate.of(2002, 2, 2));
        nhanVien.setSdt("0123456789");
        nhanVien.setGioiTinh(true);
        nhanVien.setEmail("langcoc@gmail.com");
        nhanVien.setDiaChi("Người Miền Núi");
        nhanVien.setAccount(account);

        NhanVien nv = nhanVienRepo.save(nhanVien);
        System.err.println("saved employee id: " + nv.getId());
    }

    @Test
    void getHinhAnh() {
//        List<HinhAnh> hinhAnhs = hinhAnhRepo.getByMauSac("Xanh dương (Blue)");
//        System.err.println(hinhAnhs.size());
    }
}
