package com.datn.backend.service.impl;

import com.datn.backend.dto.request.AddNhanVienRequest;
import com.datn.backend.dto.response.NhanVienResponse;
import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.enumeration.Role;
import com.datn.backend.exception.custom_exception.ResourceNotFoundException;
import com.datn.backend.exception.custom_exception.ResourceExistsException;
import com.datn.backend.model.Account;
import com.datn.backend.model.NhanVien;
import com.datn.backend.model.khach_hang.KhachHang;
import com.datn.backend.model.khach_hang.KhachHangImage;
import com.datn.backend.model.san_pham.ChatLieu;
import com.datn.backend.repository.AccountRepository;
import com.datn.backend.repository.NhanVienRepository;
import com.datn.backend.service.NhanVienService;
import com.datn.backend.utility.CloudinaryService;
import com.datn.backend.utility.UtilityFunction;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NhanVienServiceImpl implements NhanVienService {

    private final NhanVienRepository nhanVienRepo;
    private final PasswordEncoder passwordEncoder;
    private final AccountRepository accountRepo;
    private final CloudinaryService cloudinaryService;

    @Override
    public NhanVien add(AddNhanVienRequest request, MultipartFile multipartFile) throws IOException {
        // check exist
        if (nhanVienRepo.existsByEmail(request.getEmail().trim().toLowerCase())) {
            throw new ResourceExistsException("Email: " + request.getEmail() + " đã tồn tại.");
        }

        // khach_hang_image
        BufferedImage bi = ImageIO.read(multipartFile.getInputStream());
        if (bi == null) {
            throw new RuntimeException("Ảnh không hợp lệ");
        }
        Map result = cloudinaryService.upload(multipartFile);
        KhachHangImage image = new KhachHangImage((String)
                result.get("original_filename"),
                (String) result.get("url"),
                (String) result.get("public_id"));

        // account
        Account account = new Account();
        account.setTenDangNhap(request.getEmail().trim());
        account.setMatKhau(passwordEncoder.encode(request.getMatKhau()));
        account.setTrangThai(true);
        account.setRole(Role.ROLE_ADMIN.name());

        // nhan vien
        NhanVien nhanVien = new NhanVien();
        nhanVien.setImage(image);
        nhanVien.setCccd(request.getCccd().trim());
        nhanVien.setHoTen(request.getHoTen().trim());
        nhanVien.setNgaySinh(request.getNgaySinh());
        nhanVien.setSdt(request.getSdt().trim());
        nhanVien.setGioiTinh(request.isGioiTinh());
        nhanVien.setEmail(request.getEmail().trim());
        nhanVien.setDiaChi(request.getDiaChi().trim());
        nhanVien.setAccount(account);

        return nhanVienRepo.save(nhanVien);
    }

    @Override
    public PagedResponse<NhanVienResponse> getAll(int pageNumber, int pageSize, String search) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
        Page<NhanVienResponse> page = nhanVienRepo.getAll(pageable, search);

        PagedResponse<NhanVienResponse> pagedResponse = new PagedResponse<>();
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
    public NhanVienResponse getOneById(Integer id) {

        if (nhanVienRepo.existsById(id) == false) {
            throw new ResourceNotFoundException("Không tìm thấy nhân viên có id " + id);
        }

        return nhanVienRepo.getOneById(id);
    }

    @Override
    public NhanVien delete(Integer id) {

        Optional<NhanVien> optionalNhanVien = nhanVienRepo.findById(id);

        if (optionalNhanVien.isPresent()) {
            NhanVien nhanVien = optionalNhanVien.map(nv -> {
                Account acc = optionalNhanVien.get().getAccount();
                acc.setTrangThai(!acc.isTrangThai());
                nv.setAccount(acc);
                nhanVienRepo.save(nv);
                return nv;
            }).get();
            return nhanVien;
        } else {
            throw new ResourceNotFoundException("Không tìm thấy nhân viên có id " + id);
        }
    }

    @Override
    public PagedResponse<NhanVienResponse> filter(int pageNumber, int pageSize, List<Integer> gioiTinhFilter, List<Integer> trangThaiFilter) {

        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);

        Page<NhanVienResponse> page = nhanVienRepo.filter(pageable, gioiTinhFilter, trangThaiFilter);

        PagedResponse<NhanVienResponse> pagedResponse = new PagedResponse<>();

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
    public NhanVien update(AddNhanVienRequest request, Integer id, MultipartFile multipartFile) {

        // nếu như nv tồn tại => nếu tên đăng nhập đã tồn tại => tên đăng nhập như cũ => update
        //                                                    => tên còn lại => throw đã tồn tại
        //                    => tên đăng nhập mới => update
        // không tồn tại thì throw không tìm thấy
        Optional<NhanVien> optionalNhanVien = nhanVienRepo.findById(id);

        if (optionalNhanVien.isPresent()) {

            if (nhanVienRepo.existsByEmail(request.getEmail().trim().toLowerCase())) {
                if (optionalNhanVien.get().getEmail().equalsIgnoreCase(request.getEmail().trim())) {
                    return updateForm(optionalNhanVien, request, multipartFile);
                } else {
                    throw new ResourceExistsException("Email: " + request.getEmail() + " đã tồn tại.");
                }
            } else {
                return updateForm(optionalNhanVien, request, multipartFile);
            }

        } else {
            throw new ResourceNotFoundException("Không tìm thấy nhân viên có id " + id);
        }
    }

    public NhanVien updateForm(Optional<NhanVien> optionalNhanVien, AddNhanVienRequest request, MultipartFile multipartFile) {
        NhanVien nhanVien = optionalNhanVien.map(nv -> {
            try {
                BufferedImage bi = null;
                if (multipartFile != null) {
                    bi = ImageIO.read(multipartFile.getInputStream());
                }
                Map result = null;
                if (bi != null) {
                    result = cloudinaryService.upload(multipartFile);
                }
                KhachHangImage image = nv.getImage();
                if (bi != null) {
                    if(image.getImageId() != null) {
                        // xóa ảnh cũ
                        cloudinaryService.delete(image.getImageId());
                    }

                    image.setImageName((String) result.get("original_filename"));
                    image.setImageUrl((String) result.get("url"));
                    image.setImageId((String) result.get("public_id"));
                }

                nv.setImage(image);
                nv.setCccd(request.getCccd().trim());
                nv.setHoTen(request.getHoTen().trim());
                nv.setNgaySinh(request.getNgaySinh());
                nv.setSdt(request.getSdt().trim());
                nv.setGioiTinh(request.isGioiTinh());
                nv.setEmail(request.getEmail().trim());
                nv.setDiaChi(request.getDiaChi().trim());

                Account acc = optionalNhanVien.get().getAccount();
//            acc.setTenDangNhap(request.getTenDangNhap());
                acc.setTenDangNhap(request.getEmail().trim());
                acc.setMatKhau(passwordEncoder.encode(request.getMatKhau()));
                nv.setAccount(acc);
                nhanVienRepo.save(nv);
                return nv;

            } catch (IOException e) {
                e.printStackTrace();
                return null;
            }

        }).get();
        return nhanVien;
    }
}
