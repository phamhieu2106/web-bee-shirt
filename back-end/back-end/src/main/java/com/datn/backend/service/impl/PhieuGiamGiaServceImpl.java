package com.datn.backend.service.impl;

import com.datn.backend.dto.request.DiscountValidRequest;
import com.datn.backend.dto.request.PhieuGiamGiaRequest;
import com.datn.backend.dto.response.DiscountValidResponse;
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

import java.math.BigDecimal;
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
    public PagedResponse<PhieuGiamGia> getPagination(int pageNumber, int pageSize, String search, List<Integer> kieu, List<Integer> loai, List<String> trangThai) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
        Page<PhieuGiamGia> phieuGiamGiaPage = repository.getPagination(pageable, search, kieu, loai, trangThai);
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
    public PagedResponse<PhieuGiamGia> getFilter(int pageNumber, int pageSize, String search, List<Integer> kieu, List<Integer> loai, List<String> trangThai, String thoiGianBatDau, String thoiGianKetThuc) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
        Page<PhieuGiamGia> phieuGiamGiaPage = repository.getFilter(pageable, search, kieu, loai, trangThai, thoiGianBatDau, thoiGianKetThuc);
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
    public DiscountValidResponse getDiscountValid(DiscountValidRequest discountValidRequest) {
        String message = null;

        // pgg valid
        List<PhieuGiamGia> phieuGiamGias = repository.getDiscountValidNotCustomer(discountValidRequest.getGiaTriDonHang());

        // pgg success
        List<PhieuGiamGia> pggSuggests = repository.getDiscountSuggestNotCustomer(discountValidRequest.getGiaTriDonHang());

        // neu co khach hang lay tat ca phieu cu khach hang do
        if (discountValidRequest.getKhachHangId() != null) {
            // pgg valid
            List<PhieuGiamGia> phieuGiamGiaByCustomerId = repository.getDiscountValidByCustomer(discountValidRequest.getGiaTriDonHang(), discountValidRequest.getKhachHangId());
            phieuGiamGias.addAll(phieuGiamGiaByCustomerId);

            // pgg suggest
            List<PhieuGiamGia> phieuGiamGiaSuggestByCustomerId = repository.getDiscountSuggestByCustomer(discountValidRequest.getGiaTriDonHang(), discountValidRequest.getKhachHangId());
            pggSuggests.addAll(phieuGiamGiaSuggestByCustomerId);
        }

        // phieu giam gia giam nhieu nhat
        PhieuGiamGia pgg = this.getDiscountMax(phieuGiamGias, discountValidRequest.getGiaTriDonHang());

        // gợi y pgg mới
        pggSuggests.sort((pgg1, pgg2) -> {
            int compareValue = pgg1.getDieuKienGiam().compareTo(pgg2.getDieuKienGiam());
            if (compareValue != 0) {
                return compareValue;
            }
            return (int) (this.getDiscountValue(pgg1) - this.getDiscountValue(pgg2));
        });

        message = this.getMessage(pggSuggests,discountValidRequest.getGiaTriDonHang());

        return DiscountValidResponse
                .builder()
                .phieuGiamGia(pgg)
                .message(message)
                .build();
    }

    private String getMessage(List<PhieuGiamGia> pggSuggests, BigDecimal giaTriDonHang) {
        String message = null;


        if (pggSuggests.isEmpty()){
            return message;
        }
        PhieuGiamGia pgg = pggSuggests.get(0);
        message = "Mua thêm "+(UtilityFunction.convertToCurrency( pgg.getDieuKienGiam().longValue() - giaTriDonHang.longValue()))+" để giảm "+UtilityFunction.convertToCurrency(getDiscountValue(pgg));
        return message;

    }


    private PhieuGiamGia getDiscountMax(List<PhieuGiamGia> phieuGiamGias, BigDecimal giaTriDonHang) {
        PhieuGiamGia pgg = null;
        String message = null;
        if (phieuGiamGias.isEmpty()) {
            return null;
        } else if (phieuGiamGias.size() == 1) {
            pgg = phieuGiamGias.get(0);
        } else if (phieuGiamGias.size() > 1) {
            // sort tang dan
            phieuGiamGias.sort((pgg1, pgg2) -> (int) (this.getDiscountValue(pgg2, giaTriDonHang) - this.getDiscountValue(pgg1, giaTriDonHang)));

            // thang dau tien la thang giam nhieu nhat
            pgg = phieuGiamGias.get(0);

        }
        return pgg;
    }

    private long getDiscountValue(PhieuGiamGia pgg, BigDecimal giaTriDonHang) {
        long value = 0;
        if (pgg.getKieu().equals(1)) {
            // neu kieu la tien mat
            value = pgg.getGiaTri().longValue();
        } else if (pgg.getKieu().equals(0)) {
            // neu kieu la %
            long temp = giaTriDonHang.longValue() * pgg.getGiaTri().intValue();
            value = Math.min(temp, pgg.getGiaTriMax().longValue());

        }
        return value;
    }

    private long getDiscountValue(PhieuGiamGia pgg) {
        long value = 0;
        if (pgg.getKieu().equals(1)) {
            // neu kieu la tien mat
            value = pgg.getGiaTri().longValue();
        } else if (pgg.getKieu().equals(0)) {
            // neu kieu la %
            long temp = pgg.getDieuKienGiam().longValue() * pgg.getGiaTri().intValue();
            value = Math.min(temp, pgg.getGiaTriMax().longValue());

        }
        return value;
    }


}
