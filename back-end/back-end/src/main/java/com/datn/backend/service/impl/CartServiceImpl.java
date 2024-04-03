package com.datn.backend.service.impl;

import com.datn.backend.dto.request.AddCartItemReq;
import com.datn.backend.exception.custom_exception.ResourceNotFoundException;
import com.datn.backend.model.danh_sach.Cart;
import com.datn.backend.model.danh_sach.CartItem;
import com.datn.backend.repository.CartItemRepository;
import com.datn.backend.repository.CartRepository;
import com.datn.backend.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartItemRepository cartItemRepo;
    private final CartRepository cartRepo;

    @Override
    public List<CartItem> getAllCartItemsOf1Customer(int cusId) {
        return cartItemRepo.getAllCartItemsOf1Customer(cusId);
    }

    @Override
    public CartItem getCartItemByCustomerAndProductDetails(int cusId, int proDetailsId) {
        return cartItemRepo.getCartItemByCustomerAndProductDetails(cusId, proDetailsId);
    }

    @Override
    public void addCartItem(AddCartItemReq req) {
        Cart cart = cartRepo.getByKhachHangId(req.getCustomerId());

        CartItem cartItem = new CartItem();
        cartItem.setSoLuong(req.getQuantity());
        cartItem.setSpct(req.getProductDetails());
        cartItem.setGioHang(cart);

        cartItemRepo.save(cartItem);
    }

    @Override
    public CartItem updateCartItemQuantity(int cartItemId, String type) {
        CartItem cartItem = cartItemRepo.findById(cartItemId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart item ID: " + cartItemId + " not found!"));

        if (cartItem.getSoLuong() == 1 && type.equals("minus")) {
            throw new RuntimeException("Số lượng phải lớn hơn 0!");
        } else if (type.equals("minus")) {
            cartItem.setSoLuong(cartItem.getSoLuong() - 1);
        } else if (cartItem.getSoLuong() == cartItem.getSpct().getSoLuongTon() && type.equals("plus")) {
            throw new RuntimeException("Số lượng tồn kho không đủ!");
        } else {
            cartItem.setSoLuong(cartItem.getSoLuong() + 1);
        }
        return cartItemRepo.save(cartItem);
    }

    @Override
    public void deleteItemFromCart(int cartItemId) {
        cartItemRepo.deleteById(cartItemId);
    }
}
