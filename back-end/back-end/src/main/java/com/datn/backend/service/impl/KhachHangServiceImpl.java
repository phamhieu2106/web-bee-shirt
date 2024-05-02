package com.datn.backend.service.impl;

import com.datn.backend.dto.request.KhachHangRequest;
import com.datn.backend.dto.request.UpdateCustInfoReq;
import com.datn.backend.dto.response.KhachHangResponse;
import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.enumeration.Role;
import com.datn.backend.exception.custom_exception.ResourceExistsException;
import com.datn.backend.exception.custom_exception.ResourceNotFoundException;
import com.datn.backend.model.Account;
import com.datn.backend.model.danh_sach.Cart;
import com.datn.backend.model.danh_sach.FavouriteList;
import com.datn.backend.model.khach_hang.DiaChi;
import com.datn.backend.model.khach_hang.KhachHang;
import com.datn.backend.model.khach_hang.CustomerImage;
import com.datn.backend.model.nhan_vien.NhanVien;
import com.datn.backend.repository.AccountRepository;
import com.datn.backend.repository.CartRepository;
import com.datn.backend.repository.AddressRepository;
import com.datn.backend.repository.FavouriteListRepository;
import com.datn.backend.repository.CustomerImageRepository;
import com.datn.backend.repository.KhachHangRepository;
import com.datn.backend.service.EmailService;
import com.datn.backend.service.KhachHangService;
import com.datn.backend.utility.CloudinaryService;
import com.datn.backend.utility.UtilityFunction;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.util.Constants;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.*;

@Service
@RequiredArgsConstructor
public class KhachHangServiceImpl implements KhachHangService {

    private final PasswordEncoder passwordEncoder;
    private final KhachHangRepository khachHangRepo;
    private final AddressRepository diaChiRepo;
    private final AccountRepository accountRepo;
    private final CartRepository cartRepo;
    private final FavouriteListRepository favouriteListRepo;
    private final CloudinaryService cloudinaryService;
    private final CustomerImageRepository khachHangImageRepo;
    private final EmailService emailService;

    @Transactional
    public KhachHang add(KhachHangRequest kh, MultipartFile multipartFile) throws IOException {
        if (khachHangRepo.existsByEmail(kh.getEmail().trim().toLowerCase())) {
            throw new ResourceExistsException("Email: " + kh.getEmail() + " đã tồn tại.");
        }

        // check exist sdt
        if (khachHangRepo.existsBySdt(kh.getSdt().trim())) {
            throw new ResourceExistsException("Số điện thoại: " + kh.getSdt() + " đã tồn tại.");
        }
        BufferedImage bi = ImageIO.read(multipartFile.getInputStream());
        if (bi == null) {
            throw new RuntimeException("Ảnh không hợp lệ");
        }
        Map result = cloudinaryService.upload(multipartFile);
        CustomerImage image = new CustomerImage((String)
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
        KhachHang savedCus = khachHangRepo.save(khachHang);

        DiaChi diaChi = new DiaChi();
        diaChi.setKhachHang(khachHang);
        diaChi.setTinh(kh.getTinh());
        diaChi.setHuyen(kh.getHuyen());
        diaChi.setXa(kh.getXa());
        diaChi.setDuong(kh.getDuong());
        diaChi.setMacDinh(true);
        diaChiRepo.save(diaChi);

        // Thêm giỏ hàng và danh sách yêu thích cho khách hàng vừa tạo
        cartRepo.save(new Cart(savedCus));
        favouriteListRepo.save(new FavouriteList(savedCus));

        emailService.sendPasswordCustomer(khachHang, kh.getMatKhau());

        return savedCus;
    }

    @Override
    @Transactional
    public KhachHang add(KhachHangRequest kh) {
        final String DEFAULT_PASSWORD = "123456";
        // check exist sdt
        if (khachHangRepo.existsBySdt(kh.getSdt().trim())) {
            throw new RuntimeException("Số điện thoại: " + kh.getSdt() + " đã tồn tại.");
        }

        // check email
        String email = kh.getEmail().trim();
        if (!UtilityFunction.isNullOrEmpty(email)) {
            if (khachHangRepo.existsByEmail(email)) {
                throw new RuntimeException("Email: " + email + " đã tồn tại.");
            }

            if (!email.matches("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$")) {
                throw new RuntimeException("Email: " + email + " không hợp lệ");
            }
        }

        // account
        Account account = new Account();
        account.setTenDangNhap(kh.getSdt().trim());
        account.setTrangThai(true);
        account.setRole(Role.ROLE_CUSTOMER.name());

        CustomerImage custImg = CustomerImage.builder()
                .imageId(UUID.randomUUID().toString())
                .imageName("default-user-img")
                .imageUrl("https://res.cloudinary.com/dpsryzyev/image/upload/v1712851456/default-user-img_ri7fap.webp")
                .build();
        khachHangImageRepo.save(custImg);
        // khach hang
        KhachHang khachHang = new KhachHang();
        khachHang.setHoTen(kh.getHoTen().trim());
        khachHang.setNgaySinh(kh.getNgaySinh());
        khachHang.setSdt(kh.getSdt());
        khachHang.setGioiTinh(kh.isGioiTinh());
        khachHang.setTrangThai(1);
        khachHang.setImage(custImg);
        khachHang.setAccount(account);
        khachHang.setTrangThai(1);
        khachHang = khachHangRepo.save(khachHang);
        if (UtilityFunction.isNullOrEmpty(email)) {
            // neu khong co email gui pass default sdt/DEFAULT_PASSWORD
            account.setMatKhau(passwordEncoder.encode(DEFAULT_PASSWORD));
        } else {
            // neu co email tao mat khau moi va gui mail sdt/password
            account.setMatKhau(passwordEncoder.encode(kh.getMatKhau()));
            khachHang.setEmail(email);
        }
        // dia chi
        if (!UtilityFunction.isNullOrEmpty(kh.getTinh()) &&
                !UtilityFunction.isNullOrEmpty(kh.getHuyen()) &&
                !UtilityFunction.isNullOrEmpty(kh.getXa()) &&
                !UtilityFunction.isNullOrEmpty(kh.getDuong())
        ) {
            DiaChi diaChi = new DiaChi();
            diaChi.setKhachHang(khachHang);
            diaChi.setTinh(kh.getTinh());
            diaChi.setHuyen(kh.getHuyen());
            diaChi.setXa(kh.getXa());
            diaChi.setDuong(kh.getDuong().trim());
            diaChi.setMacDinh(true);
            diaChi.setHoTen(kh.getHoTen());
            diaChi.setSdt(kh.getSdt());
            diaChiRepo.save(diaChi);
            khachHang.setDiaChis(Arrays.asList(diaChi));
        }
        if (!UtilityFunction.isNullOrEmpty(email)) {
            emailService.sendPasswordCustomer(khachHang, kh.getMatKhau());
        }
        return khachHang;
    }

    @Override
    public PagedResponse<KhachHangResponse> getAll(int pageNumber, int pageSize, String search) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
        Page<KhachHangResponse> page = khachHangRepo.getAll(pageable, search);

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
    public PagedResponse<KhachHang> getAllActive(int pageNumber, int pageSize, String search) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
        Page<KhachHang> page = khachHangRepo.getAllActive(pageable, search);

        return UtilityFunction.mapToPagedResponse(page, KhachHang.class, search);
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
        KhachHang khInDB = khachHangRepo.findById(kh.getId()).get();
        CustomerImage image = khInDB.getImage();
        if (bi != null) {
            // xóa ảnh cũ
            cloudinaryService.delete(image.getImageId());

            image.setImageName((String) result.get("original_filename"));
            image.setImageUrl((String) result.get("url"));
            image.setImageId((String) result.get("public_id"));
        }
        Account account = accountRepo.findByTenDangNhap(kh.getTenDangNhap()).get();
        account.setTenDangNhap(kh.getSdt());
        khInDB.setImage(image);
        khInDB.setHoTen(kh.getHoTen());
        khInDB.setNgaySinh(kh.getNgaySinh());
        khInDB.setSdt(kh.getSdt());
        khInDB.setGioiTinh(kh.isGioiTinh());
        khInDB.setTrangThai(kh.getTrangThai());
        khInDB.setEmail(kh.getEmail());
        khInDB.setAccount(account);
        return khachHangRepo.save(khInDB);
    }

