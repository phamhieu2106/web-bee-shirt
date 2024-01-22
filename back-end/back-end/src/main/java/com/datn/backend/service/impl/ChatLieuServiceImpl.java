package com.datn.backend.service.impl;

import com.datn.backend.exception.custom_exception.ResourceExistsException;
import com.datn.backend.model.san_pham.ChatLieu;
import com.datn.backend.repository.ChatLieuRepository;
import com.datn.backend.service.ChatLieuService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatLieuServiceImpl implements ChatLieuService {

    private final ChatLieuRepository chatLieuRepo;

    @Override
    public ChatLieu add(ChatLieu chatLieu) {
        if (chatLieuRepo.existsByTen(chatLieu.getTen().toLowerCase())) {
            throw new ResourceExistsException("Tên chất liệu: " + chatLieu.getTen() + " đã tồn tại.");
        }
        return chatLieuRepo.save(chatLieu);
    }
}
