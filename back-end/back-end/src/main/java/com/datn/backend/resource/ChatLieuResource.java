package com.datn.backend.resource;

import com.datn.backend.model.san_pham.ChatLieu;
import com.datn.backend.service.ChatLieuService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/chat-lieu")
@RequiredArgsConstructor
public class ChatLieuResource {

    private final ChatLieuService chatLieuService;

    @PostMapping("/add")
    public ResponseEntity<ChatLieu> add(@RequestBody ChatLieu chatLieu) {
        return ResponseEntity.ok(chatLieuService.add(chatLieu));
    }
}
