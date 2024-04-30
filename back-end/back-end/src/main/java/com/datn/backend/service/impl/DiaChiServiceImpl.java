package com.datn.backend.service.impl;

import com.datn.backend.dto.request.AddAddressReq;
import com.datn.backend.exception.custom_exception.ResourceNotFoundException;
import com.datn.backend.model.khach_hang.DiaChi;
import com.datn.backend.model.khach_hang.KhachHang;
import com.datn.backend.repository.AddressRepository;
import com.datn.backend.repository.KhachHangRepository;
import com.datn.backend.service.DiaChiService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DiaChiServiceImpl implements DiaChiService {

    private final AddressRepository addressRepo;
    private final KhachHangRepository khachHangRepo;

    @Override
    public DiaChi add(DiaChi dc) {
        return addressRepo.save(dc);
    }

    @Override
    public DiaChi updateDC(DiaChi dc) {
        return addressRepo.save(dc);
    }

    @Override
    public List<DiaChi> getAllAddressOf1Customer(int id) {
        return addressRepo.getAllAddressOf1Customer(id);
    }

    @Override
    public void deleteAddress(int id) {
        addressRepo.deleteById(id);
    }

    @Override
    public DiaChi getDCById(int id) {
        return addressRepo.findById(id).get();
    }

    @Override
    public DiaChi deleteDC(int id) {
        DiaChi diaChi = getDCById(id);
        if (!diaChi.isMacDinh()) {
            addressRepo.delete(diaChi);
        }
        return null;
    }

    @Override
    @Transactional
    public DiaChi setDefault(int id) {
        DiaChi address = addressRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Địa chỉ ID: " + id + " không tồn tại"));
        address.setMacDinh(true);
        addressRepo.setUnDefaultValue(address.getId(), address.getKhachHang().getId());
        return addressRepo.save(address);
    }

    @Override
    @Transactional
    public DiaChi addAddress(AddAddressReq req) {
        KhachHang cust = khachHangRepo.findById(req.getCustId())
                .orElseThrow(() -> new ResourceNotFoundException("Khách hàng ID: " + req.getCustId() + " không tồn tại!"));
        DiaChi address = DiaChi.builder()
                .hoTen(req.getHoTen())
                .sdt(req.getSdt())
                .tinh(req.getTinh())
                .huyen(req.getHuyen())
                .xa(req.getXa())
                .duong(req.getDuong())
                .macDinh(req.isMacDinh())
                .khachHang(cust)
                .build();
        DiaChi savedAddress = addressRepo.save(address);
        if (req.isMacDinh()) {
            setDefault(savedAddress.getId());
        }
        return savedAddress;
    }

    @Override
    public DiaChi updateAddress(int addrId, AddAddressReq req) {
        DiaChi address = addressRepo.findById(addrId).get();

        address.setHoTen(req.getHoTen());
        address.setSdt(req.getSdt());
        address.setTinh(req.getTinh());
        address.setHuyen(req.getHuyen());
        address.setXa(req.getXa());
        address.setDuong(req.getDuong());

        return addressRepo.save(address);
    }
}
