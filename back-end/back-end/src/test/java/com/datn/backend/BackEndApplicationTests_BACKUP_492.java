package com.datn.backend;

import com.datn.backend.model.san_pham.SanPhamChiTiet;
import com.datn.backend.repository.SanPhamChiTietRepository;
import com.datn.backend.repository.custom_repository.CustomSpctRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.annotation.Rollback;

import java.util.List;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Rollback(value = false)
class BackEndApplicationTests {

    @Autowired
    private SanPhamChiTietRepository repository;

<<<<<<< HEAD
//    @Test
//    void getSanPham() {
//        List<SanPhamChiTiet> list = repository.getAll();
//
//        for (SanPhamChiTiet ct : list) {
//            System.err.println(ct.getId());
//        }
//    }
=======
    @Test
    void getSanPham() {
        SanPhamChiTiet spct = repository.findFirstBySanPhamIdAndMauSacId(3, 22);
        System.err.println(spct.getId());
    }
>>>>>>> origin/master
}
