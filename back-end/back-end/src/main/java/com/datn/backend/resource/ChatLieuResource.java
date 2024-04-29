package com.datn.backend.resource;

import com.datn.backend.constant.ApplicationConstant;
import com.datn.backend.dto.response.PagedResponse;
import com.datn.backend.model.san_pham.ChatLieu;
import com.datn.backend.service.ChatLieuService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/chat-lieu")
@RequiredArgsConstructor
public class ChatLieuResource {

    private final ChatLieuService chatLieuService;

    // admin resources
    @GetMapping("/get-by-page")
    public ResponseEntity<PagedResponse<ChatLieu>> getByPage(@RequestParam(value = "pageNumber", defaultValue = "1", required = false) int pageNumber,
                                                             @RequestParam(value = "pageSize", defaultValue = ApplicationConstant.DEFAULT_PAGE_SIZE, required = false) int pageSize,
                                                             @RequestParam(value = "search", defaultValue = "", required = false) String search) {
        return ResponseEntity.ok(chatLieuService.getByPage(pageNumber, pageSize, search));
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<ChatLieu>> getAll() {
        return ResponseEntity.ok(chatLieuService.getAll());
    }

    @PostMapping("/add")
    public ResponseEntity<ChatLieu> add(@RequestBody ChatLieu chatLieu) {
        return ResponseEntity.ok(chatLieuService.add(chatLieu));
    }

    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<ChatLieu> getById(@PathVariable("id") int id) {
        return ResponseEntity.ok(chatLieuService.getById(id));
    }

    @GetMapping("/status/{id}")
    public ResponseEntity<String> changeStatus(@PathVariable("id") int id) {
        chatLieuService.changeStatus(id);
        return ResponseEntity.ok("Cập nhật trạng thái thành công!");
    }

    @PutMapping("/update")
    public ResponseEntity<ChatLieu> update(@RequestBody ChatLieu chatLieu) {
        return ResponseEntity.ok(chatLieuService.update(chatLieu));
    }

    // client resources
    @GetMapping("/all-active")
    public ResponseEntity<List<ChatLieu>> getAllActive() {
        List<ChatLieu> all = chatLieuService.getAll();
        List<ChatLieu> allActive = all.stream().filter(ChatLieu::isTrangThai).toList();
        return ResponseEntity.ok(allActive);
    }
}
