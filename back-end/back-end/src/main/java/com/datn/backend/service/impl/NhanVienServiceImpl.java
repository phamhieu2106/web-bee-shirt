package com.datn.backend.service.impl;

import com.datn.backend.dto.request.AddNhanVienRequest;
import com.datn.backend.dto.response.NhanVienResponse;
import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.enumeration.Role;
import com.datn.backend.exception.custom_exception.EntityNotFoundException;
import com.datn.backend.exception.custom_exception.ResourceExistsException;
import com.datn.backend.model.Account;
import com.datn.backend.model.NhanVien;
import com.datn.backend.model.san_pham.ChatLieu;
import com.datn.backend.repository.AccountRepository;
import com.datn.backend.repository.NhanVienRepository;
import com.datn.backend.service.NhanVienService;
import com.datn.backend.utility.UtilityFunction;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NhanVienServiceImpl implements NhanVienService {

    private final NhanVienRepository nhanVienRepo;
    private final PasswordEncoder passwordEncoder;
    private final AccountRepository accountRepo;

    @Override
    public NhanVien add(AddNhanVienRequest request) {
        // check exist
        if (accountRepo.existsByTenDangNhap(request.getTenDangNhap().toLowerCase())) {
            throw new ResourceExistsException("Tên đăng nhập: " + request.getTenDangNhap() + " đã tồn tại.");
        }

        // account
        Account account = new Account();
        account.setTenDangNhap(request.getTenDangNhap());
        account.setMatKhau(passwordEncoder.encode(request.getMatKhau()));
        account.setTrangThai(true);
        account.setRole(Role.ROLE_ADMIN.name());

        // nhan vien
        NhanVien nhanVien = new NhanVien();
        nhanVien.setHoTen(request.getHoTen());
        nhanVien.setNgaySinh(request.getNgaySinh());
        nhanVien.setSdt(request.getSdt());
        nhanVien.setGioiTinh(request.isGioiTinh());
        nhanVien.setEmail(request.getEmail());
        nhanVien.setDiaChi(request.getDiaChi());
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
            throw new EntityNotFoundException("Không tìm thấy nhân viên có id " + id);
        }

        return nhanVienRepo.getOneById(id);
    }

    @Override
    public NhanVien delete(Integer id) {
        Optional<NhanVien> optionalNhanVien = nhanVienRepo.findById(id);

        if(optionalNhanVien.isPresent()){
            NhanVien nhanVien = optionalNhanVien.map(nv -> {
                Account acc = optionalNhanVien.get().getAccount();
                acc.setTrangThai(false);
                nv.setAccount(acc);
                nhanVienRepo.save(nv);
                return nv;
            }).get();
            return nhanVien;
        } else {
            throw new EntityNotFoundException("Không tìm thấy nhân viên có id " + id);
        }
    }

    @Override
    public NhanVien update(AddNhanVienRequest request, Integer id) {

            // nếu như nv tồn tại => nếu tên đăng nhập đã tồn tại => tên đăng nhập như cũ => update
            //                                                    => tên còn lại => throw đã tồn tại
            //                    => tên đăng nhập mới => update
            // không tồn tại thì throw không tìm thấy
        Optional<NhanVien> optionalNhanVien = nhanVienRepo.findById(id);

        if(optionalNhanVien.isPresent()){

            if (accountRepo.existsByTenDangNhap(request.getTenDangNhap().toLowerCase())) {
                if(optionalNhanVien.get().getAccount().getTenDangNhap().equalsIgnoreCase(request.getTenDangNhap())) {
                    return updateForm(optionalNhanVien, request);
                } else {
                    throw new ResourceExistsException("Tên đăng nhập: " + request.getTenDangNhap() + " đã tồn tại.");
                }
            } else {
                return updateForm(optionalNhanVien, request);
            }

        } else {
            throw new EntityNotFoundException("Không tìm thấy nhân viên có id " + id);
        }
    }

    public NhanVien updateForm (Optional<NhanVien> optionalNhanVien, AddNhanVienRequest request) {
        NhanVien nhanVien = optionalNhanVien.map(nv -> {
            nv.setHoTen(request.getHoTen());
            nv.setNgaySinh(request.getNgaySinh());
            nv.setSdt(request.getSdt());
            nv.setGioiTinh(request.isGioiTinh());
            nv.setEmail(request.getEmail());
            nv.setDiaChi(request.getDiaChi());

            Account acc = optionalNhanVien.get().getAccount();
            acc.setTenDangNhap(request.getTenDangNhap());
            acc.setMatKhau(passwordEncoder.encode(request.getMatKhau()));
            nv.setAccount(acc);
            nhanVienRepo.save(nv);
            return nv;
        }).get();
        return nhanVien;
    }
}
