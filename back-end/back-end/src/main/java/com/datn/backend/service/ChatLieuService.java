package com.datn.backend.service;

import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.model.san_pham.ChatLieu;

public interface ChatLieuService {

    ChatLieu add(ChatLieu chatLieu);

    PagedResponse<ChatLieu> getAll(int pageNumber, int pageSize, String search);
}