    @Override
    public KhachHang delete(Integer id) {
        Optional<KhachHang> optionalKhachHang = khachHangRepo.findById(id);

        if (optionalKhachHang.isPresent()) {
            KhachHang khachHang = optionalKhachHang.map(kh -> {
                Account acc = optionalKhachHang.get().getAccount();
                acc.setTrangThai(!acc.isTrangThai());
                kh.setAccount(acc);
                if (kh.getTrangThai() == 0) {
                    kh.setTrangThai(1);
                } else kh.setTrangThai(0);
                khachHangRepo.save(kh);
                return kh;
            }).get();
            return khachHang;
        } else {
            throw new ResourceNotFoundException("Không tìm thấy nhân viên có id " + id);
        }
    }

    @Override
    public KhachHangResponse getById(int id) {
        return khachHangRepo.getKHById(id);
    }

    @Override
    public PagedResponse<KhachHangResponse> filter(int pageNumber, int pageSize, List<Integer> gioiTinhFilter, List<Integer> trangThaiFilter) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);

        Page<KhachHangResponse> page = khachHangRepo.filter(pageable, gioiTinhFilter, trangThaiFilter);

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


    @Override
    public KhachHang updateAvatar(MultipartFile multipartFile, int custId) throws IOException {
        // lưu ảnh mới lên cloudinary
        Map result = cloudinaryService.upload(multipartFile);

        // xóa ảnh cũ
        KhachHang custById = khachHangRepo.findById(custId).get();
        CustomerImage image = custById.getImage();
        cloudinaryService.delete(image.getImageId());

        // cập nhật thuộc tính cho ảnh trong DB
        image.setImageName((String) result.get("original_filename"));
        image.setImageUrl((String) result.get("url"));
        image.setImageId((String) result.get("public_id"));

        return khachHangRepo.save(custById); // image tự động được lưu do cascade
    }

    @Override
    public KhachHang updateInfo(UpdateCustInfoReq req) {
        KhachHang cust = khachHangRepo.findById(req.getCustId())
                .orElseThrow(() -> new ResourceNotFoundException("Khách hàng ID: " + req.getCustId() + " không tồn tai!"));
        cust.setHoTen(req.getFullName());
        cust.setGioiTinh(req.isGender());
        cust.setNgaySinh(req.getBirthday());
        cust.setSdt(req.getPhone());
        return khachHangRepo.save(cust);
    }


}
