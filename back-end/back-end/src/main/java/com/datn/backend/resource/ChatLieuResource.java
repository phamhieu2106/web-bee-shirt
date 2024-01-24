package com.datn.backend.resource;

import com.datn.backend.constant.ApplicationConstant;
import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.model.san_pham.ChatLieu;
import com.datn.backend.service.ChatLieuService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/chat-lieu")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class ChatLieuResource {

    private final ChatLieuService chatLieuService;

    @GetMapping("/get-all")
    public ResponseEntity<PagedResponse<ChatLieu>> getChatLieuList(@RequestParam(value = "pageNumber", defaultValue = "1", required = false) int pageNumber,
                                                                   @RequestParam(value = "pageSize", defaultValue = ApplicationConstant.DEFAULT_PAGE_SIZE, required = false) int pageSize,
                                                                   @RequestParam(value = "search", defaultValue = "", required = false) String search) {
        return ResponseEntity.ok().body(chatLieuService.getAll(pageNumber, pageSize, search));
    }

    @PostMapping("/add")
    public ResponseEntity<ChatLieu> add(@RequestBody ChatLieu chatLieu) {
        return ResponseEntity.ok(chatLieuService.add(chatLieu));
    }
}
