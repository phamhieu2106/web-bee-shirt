package com.datn.backend.service.impl;

import com.datn.backend.dto.request.KhachHangRequest;
import com.datn.backend.dto.response.KhachHangResponse;
import com.datn.backend.dto.response.NhanVienResponse;
import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.enumeration.Role;
import com.datn.backend.model.Account;
import com.datn.backend.model.khach_hang.DiaChi;
import com.datn.backend.model.khach_hang.KhachHang;
import com.datn.backend.model.khach_hang.KhachHangImage;
import com.datn.backend.repository.AccountRepository;
import com.datn.backend.repository.DiaChiRepository;
import com.datn.backend.repository.KhachHangRepository;
import com.datn.backend.service.DiaChiService;
import com.datn.backend.service.KhachHangService;
import com.datn.backend.utility.CloudinaryService;
import com.datn.backend.utility.UtilityFunction;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class KhachHangServiceImpl implements KhachHangService {
    private final PasswordEncoder passwordEncoder;
    private final KhachHangRepository khachHangRepository;
    private final DiaChiRepository diaChiRepository;
    private final AccountRepository ar;
    private final CloudinaryService cloudinaryService;


    @Transactional
    public KhachHang add(KhachHangRequest kh, MultipartFile multipartFile) throws IOException {
        BufferedImage bi = ImageIO.read(multipartFile.getInputStream());
        if (bi == null) {
            throw new RuntimeException("Ảnh không hợp lệ");
        }
        Map result = cloudinaryService.upload(multipartFile);
        KhachHangImage image = new KhachHangImage((String)
                result.get("original_filename"),
                (String) result.get("url"),
                (String) result.get("public_id"));
        Account account = new Account();
        account.setTenDangNhap(kh.getSdt());
        account.setMatKhau(passwordEncoder.encode(kh.getMatKhau()));
        account.setTrangThai(true);
        account.setRole(Role.ROLE_CUSTOMER.name());

        // khach hang
        KhachHang khachHang = new KhachHang();
        khachHang.setHoTen(kh.getHoTen());
        khachHang.setNgaySinh(kh.getNgaySinh());
        khachHang.setSdt(kh.getSdt());
        khachHang.setGioiTinh(kh.isGioiTinh());
        khachHang.setEmail(kh.getEmail());
        khachHang.setTrangThai(1);
        khachHang.setImage(image);
        khachHang.setAccount(account);
        khachHangRepository.save(khachHang);
        DiaChi diaChi = new DiaChi();
        diaChi.setKhachHang(khachHang);
        diaChi.setTinh(kh.getTinh());
        diaChi.setHuyen(kh.getHuyen());
        diaChi.setXa(kh.getXa());
        diaChi.setDuong(kh.getDuong());
        diaChi.setMacDinh(true);
        diaChiRepository.save(diaChi);

        return null;
    }

    @Override
    public PagedResponse<KhachHangResponse> getAll(int pageNumber, int pageSize, String search) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
        Page<KhachHangResponse> page = khachHangRepository.getAll(pageable, search);

        PagedResponse<KhachHangResponse> pagedResponse = new PagedResponse<>();
        pagedResponse.setPageNumber(pageNumber);
        pagedResponse.setPageSize(pageSize);
        pagedResponse.setTotalPages(page.getTotalPages());
        pagedResponse.setTotalElements(page.getTotalElements());
        pagedResponse.setPageNumberArr(UtilityFunction.getPageNumberArr(page.getTotalPages()));
        pagedResponse.setData(page.getContent());
        pagedResponse.setSearch(search);
        return pagedResponse;
    }

    @Override
    public KhachHang update(KhachHangRequest kh, MultipartFile multipartFile) throws IOException {
        BufferedImage bi = null;
        if (multipartFile != null) {
            bi = ImageIO.read(multipartFile.getInputStream());
        }
        Map result = null;
        if (bi != null) {
            result = cloudinaryService.upload(multipartFile);
        }
        KhachHang khInDB = khachHangRepository.findById(kh.getId()).get();
        KhachHangImage image = khInDB.getImage();
        if (bi != null) {
            // xóa ảnh cũ
            cloudinaryService.delete(image.getImageId());

            image.setImageName((String) result.get("original_filename"));
            image.setImageUrl((String) result.get("url"));
            image.setImageId((String) result.get("public_id"));
        }
        Account account = ar.findByTenDangNhap(kh.getTenDangNhap()).get();
        account.setTenDangNhap(kh.getSdt());
        khInDB.setImage(image);
        khInDB.setHoTen(kh.getHoTen());
        khInDB.setNgaySinh(kh.getNgaySinh());
        khInDB.setSdt(kh.getSdt());
        khInDB.setGioiTinh(kh.isGioiTinh());
        khInDB.setTrangThai(kh.getTrangThai());
        khInDB.setEmail(kh.getEmail());
        khInDB.setAccount(account);
        return khachHangRepository.save(khInDB);
    }

    @Override
    public KhachHang delete(Integer id) {
        Optional<KhachHang> kh = khachHangRepository.findById(id);

        khachHangRepository.deleteById(id);
        return null;
    }

    @Override
    public KhachHangResponse getById(int id) {
        return khachHangRepository.getKHById(id);
    }

    @Override
    public PagedResponse<KhachHangResponse> filter(int pageNumber, int pageSize, List<Integer> gioiTinhFilter, List<Integer> trangThaiFilter) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);

        Page<KhachHangResponse> page = khachHangRepository.filter(pageable, gioiTinhFilter, trangThaiFilter);

        PagedResponse<KhachHangResponse> pagedResponse = new PagedResponse<>();

        pagedResponse.setPageNumber(pageNumber);
        pagedResponse.setPageSize(pageSize);
        pagedResponse.setTotalPages(page.getTotalPages());
        pagedResponse.setTotalElements(page.getTotalElements());
        pagedResponse.setPageNumberArr(UtilityFunction.getPageNumberArr(page.getTotalPages()));
        pagedResponse.setData(page.getContent());
        pagedResponse.setSearch("");

        return pagedResponse;
    }


}
