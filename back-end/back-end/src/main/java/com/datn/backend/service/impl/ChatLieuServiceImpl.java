package com.datn.backend.service.impl;

import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.exception.custom_exception.ResourceExistsException;
import com.datn.backend.exception.custom_exception.ResourceNotFoundException;
import com.datn.backend.model.san_pham.ChatLieu;
import com.datn.backend.repository.ChatLieuRepository;
import com.datn.backend.service.ChatLieuService;
import com.datn.backend.utility.UtilityFunction;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatLieuServiceImpl implements ChatLieuService {

    private final ChatLieuRepository chatLieuRepo;

    @Override
    public ChatLieu add(ChatLieu chatLieu) {
        if (chatLieuRepo.existsByTen(chatLieu.getTen().toLowerCase())) {
            throw new ResourceExistsException("'" + chatLieu.getTen() + "' đã tồn tại.");
        }
        chatLieu.setTrangThai(true);
        return chatLieuRepo.save(chatLieu);
    }

    @Override
    public PagedResponse<ChatLieu> getByPage(int pageNumber, int pageSize, String search) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
        Page<ChatLieu> chatLieuPage = chatLieuRepo.getAll(pageable, search);

        PagedResponse<ChatLieu> paged = new PagedResponse<>();
        paged.setPageNumber(pageNumber);
        paged.setPageSize(pageSize);
        paged.setTotalElements((int) chatLieuPage.getTotalElements());
        paged.setTotalPages(chatLieuPage.getTotalPages());
        paged.setPageNumberArr(UtilityFunction.getPageNumberArr(chatLieuPage.getTotalPages()));
        paged.setData(chatLieuPage.getContent());
        paged.setSearch(search);

        return paged;
    }

    @Override
    public List<ChatLieu> getAll() {
        Sort sort = Sort.by("ten");
        return chatLieuRepo.findAll(sort);
    }

    @Override
    public ChatLieu getById(int id) {
        return chatLieuRepo.findById(id).get();
    }

    @Override
    public void changeStatus(int id) {
        ChatLieu chatLieu = chatLieuRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Chất liệu với ID: " + id + " không tồn tại!"));
        chatLieu.setTrangThai(!chatLieu.isTrangThai());
        chatLieuRepo.save(chatLieu);
    }

    @Override
    public ChatLieu update(ChatLieu chatLieu) {
        checkExistForUpdate(chatLieu);
        return chatLieuRepo.save(chatLieu);
    }

    private void checkExistForUpdate(ChatLieu chatLieu) {
        ChatLieu chatLieuInDB = chatLieuRepo.findById(chatLieu.getId()).get();
        ChatLieu chatLieuByTen = chatLieuRepo.getChatLieuByTen(chatLieu.getTen());

        if (chatLieuByTen != null && chatLieuByTen.getId() != chatLieuInDB.getId()) {
            throw new ResourceExistsException("Tên chất liệu '" + chatLieu.getTen() + "' đã tồn tại.");
        }
    }
}