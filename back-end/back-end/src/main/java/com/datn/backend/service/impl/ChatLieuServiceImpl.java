package com.datn.backend.service.impl;

import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.exception.custom_exception.ResourceExistsException;
import com.datn.backend.model.san_pham.ChatLieu;
import com.datn.backend.repository.ChatLieuRepository;
import com.datn.backend.service.ChatLieuService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatLieuServiceImpl implements ChatLieuService {

    private final ChatLieuRepository chatLieuRepo;

    @Override
    public ChatLieu add(ChatLieu chatLieu) {
        if (chatLieuRepo.existsByTen(chatLieu.getTen().toLowerCase())) {
            throw new ResourceExistsException("Tên chất liệu: " + chatLieu.getTen() + " đã tồn tại.");
        }
        chatLieu.setTrangThai(true);
        return chatLieuRepo.save(chatLieu);
    }

    @Override
    public PagedResponse<ChatLieu> getAll(int pageNumber, int pageSize, String search) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
        Page<ChatLieu> chatLieuPage = chatLieuRepo.getAll(pageable, search);

        PagedResponse<ChatLieu> paged = new PagedResponse<>();
        paged.setPageNumber(pageNumber);
        paged.setPageSize(pageSize);
        paged.setTotalElements((int) chatLieuPage.getTotalElements());
        paged.setTotalPages(chatLieuPage.getTotalPages());
        paged.setData(chatLieuPage.getContent());

        return paged;
    }
}