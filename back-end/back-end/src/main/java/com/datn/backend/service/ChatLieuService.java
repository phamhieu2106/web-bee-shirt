package com.datn.backend.service;

import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.model.san_pham.ChatLieu;

import java.util.List;

public interface ChatLieuService {

    ChatLieu add(ChatLieu chatLieu);

    PagedResponse<ChatLieu> getByPage(int pageNumber, int pageSize, String search);

    List<ChatLieu> getAll();

    ChatLieu getById(int id);

    void changeStatus(int id);

    ChatLieu update(ChatLieu chatLieu);
}
