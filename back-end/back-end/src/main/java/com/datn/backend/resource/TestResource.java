package com.datn.backend.resource;

import com.datn.backend.model.san_pham.ChatLieu;
import com.datn.backend.security.MyUserDetails;
import com.datn.backend.service.ChatLieuService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/chat-lieu")
@RequiredArgsConstructor
public class TestResource {

    private final ChatLieuService chatLieuService;

    @GetMapping("/hello1")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<String> hello() {
        ChatLieu chatLieu = new ChatLieu();
        chatLieu.setTen("Cotton");
        chatLieuService.add(chatLieu);
        return ResponseEntity.ok("OK");
    }
}
