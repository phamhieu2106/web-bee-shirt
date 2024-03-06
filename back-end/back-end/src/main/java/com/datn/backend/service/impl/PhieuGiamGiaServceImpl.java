package com.datn.backend.service.impl;

import com.datn.backend.dto.request.PhieuGiamGiaRequest;
import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.dto.response.PhieuGiamGiaResponse;
import com.datn.backend.exception.custom_exception.ResourceExistsException;
import com.datn.backend.model.phieu_giam_gia.PhieuGiamGia;
import com.datn.backend.repository.KhachHangRepository;
import com.datn.backend.repository.PhieuGiamGiaRepository;
import com.datn.backend.service.PhieuGiamGiaServce;
import com.datn.backend.utility.UtilityFunction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PhieuGiamGiaServceImpl implements PhieuGiamGiaServce {


    private PhieuGiamGiaRepository repository;

    private KhachHangRepository khachHangRepository;

    @Autowired
    public PhieuGiamGiaServceImpl(PhieuGiamGiaRepository repository) {
        super();
        this.repository = repository;
    }


    @Override
    public PhieuGiamGiaResponse getOne(Integer id) {
        return repository.getOneById(id);
    }

    @Override
    public PhieuGiamGia add(PhieuGiamGiaRequest phieuGiamGia) {

        if (repository.existsByMaPhieuGiamGia(phieuGiamGia.getMaPhieuGiamGia().trim().toLowerCase())) {
            throw new ResourceExistsException("Mã Phiếu: " + phieuGiamGia.getMaPhieuGiamGia() + " đã tồn tại.");
        }

        LocalDateTime currentTime = LocalDateTime.now();

        if (phieuGiamGia.getThoiGianKetThuc() != null && currentTime.isAfter(phieuGiamGia.getThoiGianKetThuc())) {
            phieuGiamGia.setTrangThai("Đã kết thúc");
        } else if (phieuGiamGia.getThoiGianBatDau() != null && currentTime.isBefore(phieuGiamGia.getThoiGianBatDau())) {
            phieuGiamGia.setTrangThai("Sắp diễn ra");
        } else if (phieuGiamGia.getThoiGianBatDau() != null && phieuGiamGia.getThoiGianKetThuc() != null &&
                currentTime.isAfter(phieuGiamGia.getThoiGianBatDau()) && currentTime.isBefore(phieuGiamGia.getThoiGianKetThuc())) {
            phieuGiamGia.setTrangThai("Đang diễn ra");
        } else {
            phieuGiamGia.setTrangThai("Trạng thái không xác định");
        }

        PhieuGiamGia pgg = phieuGiamGia.giamGia(new PhieuGiamGia());
        return repository.save(pgg);
    }

    @Override
    public PhieuGiamGia update(Integer id, PhieuGiamGiaRequest object) {

        Optional<PhieuGiamGia> optional = repository.findById(id);
        if (optional.isPresent()) {
            PhieuGiamGia existingPhieuGiamGia = optional.get();

            // Kiểm tra xem mã phiếu đã tồn tại hay chưa (trùng mã)
            if (!existingPhieuGiamGia.getMaPhieuGiamGia().equalsIgnoreCase(object.getMaPhieuGiamGia()) &&
                    repository.existsByMaPhieuGiamGia(object.getMaPhieuGiamGia().trim().toLowerCase())) {
                throw new ResourceExistsException("Mã Phiếu: " + object.getMaPhieuGiamGia() + " đã tồn tại.");
            }

            LocalDateTime currentTime = LocalDateTime.now();

            // Kiểm tra trạng thái của phiếu dựa trên thời gian
            if (object.getThoiGianKetThuc() != null && currentTime.isAfter(object.getThoiGianKetThuc())) {
                object.setTrangThai("Đã kết thúc");
            } else if (object.getThoiGianBatDau() != null && currentTime.isBefore(object.getThoiGianBatDau())) {
                object.setTrangThai("Sắp diễn ra");
            } else if (object.getThoiGianBatDau() != null && object.getThoiGianKetThuc() != null &&
                    currentTime.isAfter(object.getThoiGianBatDau()) && currentTime.isBefore(object.getThoiGianKetThuc())) {
                object.setTrangThai("Đang diễn ra");
            } else {
                object.setTrangThai("Trạng thái không xác định");
            }

            // Cập nhật thông tin của phiếu và lưu vào cơ sở dữ liệu
            return repository.save(object.giamGia(existingPhieuGiamGia));
        } else {
            // Trả về null nếu không tìm thấy phiếu
            return null;
        }
    }

    @Override
    public PhieuGiamGia remove(Integer id) {

        return null;
    }

    @Override
    public PhieuGiamGia changeStatus(Integer id) {

        PhieuGiamGia phieuGiamGia = repository.findById(id).get();
        LocalDateTime currentTime = LocalDateTime.now();

        if (phieuGiamGia.getThoiGianKetThuc() != null && currentTime.isAfter(phieuGiamGia.getThoiGianKetThuc())) {
            phieuGiamGia.setTrangThai("Đã kết thúc");
        } else if (phieuGiamGia.getThoiGianBatDau() != null && currentTime.isBefore(phieuGiamGia.getThoiGianBatDau())) {
            phieuGiamGia.setTrangThai("Sắp diễn ra");
        } else if (phieuGiamGia.getThoiGianBatDau() != null && phieuGiamGia.getThoiGianKetThuc() != null &&
                currentTime.isAfter(phieuGiamGia.getThoiGianBatDau()) && currentTime.isBefore(phieuGiamGia.getThoiGianKetThuc())) {
            phieuGiamGia.setTrangThai("Đang diễn ra");
        } else {
            phieuGiamGia.setTrangThai("Đã hủy");
        }

        return repository.save(phieuGiamGia);
    }

    @Override
    public List<PhieuGiamGia> getAll() {
        return repository.findAll();
    }


    @Override
    public PagedResponse<PhieuGiamGia> getPagination(int pageNumber, int pageSize, String search,List<Integer> kieu,List<Integer> loai,List<String> trangThai) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
        Page<PhieuGiamGia> phieuGiamGiaPage = repository.getPagination(pageable, search,kieu,loai,trangThai);
        PagedResponse<PhieuGiamGia> paged = new PagedResponse<>();
        paged.setPageNumber(pageNumber);
        paged.setPageSize(pageSize);
        paged.setTotalElements((int) phieuGiamGiaPage.getTotalElements());
        paged.setTotalPages(phieuGiamGiaPage.getTotalPages());
        paged.setPageNumberArr(UtilityFunction.getPageNumberArr(phieuGiamGiaPage.getTotalPages()));
        paged.setData(phieuGiamGiaPage.getContent());
        paged.setSearch(search);

        return paged;
    }

    @Override
    public PagedResponse<PhieuGiamGia> getFilter(int pageNumber, int pageSize, String search,List<Integer> kieu,List<Integer> loai,List<String> trangThai,String thoiGianBatDau,String thoiGianKetThuc) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
        Page<PhieuGiamGia> phieuGiamGiaPage = repository.getFilter(pageable, search,kieu,loai,trangThai,thoiGianBatDau,thoiGianKetThuc);
        PagedResponse<PhieuGiamGia> paged = new PagedResponse<>();
        paged.setPageNumber(pageNumber);
        paged.setPageSize(pageSize);
        paged.setTotalElements((int) phieuGiamGiaPage.getTotalElements());
        paged.setTotalPages(phieuGiamGiaPage.getTotalPages());
        paged.setPageNumberArr(UtilityFunction.getPageNumberArr(phieuGiamGiaPage.getTotalPages()));
        paged.setData(phieuGiamGiaPage.getContent());
        paged.setSearch(search);

        return paged;
    }



}
