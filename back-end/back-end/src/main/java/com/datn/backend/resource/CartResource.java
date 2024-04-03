package com.datn.backend.resource;

import com.datn.backend.dto.request.AddCartItemReq;
import com.datn.backend.model.danh_sach.CartItem;
import com.datn.backend.service.CartService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
@Slf4j
public class CartResource {

    private final CartService cartService;

    @GetMapping("/items/by-customer/{cusId}")
    public ResponseEntity<List<CartItem>> getAllCartItemsByCusId(@PathVariable("cusId") int cusId) {
        return ResponseEntity.ok(cartService.getAllCartItemsByCusId(cusId));
    }

    @GetMapping("/items/by-cus-details/{cusId}/{proDetailsId}")
    public ResponseEntity<CartItem> getCartItemByCustomerAndProductDetails(@PathVariable("cusId") int cusId,
                                                                           @PathVariable("proDetailsId") int proDetailsId) {
        return ResponseEntity.ok(cartService.getCartItemByCustomerAndProductDetails(cusId, proDetailsId));
    }

    @PostMapping("/items/add-cart-item")
    public ResponseEntity<Void> addCartItem(@RequestBody AddCartItemReq req) {
        cartService.addCartItem(req);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/items/update-quantity/{itemId}/{type}")
    public ResponseEntity<CartItem> updateCartItemQuantity(@PathVariable("itemId") int cartItemId,
                                                           @PathVariable("type") String type) {
        log.info("{} success", type);
        return ResponseEntity.ok(cartService.updateCartItemQuantity(cartItemId, type));
    }

    @DeleteMapping("/items/delete/{cartItemId}")
    public ResponseEntity<Void> deleteItemFromCart(@PathVariable("cartItemId") int cartItemId) {
        log.info("delete cart item {}", cartItemId);
        cartService.deleteItemFromCart(cartItemId);
        return ResponseEntity.ok().build();
    }
}
