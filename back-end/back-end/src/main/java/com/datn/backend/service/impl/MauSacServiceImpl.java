package com.datn.backend.service.impl;

import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.exception.custom_exception.ResourceExistsException;
import com.datn.backend.exception.custom_exception.ResourceNotFoundException;
import com.datn.backend.model.san_pham.MauSac;
import com.datn.backend.model.san_pham.MauSacImage;
import com.datn.backend.repository.MauSacRepository;
import com.datn.backend.utility.CloudinaryService;
import com.datn.backend.service.MauSacService;
import com.datn.backend.utility.UtilityFunction;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class MauSacServiceImpl implements MauSacService {

    private final MauSacRepository mauSacRepo;
    private final CloudinaryService cloudinaryService;

    @Override
    @Transactional
    public MauSac add(MauSac mauSac, MultipartFile multipartFile) throws IOException {
        checkExistForAdd(mauSac);
        // save image to cloud
        BufferedImage bi = ImageIO.read(multipartFile.getInputStream());
        if (bi == null) {
            throw new RuntimeException("Ảnh không hợp lệ");
        }
        Map result = cloudinaryService.upload(multipartFile);

        // set field cho MauSacImage, lưu MauSac
        MauSacImage image = new MauSacImage(
                (String) result.get("original_filename"),
                (String) result.get("url"),
                (String) result.get("public_id"));
        mauSac.setImage(image);
        mauSac.setTrangThai(true);

        return mauSacRepo.save(mauSac);
    }

    private void checkExistForAdd(MauSac mauSac) {
        if (mauSacRepo.existsByTen(mauSac.getTen()) && !mauSacRepo.existsByMa(mauSac.getMa())) {
            throw new ResourceExistsException("Tên '" + mauSac.getTen() + "' đã tồn tại.");
        }

        if (!mauSacRepo.existsByTen(mauSac.getTen()) && mauSacRepo.existsByMa(mauSac.getMa())) {
            throw new ResourceExistsException("Mã '" + mauSac.getMa() + "' đã tồn tại.");
        }
    }

    @Override
    public PagedResponse<MauSac> getByPage(int pageNumber, int pageSize, String search) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
        Page<MauSac> mauSacPage = mauSacRepo.getByPage(pageable, search);

        PagedResponse<MauSac> paged = new PagedResponse<>();
        paged.setPageNumber(pageNumber);
        paged.setPageSize(pageSize);
        paged.setTotalElements((int) mauSacPage.getTotalElements());
        paged.setTotalPages(mauSacPage.getTotalPages());
        paged.setPageNumberArr(UtilityFunction.getPageNumberArr(mauSacPage.getTotalPages()));
        paged.setData(mauSacPage.getContent());
        paged.setSearch(search);

        return paged;
    }

    @Override
    public List<MauSac> getAll() {
        Sort sort = Sort.by("ten");
        return mauSacRepo.findAll(sort);
    }

    @Override
    public List<MauSac> getAllActiveColors() {
        return mauSacRepo.getAllActiveColors();
    }

    @Override
    public MauSac getById(int id) {
        return mauSacRepo.findById(id).get();
    }

    @Override
    public void changeStatus(int id) {
        MauSac mauSac = mauSacRepo.findById(id).get();
        mauSac.setTrangThai(!mauSac.isTrangThai());
        mauSacRepo.save(mauSac);
    }

    /**
     * 1. không cập nhật ảnh (dùng ảnh cũ)
     * 2. cập nhật ảnh (dùng ảnh mới) => xóa ảnh cũ trên cloudinary, cập nhật mauSacImage cho mauSac
     **/
    @Override
    public MauSac update(MauSac mauSac, MultipartFile multipartFile) throws IOException {
        // check existence
        checkExistForUpdate(mauSac);

        // save image to cloud
        BufferedImage bi = null;
        if (multipartFile != null) {
            bi = ImageIO.read(multipartFile.getInputStream());
        }
        Map result = null;
        if (bi != null) {
            result = cloudinaryService.upload(multipartFile);
        }

        //
        MauSac mauSacInDB = mauSacRepo.findById(mauSac.getId()).get();
        MauSacImage image = mauSacInDB.getImage();
        if (bi != null) {
            // xóa ảnh cũ
            cloudinaryService.delete(image.getImageId());

            image.setImageName((String) result.get("original_filename"));
            image.setImageUrl((String) result.get("url"));
            image.setImageId((String) result.get("public_id"));
        }
        mauSacInDB.setTen(mauSac.getTen());
        mauSacInDB.setMa(mauSac.getMa());

        return mauSacRepo.save(mauSacInDB);
    }

    private void checkExistForUpdate(MauSac mauSac) {
        MauSac mauSacInDB = mauSacRepo.findById(mauSac.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Màu sắc không tồn tại với ID: " + mauSac.getId()));

        MauSac mauSacByTen = mauSacRepo.getMauSacByTen(mauSac.getTen());
        MauSac mauSacByMa = mauSacRepo.getMauSacByMa(mauSac.getMa());

        if (mauSacByTen != null && mauSacByTen.getId() != mauSacInDB.getId()) {
            throw new ResourceExistsException("Tên '" + mauSac.getTen() + "' đã tồn tại.");
        }

        if (mauSacByMa != null && mauSacByMa.getId() != mauSacInDB.getId()) {
            throw new ResourceExistsException("Mã '" + mauSac.getMa() + "' đã tồn tại.");
        }
    }

    @Override
    public List<MauSac> getAllColorOfProduct(int productId) {
        return mauSacRepo.getAllColorOfProduct(productId);
    }
}
